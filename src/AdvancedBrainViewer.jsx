import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

/**
 * Advanced Brain Viewer with Real BrainBrowser Integration
 * 
 * This component shows how to properly integrate BrainBrowser models
 * with vertex-based region detection using atlas files.
 */

// Parse AAL (Automated Anatomical Labeling) atlas format
function parseAALAtlas(atlasText) {
  const lines = atlasText.trim().split('\n');
  const vertexToRegion = new Map();
  
  lines.forEach(line => {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 2) {
      const vertexIndex = parseInt(parts[0]);
      const regionId = parseInt(parts[1]);
      const regionName = parts.slice(2).join(' ') || `Region_${regionId}`;
      
      vertexToRegion.set(vertexIndex, {
        id: regionId,
        name: regionName
      });
    }
  });
  
  return vertexToRegion;
}

// Brain Model with Atlas Integration
function BrainModelWithAtlas({ 
  modelUrl, 
  atlasUrl, 
  onRegionClick, 
  selectedRegion,
  colorScheme = 'anatomical'
}) {
  const [atlasData, setAtlasData] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const meshRef = useRef();
  
  // Load the brain surface model
  const brainGeometry = useLoader(OBJLoader, modelUrl);
  
  // Load atlas data
  useEffect(() => {
    fetch(atlasUrl)
      .then(res => res.text())
      .then(data => {
        const parsedAtlas = parseAALAtlas(data);
        setAtlasData(parsedAtlas);
        console.log(`Loaded ${parsedAtlas.size} labeled vertices`);
      })
      .catch(err => console.error('Failed to load atlas:', err));
  }, [atlasUrl]);
  
  // Apply vertex colors based on atlas regions
  useEffect(() => {
    if (!atlasData || !meshRef.current) return;
    
    const geometry = meshRef.current.geometry;
    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);
    
    // Color each vertex based on its region
    for (let i = 0; i < positions.count; i++) {
      const regionData = atlasData.get(i);
      
      if (regionData) {
        const color = getRegionColor(regionData.id, regionData.name, colorScheme);
        
        // Highlight selected region
        const isSelected = selectedRegion && regionData.name === selectedRegion.name;
        const isHovered = hoveredRegion && regionData.name === hoveredRegion.name;
        
        const multiplier = isSelected ? 1.5 : (isHovered ? 1.2 : 1.0);
        
        colors[i * 3] = color.r * multiplier;
        colors[i * 3 + 1] = color.g * multiplier;
        colors[i * 3 + 2] = color.b * multiplier;
      } else {
        // Default gray for unlabeled vertices
        colors[i * 3] = 0.7;
        colors[i * 3 + 1] = 0.7;
        colors[i * 3 + 2] = 0.7;
      }
    }
    
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.attributes.color.needsUpdate = true;
  }, [atlasData, selectedRegion, hoveredRegion, colorScheme]);
  
  // Handle click events
  const handleClick = (event) => {
    if (!atlasData) return;
    
    event.stopPropagation();
    const faceIndex = event.faceIndex;
    const geometry = event.object.geometry;
    
    // Get the three vertices of the clicked face
    const face = {
      a: geometry.index.getX(faceIndex * 3),
      b: geometry.index.getX(faceIndex * 3 + 1),
      c: geometry.index.getX(faceIndex * 3 + 2)
    };
    
    // Check which region these vertices belong to
    const regionA = atlasData.get(face.a);
    const regionB = atlasData.get(face.b);
    const regionC = atlasData.get(face.c);
    
    // Use the most common region among the three vertices
    const region = regionA || regionB || regionC;
    
    if (region && onRegionClick) {
      onRegionClick(region);
    }
  };
  
  const handlePointerMove = (event) => {
    if (!atlasData) return;
    
    const faceIndex = event.faceIndex;
    const geometry = event.object.geometry;
    
    if (faceIndex !== undefined) {
      const face = {
        a: geometry.index.getX(faceIndex * 3)
      };
      
      const region = atlasData.get(face.a);
      setHoveredRegion(region);
    }
  };
  
  return (
    <group>
      <primitive
        ref={meshRef}
        object={brainGeometry.children[0]}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onPointerOut={() => setHoveredRegion(null)}
      >
        <meshStandardMaterial
          vertexColors={true}
          metalness={0.2}
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </primitive>
      
      {hoveredRegion && (
        <Html
          position={[0, 0, 0]}
          center
          style={{
            pointerEvents: 'none',
            background: 'rgba(0,0,0,0.85)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            whiteSpace: 'nowrap'
          }}
        >
          {hoveredRegion.name}
        </Html>
      )}
    </group>
  );
}

// Color mapping for different brain regions
function getRegionColor(regionId, regionName, colorScheme) {
  if (colorScheme === 'anatomical') {
    // Anatomical color scheme based on lobe
    const lowerName = regionName.toLowerCase();
    
    if (lowerName.includes('frontal')) {
      return new THREE.Color('#FF6B6B');
    } else if (lowerName.includes('parietal')) {
      return new THREE.Color('#4ECDC4');
    } else if (lowerName.includes('temporal')) {
      return new THREE.Color('#95E1D3');
    } else if (lowerName.includes('occipital')) {
      return new THREE.Color('#F38181');
    } else if (lowerName.includes('cerebellum')) {
      return new THREE.Color('#FCE38A');
    } else if (lowerName.includes('cingul')) {
      return new THREE.Color('#AA96DA');
    } else {
      // Default color for other regions
      return new THREE.Color('#C9C9C9');
    }
  } else if (colorScheme === 'rainbow') {
    // Rainbow color scheme based on region ID
    const hue = (regionId * 137.508) % 360; // Golden angle
    return new THREE.Color(`hsl(${hue}, 70%, 60%)`);
  } else if (colorScheme === 'functional') {
    // Functional color scheme
    const lowerName = regionName.toLowerCase();
    
    if (lowerName.includes('motor') || lowerName.includes('precentral')) {
      return new THREE.Color('#E74C3C'); // Red for motor
    } else if (lowerName.includes('sensory') || lowerName.includes('postcentral')) {
      return new THREE.Color('#3498DB'); // Blue for sensory
    } else if (lowerName.includes('visual') || lowerName.includes('occipital')) {
      return new THREE.Color('#9B59B6'); // Purple for visual
    } else if (lowerName.includes('auditory') || lowerName.includes('temporal')) {
      return new THREE.Color('#F39C12'); // Orange for auditory
    } else {
      return new THREE.Color('#95A5A6'); // Gray for association areas
    }
  }
  
  return new THREE.Color('#888888');
}

// Enhanced region information with detailed data
const enhancedRegionData = {
  'Frontal_Sup_L': {
    fullName: 'Superior Frontal Gyrus (Left)',
    lobe: 'Frontal',
    hemisphere: 'Left',
    description: 'Involved in higher cognitive functions including working memory and attention.',
    functions: [
      'Working memory',
      'Cognitive control',
      'Self-awareness',
      'Emotional regulation'
    ],
    connections: ['Prefrontal cortex', 'Parietal cortex', 'Basal ganglia'],
    volume: '~12,000 mm³',
    brodmannAreas: [8, 9, 10]
  },
  // Add more regions as needed
};

// Main Advanced Brain Viewer Component
function AdvancedBrainViewer() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [colorScheme, setColorScheme] = useState('anatomical');
  const [autoRotate, setAutoRotate] = useState(false);
  
  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    console.log('Clicked region:', region);
  };
  
  const regionInfo = selectedRegion 
    ? enhancedRegionData[selectedRegion.name] || {
        fullName: selectedRegion.name,
        description: 'Detailed information for this region is being loaded...'
      }
    : null;
  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, position: 'relative', background: '#1a1a2e' }}>
        <Canvas camera={{ position: [0, 0, 150], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <directionalLight position={[-10, -10, -5]} intensity={0.4} />
          
          {/* Replace these URLs with your actual model and atlas files */}
          <BrainModelWithAtlas
            modelUrl="/models/brain-surface.obj"
            atlasUrl="/models/AAL_atlas.txt"
            onRegionClick={handleRegionClick}
            selectedRegion={selectedRegion}
            colorScheme={colorScheme}
          />
          
          <OrbitControls
            autoRotate={autoRotate}
            autoRotateSpeed={1.5}
            enableDamping
            dampingFactor={0.05}
            minDistance={50}
            maxDistance={300}
          />
        </Canvas>
        
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          background: 'rgba(255,255,255,0.95)',
          padding: '15px 20px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#667eea' }}>Controls</h4>
          <button onClick={() => setSelectedRegion(null)}>Clear Selection</button>
          <button onClick={() => setAutoRotate(!autoRotate)}>
            {autoRotate ? 'Stop' : 'Start'} Rotation
          </button>
          <select 
            value={colorScheme} 
            onChange={(e) => setColorScheme(e.target.value)}
            style={{ display: 'block', marginTop: '8px', width: '100%' }}
          >
            <option value="anatomical">Anatomical</option>
            <option value="rainbow">Rainbow</option>
            <option value="functional">Functional</option>
          </select>
        </div>
      </div>
      
      <div style={{
        width: '400px',
        background: 'rgba(255,255,255,0.98)',
        padding: '30px',
        overflowY: 'auto'
      }}>
        <h2 style={{ color: '#667eea' }}>🧠 Brain Region Explorer</h2>
        
        {regionInfo ? (
          <div>
            <h3 style={{ color: '#764ba2' }}>{regionInfo.fullName}</h3>
            {regionInfo.lobe && (
              <p><strong>Lobe:</strong> {regionInfo.lobe}</p>
            )}
            {regionInfo.hemisphere && (
              <p><strong>Hemisphere:</strong> {regionInfo.hemisphere}</p>
            )}
            <p>{regionInfo.description}</p>
            
            {regionInfo.functions && (
              <>
                <h4>Key Functions:</h4>
                <ul>
                  {regionInfo.functions.map((func, idx) => (
                    <li key={idx}>{func}</li>
                  ))}
                </ul>
              </>
            )}
            
            {regionInfo.connections && (
              <>
                <h4>Connected Regions:</h4>
                <p>{regionInfo.connections.join(', ')}</p>
              </>
            )}
          </div>
        ) : (
          <p>Click on any brain region to explore its functions and connections.</p>
        )}
      </div>
    </div>
  );
}

export default AdvancedBrainViewer;
