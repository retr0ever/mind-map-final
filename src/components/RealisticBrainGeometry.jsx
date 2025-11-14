import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * Creates a wrinkled brain surface using noise and displacement
 * This generates gyri (ridges) and sulci (grooves) for realism
 */
function createBrainNoise(geometry, intensity = 0.15, scale = 2) {
  const positions = geometry.attributes.position;
  const vertex = new THREE.Vector3();

  for (let i = 0; i < positions.count; i++) {
    vertex.fromBufferAttribute(positions, i);

    // Multiple octaves of noise for natural wrinkles
    const noise =
      simplex3D(vertex.x * scale, vertex.y * scale, vertex.z * scale) * 0.5 +
      simplex3D(vertex.x * scale * 2, vertex.y * scale * 2, vertex.z * scale * 2) * 0.25 +
      simplex3D(vertex.x * scale * 4, vertex.y * scale * 4, vertex.z * scale * 4) * 0.125;

    // Displace vertices along their normal
    vertex.normalize();
    const displacement = noise * intensity;

    positions.setXYZ(
      i,
      vertex.x * (1 + displacement),
      vertex.y * (1 + displacement),
      vertex.z * (1 + displacement)
    );
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
}

/**
 * Simple 3D Simplex Noise implementation
 */
function simplex3D(x, y, z) {
  // Simplified simplex noise - in production, use a library like 'simplex-noise'
  const n = Math.sin(x * 12.9898 + y * 78.233 + z * 45.164) * 43758.5453;
  return (n - Math.floor(n)) * 2 - 1;
}

/**
 * Creates realistic brain geometry for each region type
 */
export function createRealisticBrainGeometry(region) {
  const { size, id } = region;
  const baseGeometry = createBaseGeometry(region);

  // Add wrinkles to cortical regions
  const corticalRegions = [
    'cerebrum', 'frontal_lobe', 'parietal_lobe', 'occipital_lobe',
    'temporal_lobe', 'cerebral_cortex', 'cerebellum'
  ];

  if (corticalRegions.includes(id)) {
    createBrainNoise(baseGeometry, 0.2, 3);
  } else if (id.includes('hippocampus')) {
    // Hippocampus has subtle curves
    createBrainNoise(baseGeometry, 0.1, 2);
  }

  return baseGeometry;
}

/**
 * Create base geometry before adding wrinkles
 */
function createBaseGeometry(region) {
  const { size, id } = region;

  switch(id) {
    // Cerebrum - realistic hemisphere with higher detail
    case 'cerebrum':
      return new THREE.SphereGeometry(
        size[0] * 0.6,
        64, // High detail for wrinkles
        64,
        0,
        Math.PI * 2,
        0,
        Math.PI * 0.6
      );

    // Frontal lobe - elongated rounded shape
    case 'frontal_lobe':
      return createElongatedSphere(size[0] * 0.4, size[1] * 0.5, size[2] * 0.4, 48);

    case 'parietal_lobe':
      return new THREE.SphereGeometry(size[0] * 0.45, 48, 48);

    case 'occipital_lobe':
      return new THREE.SphereGeometry(size[0] * 0.4, 40, 40, 0, Math.PI * 2, 0, Math.PI * 0.7);

    case 'temporal_lobe':
      return createElongatedSphere(size[0] * 0.3, size[1] * 0.4, size[2] * 0.6, 40);

    case 'cerebral_cortex':
      return new THREE.TorusGeometry(size[0] * 0.5, size[0] * 0.15, 32, 64);

    // Limbic structures - smooth organic shapes
    case 'limbic_system':
      return new THREE.SphereGeometry(size[0] * 0.45, 40, 40);

    case 'hippocampus':
      return new THREE.TorusGeometry(size[2] * 0.3, size[0] * 0.2, 24, 48, Math.PI);

    case 'amygdala':
      return createAlmondShape(size[0] * 0.25, 32);

    case 'thalamus':
      return createEggShape(size[0] * 0.4, size[1] * 0.5, 32);

    case 'hypothalamus':
      return new THREE.SphereGeometry(size[0] * 0.2, 28, 28);

    // Basal ganglia
    case 'basal_ganglia':
      return new THREE.DodecahedronGeometry(size[0] * 0.4, 2);

    case 'caudate_nucleus':
      return createElongatedSphere(size[0] * 0.2, size[1] * 0.4, size[2] * 0.2, 32);

    case 'putamen':
      return new THREE.SphereGeometry(size[0] * 0.35, 32, 32);

    case 'globus_pallidus':
      return new THREE.SphereGeometry(size[0] * 0.25, 28, 28);

    case 'substantia_nigra':
      return new THREE.SphereGeometry(size[0] * 0.15, 24, 24);

    case 'subthalamic_nucleus':
      return new THREE.SphereGeometry(size[0] * 0.15, 24, 24);

    // Midbrain structures
    case 'midbrain':
      return createElongatedSphere(size[0] * 0.3, size[1] * 0.6, size[2] * 0.4, 32);

    case 'colliculi':
      return new THREE.SphereGeometry(size[0] * 0.25, 28, 28);

    case 'reward_neurons':
      return new THREE.OctahedronGeometry(size[0] * 0.2, 2);

    // Hindbrain
    case 'hindbrain':
      return new THREE.SphereGeometry(size[0] * 0.4, 40, 40);

    case 'cerebellum':
      return new THREE.SphereGeometry(size[0] * 0.45, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.5);

    case 'pons':
    case 'brainstem_pons':
      return new THREE.CylinderGeometry(size[0] * 0.35, size[0] * 0.4, size[1] * 0.5, 32);

    case 'medulla_oblongata':
    case 'brainstem_medulla':
      return new THREE.CylinderGeometry(size[0] * 0.25, size[0] * 0.35, size[1] * 0.6, 28);

    case 'brainstem':
      return createElongatedSphere(size[0] * 0.3, size[1] * 0.6, size[0] * 0.3, 32);

    case 'brainstem_midbrain':
      return createElongatedSphere(size[0] * 0.3, size[1] * 0.3, size[0] * 0.3, 28);

    case 'corpus_callosum':
      return createElongatedSphere(size[0] * 0.15, size[1] * 0.8, size[0] * 0.15, 24);

    default:
      return new THREE.SphereGeometry(Math.max(...size) * 0.4, 40, 40);
  }
}

/**
 * Create an elongated sphere (ellipsoid)
 */
function createElongatedSphere(radiusX, radiusY, radiusZ, detail) {
  const geometry = new THREE.SphereGeometry(1, detail, detail);
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    positions.setX(i, positions.getX(i) * radiusX);
    positions.setY(i, positions.getY(i) * radiusY);
    positions.setZ(i, positions.getZ(i) * radiusZ);
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Create an almond-shaped geometry (for amygdala)
 */
function createAlmondShape(radius, detail) {
  const geometry = new THREE.SphereGeometry(radius, detail, detail);
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    const scaleFactor = 1 + Math.abs(y / radius) * 0.3;
    positions.setX(i, positions.getX(i) * scaleFactor);
    positions.setZ(i, positions.getZ(i) * scaleFactor);
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Create an egg-shaped geometry (for thalamus)
 */
function createEggShape(radiusX, radiusY, detail) {
  const geometry = new THREE.SphereGeometry(radiusX, detail, detail);
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    const factor = y > 0 ? 1.2 : 0.8;
    positions.setY(i, y * radiusY * factor / radiusX);
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Brain Material Component with advanced shading
 */
export function BrainMaterial({ region, isHovered, isSelected }) {
  const materialRef = useRef();

  // Create realistic brain tissue colors
  const baseColor = useMemo(() => new THREE.Color(region.color), [region.color]);

  // Add subtle animation on hover
  useFrame((state) => {
    if (materialRef.current && isHovered) {
      materialRef.current.emissiveIntensity =
        0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  const getIntensity = () => {
    if (isSelected) return 1.6;
    if (isHovered) return 1.3;
    return 1.0;
  };

  return (
    <meshStandardMaterial
      ref={materialRef}
      color={baseColor.clone().multiplyScalar(getIntensity())}

      // Realistic brain tissue properties
      metalness={0.05}
      roughness={0.85}

      // Subsurface scattering simulation
      emissive={baseColor}
      emissiveIntensity={isHovered ? 0.15 : isSelected ? 0.2 : 0.08}

      // Transparency and depth
      transparent={region.isMainRegion && !isSelected}
      opacity={region.isMainRegion && !isSelected ? 0.82 : 0.95}

      // Enable proper lighting
      flatShading={false}

      // Add depth with environment mapping
      envMapIntensity={0.3}
    />
  );
}

export default createRealisticBrainGeometry;
