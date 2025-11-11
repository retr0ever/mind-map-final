/**
 * Atlas Parser Utilities
 * Handles parsing of various brain atlas formats (AAL, Desikan-Killiany, etc.)
 */

/**
 * Parse AAL (Automated Anatomical Labeling) atlas format
 * Format: vertex_index region_id region_name
 * Example: 0 2001 Precentral_L
 */
export function parseAALAtlas(atlasText) {
  const lines = atlasText.trim().split('\n');
  const vertexToRegion = new Map();
  const regionStats = {};

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Skip empty lines and comments
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      return;
    }

    const parts = trimmedLine.split(/\s+/);

    if (parts.length >= 2) {
      const vertexIndex = parseInt(parts[0]);
      const regionId = parseInt(parts[1]);
      const regionName = parts.slice(2).join(' ') || `Region_${regionId}`;

      if (!isNaN(vertexIndex) && !isNaN(regionId)) {
        const regionData = {
          id: regionId,
          name: regionName,
          vertexIndex: vertexIndex
        };

        vertexToRegion.set(vertexIndex, regionData);

        // Track region statistics
        if (!regionStats[regionName]) {
          regionStats[regionName] = {
            id: regionId,
            vertexCount: 0,
            minVertex: vertexIndex,
            maxVertex: vertexIndex
          };
        }
        regionStats[regionName].vertexCount++;
        regionStats[regionName].minVertex = Math.min(regionStats[regionName].minVertex, vertexIndex);
        regionStats[regionName].maxVertex = Math.max(regionStats[regionName].maxVertex, vertexIndex);
      }
    }
  });

  console.log(`Parsed AAL atlas: ${vertexToRegion.size} vertices, ${Object.keys(regionStats).length} regions`);

  return {
    vertexToRegion,
    regionStats,
    totalVertices: vertexToRegion.size,
    totalRegions: Object.keys(regionStats).length
  };
}

/**
 * Parse FreeSurfer annotation format (.annot files)
 * This is a binary format, so this is a placeholder for when you implement binary parsing
 */
export function parseFreeSurferAnnotation(buffer) {
  // TODO: Implement binary parsing for FreeSurfer .annot files
  // Structure: vertices (int32), labels (int32[]), color table
  console.warn('FreeSurfer annotation parsing not yet implemented');
  return {
    vertexToRegion: new Map(),
    regionStats: {},
    totalVertices: 0,
    totalRegions: 0
  };
}

/**
 * Parse simple label file format
 * Format: region_name region_id color_hex
 * Example: Frontal_Sup_L 1 #FF6B6B
 */
export function parseLabelFile(labelText) {
  const lines = labelText.trim().split('\n');
  const labels = {};

  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      return;
    }

    const parts = trimmedLine.split(/\s+/);
    if (parts.length >= 2) {
      const regionName = parts[0];
      const regionId = parseInt(parts[1]);
      const color = parts[2] || '#808080';

      labels[regionId] = {
        name: regionName,
        id: regionId,
        color: color
      };
    }
  });

  return labels;
}

/**
 * Get region from face indices
 * Takes a face index and geometry to determine which region was clicked
 */
export function getRegionFromFace(faceIndex, geometry, atlasData) {
  if (!geometry || !atlasData || !atlasData.vertexToRegion) {
    return null;
  }

  const { vertexToRegion } = atlasData;
  const index = geometry.index;

  if (!index) {
    return null;
  }

  // Get the three vertices of the face
  const v1Index = index.getX(faceIndex * 3);
  const v2Index = index.getX(faceIndex * 3 + 1);
  const v3Index = index.getX(faceIndex * 3 + 2);

  // Try to get region data for each vertex
  const region1 = vertexToRegion.get(v1Index);
  const region2 = vertexToRegion.get(v2Index);
  const region3 = vertexToRegion.get(v3Index);

  // Return the most common region (majority vote)
  const regions = [region1, region2, region3].filter(r => r);

  if (regions.length === 0) {
    return null;
  }

  // Count occurrences of each region
  const regionCounts = {};
  regions.forEach(region => {
    const key = region.name;
    regionCounts[key] = (regionCounts[key] || 0) + 1;
  });

  // Find region with highest count
  let maxCount = 0;
  let selectedRegion = regions[0];

  for (const [name, count] of Object.entries(regionCounts)) {
    if (count > maxCount) {
      maxCount = count;
      selectedRegion = regions.find(r => r.name === name);
    }
  }

  return selectedRegion;
}

/**
 * Apply colors to geometry based on atlas data
 */
export function applyAtlasColors(geometry, atlasData, colorMap, selectedRegion = null, hoveredRegion = null) {
  if (!geometry || !atlasData || !atlasData.vertexToRegion) {
    return;
  }

  const { vertexToRegion } = atlasData;
  const positions = geometry.attributes.position;

  if (!positions) {
    return;
  }

  const colors = new Float32Array(positions.count * 3);

  // Default color (gray)
  const defaultColor = { r: 0.7, g: 0.7, b: 0.7 };

  for (let i = 0; i < positions.count; i++) {
    const regionData = vertexToRegion.get(i);

    let color = defaultColor;
    let multiplier = 1.0;

    if (regionData) {
      // Get color from color map or use default
      if (colorMap && colorMap[regionData.name]) {
        color = colorMap[regionData.name];
      } else if (colorMap && colorMap[regionData.id]) {
        color = colorMap[regionData.id];
      }

      // Highlight selected region
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

  if (!geometry.attributes.color) {
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  } else {
    geometry.attributes.color.array = colors;
    geometry.attributes.color.needsUpdate = true;
  }
}

/**
 * Create color map from brain regions data
 */
export function createColorMapFromRegions(regionsData) {
  const colorMap = {};

  Object.values(regionsData).forEach(region => {
    colorMap[region.name] = hexToRGB(region.color);
    if (region.id) {
      colorMap[region.id] = hexToRGB(region.color);
    }
  });

  return colorMap;
}

/**
 * Convert hex color to RGB object
 */
export function hexToRGB(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0.5, g: 0.5, b: 0.5 };
}

/**
 * Generate color scheme based on type
 */
export function generateColorScheme(type = 'anatomical') {
  const schemes = {
    anatomical: {
      'Frontal': '#FF6B6B',
      'Parietal': '#4ECDC4',
      'Temporal': '#95E1D3',
      'Occipital': '#9B59B6',
      'Limbic': '#F39C12',
      'Subcortical': '#D68910',
      'Cerebellum': '#FCE38A'
    },
    functional: {
      'motor': '#E74C3C',
      'sensory': '#3498DB',
      'visual': '#9B59B6',
      'auditory': '#F39C12',
      'association': '#95A5A6',
      'limbic': '#E67E22'
    },
    hemisphere: {
      'Left': '#FF6B6B',
      'Right': '#4ECDC4'
    }
  };

  return schemes[type] || schemes.anatomical;
}

export default {
  parseAALAtlas,
  parseFreeSurferAnnotation,
  parseLabelFile,
  getRegionFromFace,
  applyAtlasColors,
  createColorMapFromRegions,
  hexToRGB,
  generateColorScheme
};
