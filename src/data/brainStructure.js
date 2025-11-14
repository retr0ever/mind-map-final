/**
 * ========================================================================
 * HIERARCHICAL BRAIN STRUCTURE
 * ========================================================================
 *
 * This structure defines:
 * - REGIONS: Main brain regions (6 total) that users click on first
 * - PARTS: Subparts within each region that appear after clicking a region
 *
 * User Flow:
 * 1. User sees all REGIONS
 * 2. User clicks a REGION → view switches to show only its PARTS
 * 3. User clicks a PART → detailed information is displayed
 * ========================================================================
 */

export const brainStructure = {

  // ========================================
  // REGION 1: Cerebrum
  // ========================================
  cerebrum: {
    id: 'cerebrum',
    name: 'Cerebrum',
    type: 'REGION',
    description: 'The largest part of the brain responsible for higher cognitive functions, sensory processing, and voluntary movement.',
    color: '#FF6B6B',
    position: [0, 1.5, 0.5],
    size: [3, 2, 2.5],
    isMainRegion: true,
    parts: [
      {
        id: 'frontal_lobe',
        name: 'Frontal Lobe',
        type: 'PART',
        partOf: 'Cerebrum',
        description: 'Controls executive functions, decision-making, planning, problem-solving, and voluntary movement.',
        color: '#FF5252',
        position: [0, 1.5, 2],
        size: [2.8, 1.8, 1.2],
        functions: [
          'Executive function and decision-making',
          'Motor control and planning',
          'Speech production (Broca\'s area)',
          'Personality and behavior',
          'Problem-solving and reasoning'
        ]
      },
      {
        id: 'parietal_lobe',
        name: 'Parietal Lobe',
        type: 'PART',
        partOf: 'Cerebrum',
        description: 'Processes sensory information including touch, temperature, pain, and spatial awareness.',
        color: '#4ECDC4',
        position: [0, 2, 0],
        size: [2.8, 1.5, 1.5],
        functions: [
          'Touch and pressure sensation',
          'Spatial awareness and navigation',
          'Integration of sensory information',
          'Mathematical reasoning',
          'Body awareness and proprioception'
        ]
      },
      {
        id: 'occipital_lobe',
        name: 'Occipital Lobe',
        type: 'PART',
        partOf: 'Cerebrum',
        description: 'Primary visual processing center of the brain.',
        color: '#9B59B6',
        position: [0, 1.2, -2],
        size: [2.5, 1.6, 1],
        functions: [
          'Visual processing and perception',
          'Color recognition',
          'Motion detection',
          'Depth perception',
          'Visual memory'
        ]
      },
      {
        id: 'temporal_lobe',
        name: 'Temporal Lobe',
        type: 'PART',
        partOf: 'Cerebrum',
        description: 'Processes auditory information, memory formation, and language comprehension.',
        color: '#95E1D3',
        position: [2, 0, 0],
        size: [1, 1.5, 2],
        functions: [
          'Auditory processing',
          'Memory formation and retrieval',
          'Language comprehension (Wernicke\'s area)',
          'Facial recognition',
          'Emotional processing'
        ]
      },
      {
        id: 'corpus_callosum',
        name: 'Corpus Callosum',
        type: 'PART',
        partOf: 'Cerebrum',
        description: 'Large bundle of nerve fibers connecting the left and right cerebral hemispheres.',
        color: '#E8E8E8',
        position: [0, 0.8, 0],
        size: [0.3, 0.3, 2],
        functions: [
          'Communication between brain hemispheres',
          'Integration of sensory and motor information',
          'Coordination of bilateral movements',
          'Transfer of learning and memory'
        ]
      },
      {
        id: 'cerebral_cortex',
        name: 'Cerebral Cortex',
        type: 'PART',
        partOf: 'Cerebrum',
        description: 'The outer layer of the cerebrum responsible for higher-order thinking.',
        color: '#FFAAAA',
        position: [0, 1.5, 0.5],
        size: [3.1, 2.1, 2.6],
        functions: [
          'Conscious thought and reasoning',
          'Sensory perception',
          'Voluntary movement control',
          'Language processing',
          'Memory and learning'
        ]
      }
    ]
  },

  // ========================================
  // REGION 2: Limbic System
  // ========================================
  limbic_system: {
    id: 'limbic_system',
    name: 'Limbic System',
    type: 'REGION',
    description: 'A set of structures involved in emotion, behavior, motivation, memory, and olfaction.',
    color: '#F39C12',
    position: [0, 0, 0],
    size: [2, 1.5, 1.5],
    isMainRegion: true,
    parts: [
      {
        id: 'hippocampus',
        name: 'Hippocampus',
        type: 'PART',
        partOf: 'Limbic System',
        description: 'Critical for memory formation, spatial navigation, and learning.',
        color: '#F39C12',
        position: [1.2, -0.5, 0],
        size: [0.6, 0.5, 1],
        functions: [
          'Memory formation and consolidation',
          'Spatial navigation and orientation',
          'Contextual learning',
          'Emotional memory',
          'Pattern recognition'
        ]
      },
      {
        id: 'amygdala',
        name: 'Amygdala',
        type: 'PART',
        partOf: 'Limbic System',
        description: 'Processes emotions, especially fear, and emotional memories.',
        color: '#E67E22',
        position: [1.5, -0.3, 0.5],
        size: [0.5, 0.5, 0.5],
        functions: [
          'Fear and threat detection',
          'Emotional processing and regulation',
          'Emotional memory formation',
          'Social and sexual behavior',
          'Reward processing'
        ]
      },
      {
        id: 'thalamus',
        name: 'Thalamus',
        type: 'PART',
        partOf: 'Limbic System',
        description: 'Major relay station for sensory and motor signals to the cortex.',
        color: '#D68910',
        position: [0, 0.2, 0],
        size: [0.8, 0.7, 0.8],
        functions: [
          'Sensory information relay',
          'Motor signal relay',
          'Consciousness and alertness',
          'Sleep-wake regulation',
          'Attention and awareness'
        ]
      },
      {
        id: 'hypothalamus',
        name: 'Hypothalamus',
        type: 'PART',
        partOf: 'Limbic System',
        description: 'Regulates vital functions including temperature, hunger, thirst, and hormones.',
        color: '#CA6F1E',
        position: [0, -0.3, 0.3],
        size: [0.5, 0.4, 0.5],
        functions: [
          'Body temperature regulation',
          'Hunger and thirst control',
          'Hormone production and release',
          'Sleep-wake cycles (circadian rhythm)',
          'Emotional responses',
          'Autonomic nervous system control'
        ]
      }
    ]
  },

  // ========================================
  // REGION 3: Basal Ganglia
  // ========================================
  basal_ganglia: {
    id: 'basal_ganglia',
    name: 'Basal Ganglia',
    type: 'REGION',
    description: 'Group of structures involved in motor control, procedural learning, and habit formation.',
    color: '#8E44AD',
    position: [0.8, 0.5, 0],
    size: [1.2, 1, 1],
    isMainRegion: true,
    parts: [
      {
        id: 'caudate_nucleus',
        name: 'Caudate Nucleus',
        type: 'PART',
        partOf: 'Basal Ganglia',
        description: 'Involved in voluntary movement control and learning.',
        color: '#9B59B6',
        position: [0.6, 0.6, 0],
        size: [0.5, 0.8, 0.6],
        functions: [
          'Voluntary movement control',
          'Goal-directed behavior',
          'Cognitive flexibility',
          'Procedural learning',
          'Working memory'
        ]
      },
      {
        id: 'putamen',
        name: 'Putamen',
        type: 'PART',
        partOf: 'Basal Ganglia',
        description: 'Regulates movement and influences learning.',
        color: '#8E44AD',
        position: [1, 0.5, 0],
        size: [0.5, 0.7, 0.7],
        functions: [
          'Motor control and coordination',
          'Motor learning',
          'Movement preparation',
          'Habit formation',
          'Reward-based learning'
        ]
      },
      {
        id: 'globus_pallidus',
        name: 'Globus Pallidus',
        type: 'PART',
        partOf: 'Basal Ganglia',
        description: 'Regulates voluntary movement by influencing motor circuits.',
        color: '#7D3C98',
        position: [0.9, 0.3, 0.1],
        size: [0.4, 0.5, 0.5],
        functions: [
          'Regulation of voluntary movement',
          'Motor control refinement',
          'Muscle tone regulation',
          'Movement inhibition',
          'Posture control'
        ]
      },
      {
        id: 'substantia_nigra',
        name: 'Substantia Nigra',
        type: 'PART',
        partOf: 'Basal Ganglia',
        description: 'Produces dopamine and is crucial for movement and reward.',
        color: '#5B2C6F',
        position: [0.7, -0.5, -0.3],
        size: [0.4, 0.3, 0.4],
        functions: [
          'Dopamine production',
          'Movement control',
          'Reward processing',
          'Motor planning',
          'Eye movement control'
        ]
      },
      {
        id: 'subthalamic_nucleus',
        name: 'Subthalamic Nucleus',
        type: 'PART',
        partOf: 'Basal Ganglia',
        description: 'Regulates motor function and is a target for Parkinson\'s disease treatment.',
        color: '#6C3483',
        position: [0.5, 0, 0],
        size: [0.3, 0.3, 0.3],
        functions: [
          'Motor control regulation',
          'Movement inhibition',
          'Action selection',
          'Impulse control',
          'Target for deep brain stimulation'
        ]
      }
    ]
  },

  // ========================================
  // REGION 4: Midbrain
  // ========================================
  midbrain: {
    id: 'midbrain',
    name: 'Midbrain',
    type: 'REGION',
    description: 'Connects the hindbrain and forebrain, involved in vision, hearing, motor control, and arousal.',
    color: '#E74C3C',
    position: [0, -1, -0.5],
    size: [1, 0.8, 0.8],
    isMainRegion: true,
    parts: [
      {
        id: 'colliculi',
        name: 'Colliculi (Superior and Inferior)',
        type: 'PART',
        partOf: 'Midbrain',
        description: 'Superior processes visual information; Inferior processes auditory information.',
        color: '#E74C3C',
        position: [0, -0.8, -0.5],
        size: [0.8, 0.5, 0.6],
        functions: [
          'Visual reflex control (superior)',
          'Auditory reflex control (inferior)',
          'Eye movement coordination',
          'Head orientation to stimuli',
          'Startle response'
        ]
      },
      {
        id: 'reward_neurons',
        name: 'Clusters of neurons important for reward and mood',
        type: 'PART',
        partOf: 'Midbrain',
        description: 'Neural clusters in the midbrain involved in reward, motivation, and mood regulation.',
        color: '#C0392B',
        position: [0, -1.2, -0.3],
        size: [0.6, 0.4, 0.5],
        functions: [
          'Reward processing',
          'Motivation and drive',
          'Mood regulation',
          'Pleasure and satisfaction',
          'Addiction pathways'
        ]
      }
    ]
  },

  // ========================================
  // REGION 5: Hindbrain
  // ========================================
  hindbrain: {
    id: 'hindbrain',
    name: 'Hindbrain',
    type: 'REGION',
    description: 'Controls vital autonomic functions and motor coordination.',
    color: '#27AE60',
    position: [0, -1.5, -1],
    size: [1.5, 1.2, 1.5],
    isMainRegion: true,
    parts: [
      {
        id: 'cerebellum',
        name: 'Cerebellum',
        type: 'PART',
        partOf: 'Hindbrain',
        description: 'Coordinates movement, balance, and motor learning.',
        color: '#FCE38A',
        position: [0, -1.5, -1.5],
        size: [1.8, 1, 1.2],
        functions: [
          'Motor coordination',
          'Balance and posture',
          'Motor learning and adaptation',
          'Procedural memory',
          'Timing and precision of movements',
          'Cognitive processing'
        ]
      },
      {
        id: 'pons',
        name: 'Pons',
        type: 'PART',
        partOf: 'Hindbrain',
        description: 'Relays signals between the cerebrum and cerebellum; regulates sleep and breathing.',
        color: '#2ECC71',
        position: [0, -1.8, -0.8],
        size: [1, 0.6, 0.7],
        functions: [
          'Signal relay between brain regions',
          'Sleep regulation',
          'Breathing control',
          'Facial sensation and movement',
          'Balance and equilibrium'
        ]
      },
      {
        id: 'medulla_oblongata',
        name: 'Medulla Oblongata',
        type: 'PART',
        partOf: 'Hindbrain',
        description: 'Controls vital autonomic functions like breathing, heart rate, and blood pressure.',
        color: '#27AE60',
        position: [0, -2.3, -0.6],
        size: [0.8, 0.7, 0.6],
        functions: [
          'Heart rate regulation',
          'Breathing control',
          'Blood pressure regulation',
          'Swallowing and vomiting reflexes',
          'Coughing and sneezing reflexes'
        ]
      }
    ]
  },

  // ========================================
  // REGION 6: Brainstem
  // ========================================
  brainstem: {
    id: 'brainstem',
    name: 'Brainstem',
    type: 'REGION',
    description: 'Connects the brain to the spinal cord and controls vital life functions.',
    color: '#AA96DA',
    position: [0, -1.5, -0.5],
    size: [0.8, 1.5, 0.8],
    isMainRegion: true,
    parts: [
      {
        id: 'brainstem_midbrain',
        name: 'Midbrain',
        type: 'PART',
        partOf: 'Brainstem',
        description: 'Upper portion of the brainstem involved in motor control and sensory processing.',
        color: '#E74C3C',
        position: [0, -1, -0.5],
        size: [0.8, 0.5, 0.6],
        functions: [
          'Eye movement control',
          'Visual and auditory processing',
          'Motor control',
          'Arousal and alertness',
          'Temperature regulation'
        ]
      },
      {
        id: 'brainstem_pons',
        name: 'Pons',
        type: 'PART',
        partOf: 'Brainstem',
        description: 'Middle portion of the brainstem that relays information.',
        color: '#2ECC71',
        position: [0, -1.6, -0.5],
        size: [0.9, 0.5, 0.6],
        functions: [
          'Information relay',
          'Sleep and arousal',
          'Breathing regulation',
          'Facial sensation',
          'Taste sensation'
        ]
      },
      {
        id: 'brainstem_medulla',
        name: 'Medulla Oblongata',
        type: 'PART',
        partOf: 'Brainstem',
        description: 'Lower portion of the brainstem controlling vital functions.',
        color: '#27AE60',
        position: [0, -2.1, -0.5],
        size: [0.7, 0.6, 0.5],
        functions: [
          'Cardiovascular control',
          'Respiratory control',
          'Reflexes (cough, sneeze, swallow)',
          'Autonomic functions',
          'Cranial nerve nuclei'
        ]
      }
    ]
  }
};

/**
 * Get all main REGIONS (6 total)
 */
export const getMainRegions = () => {
  return Object.values(brainStructure).filter(region => region.type === 'REGION');
};

/**
 * Get region by ID (can be a REGION or PART)
 */
export const getRegionById = (id) => {
  // Check main regions
  if (brainStructure[id]) {
    return brainStructure[id];
  }

  // Check parts within regions
  for (const mainRegion of Object.values(brainStructure)) {
    if (mainRegion.parts) {
      const part = mainRegion.parts.find(p => p.id === id);
      if (part) {
        return { ...part, parentRegion: mainRegion.id };
      }
    }
  }

  return null;
};

/**
 * Get all PARTS of a main REGION
 */
export const getParts = (mainRegionId) => {
  return brainStructure[mainRegionId]?.parts || [];
};

/**
 * Get flattened list of all regions and parts
 */
export const getAllRegionsAndParts = () => {
  const all = [];

  Object.values(brainStructure).forEach(mainRegion => {
    all.push(mainRegion);
    if (mainRegion.parts) {
      all.push(...mainRegion.parts.map(part => ({
        ...part,
        parentRegion: mainRegion.id,
        parentName: mainRegion.name
      })));
    }
  });

  return all;
};

/**
 * Search regions and parts
 */
export const searchBrain = (query) => {
  const lowerQuery = query.toLowerCase();
  const results = { regions: [], parts: [] };

  Object.values(brainStructure).forEach(region => {
    // Search in main regions
    if (region.name.toLowerCase().includes(lowerQuery) ||
        region.description.toLowerCase().includes(lowerQuery)) {
      results.regions.push(region);
    }

    // Search in parts
    if (region.parts) {
      region.parts.forEach(part => {
        if (part.name.toLowerCase().includes(lowerQuery) ||
            part.description.toLowerCase().includes(lowerQuery) ||
            part.functions.some(f => f.toLowerCase().includes(lowerQuery))) {
          results.parts.push({
            ...part,
            parentRegion: region.id,
            parentName: region.name
          });
        }
      });
    }
  });

  return results;
};

export default brainStructure;
