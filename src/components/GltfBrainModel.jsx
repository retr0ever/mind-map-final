import { useRef, useState, useEffect } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { brainStructure, getMainRegions, getParts } from '../data/brainStructure';

/**
 * GLTF Brain Model Component
 * Loads and renders a 3D brain model from a GLTF/GLB file
 * with interactive regions mapped to the brain structure data
 */
export function GltfBrainModel({
  onRegionClick,
  selectedRegion,
  selectedMainRegion,
  showSubparts,
  modelPath = '/models/brainmodel.glb'
}) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(null);
  const [meshes, setMeshes] = useState([]);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [scale, setScale] = useState(0.12);

  // Load the GLTF model
  const { scene } = useGLTF(modelPath);

  // Handle responsive scaling based on window size
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Base scale
      let newScale = 0.12;

      // Adjust for smaller screens
      if (width < 768) {
        newScale = 0.10;
      } else if (width < 1024) {
        newScale = 0.11;
      }

      // Adjust for very tall or very wide screens
      const aspectRatio = width / height;
      if (aspectRatio < 0.75) {
        newScale *= 0.9; // Portrait mode, make slightly smaller
      } else if (aspectRatio > 2) {
        newScale *= 1.1; // Very wide screens, make slightly larger
      }

      setScale(newScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Extract all meshes from the loaded model
  useEffect(() => {
    if (scene) {
      const extractedMeshes = [];
      scene.traverse((child) => {
        if (child.isMesh) {
          // Clone the mesh to preserve geometry and original materials
          const clonedMesh = child.clone();
          clonedMesh.userData = { ...child.userData };

          // Preserve original material (with textures)
          if (child.material) {
            clonedMesh.material = child.material.clone();
            clonedMesh.userData.originalMaterial = child.material.clone();
          }

          clonedMesh.castShadow = true;
          clonedMesh.receiveShadow = true;
          extractedMeshes.push(clonedMesh);
        }
      });
      setMeshes(extractedMeshes);
      setModelLoaded(true);
      console.log(`Loaded brain model with ${extractedMeshes.length} meshes`);

      // Log mesh names for debugging and analysis
      console.log('=== Brain Model Loaded ===');
      console.log(`Total meshes: ${extractedMeshes.length}`);
      extractedMeshes.forEach((mesh, i) => {
        console.log(`Mesh ${i}: "${mesh.name}" - Vertices: ${mesh.geometry.attributes.position?.count || 0}`);
        if (mesh.material) {
          console.log(`  - Material: ${mesh.material.type}, Has Texture: ${!!mesh.material.map}`);
        }
      });
      console.log('========================');
    }
  }, [scene]);

  // Handle click on brain mesh
  const handleMeshClick = (region, event) => {
    event.stopPropagation();
    if (onRegionClick && region) {
      onRegionClick(region);
    }
  };

  // Map mesh to brain region based on mesh name or position
  const mapMeshToRegion = (mesh, index) => {
    const meshName = mesh.name.toLowerCase();

    // Get the appropriate regions to display
    const regionsToDisplay = showSubparts && selectedMainRegion
      ? getParts(selectedMainRegion)
      : getMainRegions();

    // Try to match by mesh name first (exact or partial match)
    for (const region of regionsToDisplay) {
      const regionName = region.name.toLowerCase();
      const regionId = region.id.toLowerCase();

      // Check various naming variations
      const nameVariations = [
        regionName.replace(/\s+/g, ''),      // Remove spaces: "frontal lobe" -> "frontallobe"
        regionName.replace(/\s+/g, '_'),     // Replace spaces with _: "frontal lobe" -> "frontal_lobe"
        regionName.replace(/\s+/g, '-'),     // Replace spaces with -: "frontal lobe" -> "frontal-lobe"
        regionId.replace(/_/g, ''),          // Remove underscores from id
        regionId.replace(/_/g, '-'),         // Replace _ with -
        regionName.split(' ')[0],            // First word only: "frontal lobe" -> "frontal"
      ];

      for (const variation of nameVariations) {
        if (meshName.includes(variation)) {
          return region;
        }
      }
    }

    // Extended pattern matching for common brain anatomy terms
    const namePatterns = {
      // Main brain parts
      'frontal': 'frontal_lobe',
      'parietal': 'parietal_lobe',
      'temporal': 'temporal_lobe',
      'occipital': 'occipital_lobe',
      'cerebellum': 'cerebellum',
      'cerebel': 'cerebellum',
      'brainstem': 'brainstem',
      'brain_stem': 'brainstem',
      'stem': 'brainstem',

      // Limbic system
      'limbic': 'limbic_system',
      'hippocampus': 'hippocampus',
      'hippo': 'hippocampus',
      'amygdala': 'amygdala',
      'thalamus': 'thalamus',
      'hypothalamus': 'hypothalamus',
      'hypo': 'hypothalamus',

      // Basal ganglia
      'basal': 'basal_ganglia',
      'ganglia': 'basal_ganglia',
      'caudate': 'caudate_nucleus',
      'putamen': 'putamen',
      'nucleus': 'caudate_nucleus',

      // Cerebrum parts
      'cortex': 'cerebral_cortex',
      'corpus': 'corpus_callosum',
      'callosum': 'corpus_callosum',

      // Brainstem parts
      'pons': 'brainstem_pons',
      'medulla': 'brainstem_medulla',
      'midbrain': 'midbrain'
    };

    // Try pattern matching
    for (const [pattern, regionId] of Object.entries(namePatterns)) {
      if (meshName.includes(pattern)) {
        // Find the region in the display list first
        const foundRegion = regionsToDisplay.find(r => r.id === regionId);
        if (foundRegion) return foundRegion;

        // Search all brain structure if not in current display
        for (const key in brainStructure) {
          const region = brainStructure[key];
          if (region.id === regionId) return region;
          if (region.parts) {
            const part = region.parts.find(p => p.id === regionId);
            if (part) return part;
          }
        }
      }
    }

    // If model has single or few meshes, map them to different regions
    if (meshes.length <= 6 && regionsToDisplay.length > 0) {
      // For models with few meshes, distribute them across regions
      return regionsToDisplay[index % regionsToDisplay.length];
    }

    // For models with many meshes, group them
    if (regionsToDisplay.length > 0) {
      const meshesPerRegion = Math.ceil(meshes.length / regionsToDisplay.length);
      const regionIndex = Math.floor(index / meshesPerRegion);
      return regionsToDisplay[Math.min(regionIndex, regionsToDisplay.length - 1)];
    }

    // Fallback to cerebrum
    return brainStructure.cerebrum;
  };


  if (!modelLoaded || meshes.length === 0) {
    return (
      <Html center>
        <div style={{
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '8px',
          color: 'white',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#ff6b6b' }}>3D Brain Model Not Loaded</h3>
          <p style={{ margin: '10px 0', fontSize: '14px' }}>
            Please download a brain model and place it at:
          </p>
          <code style={{
            display: 'block',
            padding: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            fontSize: '12px',
            margin: '10px 0'
          }}>
            public/models/brain.glb
          </code>
          <p style={{ margin: '10px 0', fontSize: '12px', color: '#aaa' }}>
            See BRAIN_MODEL_SETUP.md for detailed instructions.
          </p>
        </div>
      </Html>
    );
  }

  return (
    <group ref={groupRef} scale={scale} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      {meshes.map((mesh, index) => {
        const region = mapMeshToRegion(mesh, index);
        const isHovered = hovered === mesh;
        const isSelected = selectedRegion?.id === region?.id;

        // Use original material with enhancements
        const enhancedMaterial = mesh.material ? mesh.material.clone() : new THREE.MeshStandardMaterial();

        // Apply hover/selection effects while preserving textures
        if (isSelected) {
          enhancedMaterial.emissive = new THREE.Color(region?.color || '#ff6b6b');
          enhancedMaterial.emissiveIntensity = 0.3;
        } else if (isHovered) {
          enhancedMaterial.emissive = new THREE.Color(region?.color || '#ffaaaa');
          enhancedMaterial.emissiveIntensity = 0.2;
        } else {
          enhancedMaterial.emissive = new THREE.Color(0x000000);
          enhancedMaterial.emissiveIntensity = 0;
        }

        return (
          <mesh
            key={`brain-mesh-${index}`}
            geometry={mesh.geometry}
            material={enhancedMaterial}
            position={mesh.position}
            rotation={mesh.rotation}
            scale={mesh.scale}
            onClick={(e) => handleMeshClick(region, e)}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(mesh);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHovered(null);
              document.body.style.cursor = 'auto';
            }}
            castShadow
            receiveShadow
          >
            {/* Hover tooltip */}
            {isHovered && region && (
              <Html distanceFactor={10}>
                <div className="brain-tooltip">
                  <div className="tooltip-type" style={{ color: region.color }}>
                    {region.type}
                  </div>
                  <div className="tooltip-name">{region.name}</div>
                </div>
              </Html>
            )}
          </mesh>
        );
      })}
    </group>
  );
}

// Preload the model for better performance
useGLTF.preload('/models/brainmodel.glb');
