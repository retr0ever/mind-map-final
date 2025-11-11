/**
 * Comprehensive Brain Region Database
 * Based on AAL (Automated Anatomical Labeling) Atlas and neuroanatomy research
 */

export const brainRegionsData = {
  // Frontal Lobe Regions
  'Frontal_Sup_L': {
    id: 1,
    name: 'Superior Frontal Gyrus (Left)',
    shortName: 'SFG-L',
    lobe: 'Frontal',
    hemisphere: 'Left',
    color: '#FF6B6B',
    description: 'The superior frontal gyrus is crucial for higher cognitive functions including working memory, self-awareness, and cognitive control.',
    functions: [
      'Working memory maintenance',
      'Cognitive control and flexibility',
      'Self-awareness and introspection',
      'Emotional regulation',
      'Theory of mind'
    ],
    clinicalSignificance: [
      'Damage may impair working memory',
      'Implicated in ADHD',
      'Role in depression and anxiety',
      'Important for social cognition'
    ],
    connections: ['Prefrontal cortex', 'Parietal cortex', 'Cingulate cortex', 'Basal ganglia'],
    brodmannAreas: [8, 9, 10],
    keywords: ['frontal', 'superior', 'cognitive', 'executive']
  },

  'Frontal_Sup_R': {
    id: 2,
    name: 'Superior Frontal Gyrus (Right)',
    shortName: 'SFG-R',
    lobe: 'Frontal',
    hemisphere: 'Right',
    color: '#FF6B6B',
    description: 'Right hemisphere counterpart involved in spatial working memory and attention.',
    functions: [
      'Spatial working memory',
      'Sustained attention',
      'Behavioral inhibition',
      'Emotional processing',
      'Self-referential thought'
    ],
    clinicalSignificance: [
      'Damage affects spatial cognition',
      'Role in impulse control disorders',
      'Implicated in autism spectrum'
    ],
    connections: ['Prefrontal cortex', 'Parietal cortex', 'Thalamus'],
    brodmannAreas: [8, 9, 10],
    keywords: ['frontal', 'superior', 'spatial', 'attention']
  },

  'Frontal_Mid_L': {
    id: 3,
    name: 'Middle Frontal Gyrus (Left)',
    shortName: 'MFG-L',
    lobe: 'Frontal',
    hemisphere: 'Left',
    color: '#FF5252',
    description: 'Important for attention, language processing, and executive functions.',
    functions: [
      'Attention and cognitive control',
      'Language processing',
      'Decision making',
      'Response inhibition',
      'Working memory'
    ],
    clinicalSignificance: [
      'Damage impairs executive functions',
      'Involved in ADHD pathology',
      'Role in language disorders'
    ],
    connections: ['Dorsolateral prefrontal cortex', 'Broca\'s area', 'Parietal cortex'],
    brodmannAreas: [9, 10, 46],
    keywords: ['frontal', 'middle', 'attention', 'language']
  },

  'Frontal_Mid_R': {
    id: 4,
    name: 'Middle Frontal Gyrus (Right)',
    shortName: 'MFG-R',
    lobe: 'Frontal',
    hemisphere: 'Right',
    color: '#FF5252',
    description: 'Right hemisphere region involved in attention and spatial cognition.',
    functions: [
      'Visuospatial attention',
      'Response inhibition',
      'Cognitive flexibility',
      'Error monitoring'
    ],
    clinicalSignificance: [
      'Damage affects attention',
      'Role in neglect syndrome'
    ],
    connections: ['Dorsolateral prefrontal cortex', 'Parietal cortex', 'Striatum'],
    brodmannAreas: [9, 10, 46],
    keywords: ['frontal', 'middle', 'visuospatial']
  },

  'Precentral_L': {
    id: 5,
    name: 'Precentral Gyrus (Left)',
    shortName: 'PreCG-L',
    lobe: 'Frontal',
    hemisphere: 'Left',
    color: '#E74C3C',
    description: 'Primary motor cortex responsible for voluntary movement of the right side of the body.',
    functions: [
      'Voluntary motor control (right body)',
      'Motor planning',
      'Movement execution',
      'Fine motor skills'
    ],
    clinicalSignificance: [
      'Stroke causes right-side paralysis',
      'Essential for motor rehabilitation',
      'Targeted in brain-computer interfaces'
    ],
    connections: ['Premotor cortex', 'Supplementary motor area', 'Spinal cord', 'Cerebellum'],
    brodmannAreas: [4],
    keywords: ['motor', 'precentral', 'movement', 'voluntary']
  },

  'Precentral_R': {
    id: 6,
    name: 'Precentral Gyrus (Right)',
    shortName: 'PreCG-R',
    lobe: 'Frontal',
    hemisphere: 'Right',
    color: '#E74C3C',
    description: 'Primary motor cortex controlling voluntary movement of the left side of the body.',
    functions: [
      'Voluntary motor control (left body)',
      'Motor planning',
      'Movement execution',
      'Fine motor coordination'
    ],
    clinicalSignificance: [
      'Stroke causes left-side paralysis',
      'Critical for motor recovery'
    ],
    connections: ['Premotor cortex', 'Supplementary motor area', 'Spinal cord', 'Cerebellum'],
    brodmannAreas: [4],
    keywords: ['motor', 'precentral', 'movement', 'voluntary']
  },

  // Parietal Lobe Regions
  'Postcentral_L': {
    id: 7,
    name: 'Postcentral Gyrus (Left)',
    shortName: 'PostCG-L',
    lobe: 'Parietal',
    hemisphere: 'Left',
    color: '#3498DB',
    description: 'Primary somatosensory cortex processing touch, pressure, pain, and temperature from the right body.',
    functions: [
      'Touch and pressure sensation (right body)',
      'Pain perception',
      'Temperature sensing',
      'Proprioception',
      'Tactile discrimination'
    ],
    clinicalSignificance: [
      'Damage causes sensory loss on right side',
      'Critical for sensory rehabilitation',
      'Role in phantom limb sensations'
    ],
    connections: ['Secondary somatosensory cortex', 'Thalamus', 'Motor cortex'],
    brodmannAreas: [1, 2, 3],
    keywords: ['sensory', 'postcentral', 'touch', 'somatosensory']
  },

  'Postcentral_R': {
    id: 8,
    name: 'Postcentral Gyrus (Right)',
    shortName: 'PostCG-R',
    lobe: 'Parietal',
    hemisphere: 'Right',
    color: '#3498DB',
    description: 'Primary somatosensory cortex for the left side of the body.',
    functions: [
      'Touch and pressure sensation (left body)',
      'Pain perception',
      'Temperature sensing',
      'Proprioception'
    ],
    clinicalSignificance: [
      'Damage causes left-side sensory deficits',
      'Important for body awareness'
    ],
    connections: ['Secondary somatosensory cortex', 'Thalamus', 'Motor cortex'],
    brodmannAreas: [1, 2, 3],
    keywords: ['sensory', 'postcentral', 'touch', 'somatosensory']
  },

  'Parietal_Sup_L': {
    id: 9,
    name: 'Superior Parietal Lobule (Left)',
    shortName: 'SPL-L',
    lobe: 'Parietal',
    hemisphere: 'Left',
    color: '#4ECDC4',
    description: 'Integrates sensory information and coordinates spatial attention and movement.',
    functions: [
      'Visuospatial processing',
      'Body awareness',
      'Reaching and grasping',
      'Mathematical cognition',
      'Spatial attention'
    ],
    clinicalSignificance: [
      'Damage causes spatial deficits',
      'Role in dyscalculia',
      'Gerstmann syndrome'
    ],
    connections: ['Intraparietal sulcus', 'Frontal eye fields', 'Visual cortex'],
    brodmannAreas: [5, 7],
    keywords: ['parietal', 'superior', 'spatial', 'visuospatial']
  },

  'Parietal_Sup_R': {
    id: 10,
    name: 'Superior Parietal Lobule (Right)',
    shortName: 'SPL-R',
    lobe: 'Parietal',
    hemisphere: 'Right',
    color: '#4ECDC4',
    description: 'Right hemisphere region crucial for spatial attention and awareness.',
    functions: [
      'Spatial attention (left side)',
      'Visuospatial processing',
      'Navigation',
      'Mental rotation'
    ],
    clinicalSignificance: [
      'Damage causes left-side neglect',
      'Critical for spatial cognition'
    ],
    connections: ['Intraparietal sulcus', 'Frontal cortex', 'Visual cortex'],
    brodmannAreas: [5, 7],
    keywords: ['parietal', 'superior', 'spatial', 'navigation']
  },

  // Temporal Lobe Regions
  'Temporal_Sup_L': {
    id: 11,
    name: 'Superior Temporal Gyrus (Left)',
    shortName: 'STG-L',
    lobe: 'Temporal',
    hemisphere: 'Left',
    color: '#95E1D3',
    description: 'Primary auditory cortex and language comprehension area (Wernicke\'s area).',
    functions: [
      'Auditory processing',
      'Language comprehension',
      'Speech perception',
      'Phonological processing',
      'Semantic processing'
    ],
    clinicalSignificance: [
      'Damage causes Wernicke\'s aphasia',
      'Role in auditory hallucinations',
      'Implicated in schizophrenia',
      'Critical for language recovery'
    ],
    connections: ['Broca\'s area', 'Inferior frontal gyrus', 'Auditory cortex'],
    brodmannAreas: [22, 41, 42],
    keywords: ['temporal', 'superior', 'auditory', 'language', 'wernicke']
  },

  'Temporal_Sup_R': {
    id: 12,
    name: 'Superior Temporal Gyrus (Right)',
    shortName: 'STG-R',
    lobe: 'Temporal',
    hemisphere: 'Right',
    color: '#95E1D3',
    description: 'Processes auditory information, prosody, and social cognition.',
    functions: [
      'Auditory processing',
      'Prosody perception',
      'Social cognition',
      'Emotional tone of voice'
    ],
    clinicalSignificance: [
      'Role in auditory processing disorders',
      'Involved in social perception'
    ],
    connections: ['Auditory cortex', 'Frontal cortex', 'Limbic system'],
    brodmannAreas: [22, 41, 42],
    keywords: ['temporal', 'superior', 'auditory', 'prosody']
  },

  // Occipital Lobe Regions
  'Occipital_Sup_L': {
    id: 13,
    name: 'Superior Occipital Gyrus (Left)',
    shortName: 'SOG-L',
    lobe: 'Occipital',
    hemisphere: 'Left',
    color: '#9B59B6',
    description: 'Visual association cortex involved in processing visual information.',
    functions: [
      'Visual processing',
      'Pattern recognition',
      'Visual attention',
      'Motion processing'
    ],
    clinicalSignificance: [
      'Damage causes visual field defects',
      'Role in visual agnosia'
    ],
    connections: ['Primary visual cortex', 'Parietal cortex', 'Temporal cortex'],
    brodmannAreas: [18, 19],
    keywords: ['occipital', 'superior', 'visual', 'vision']
  },

  'Occipital_Sup_R': {
    id: 14,
    name: 'Superior Occipital Gyrus (Right)',
    shortName: 'SOG-R',
    lobe: 'Occipital',
    hemisphere: 'Right',
    color: '#9B59B6',
    description: 'Visual association area for spatial visual processing.',
    functions: [
      'Visual processing',
      'Spatial vision',
      'Motion detection',
      'Visual attention'
    ],
    clinicalSignificance: [
      'Damage affects visual perception',
      'Role in visuospatial deficits'
    ],
    connections: ['Primary visual cortex', 'Parietal cortex'],
    brodmannAreas: [18, 19],
    keywords: ['occipital', 'superior', 'visual', 'spatial']
  },

  'Calcarine_L': {
    id: 15,
    name: 'Calcarine Cortex (Left)',
    shortName: 'CAL-L',
    lobe: 'Occipital',
    hemisphere: 'Left',
    color: '#8E44AD',
    description: 'Primary visual cortex (V1) - the first cortical area to receive visual input.',
    functions: [
      'Primary visual processing',
      'Edge detection',
      'Orientation selectivity',
      'Color processing',
      'Contrast detection'
    ],
    clinicalSignificance: [
      'Damage causes blindness in contralateral visual field',
      'Critical for all visual perception',
      'Target for visual prosthetics'
    ],
    connections: ['Lateral geniculate nucleus', 'Visual association areas'],
    brodmannAreas: [17],
    keywords: ['calcarine', 'visual', 'primary', 'v1', 'vision']
  },

  'Calcarine_R': {
    id: 16,
    name: 'Calcarine Cortex (Right)',
    shortName: 'CAL-R',
    lobe: 'Occipital',
    hemisphere: 'Right',
    color: '#8E44AD',
    description: 'Primary visual cortex for the left visual field.',
    functions: [
      'Primary visual processing',
      'Edge detection',
      'Basic feature extraction',
      'Color processing'
    ],
    clinicalSignificance: [
      'Damage causes left visual field blindness',
      'Essential for visual perception'
    ],
    connections: ['Lateral geniculate nucleus', 'Visual association areas'],
    brodmannAreas: [17],
    keywords: ['calcarine', 'visual', 'primary', 'v1']
  },

  // Limbic System
  'Hippocampus_L': {
    id: 17,
    name: 'Hippocampus (Left)',
    shortName: 'HIP-L',
    lobe: 'Limbic',
    hemisphere: 'Left',
    color: '#F39C12',
    description: 'Critical structure for memory formation, spatial navigation, and learning.',
    functions: [
      'Episodic memory formation',
      'Spatial navigation',
      'Contextual memory',
      'Memory consolidation',
      'Pattern separation'
    ],
    clinicalSignificance: [
      'Damage causes anterograde amnesia',
      'Atrophy in Alzheimer\'s disease',
      'Affected in temporal lobe epilepsy',
      'Vulnerable to stress and depression'
    ],
    connections: ['Entorhinal cortex', 'Fornix', 'Mammillary bodies', 'Prefrontal cortex'],
    brodmannAreas: null,
    keywords: ['hippocampus', 'memory', 'learning', 'spatial', 'navigation']
  },

  'Hippocampus_R': {
    id: 18,
    name: 'Hippocampus (Right)',
    shortName: 'HIP-R',
    lobe: 'Limbic',
    hemisphere: 'Right',
    color: '#F39C12',
    description: 'Right hemisphere hippocampus specialized for spatial memory.',
    functions: [
      'Spatial memory',
      'Navigation',
      'Episodic memory',
      'Context processing'
    ],
    clinicalSignificance: [
      'Damage impairs spatial memory',
      'Role in topographical disorientation'
    ],
    connections: ['Entorhinal cortex', 'Prefrontal cortex', 'Amygdala'],
    brodmannAreas: null,
    keywords: ['hippocampus', 'spatial', 'memory', 'navigation']
  },

  'Amygdala_L': {
    id: 19,
    name: 'Amygdala (Left)',
    shortName: 'AMY-L',
    lobe: 'Limbic',
    hemisphere: 'Left',
    color: '#E67E22',
    description: 'Key structure for emotional processing, particularly fear and threat detection.',
    functions: [
      'Fear processing',
      'Threat detection',
      'Emotional memory',
      'Social behavior',
      'Reward processing'
    ],
    clinicalSignificance: [
      'Hyperactivity in anxiety disorders',
      'Damage impairs fear recognition',
      'Role in PTSD',
      'Target for anxiety treatments'
    ],
    connections: ['Hippocampus', 'Prefrontal cortex', 'Hypothalamus', 'Thalamus'],
    brodmannAreas: null,
    keywords: ['amygdala', 'emotion', 'fear', 'anxiety', 'threat']
  },

  'Amygdala_R': {
    id: 20,
    name: 'Amygdala (Right)',
    shortName: 'AMY-R',
    lobe: 'Limbic',
    hemisphere: 'Right',
    color: '#E67E22',
    description: 'Right amygdala involved in negative emotion processing.',
    functions: [
      'Negative emotion processing',
      'Fear conditioning',
      'Social emotion recognition',
      'Arousal'
    ],
    clinicalSignificance: [
      'Role in anxiety and fear disorders',
      'Involved in emotional memory'
    ],
    connections: ['Hippocampus', 'Prefrontal cortex', 'Sensory cortices'],
    brodmannAreas: null,
    keywords: ['amygdala', 'emotion', 'fear', 'negative']
  },

  // Cingulate Cortex
  'Cingulate_Ant_L': {
    id: 21,
    name: 'Anterior Cingulate Cortex (Left)',
    shortName: 'ACC-L',
    lobe: 'Limbic',
    hemisphere: 'Left',
    color: '#AA96DA',
    description: 'Involved in emotion regulation, decision-making, and cognitive control.',
    functions: [
      'Emotion regulation',
      'Error detection',
      'Conflict monitoring',
      'Pain processing',
      'Empathy'
    ],
    clinicalSignificance: [
      'Dysfunction in depression',
      'Hyperactivity in OCD',
      'Role in chronic pain',
      'Target for deep brain stimulation'
    ],
    connections: ['Prefrontal cortex', 'Amygdala', 'Insula', 'Nucleus accumbens'],
    brodmannAreas: [24, 32, 33],
    keywords: ['cingulate', 'anterior', 'emotion', 'conflict', 'error']
  },

  'Cingulate_Ant_R': {
    id: 22,
    name: 'Anterior Cingulate Cortex (Right)',
    shortName: 'ACC-R',
    lobe: 'Limbic',
    hemisphere: 'Right',
    color: '#AA96DA',
    description: 'Right ACC involved in autonomic regulation and emotional control.',
    functions: [
      'Autonomic regulation',
      'Emotional control',
      'Pain perception',
      'Decision-making'
    ],
    clinicalSignificance: [
      'Role in emotional disorders',
      'Implicated in pain syndromes'
    ],
    connections: ['Prefrontal cortex', 'Insula', 'Hypothalamus'],
    brodmannAreas: [24, 32, 33],
    keywords: ['cingulate', 'anterior', 'autonomic', 'emotion']
  },

  // Subcortical Structures
  'Thalamus_L': {
    id: 23,
    name: 'Thalamus (Left)',
    shortName: 'THA-L',
    lobe: 'Subcortical',
    hemisphere: 'Left',
    color: '#D68910',
    description: 'Major relay station for sensory and motor signals to the cortex.',
    functions: [
      'Sensory relay',
      'Motor relay',
      'Consciousness regulation',
      'Sleep-wake cycles',
      'Attention gating'
    ],
    clinicalSignificance: [
      'Stroke causes sensory deficits',
      'Role in consciousness disorders',
      'Targeted in DBS for movement disorders',
      'Implicated in schizophrenia'
    ],
    connections: ['All cortical areas', 'Basal ganglia', 'Cerebellum', 'Brainstem'],
    brodmannAreas: null,
    keywords: ['thalamus', 'relay', 'sensory', 'motor', 'consciousness']
  },

  'Cerebellum_L': {
    id: 24,
    name: 'Cerebellum (Left)',
    shortName: 'CER-L',
    lobe: 'Cerebellum',
    hemisphere: 'Left',
    color: '#FCE38A',
    description: 'Coordinates movement, balance, and motor learning.',
    functions: [
      'Motor coordination',
      'Balance and posture',
      'Motor learning',
      'Procedural memory',
      'Cognitive processing',
      'Emotional regulation'
    ],
    clinicalSignificance: [
      'Damage causes ataxia',
      'Role in cerebellar cognitive affective syndrome',
      'Implicated in autism',
      'Critical for motor rehabilitation'
    ],
    connections: ['Motor cortex', 'Brainstem', 'Spinal cord', 'Thalamus'],
    brodmannAreas: null,
    keywords: ['cerebellum', 'motor', 'coordination', 'balance', 'learning']
  }
};

// Export helper functions
export const getRegionByName = (name) => brainRegionsData[name];

export const getRegionsByLobe = (lobe) => {
  return Object.values(brainRegionsData).filter(region => region.lobe === lobe);
};

export const getRegionsByHemisphere = (hemisphere) => {
  return Object.values(brainRegionsData).filter(region => region.hemisphere === hemisphere);
};

export const searchRegions = (query) => {
  const lowerQuery = query.toLowerCase();
  return Object.values(brainRegionsData).filter(region => {
    return (
      region.name.toLowerCase().includes(lowerQuery) ||
      region.shortName.toLowerCase().includes(lowerQuery) ||
      region.lobe.toLowerCase().includes(lowerQuery) ||
      region.description.toLowerCase().includes(lowerQuery) ||
      region.functions.some(func => func.toLowerCase().includes(lowerQuery)) ||
      region.keywords.some(keyword => keyword.includes(lowerQuery))
    );
  });
};

export const getAllLobes = () => {
  return [...new Set(Object.values(brainRegionsData).map(r => r.lobe))];
};

export const getAllHemispheres = () => {
  return [...new Set(Object.values(brainRegionsData).map(r => r.hemisphere))];
};

export default brainRegionsData;
