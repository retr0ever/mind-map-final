import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Environment } from '@react-three/drei';
import './App.css';
import { brainStructure, getMainRegions, getParts } from './data/brainStructure';
import { createRealisticBrainGeometry, BrainMaterial } from './components/RealisticBrainGeometry';

// Wrapper component for realistic brain geometry
function RealisticBrainMesh({ region, isHovered, isSelected }) {
  const geometry = createRealisticBrainGeometry(region);

  return (
    <>
      <primitive object={geometry} attach="geometry" />
      <BrainMaterial region={region} isHovered={isHovered} isSelected={isSelected} />
    </>
  );
}

// Brain Model Component with hierarchical interaction and realistic shapes
function BrainModel({ onRegionClick, selectedRegion, selectedMainRegion, showSubparts }) {
  const [hovered, setHovered] = useState(null);

  // Get rotation for specific regions to orient them properly
  const getRotation = (id) => {
    switch(id) {
      case 'temporal_lobe':
        return [0, 0, Math.PI / 2];
      case 'corpus_callosum':
        return [0, 0, Math.PI / 2];
      case 'hippocampus':
        return [Math.PI / 2, 0, 0];
      case 'caudate_nucleus':
        return [0, 0, Math.PI / 6];
      case 'pons':
      case 'brainstem_pons':
      case 'medulla_oblongata':
      case 'brainstem_medulla':
        return [0, 0, 0];
      default:
        return [0, 0, 0];
    }
  };

  // Get regions to display
  const getRegionsToDisplay = () => {
    if (showSubparts && selectedMainRegion) {
      // Show only the PARTS of the selected main REGION
      return getParts(selectedMainRegion);
    } else {
      // Show only main REGIONS
      return getMainRegions();
    }
  };

  const regionsToDisplay = getRegionsToDisplay();

  return (
    <group>
      {regionsToDisplay.map((region) => (
        <mesh
          key={region.id}
          position={region.position}
          rotation={getRotation(region.id)}
          onClick={(e) => {
            e.stopPropagation();
            onRegionClick(region);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(region);
          }}
          onPointerOut={() => setHovered(null)}
          castShadow
          receiveShadow
        >
          <RealisticBrainMesh
            region={region}
            isHovered={hovered?.id === region.id}
            isSelected={selectedRegion?.id === region.id}
          />
          {hovered?.id === region.id && (
            <Html distanceFactor={10}>
              <div style={{
                background: 'rgba(0,0,0,0.9)',
                color: 'white',
                padding: '10px 16px',
                borderRadius: '8px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                border: region.type === 'REGION' ? '2px solid #FFD700' : '1px solid #888',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '11px', color: region.type === 'REGION' ? '#FFD700' : '#AAA', marginBottom: '4px' }}>
                  {region.type}
                </div>
                <div>{region.name}</div>
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
  const [selectedMainRegion, setSelectedMainRegion] = useState(null);
  const [showSubparts, setShowSubparts] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isInfoPanelMinimized, setIsInfoPanelMinimized] = useState(false);
  const [isControlsExpanded, setIsControlsExpanded] = useState(true);

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim().length === 0) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = [];

    // Search in main regions
    Object.values(brainStructure).forEach(region => {
      if (region.name.toLowerCase().includes(lowerQuery)) {
        results.push({ ...region, searchType: 'REGION' });
      }

      // Search in parts
      if (region.parts) {
        region.parts.forEach(part => {
          if (part.name.toLowerCase().includes(lowerQuery) ||
              part.description.toLowerCase().includes(lowerQuery)) {
            results.push({
              ...part,
              searchType: 'PART',
              parentRegion: region.id,
              parentName: region.name
            });
          }
        });
      }
    });

    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  // Navigate to search result
  const handleSearchResultClick = (result) => {
    if (result.searchType === 'REGION') {
      // Navigate to region
      setSelectedMainRegion(result.id);
      setSelectedRegion(result);
      setShowSubparts(true);
    } else {
      // Navigate to part
      setSelectedMainRegion(result.parentRegion);
      setShowSubparts(true);
      setTimeout(() => setSelectedRegion(result), 100);
    }
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleRegionClick = (region) => {
    if (region.isMainRegion) {
      // Clicked on a main region - show its subparts
      setSelectedMainRegion(region.id);
      setSelectedRegion(region);
      setShowSubparts(true);
    } else {
      // Clicked on a subpart - show its details
      setSelectedRegion(region);
    }
  };

  const handleBackToMainRegions = () => {
    setShowSubparts(false);
    setSelectedMainRegion(null);
    setSelectedRegion(null);
  };

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          shadows
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}
        >
          {/* Ambient light for base illumination */}
          <ambientLight intensity={0.4} />

          {/* Main directional light with shadows */}
          <directionalLight
            position={[10, 10, 10]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />

          {/* Fill lights for realistic brain illumination */}
          <directionalLight position={[-5, 5, -5]} intensity={0.6} color="#8080ff" />
          <directionalLight position={[5, -5, 5]} intensity={0.4} color="#ff8080" />

          {/* Hemisphere light for natural outdoor-like lighting */}
          <hemisphereLight
            skyColor="#ffffff"
            groundColor="#444444"
            intensity={0.5}
          />

          {/* Point lights for depth */}
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
          <pointLight position={[0, -10, 0]} intensity={0.3} color="#4444ff" />

          {/* Spot light for dramatic effect */}
          <spotLight
            position={[15, 15, 15]}
            angle={0.3}
            penumbra={1}
            intensity={0.8}
            castShadow
          />

          {/* Environment map for realistic reflections */}
          <Environment preset="studio" />

          {/* Fog for depth */}
          <fog attach="fog" args={['#1a1a2e', 15, 30]} />

          <Suspense fallback={null}>
            <BrainModel
              onRegionClick={handleRegionClick}
              selectedRegion={selectedRegion}
              selectedMainRegion={selectedMainRegion}
              showSubparts={showSubparts}
            />
          </Suspense>
          <OrbitControls
            autoRotate={autoRotate}
            autoRotateSpeed={1.5}
            enableDamping
            dampingFactor={0.08}
            minDistance={5}
            maxDistance={20}
            enablePan={true}
            maxPolarAngle={Math.PI}
          />
        </Canvas>

        <div className="controls">
          <div className="panel-header" style={{ marginBottom: '10px' }}>
            <h4 style={{ margin: 0 }}>Controls</h4>
            <button
              className="collapse-btn"
              onClick={() => setIsControlsExpanded(!isControlsExpanded)}
              style={{
                width: 'auto',
                minWidth: '40px',
                padding: '4px 12px',
                margin: 0
              }}
              title={isControlsExpanded ? 'Collapse' : 'Expand'}
            >
              {isControlsExpanded ? '−' : '+'}
            </button>
          </div>

          {isControlsExpanded && (
            <>
          {/* Search Box */}
          <div className="search-container" style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search regions or parts..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />

            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="search-results" style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '5px',
                zIndex: 1000,
                border: '2px solid #667eea'
              }}>
                {searchResults.map((result, idx) => (
                  <div
                    key={idx}
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(result)}
                  >
                    <div style={{
                      fontWeight: '600',
                      color: result.searchType === 'REGION' ? '#FFD700' : '#888',
                      fontSize: '11px',
                      marginBottom: '4px'
                    }}>
                      {result.searchType}
                      {result.searchType === 'PART' && ` of ${result.parentName}`}
                    </div>
                    <div style={{ color: '#333', fontSize: '14px' }}>
                      {result.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {showSubparts && (
            <button onClick={handleBackToMainRegions}>
              ← Back to Main Regions
            </button>
          )}
          <button onClick={() => {
            setSelectedRegion(null);
            setSelectedMainRegion(null);
            setShowSubparts(false);
          }}>
            Clear Selection
          </button>
          <button onClick={() => setAutoRotate(!autoRotate)}>
            {autoRotate ? 'Stop' : 'Start'} Rotation
          </button>

          {/* Clickable List of Current View */}
          <div style={{
            marginTop: '15px',
            padding: '12px',
            background: 'rgba(102, 126, 234, 0.05)',
            borderRadius: '8px'
          }}>
            <div style={{
              fontWeight: '600',
              color: '#667eea',
              fontSize: '13px',
              marginBottom: '10px'
            }}>
              {showSubparts ? `PARTS of ${brainStructure[selectedMainRegion]?.name}` : 'MAIN REGIONS'}
            </div>
            <div className="region-list">
              {(showSubparts ? getParts(selectedMainRegion) : getMainRegions()).map((item) => (
                <div
                  key={item.id}
                  className="region-list-item"
                  onClick={() => handleRegionClick(item)}
                  style={{
                    background: selectedRegion?.id === item.id ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                    color: selectedRegion?.id === item.id ? 'white' : '#333',
                    fontWeight: selectedRegion?.id === item.id ? '600' : '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px'
                  }}
                >
                  <span style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: item.color,
                    flexShrink: 0
                  }}></span>
                  <span style={{ flex: 1 }}>{item.name}</span>
                  {item.type === 'REGION' && !showSubparts && (
                    <span style={{
                      fontSize: '11px',
                      opacity: 0.8,
                      flexShrink: 0
                    }}>
                      ({getParts(item.id).length})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
            </>
          )}
        </div>
      </div>

      <div className={`info-panel ${isInfoPanelMinimized ? 'minimized' : ''}`}>
        <div className="panel-header">
          {!isInfoPanelMinimized && <h2>🧠 Interactive Brain Explorer</h2>}
          <button
            className="minimize-btn"
            onClick={() => setIsInfoPanelMinimized(!isInfoPanelMinimized)}
            title={isInfoPanelMinimized ? 'Maximize Info Panel' : 'Minimize Info Panel'}
          >
            {isInfoPanelMinimized ? '▶' : '◀'}
          </button>
        </div>

        {!isInfoPanelMinimized && (
          <>
        {selectedRegion ? (
          <div className="region-info">
            <h3>{selectedRegion.name}</h3>
            <p><strong>Description:</strong> {selectedRegion.description}</p>
            {selectedRegion.functions && selectedRegion.functions.length > 0 && (
              <div className="functions">
                <strong>Key Functions:</strong>
                <ul>
                  {selectedRegion.functions.map((func, idx) => (
                    <li key={idx}>{func}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedRegion.type === 'REGION' && (
              <div className="parts-info">
                <p style={{
                  marginTop: '15px',
                  padding: '12px',
                  background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,165,0,0.1))',
                  borderRadius: '8px',
                  borderLeft: '4px solid #FFD700',
                  fontStyle: 'italic'
                }}>
                  <strong style={{ color: '#FFD700' }}>REGION</strong> selected!<br/>
                  This region contains {getParts(selectedRegion.id).length} PARTS.
                  The view will now show these parts for detailed exploration.
                </p>
              </div>
            )}
            {selectedRegion.type === 'PART' && selectedRegion.partOf && (
              <div className="part-badge" style={{
                marginTop: '10px',
                padding: '8px 12px',
                background: 'rgba(150,150,150,0.1)',
                borderRadius: '6px',
                borderLeft: '3px solid #888',
                fontSize: '14px'
              }}>
                <strong style={{ color: '#888' }}>PART</strong> of: {selectedRegion.partOf}
              </div>
            )}
          </div>
        ) : (
          <div className="welcome">
            {showSubparts ? (
              <>
                <div style={{
                  padding: '12px',
                  background: 'rgba(255,165,0,0.1)',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  borderLeft: '4px solid #FFD700'
                }}>
                  <strong style={{ color: '#FFD700', fontSize: '16px' }}>
                    Exploring PARTS of: {brainStructure[selectedMainRegion]?.name}
                  </strong>
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>
                    Click on any PART to see its detailed information.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div style={{
                  padding: '12px',
                  background: 'rgba(100,150,255,0.1)',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  borderLeft: '4px solid #6495ED'
                }}>
                  <strong style={{ fontSize: '16px', color: '#6495ED' }}>
                    Select a REGION to explore
                  </strong>
                  <p style={{ marginTop: '8px', fontSize: '14px' }}>
                    Click on any of the 6 main REGIONS below to view its PARTS.
                  </p>
                </div>
              </>
            )}

            <p><strong>How to Navigate:</strong></p>
            <ul>
              <li>🖱️ Left-click and drag to rotate</li>
              <li>🔍 Scroll to zoom in/out</li>
              {!showSubparts && <li>🎯 Click a <strong style={{ color: '#FFD700' }}>REGION</strong> to view its PARTS</li>}
              {showSubparts && <li>📍 Click a <strong style={{ color: '#888' }}>PART</strong> to see details</li>}
              {showSubparts && <li>← Use "Back to Main Regions" button to return</li>}
            </ul>

            {!showSubparts && (
              <div style={{
                marginTop: '20px',
                padding: '15px',
                background: 'rgba(0,0,0,0.05)',
                borderRadius: '8px'
              }}>
                <strong style={{ fontSize: '15px', display: 'block', marginBottom: '10px' }}>
                  6 Main REGIONS:
                </strong>
                <ul style={{ margin: 0 }}>
                  {getMainRegions().map(region => (
                    <li key={region.id} style={{
                      color: region.color,
                      fontWeight: '500',
                      marginBottom: '8px',
                      fontSize: '14px'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        backgroundColor: region.color,
                        borderRadius: '50%',
                        marginRight: '8px',
                        verticalAlign: 'middle'
                      }}></span>
                      {region.name} ({getParts(region.id).length} parts)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
