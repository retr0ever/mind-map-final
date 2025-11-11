import React, { useState, useMemo, useRef } from 'react';
import BrainBrowser from './components/BrainBrowser';
import {
  brainRegionsData,
  searchRegions,
  getRegionsByLobe,
  getRegionsByHemisphere,
  getAllLobes,
  getAllHemispheres
} from './data/brainRegions';
import {
  DESIKAN_KILLIANY_REGIONS,
  getRegionsByLobe as getDKRegionsByLobe,
  getRegionsByHemisphere as getDKRegionsByHemisphere,
  searchRegions as searchDKRegions
} from './data/desikanKillianyRegions';
import './App.css';

/**
 * Region Information Panel
 */
function RegionInfoPanel({ region, onClose }) {
  if (!region) return null;

  const regionData = brainRegionsData[region.name];

  if (!regionData) {
    return (
      <div className="region-info-panel">
        <div className="panel-header">
          <h3>Region Not Found</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <p>No detailed information available for this region.</p>
      </div>
    );
  }

  return (
    <div className="region-info-panel">
      <div className="panel-header" style={{ borderLeftColor: regionData.color }}>
        <div>
          <h3>{regionData.name}</h3>
          <div className="region-badges">
            <span className="badge badge-lobe">{regionData.lobe}</span>
            <span className="badge badge-hemisphere">{regionData.hemisphere}</span>
            {regionData.brodmannAreas && (
              <span className="badge badge-ba">
                BA: {regionData.brodmannAreas.join(', ')}
              </span>
            )}
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="panel-content">
        <section>
          <h4>Description</h4>
          <p>{regionData.description}</p>
        </section>

        {regionData.functions && regionData.functions.length > 0 && (
          <section>
            <h4>Key Functions</h4>
            <ul className="function-list">
              {regionData.functions.map((func, idx) => (
                <li key={idx}>{func}</li>
              ))}
            </ul>
          </section>
        )}

        {regionData.clinicalSignificance && regionData.clinicalSignificance.length > 0 && (
          <section>
            <h4>Clinical Significance</h4>
            <ul className="clinical-list">
              {regionData.clinicalSignificance.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {regionData.connections && regionData.connections.length > 0 && (
          <section>
            <h4>Major Connections</h4>
            <div className="connections">
              {regionData.connections.map((conn, idx) => (
                <span key={idx} className="connection-tag">
                  {conn}
                </span>
              ))}
            </div>
          </section>
        )}

        {regionData.brodmannAreas && (
          <section className="metadata">
            <p>
              <strong>Brodmann Areas:</strong>{' '}
              {regionData.brodmannAreas.join(', ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

/**
 * Search and Filter Panel
 */
function SearchPanel({ onRegionSelect, selectedRegion, selectedAtlas, onAtlasChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLobe, setFilterLobe] = useState('all');
  const [filterHemisphere, setFilterHemisphere] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get data based on selected atlas
  const currentRegionsData = selectedAtlas === 'desikan-killiany'
    ? DESIKAN_KILLIANY_REGIONS
    : Object.values(brainRegionsData);

  const lobes = useMemo(() => {
    if (selectedAtlas === 'desikan-killiany') {
      return [...new Set(DESIKAN_KILLIANY_REGIONS.map(r => r.lobe))].sort();
    }
    return getAllLobes();
  }, [selectedAtlas]);

  const hemispheres = useMemo(() => {
    if (selectedAtlas === 'desikan-killiany') {
      return ['left', 'right'];
    }
    return getAllHemispheres();
  }, [selectedAtlas]);

  const filteredRegions = useMemo(() => {
    let regions = selectedAtlas === 'desikan-killiany'
      ? [...DESIKAN_KILLIANY_REGIONS]
      : Object.values(brainRegionsData);

    // Apply search
    if (searchQuery.trim()) {
      if (selectedAtlas === 'desikan-killiany') {
        regions = searchDKRegions(searchQuery);
      } else {
        regions = searchRegions(searchQuery);
      }
    }

    // Apply lobe filter
    if (filterLobe !== 'all') {
      regions = regions.filter(r => r.lobe === filterLobe);
    }

    // Apply hemisphere filter
    if (filterHemisphere !== 'all') {
      const filterHemi = filterHemisphere.toLowerCase();
      regions = regions.filter(r => r.hemisphere?.toLowerCase() === filterHemi);
    }

    return regions.sort((a, b) => {
      const nameA = a.fullName || a.name || '';
      const nameB = b.fullName || b.name || '';
      return nameA.localeCompare(nameB);
    });
  }, [searchQuery, filterLobe, filterHemisphere, selectedAtlas]);

  const handleRegionClick = (region) => {
    // Pass the full region data with position info for camera targeting
    onRegionSelect({
      name: region.name || region.fullName,
      id: region.id,
      fullData: region,
      atlas: selectedAtlas
    });
  };

  return (
    <div className="search-panel">
      <div className="search-header">
        <h3>🔍 Explore Regions</h3>
        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Atlas Selector */}
      <div className="atlas-selector">
        <label>Brain Atlas:</label>
        <select
          value={selectedAtlas}
          onChange={(e) => onAtlasChange(e.target.value)}
          className="atlas-select"
        >
          <option value="aal">AAL Atlas (24 regions)</option>
          <option value="desikan-killiany">Desikan-Killiany Atlas (68 regions)</option>
        </select>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search regions, functions, or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            className="clear-search"
            onClick={() => setSearchQuery('')}
          >
            ×
          </button>
        )}
      </div>

      {showFilters && (
        <div className="filters">
          <div className="filter-group">
            <label>Lobe:</label>
            <select
              value={filterLobe}
              onChange={(e) => setFilterLobe(e.target.value)}
            >
              <option value="all">All Lobes</option>
              {lobes.map(lobe => (
                <option key={lobe} value={lobe}>{lobe}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Hemisphere:</label>
            <select
              value={filterHemisphere}
              onChange={(e) => setFilterHemisphere(e.target.value)}
            >
              <option value="all">Both</option>
              {hemispheres.map(hemisphere => (
                <option key={hemisphere} value={hemisphere}>
                  {hemisphere.charAt(0).toUpperCase() + hemisphere.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="region-list">
        <div className="list-header">
          <span>Found {filteredRegions.length} regions</span>
        </div>
        {filteredRegions.map(region => {
          const displayName = region.fullName || region.name;
          const shortName = region.shortName || region.name;
          const regionKey = region.name || `region_${region.id}`;
          const isSelected = selectedRegion &&
            (selectedRegion.name === regionKey || selectedRegion.name === region.fullName);

          return (
            <div
              key={regionKey}
              className={`region-item ${isSelected ? 'selected' : ''}`}
              onClick={() => handleRegionClick(region)}
              style={{ borderLeftColor: region.color }}
            >
              <div className="region-item-header">
                <span className="region-name">{displayName}</span>
                {shortName !== displayName && (
                  <span className="region-short">{shortName}</span>
                )}
              </div>
              <div className="region-item-meta">
                <span className="meta-tag">{region.lobe}</span>
                <span className="meta-tag">
                  {region.hemisphere?.charAt(0).toUpperCase() + region.hemisphere?.slice(1)}
                </span>
              </div>
            </div>
          );
        })}

        {filteredRegions.length === 0 && (
          <div className="no-results">
            <p>No regions found matching your criteria.</p>
            <button onClick={() => {
              setSearchQuery('');
              setFilterLobe('all');
              setFilterHemisphere('all');
            }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Controls Panel
 */
function ControlsPanel({ autoRotate, onAutoRotateChange, onClearSelection, selectedRegion, onResetView }) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="controls-panel">
      <div className="control-group">
        <button
          className={`control-btn ${autoRotate ? 'active' : ''}`}
          onClick={onAutoRotateChange}
          title="Toggle auto-rotation"
        >
          {autoRotate ? '⏸ Stop' : '▶ Rotate'}
        </button>

        <button
          className="control-btn"
          onClick={onResetView}
          title="Reset camera view"
        >
          🎯 Reset View
        </button>

        {selectedRegion && (
          <button
            className="control-btn clear-btn"
            onClick={onClearSelection}
            title="Clear selection"
          >
            ✕ Clear
          </button>
        )}

        <button
          className="control-btn help-btn"
          onClick={() => setShowHelp(!showHelp)}
          title="Show help"
        >
          ? Help
        </button>
      </div>

      {showHelp && (
        <div className="help-popup">
          <h4>How to Use</h4>
          <ul>
            <li><strong>Rotate:</strong> Left-click and drag</li>
            <li><strong>Zoom:</strong> Scroll wheel or pinch</li>
            <li><strong>Pan:</strong> Right-click and drag</li>
            <li><strong>Select:</strong> Click on any brain region</li>
            <li><strong>Search:</strong> Use the search panel on the left</li>
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * Stats Panel
 */
function StatsPanel() {
  const stats = useMemo(() => {
    const allRegions = Object.values(brainRegionsData);
    const lobes = {};
    const hemispheres = {};

    allRegions.forEach(region => {
      lobes[region.lobe] = (lobes[region.lobe] || 0) + 1;
      hemispheres[region.hemisphere] = (hemispheres[region.hemisphere] || 0) + 1;
    });

    return {
      totalRegions: allRegions.length,
      lobes,
      hemispheres
    };
  }, []);

  return (
    <div className="stats-panel">
      <h4>Database Statistics</h4>
      <div className="stat-item">
        <span className="stat-label">Total Regions:</span>
        <span className="stat-value">{stats.totalRegions}</span>
      </div>
      <div className="stat-group">
        <strong>By Lobe:</strong>
        {Object.entries(stats.lobes).map(([lobe, count]) => (
          <div key={lobe} className="stat-item-small">
            <span>{lobe}:</span>
            <span>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Main Enhanced Application
 */
function EnhancedApp() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [resetViewTrigger, setResetViewTrigger] = useState(0);
  const [selectedAtlas, setSelectedAtlas] = useState('desikan-killiany');
  const [cameraTarget, setCameraTarget] = useState(null);

  const brainBrowserRef = useRef(null);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);

    // Calculate camera target position based on region
    if (region && region.fullData) {
      const targetPosition = getRegionPosition(region.fullData);
      setCameraTarget(targetPosition);
    }
  };

  const handleClearSelection = () => {
    setSelectedRegion(null);
    setCameraTarget(null);
  };

  const handleResetView = () => {
    setResetViewTrigger(prev => prev + 1);
    setCameraTarget(null);
  };

  const handleAtlasChange = (atlas) => {
    setSelectedAtlas(atlas);
    setSelectedRegion(null);
    setCameraTarget(null);
  };

  // Helper function to determine camera target position based on region lobe and hemisphere
  const getRegionPosition = (region) => {
    const lobe = region.lobe?.toLowerCase();
    const hemisphere = region.hemisphere?.toLowerCase();

    // X-axis: negative for left, positive for right
    const xOffset = hemisphere === 'left' ? -1.5 : hemisphere === 'right' ? 1.5 : 0;

    // Determine Y and Z based on lobe
    let yOffset = 0;
    let zOffset = 0;
    let distance = 5;

    switch(lobe) {
      case 'frontal':
        zOffset = 2;
        yOffset = 0.5;
        break;
      case 'parietal':
        zOffset = 0;
        yOffset = 1;
        break;
      case 'temporal':
        yOffset = -0.5;
        zOffset = 0.5;
        distance = 6;
        break;
      case 'occipital':
        zOffset = -2.5;
        yOffset = 0.5;
        break;
      case 'limbic':
        zOffset = 0;
        yOffset = 0;
        distance = 4;
        break;
      case 'insular':
        distance = 4.5;
        yOffset = 0;
        break;
      default:
        zOffset = 0;
        yOffset = 0;
    }

    return {
      position: [xOffset, yOffset, zOffset],
      distance: distance,
      targetPoint: [xOffset * 0.3, yOffset * 0.5, zOffset * 0.3]
    };
  };

  return (
    <div className="enhanced-app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>🧠 Interactive Brain Browser</h1>
          <p className="subtitle">Explore the human brain in 3D</p>
        </div>
        <div className="header-actions">
          <button
            className="mode-toggle"
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            title="Toggle search panel"
          >
            {leftPanelOpen ? '« Hide Search' : 'Show Search »'}
          </button>
          <button
            className="stats-toggle"
            onClick={() => setShowStats(!showStats)}
          >
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
          <button
            className="mode-toggle"
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
            title="Toggle info panel"
          >
            {rightPanelOpen ? 'Hide Info »' : '« Show Info'}
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Left Sidebar - Search Panel */}
        <aside className={`left-sidebar ${!leftPanelOpen ? 'panel-collapsed' : ''}`}>
          <button
            className="panel-toggle-btn left"
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            title={leftPanelOpen ? 'Hide search panel' : 'Show search panel'}
          >
            {leftPanelOpen ? '«' : '»'}
          </button>
          <SearchPanel
            onRegionSelect={handleRegionClick}
            selectedRegion={selectedRegion}
            selectedAtlas={selectedAtlas}
            onAtlasChange={handleAtlasChange}
          />
          {showStats && <StatsPanel />}
        </aside>

        {/* Center - 3D Viewer */}
        <main className="viewer-container">
          <BrainBrowser
            ref={brainBrowserRef}
            onRegionClick={handleRegionClick}
            selectedRegion={selectedRegion}
            autoRotate={autoRotate}
            useSimpleModel={false}
            modelUrl="/models/brainmodel.glb"
            modelType="auto"
            resetViewTrigger={resetViewTrigger}
            cameraTarget={cameraTarget}
          />

          {/* Controls Overlay */}
          <ControlsPanel
            autoRotate={autoRotate}
            onAutoRotateChange={() => setAutoRotate(!autoRotate)}
            onClearSelection={handleClearSelection}
            onResetView={handleResetView}
            selectedRegion={selectedRegion}
          />

          {/* Welcome Message */}
          {!selectedRegion && (
            <div className="welcome-overlay">
              <div className="welcome-content">
                <h2>Welcome to Brain Browser</h2>
                <p>Click on any brain region or search to explore</p>
                <div className="quick-tips">
                  <span>💡 Try searching for "motor", "memory", or "visual"</span>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Right Sidebar - Region Info */}
        <aside className={`right-sidebar ${!rightPanelOpen ? 'panel-collapsed' : ''}`}>
          <button
            className="panel-toggle-btn right"
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
            title={rightPanelOpen ? 'Hide info panel' : 'Show info panel'}
          >
            {rightPanelOpen ? '»' : '«'}
          </button>
          {selectedRegion ? (
            <RegionInfoPanel
              region={selectedRegion}
              onClose={handleClearSelection}
            />
          ) : (
            <div className="info-placeholder">
              <div className="placeholder-content">
                <span className="placeholder-icon">🎯</span>
                <h3>No Region Selected</h3>
                <p>Click on a brain region to see detailed information about its functions, connections, and clinical significance.</p>
                <div className="placeholder-features">
                  <div className="feature-item">
                    <strong>🔍 Search</strong>
                    <span>Find regions by name or function</span>
                  </div>
                  <div className="feature-item">
                    <strong>🏷️ Filter</strong>
                    <span>Browse by lobe or hemisphere</span>
                  </div>
                  <div className="feature-item">
                    <strong>📚 Learn</strong>
                    <span>Explore detailed neuroanatomy</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Interactive Brain Browser | Built with React + Three.js |{' '}
          <a href="#" onClick={(e) => {
            e.preventDefault();
            alert('See README.md for instructions on integrating real brain models');
          }}>
            Add Real Brain Models
          </a>
        </p>
      </footer>
    </div>
  );
}

export default EnhancedApp;
