import React, { useState, useEffect, useRef, Suspense, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useProgress, useGLTF } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { brainRegionsData } from '../data/brainRegions';
import { parseAALAtlas, getRegionFromFace, createColorMapFromRegions, hexToRGB } from '../utils/atlasParser';

/**
 * Loading indicator for 3D model
 */
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        padding: '20px 40px',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '500'
      }}>
        Loading brain model... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

/**
 * Camera animator - smoothly animates camera to target position
 */
function CameraAnimator({ cameraTarget, controlsRef }) {
  const { camera } = useThree();
  const targetPosRef = useRef(null);
  const targetLookAtRef = useRef(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    if (cameraTarget && controlsRef.current) {
      const { position, distance, targetPoint } = cameraTarget;

      // Calculate camera position based on target point and distance
      const sphericalPos = new THREE.Vector3(
        position[0] * (distance / 5),
        position[1] * (distance / 5) + distance * 0.3,
        position[2] * (distance / 5) + distance
      );

      targetPosRef.current = sphericalPos;
      targetLookAtRef.current = new THREE.Vector3(...targetPoint);
      animatingRef.current = true;
    }
  }, [cameraTarget, controlsRef]);

  useFrame(() => {
    if (animatingRef.current && targetPosRef.current && controlsRef.current) {
      const currentPos = camera.position;
      const targetPos = targetPosRef.current;
      const currentTarget = controlsRef.current.target;
      const targetLookAt = targetLookAtRef.current;

      // Smooth lerp animation
      const lerpFactor = 0.05;

      // Animate camera position
      currentPos.lerp(targetPos, lerpFactor);

      // Animate camera target (what it's looking at)
      currentTarget.lerp(targetLookAt, lerpFactor);

      // Update controls
      controlsRef.current.update();

      // Check if animation is complete
      const posDistance = currentPos.distanceTo(targetPos);
      const targetDistance = currentTarget.distanceTo(targetLookAt);

      if (posDistance < 0.01 && targetDistance < 0.01) {
        animatingRef.current = false;
      }
    }
  });

  return null;
}

/**
 * Simple geometric brain model (fallback when no OBJ model is available)
 */
function SimpleBrainModel({ onRegionClick, selectedRegion, hoveredRegion, setHoveredRegion }) {
  const regions = [
    { key: 'Frontal_Sup_L', position: [-1, 1.5, 2], size: [1.5, 1.2, 1.2] },
    { key: 'Frontal_Sup_R', position: [1, 1.5, 2], size: [1.5, 1.2, 1.2] },
    { key: 'Precentral_L', position: [-1.2, 0.5, 1], size: [1, 1.5, 0.8] },
    { key: 'Precentral_R', position: [1.2, 0.5, 1], size: [1, 1.5, 0.8] },
    { key: 'Postcentral_L', position: [-1.2, 0.5, -0.5], size: [1, 1.5, 0.8] },
    { key: 'Postcentral_R', position: [1.2, 0.5, -0.5], size: [1, 1.5, 0.8] },
    { key: 'Parietal_Sup_L', position: [-1, 1.5, 0], size: [1.5, 1, 1.2] },
    { key: 'Parietal_Sup_R', position: [1, 1.5, 0], size: [1.5, 1, 1.2] },
    { key: 'Temporal_Sup_L', position: [-2, -0.5, 0], size: [0.8, 1.2, 1.5] },
    { key: 'Temporal_Sup_R', position: [2, -0.5, 0], size: [0.8, 1.2, 1.5] },
    { key: 'Occipital_Sup_L', position: [-0.8, 1, -2.5], size: [1.2, 1.5, 1] },
    { key: 'Occipital_Sup_R', position: [0.8, 1, -2.5], size: [1.2, 1.5, 1] },
    { key: 'Calcarine_L', position: [-0.5, 0.5, -3], size: [0.8, 1, 0.5] },
    { key: 'Calcarine_R', position: [0.5, 0.5, -3], size: [0.8, 1, 0.5] },
    { key: 'Cerebellum_L', position: [-0.8, -1.5, -1.5], size: [1, 0.8, 1] },
    { key: 'Hippocampus_L', position: [-1.5, -1, -0.5], size: [0.5, 0.5, 1] },
    { key: 'Hippocampus_R', position: [1.5, -1, -0.5], size: [0.5, 0.5, 1] },
    { key: 'Amygdala_L', position: [-1.8, -0.8, 0.5], size: [0.4, 0.4, 0.5] },
    { key: 'Amygdala_R', position: [1.8, -0.8, 0.5], size: [0.4, 0.4, 0.5] }
  ];

  const getRegionColor = (regionKey) => {
    const region = brainRegionsData[regionKey];
    if (!region) return '#808080';

    const baseColor = region.color;
    let color = new THREE.Color(baseColor);

    if (selectedRegion && selectedRegion.name === regionKey) {
      color.multiplyScalar(1.5);
    } else if (hoveredRegion && hoveredRegion.name === regionKey) {
      color.multiplyScalar(1.2);
    }

    return color;
  };

  return (
    <group>
      {regions.map((region, idx) => {
        const regionData = brainRegionsData[region.key];
        if (!regionData) return null;

        return (
          <mesh
            key={idx}
            position={region.position}
            onClick={(e) => {
              e.stopPropagation();
              onRegionClick({ name: region.key, id: regionData.id });
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredRegion({ name: region.key, id: regionData.id });
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredRegion(null);
              document.body.style.cursor = 'default';
            }}
          >
            <boxGeometry args={region.size} />
            <meshStandardMaterial
              color={getRegionColor(region.key)}
              metalness={0.3}
              roughness={0.6}
              emissive={hoveredRegion && hoveredRegion.name === region.key ? '#444444' : '#000000'}
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}

      {hoveredRegion && brainRegionsData[hoveredRegion.name] && (
        <Html
          position={[0, 3, 0]}
          center
          style={{
            pointerEvents: 'none',
            background: 'rgba(0,0,0,0.9)',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          {brainRegionsData[hoveredRegion.name].name}
        </Html>
      )}
    </group>
  );
}

/**
 * GLB/GLTF brain model component
 */
function GLBBrainModel({
  modelUrl,
  onRegionClick,
  selectedRegion,
  hoveredRegion,
  setHoveredRegion
}) {
  const gltf = useGLTF(modelUrl);
  const meshRef = useRef();

  useEffect(() => {
    if (gltf) {
      console.log('GLB Brain model loaded successfully');
      console.log('Model structure:', gltf.scene);
    }
  }, [gltf]);

  const handleClick = (event) => {
    event.stopPropagation();
    // For now, clicking anywhere shows a generic brain info
    // You can extend this to detect specific regions based on mesh names
    const meshName = event.object.name;
    console.log('Clicked mesh:', meshName);

    // Try to match mesh name to brain regions
    const matchedRegion = Object.keys(brainRegionsData).find(key =>
      meshName.toLowerCase().includes(key.toLowerCase().replace('_', ''))
    );

    if (matchedRegion) {
      onRegionClick({ name: matchedRegion, id: brainRegionsData[matchedRegion].id });
    } else {
      // Default to showing the first region as example
      onRegionClick({ name: 'Frontal_Sup_L', id: 1 });
    }
  };

  const handlePointerOver = (event) => {
    event.stopPropagation();
    document.body.style.cursor = 'pointer';
    const meshName = event.object.name;

    const matchedRegion = Object.keys(brainRegionsData).find(key =>
      meshName.toLowerCase().includes(key.toLowerCase().replace('_', ''))
    );

    if (matchedRegion) {
      setHoveredRegion({ name: matchedRegion, id: brainRegionsData[matchedRegion].id });
    }
  };

  const handlePointerOut = () => {
    setHoveredRegion(null);
    document.body.style.cursor = 'default';
  };

  return (
    <group>
      <primitive
        ref={meshRef}
        object={gltf.scene}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={0.01}
        rotation={[0, Math.PI, 0]}
        position={[0, 0, 0]}
      />

      {hoveredRegion && brainRegionsData[hoveredRegion.name] && (
        <Html
          position={[0, 2, 0]}
          center
          style={{
            pointerEvents: 'none',
            background: 'rgba(0,0,0,0.9)',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          {brainRegionsData[hoveredRegion.name].name}
        </Html>
      )}
    </group>
  );
}

/**
 * Advanced brain model with OBJ loader and atlas support
 */
function AdvancedBrainModel({
  modelUrl,
  atlasUrl,
  onRegionClick,
  selectedRegion,
  hoveredRegion,
  setHoveredRegion
}) {
  const [atlasData, setAtlasData] = useState(null);
  const [model, setModel] = useState(null);
  const meshRef = useRef();
  const colorMapRef = useRef(createColorMapFromRegions(brainRegionsData));

  // Load OBJ model
  useEffect(() => {
    const loader = new OBJLoader();
    loader.load(
      modelUrl,
      (obj) => {
        console.log('Brain model loaded successfully');
        setModel(obj);
      },
      (progress) => {
        console.log('Loading:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error loading brain model:', error);
      }
    );
  }, [modelUrl]);

  // Load atlas data
  useEffect(() => {
    if (!atlasUrl) return;

    fetch(atlasUrl)
      .then(res => res.text())
      .then(data => {
        const parsed = parseAALAtlas(data);
        setAtlasData(parsed);
        console.log(`Atlas loaded: ${parsed.totalRegions} regions, ${parsed.totalVertices} vertices`);
      })
      .catch(err => console.error('Failed to load atlas:', err));
  }, [atlasUrl]);

  // Apply colors to geometry
  useEffect(() => {
    if (!model || !meshRef.current || !atlasData) return;

    const geometry = meshRef.current.geometry;
    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);

    for (let i = 0; i < positions.count; i++) {
      const regionData = atlasData.vertexToRegion.get(i);

      let color = { r: 0.7, g: 0.7, b: 0.7 };
      let multiplier = 1.0;

      if (regionData) {
        const regionInfo = brainRegionsData[regionData.name];
        if (regionInfo) {
          color = hexToRGB(regionInfo.color);
        }

        if (selectedRegion && regionData.name === selectedRegion.name) {
          multiplier = 1.5;
        } else if (hoveredRegion && regionData.name === hoveredRegion.name) {
          multiplier = 1.2;
        }
      }

      colors[i * 3] = Math.min(color.r * multiplier, 1.0);
      colors[i * 3 + 1] = Math.min(color.g * multiplier, 1.0);
      colors[i * 3 + 2] = Math.min(color.b * multiplier, 1.0);
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.attributes.color.needsUpdate = true;
  }, [model, atlasData, selectedRegion, hoveredRegion]);

  const handleClick = (event) => {
    if (!atlasData) return;

    event.stopPropagation();
    const region = getRegionFromFace(event.faceIndex, event.object.geometry, atlasData);

    if (region && onRegionClick) {
      onRegionClick(region);
    }
  };

  const handlePointerMove = (event) => {
    if (!atlasData) return;

    const region = getRegionFromFace(event.faceIndex, event.object.geometry, atlasData);
    setHoveredRegion(region);
    document.body.style.cursor = region ? 'pointer' : 'default';
  };

  if (!model) {
    return null;
  }

  return (
    <group>
      <primitive
        ref={meshRef}
        object={model.children[0]}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onPointerOut={() => {
          setHoveredRegion(null);
          document.body.style.cursor = 'default';
        }}
      >
        <meshStandardMaterial
          vertexColors={atlasData ? true : false}
          metalness={0.2}
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </primitive>

      {hoveredRegion && brainRegionsData[hoveredRegion.name] && (
        <Html
          position={[0, 0, 0]}
          center
          style={{
            pointerEvents: 'none',
            background: 'rgba(0,0,0,0.9)',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          {brainRegionsData[hoveredRegion.name].name}
        </Html>
      )}
    </group>
  );
}

/**
 * Main BrainBrowser component
 */
const BrainBrowser = forwardRef(function BrainBrowser({
  onRegionClick,
  selectedRegion,
  autoRotate = false,
  modelUrl = null,
  atlasUrl = null,
  useSimpleModel = true,
  modelType = 'auto', // 'auto', 'simple', 'obj', 'glb'
  resetViewTrigger = 0,
  cameraTarget = null
}, ref) {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const controlsRef = useRef();

  // Expose controls ref to parent
  useImperativeHandle(ref, () => ({
    resetCamera: () => {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
    }
  }));

  // Cleanup cursor on unmount
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);

  // Reset camera view when trigger changes
  useEffect(() => {
    if (resetViewTrigger > 0 && controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [resetViewTrigger]);

  // Determine which model component to use
  const getModelComponent = () => {
    if (useSimpleModel || !modelUrl) {
      return SimpleBrainModel;
    }

    // Auto-detect model type from file extension
    if (modelType === 'auto' && modelUrl) {
      const extension = modelUrl.split('.').pop().toLowerCase();
      if (extension === 'glb' || extension === 'gltf') {
        return GLBBrainModel;
      }
      if (extension === 'obj') {
        return AdvancedBrainModel;
      }
    }

    // Use explicitly specified model type
    if (modelType === 'glb') {
      return GLBBrainModel;
    }
    if (modelType === 'obj') {
      return AdvancedBrainModel;
    }

    // Default fallback
    return SimpleBrainModel;
  };

  const BrainModelComponent = getModelComponent();

  return (
    <Canvas
      camera={{ position: [0, 1, 3], fov: 60 }}
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}
      shadows
    >
      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
      />
      <directionalLight
        position={[-5, -5, -5]}
        intensity={0.5}
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} />
      <pointLight position={[0, -5, 0]} intensity={0.3} />

      {/* Brain Model */}
      <Suspense fallback={<Loader />}>
        <BrainModelComponent
          modelUrl={modelUrl}
          atlasUrl={atlasUrl}
          onRegionClick={onRegionClick}
          selectedRegion={selectedRegion}
          hoveredRegion={hoveredRegion}
          setHoveredRegion={setHoveredRegion}
        />
      </Suspense>

      {/* Camera Controls */}
      <OrbitControls
        ref={controlsRef}
        autoRotate={autoRotate}
        autoRotateSpeed={1}
        enableDamping
        dampingFactor={0.08}
        minDistance={1}
        maxDistance={10}
        maxPolarAngle={Math.PI}
        enablePan={false}
        zoomSpeed={1.2}
        target={[0, 0, 0]}
        makeDefault
      />

      {/* Camera Animator - smoothly pans to selected region */}
      <CameraAnimator cameraTarget={cameraTarget} controlsRef={controlsRef} />

      {/* Grid helper (optional) */}
      {/* <gridHelper args={[20, 20, '#444444', '#222222']} position={[0, -3, 0]} /> */}
    </Canvas>
  );
});

export default BrainBrowser;
