import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import './App.css';

// Brain region data
const brainRegions = {
  frontal: {
    name: 'Frontal Lobe',
    description: 'The frontal lobe is responsible for executive functions, decision-making, planning, and voluntary movement.',
    functions: ['Problem solving', 'Planning', 'Personality', 'Motor control', 'Speech production'],
    color: '#FF6B6B'
  },
  parietal: {
    name: 'Parietal Lobe',
    description: 'The parietal lobe processes sensory information and is crucial for spatial awareness.',
    functions: ['Touch perception', 'Spatial reasoning', 'Body awareness'],
    color: '#4ECDC4'
  },
  temporal: {
    name: 'Temporal Lobe',
    description: 'The temporal lobe is essential for processing auditory information and memory.',
    functions: ['Hearing', 'Memory formation', 'Language comprehension'],
    color: '#95E1D3'
  },
  occipital: {
    name: 'Occipital Lobe',
    description: 'The occipital lobe is primarily responsible for processing visual information.',
    functions: ['Visual processing', 'Color recognition', 'Motion detection'],
    color: '#F38181'
  },
  cerebellum: {
    name: 'Cerebellum',
    description: 'The cerebellum coordinates voluntary movements and maintains balance.',
    functions: ['Motor control', 'Balance', 'Coordination', 'Motor learning'],
    color: '#FCE38A'
  },
  brainstem: {
    name: 'Brainstem',
    description: 'The brainstem controls vital functions necessary for survival.',
    functions: ['Heart rate', 'Breathing', 'Sleep-wake cycles', 'Reflexes'],
    color: '#AA96DA'
  }
};

// Brain Model Component
function BrainModel({ onRegionClick, selectedRegion }) {
  const [hovered, setHovered] = useState(null);
  
  // For a real implementation, load actual brain model
  // const brain = useLoader(OBJLoader, '/models/brain.obj');
  
  // Create simple brain representation for demo
  const getRegionColor = (regionKey) => {
    const baseColor = brainRegions[regionKey].color;
    if (selectedRegion === regionKey) {
      return new THREE.Color(baseColor).multiplyScalar(1.5);
    }
    if (hovered === regionKey) {
      return new THREE.Color(baseColor).multiplyScalar(1.2);
    }
    return new THREE.Color(baseColor);
  };

  const regions = [
    { key: 'frontal', position: [0, 1.5, 2], size: [2, 1.5, 1.5] },
    { key: 'parietal', position: [0, 2, 0], size: [2, 1, 1.5] },
    { key: 'temporal', position: [1.5, 0, 0], size: [1, 1.5, 1.5] },
    { key: 'temporal', position: [-1.5, 0, 0], size: [1, 1.5, 1.5] },
    { key: 'occipital', position: [0, 1, -2], size: [2, 1.5, 1] },
    { key: 'cerebellum', position: [0, -1, -1], size: [1.5, 1, 1.5] },
    { key: 'brainstem', position: [0, -1.5, 0], size: [0.5, 1, 0.5] }
  ];

  return (
    <group>
      {regions.map((region, idx) => (
        <mesh
          key={idx}
          position={region.position}
          onClick={() => onRegionClick(region.key)}
          onPointerOver={() => setHovered(region.key)}
          onPointerOut={() => setHovered(null)}
        >
          <boxGeometry args={region.size} />
          <meshStandardMaterial
            color={getRegionColor(region.key)}
            metalness={0.3}
            roughness={0.4}
          />
          {hovered === region.key && (
            <Html distanceFactor={10}>
              <div style={{
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '5px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none'
              }}>
                {brainRegions[region.key].name}
              </div>
            </Html>
          )}
        </mesh>
      ))}
    </group>
  );
}

// Main App Component
function App() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [autoRotate, setAutoRotate] = useState(false);

  const handleRegionClick = (regionKey) => {
    setSelectedRegion(regionKey);
  };

  const regionData = selectedRegion ? brainRegions[selectedRegion] : null;

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Suspense fallback={null}>
            <BrainModel
              onRegionClick={handleRegionClick}
              selectedRegion={selectedRegion}
            />
          </Suspense>
          <OrbitControls
            autoRotate={autoRotate}
            autoRotateSpeed={2}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
        
        <div className="controls">
          <h4>Controls</h4>
          <button onClick={() => setSelectedRegion(null)}>Clear Selection</button>
          <button onClick={() => setAutoRotate(!autoRotate)}>
            {autoRotate ? 'Stop' : 'Start'} Rotation
          </button>
        </div>
      </div>

      <div className="info-panel">
        <h2>🧠 Interactive Brain Explorer</h2>
        {regionData ? (
          <div className="region-info">
            <h3>{regionData.name}</h3>
            <p><strong>Description:</strong> {regionData.description}</p>
            <div className="functions">
              <strong>Key Functions:</strong>
              <ul>
                {regionData.functions.map((func, idx) => (
                  <li key={idx}>{func}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="welcome">
            <p>Click on any region of the brain to learn more about it.</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              <li>Left-click and drag to rotate</li>
              <li>Scroll to zoom in/out</li>
              <li>Click on a region to see details</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
