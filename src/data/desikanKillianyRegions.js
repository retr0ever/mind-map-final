/**
 * Desikan-Killiany Atlas Brain Regions
 * 68 cortical regions (34 per hemisphere)
 * Based on: Desikan et al., 2006, NeuroImage
 * "An automated labeling system for subdividing the human cerebral cortex on MRI scans into gyral based regions of interest"
 */

export const DESIKAN_KILLIANY_REGIONS = [
  // LEFT HEMISPHERE - FRONTAL LOBE
  {
    id: 3,
    name: 'caudalmiddlefrontal_L',
    fullName: 'Left Caudal Middle Frontal Gyrus',
    hemisphere: 'left',
    lobe: 'Frontal',
    color: '#64190A',
    functions: [
      'Executive function and cognitive control',
      'Working memory maintenance',
      'Attention and task switching',
      'Goal-directed behavior'
    ],
    brodmannAreas: [6, 8, 9],
    clinicalSignificance: 'Involved in ADHD, schizophrenia, and executive dysfunction disorders',
    connections: ['Dorsolateral Prefrontal Cortex', 'Premotor Cortex', 'Parietal Cortex']
  },
  {
    id: 26,
    name: 'rostralmiddlefrontal_L',
    fullName: 'Left Rostral Middle Frontal Gyrus',
    hemisphere: 'left',
    lobe: 'Frontal',
    color: '#4B327D',
    functions: [
      'Working memory',
      'Attention control',
      'Cognitive flexibility',
      'Decision making'
    ],
    brodmannAreas: [9, 10, 46],
    clinicalSignificance: 'Critical for executive function; affected in frontotemporal dementia',
    connections: ['Dorsolateral Prefrontal Cortex', 'Caudal Middle Frontal', 'Parietal Cortex']
  },
  {
    id: 27,
    name: 'superiorfrontal_L',
    fullName: 'Left Superior Frontal Gyrus',
    hemisphere: 'left',
    lobe: 'Frontal',
    color: '#14DCA0',
    functions: [
      'Higher cognitive functions',
      'Self-awareness and introspection',
      'Working memory',
      'Motor planning'
    ],
    brodmannAreas: [6, 8, 9],
    clinicalSignificance: 'Involved in depression, ADHD, and theory of mind deficits',
    connections: ['Middle Frontal Gyrus', 'Supplementary Motor Area', 'Anterior Cingulate']
  },
  {
    id: 23,
    name: 'precentral_L',
    fullName: 'Left Precentral Gyrus (Primary Motor Cortex)',
    hemisphere: 'left',
    lobe: 'Frontal',
    color: '#3C14DC',
    functions: [
      'Voluntary movement control',
      'Motor execution',
      'Fine motor control',
      'Motor planning'
    ],
    brodmannAreas: [4],
    clinicalSignificance: 'Damage causes contralateral paralysis or weakness; involved in ALS',
    connections: ['Supplementary Motor Area', 'Premotor Cortex', 'Postcentral Gyrus']
  },
  {
    id: 16,
    name: 'paracentral_L',
    fullName: 'Left Paracentral Lobule',
    hemisphere: 'left',
    lobe: 'Frontal',
    color: '#3CDC3C',
    functions: [
      'Motor control of lower limbs',
      'Sensory processing from legs and feet',
      'Bladder control',
      'Defecation control'
    ],
    brodmannAreas: [4, 6],
    clinicalSignificance: 'Damage can cause leg weakness or sensory loss',
    connections: ['Primary Motor Cortex', 'Supplementary Motor Area', 'Primary Somatosensory Cortex']
  },
  {
    id: 31,
    name: 'frontalpole_L',
    fullName: 'Left Frontal Pole',
    hemisphere: 'left',
    lobe: 'Frontal',
    color: '#64C264',
    functions: [
      'Meta-cognition and abstract thinking',
      'Future planning and prospective memory',
      'Self-generated thought',
      'Multitasking'
    ],
    brodmannAreas: [10],
    clinicalSignificance: 'Involved in autism spectrum disorders and schizophrenia',
    connections: ['Medial Prefrontal Cortex', 'Orbitofrontal Cortex', 'Anterior Cingulate']
  },
  {
    id: 17,
    name: 'parsopercularis_L',
    fullName: 'Left Pars Opercularis (Broca\'s Area - posterior)',
    hemisphere: 'left',
    lobe: 'Frontal',
    color: '#DCB48C',
    functions: [
      'Speech production',
      'Language processing',
      'Motor speech planning',
      'Syntax processing'
    ],
    brodmannAreas: [44],
    clinicalSignificance: 'Damage causes expressive aphasia (Broca\'s aphasia)',
    connections: ['Pars Triangularis', 'Premotor Cortex', 'Superior Temporal Gyrus']
  },
  {
    id: 19,
    name: 'parstriangularis_L',
    fullName: 'Left Pars Triangularis (Broca\'s Area - anterior)',
    hemisphere: 'left',
    lobe: 'Frontal',
    color: '#DC3C14',
    functions: [
      'Language comprehension',
      'Semantic processing',
      'Speech production support',
      'Verbal fluency'
    ],
    brodmannAreas: [45],
    clinicalSignificance: 'Critical for language; involved in dyslexia and stuttering',
    connections: ['Pars Opercularis', 'Pars Orbitalis', 'Temporal Cortex']
  },
  {
    id: 18,
    name: 'parsorbitalis_L',
    fullName: 'Left Pars Orbitalis',
    hemisphere: 'left',
    lobe: 'Frontal',
    color: '#146432',
    functions: [
      'Language processing',
      'Semantic retrieval',
      'Verbal fluency',
      'Social communication'
    ],
    brodmannAreas: [47],
    clinicalSignificance: 'Involved in semantic dementia and verbal memory deficits',
    connections: ['Pars Triangularis', 'Orbitofrontal Cortex', 'Temporal Lobe']
  },
  {
    id: 11,
    name: 'lateralorbitofrontal_L',
    fullName: 'Left Lateral Orbitofrontal Cortex',
    hemisphere: 'left',
    lobe: 'Frontal',
    color: '#234B32',
    functions: [
      'Decision making and choice evaluation',
      'Reward and punishment processing',
      'Emotion regulation',
      'Social behavior control'
    ],
    brodmannAreas: [11, 47],
    clinicalSignificance: 'Damage causes impulsivity, poor judgment, and personality changes',
    connections: ['Ventromedial Prefrontal Cortex', 'Amygdala', 'Anterior Cingulate']
  },
  {
    id: 13,
    name: 'medialorbitofrontal_L',
    fullName: 'Left Medial Orbitofrontal Cortex',
    hemisphere: 'left',
    lobe: 'Frontal',
    color: '#C8234B',
    functions: [
      'Value-based decision making',
      'Emotional regulation',
      'Reward evaluation',
      'Social cognition'
    ],
    brodmannAreas: [10, 11, 14],
    clinicalSignificance: 'Implicated in OCD, addiction, and antisocial behavior',
    connections: ['Lateral Orbitofrontal Cortex', 'Anterior Cingulate', 'Amygdala']
  },

  // LEFT HEMISPHERE - PARIETAL LOBE
  {
    id: 21,
    name: 'postcentral_L',
    fullName: 'Left Postcentral Gyrus (Primary Somatosensory Cortex)',
    hemisphere: 'left',
    lobe: 'Parietal',
    color: '#DC1414',
    functions: [
      'Touch and tactile sensation',
      'Proprioception',
      'Pain and temperature sensation',
      'Pressure detection'
    ],
    brodmannAreas: [1, 2, 3],
    clinicalSignificance: 'Damage causes contralateral sensory loss or numbness',
    connections: ['Precentral Gyrus', 'Superior Parietal Lobule', 'Thalamus']
  },
  {
    id: 28,
    name: 'superiorparietal_L',
    fullName: 'Left Superior Parietal Lobule',
    hemisphere: 'left',
    lobe: 'Parietal',
    color: '#14B48C',
    functions: [
      'Spatial processing and navigation',
      'Visuomotor coordination',
      'Attention and awareness',
      'Mathematical cognition'
    ],
    brodmannAreas: [5, 7],
    clinicalSignificance: 'Damage causes spatial neglect, apraxia, and Balint\'s syndrome',
    connections: ['Inferior Parietal Lobule', 'Postcentral Gyrus', 'Occipital Cortex']
  },
  {
    id: 7,
    name: 'inferiorparietal_L',
    fullName: 'Left Inferior Parietal Cortex',
    hemisphere: 'left',
    lobe: 'Parietal',
    color: '#DC3CDC',
    functions: [
      'Language processing',
      'Mathematical reasoning',
      'Spatial attention',
      'Tool use and gestures'
    ],
    brodmannAreas: [39, 40],
    clinicalSignificance: 'Damage causes Gerstmann syndrome, acalculia, and agraphia',
    connections: ['Superior Parietal Lobule', 'Temporal Cortex', 'Prefrontal Cortex']
  },
  {
    id: 30,
    name: 'supramarginal_L',
    fullName: 'Left Supramarginal Gyrus',
    hemisphere: 'left',
    lobe: 'Parietal',
    color: '#50A014',
    functions: [
      'Language processing and phonology',
      'Phonological processing',
      'Spatial attention',
      'Gestural communication'
    ],
    brodmannAreas: [40],
    clinicalSignificance: 'Damage causes conduction aphasia and apraxia',
    connections: ['Angular Gyrus', 'Superior Temporal Gyrus', 'Postcentral Gyrus']
  },
  {
    id: 24,
    name: 'precuneus_L',
    fullName: 'Left Precuneus',
    hemisphere: 'left',
    lobe: 'Parietal',
    color: '#A08CB4',
    functions: [
      'Episodic memory retrieval',
      'Visuospatial processing',
      'Self-consciousness and reflection',
      'Default mode network hub'
    ],
    brodmannAreas: [7],
    clinicalSignificance: 'Altered in Alzheimer\'s disease, depression, and autism',
    connections: ['Posterior Cingulate', 'Angular Gyrus', 'Cuneus']
  },

  // LEFT HEMISPHERE - TEMPORAL LOBE
  {
    id: 29,
    name: 'superiortemporal_L',
    fullName: 'Left Superior Temporal Gyrus',
    hemisphere: 'left',
    lobe: 'Temporal',
    color: '#8CDCDC',
    functions: [
      'Auditory processing',
      'Language comprehension (Wernicke\'s area)',
      'Social cognition',
      'Voice recognition'
    ],
    brodmannAreas: [22, 41, 42],
    clinicalSignificance: 'Damage causes receptive aphasia (Wernicke\'s aphasia)',
    connections: ['Middle Temporal Gyrus', 'Inferior Parietal Lobule', 'Prefrontal Cortex']
  },
  {
    id: 1,
    name: 'bankssts_L',
    fullName: 'Left Banks of the Superior Temporal Sulcus',
    hemisphere: 'left',
    lobe: 'Temporal',
    color: '#196428',
    functions: [
      'Auditory-visual integration',
      'Language comprehension',
      'Multisensory integration',
      'Social perception'
    ],
    brodmannAreas: [21, 22, 37],
    clinicalSignificance: 'Implicated in autism spectrum disorders and schizophrenia',
    connections: ['Superior Temporal Gyrus', 'Middle Temporal Gyrus', 'Angular Gyrus']
  },
  {
    id: 14,
    name: 'middletemporal_L',
    fullName: 'Left Middle Temporal Gyrus',
    hemisphere: 'left',
    lobe: 'Temporal',
    color: '#A06432',
    functions: [
      'Language comprehension',
      'Semantic memory',
      'Visual processing',
      'Biological motion perception'
    ],
    brodmannAreas: [21, 37],
    clinicalSignificance: 'Involved in semantic dementia and anomia',
    connections: ['Superior Temporal Gyrus', 'Inferior Temporal Gyrus', 'Angular Gyrus']
  },
  {
    id: 8,
    name: 'inferiortemporal_L',
    fullName: 'Left Inferior Temporal Gyrus',
    hemisphere: 'left',
    lobe: 'Temporal',
    color: '#B42878',
    functions: [
      'Object recognition',
      'Visual memory',
      'Semantic processing',
      'Face processing'
    ],
    brodmannAreas: [20, 21],
    clinicalSignificance: 'Damage causes visual agnosia and prosopagnosia',
    connections: ['Middle Temporal Gyrus', 'Fusiform Gyrus', 'Occipital Cortex']
  },
  {
    id: 33,
    name: 'transversetemporal_L',
    fullName: 'Left Transverse Temporal Gyrus (Heschl\'s Gyrus)',
    hemisphere: 'left',
    lobe: 'Temporal',
    color: '#DD3C3C',
    functions: [
      'Primary auditory processing',
      'Sound localization',
      'Pitch perception',
      'Temporal processing of sounds'
    ],
    brodmannAreas: [41, 42],
    clinicalSignificance: 'Damage causes cortical deafness or auditory processing deficits',
    connections: ['Superior Temporal Gyrus', 'Planum Temporale', 'Auditory Association Cortex']
  },
  {
    id: 5,
    name: 'entorhinal_L',
    fullName: 'Left Entorhinal Cortex',
    hemisphere: 'left',
    lobe: 'Temporal',
    color: '#DC140A',
    functions: [
      'Memory formation and consolidation',
      'Spatial navigation and grid cells',
      'Temporal lobe memory system',
      'Path integration'
    ],
    brodmannAreas: [28, 34],
    clinicalSignificance: 'First area affected in Alzheimer\'s disease',
    connections: ['Hippocampus', 'Parahippocampal Gyrus', 'Perirhinal Cortex']
  },
  {
    id: 32,
    name: 'temporalpole_L',
    fullName: 'Left Temporal Pole',
    hemisphere: 'left',
    lobe: 'Temporal',
    color: '#2196FA',
    functions: [
      'Semantic memory',
      'Social and emotional processing',
      'Theory of mind',
      'Famous face recognition'
    ],
    brodmannAreas: [38],
    clinicalSignificance: 'Affected in semantic dementia and temporal lobe epilepsy',
    connections: ['Amygdala', 'Orbitofrontal Cortex', 'Anterior Temporal Lobe']
  },
  {
    id: 6,
    name: 'fusiform_L',
    fullName: 'Left Fusiform Gyrus',
    hemisphere: 'left',
    lobe: 'Temporal',
    color: '#B4DC8C',
    functions: [
      'Face recognition (fusiform face area)',
      'Word recognition (visual word form area)',
      'Color processing',
      'Body recognition'
    ],
    brodmannAreas: [37],
    clinicalSignificance: 'Damage causes prosopagnosia (face blindness) or alexia',
    connections: ['Inferior Temporal Gyrus', 'Parahippocampal Gyrus', 'Occipital Cortex']
  },
  {
    id: 15,
    name: 'parahippocampal_L',
    fullName: 'Left Parahippocampal Gyrus',
    hemisphere: 'left',
    lobe: 'Temporal',
    color: '#14DC3C',
    functions: [
      'Memory encoding and retrieval',
      'Scene recognition (parahippocampal place area)',
      'Spatial context processing',
      'Navigation'
    ],
    brodmannAreas: [27, 35, 36],
    clinicalSignificance: 'Affected in Alzheimer\'s disease and topographical disorientation',
    connections: ['Hippocampus', 'Entorhinal Cortex', 'Fusiform Gyrus']
  },

  // LEFT HEMISPHERE - OCCIPITAL LOBE
  {
    id: 10,
    name: 'lateraloccipital_L',
    fullName: 'Left Lateral Occipital Cortex',
    hemisphere: 'left',
    lobe: 'Occipital',
    color: '#141E8C',
    functions: [
      'Object recognition',
      'Shape processing',
      'Visual attention',
      'Motion processing'
    ],
    brodmannAreas: [18, 19],
    clinicalSignificance: 'Damage causes visual agnosia or motion blindness',
    connections: ['Inferior Temporal Gyrus', 'Superior Parietal Lobule', 'Primary Visual Cortex']
  },
  {
    id: 12,
    name: 'lingual_L',
    fullName: 'Left Lingual Gyrus',
    hemisphere: 'left',
    lobe: 'Occipital',
    color: '#E18C8C',
    functions: [
      'Visual processing',
      'Letter recognition',
      'Word encoding',
      'Visual memory'
    ],
    brodmannAreas: [17, 18],
    clinicalSignificance: 'Damage can cause visual field deficits or alexia',
    connections: ['Fusiform Gyrus', 'Cuneus', 'Parahippocampal Gyrus']
  },
  {
    id: 4,
    name: 'cuneus_L',
    fullName: 'Left Cuneus',
    hemisphere: 'left',
    lobe: 'Occipital',
    color: '#DC1464',
    functions: [
      'Visual processing',
      'Visual imagery',
      'Basic visual perception',
      'Visual memory'
    ],
    brodmannAreas: [17, 18, 19],
    clinicalSignificance: 'Damage causes visual field deficits (homonymous hemianopia)',
    connections: ['Primary Visual Cortex', 'Lingual Gyrus', 'Precuneus']
  },
  {
    id: 20,
    name: 'pericalcarine_L',
    fullName: 'Left Pericalcarine Cortex (Primary Visual Cortex, V1)',
    hemisphere: 'left',
    lobe: 'Occipital',
    color: '#78643C',
    functions: [
      'Primary visual processing',
      'Visual detection',
      'Processing basic visual features (edges, orientation)',
      'Retinotopic organization'
    ],
    brodmannAreas: [17],
    clinicalSignificance: 'Damage causes cortical blindness in corresponding visual field',
    connections: ['Cuneus', 'Lingual Gyrus', 'Lateral Occipital Cortex']
  },

  // LEFT HEMISPHERE - LIMBIC/CINGULATE
  {
    id: 25,
    name: 'rostralanteriorcingulate_L',
    fullName: 'Left Rostral Anterior Cingulate Cortex',
    hemisphere: 'left',
    lobe: 'Limbic',
    color: '#50148C',
    functions: [
      'Emotion processing and regulation',
      'Cognitive control',
      'Decision making',
      'Empathy and social cognition'
    ],
    brodmannAreas: [24, 32, 33],
    clinicalSignificance: 'Implicated in depression, anxiety, and OCD',
    connections: ['Orbitofrontal Cortex', 'Amygdala', 'Insula']
  },
  {
    id: 2,
    name: 'caudalanteriorcingulate_L',
    fullName: 'Left Caudal Anterior Cingulate Cortex',
    hemisphere: 'left',
    lobe: 'Limbic',
    color: '#7D64A0',
    functions: [
      'Emotion regulation',
      'Conflict monitoring',
      'Error detection',
      'Pain processing'
    ],
    brodmannAreas: [24, 32],
    clinicalSignificance: 'Involved in major depressive disorder and chronic pain',
    connections: ['Dorsolateral Prefrontal Cortex', 'Amygdala', 'Insula']
  },
  {
    id: 22,
    name: 'posteriorcingulate_L',
    fullName: 'Left Posterior Cingulate Cortex',
    hemisphere: 'left',
    lobe: 'Limbic',
    color: '#DCB4DC',
    functions: [
      'Memory retrieval',
      'Self-referential thinking',
      'Default mode network',
      'Spatial orientation'
    ],
    brodmannAreas: [23, 31],
    clinicalSignificance: 'Early metabolic changes in Alzheimer\'s disease',
    connections: ['Precuneus', 'Medial Prefrontal Cortex', 'Angular Gyrus']
  },
  {
    id: 9,
    name: 'isthmuscingulate_L',
    fullName: 'Left Isthmus of Cingulate Cortex',
    hemisphere: 'left',
    lobe: 'Limbic',
    color: '#8C148C',
    functions: [
      'Visuospatial processing',
      'Memory retrieval',
      'Default mode network',
      'Retrosplenial functions'
    ],
    brodmannAreas: [23, 26, 29, 30],
    clinicalSignificance: 'Involved in spatial memory deficits and Alzheimer\'s disease',
    connections: ['Posterior Cingulate', 'Precuneus', 'Parahippocampal Gyrus']
  },

  // LEFT HEMISPHERE - INSULA
  {
    id: 34,
    name: 'insula_L',
    fullName: 'Left Insular Cortex',
    hemisphere: 'left',
    lobe: 'Insular',
    color: '#FFC020',
    functions: [
      'Interoception and body awareness',
      'Emotion processing',
      'Pain perception',
      'Self-awareness and empathy'
    ],
    brodmannAreas: [13],
    clinicalSignificance: 'Involved in anxiety, PTSD, addiction, and chronic pain',
    connections: ['Anterior Cingulate', 'Amygdala', 'Orbitofrontal Cortex']
  },

  // RIGHT HEMISPHERE - FRONTAL LOBE
  {
    id: 37,
    name: 'caudalmiddlefrontal_R',
    fullName: 'Right Caudal Middle Frontal Gyrus',
    hemisphere: 'right',
    lobe: 'Frontal',
    color: '#64190A',
    functions: [
      'Executive function and cognitive control',
      'Working memory',
      'Attention',
      'Spatial working memory'
    ],
    brodmannAreas: [6, 8, 9],
    clinicalSignificance: 'Involved in ADHD and executive dysfunction',
    connections: ['Dorsolateral Prefrontal Cortex', 'Premotor Cortex', 'Parietal Cortex']
  },
  {
    id: 60,
    name: 'rostralmiddlefrontal_R',
    fullName: 'Right Rostral Middle Frontal Gyrus',
    hemisphere: 'right',
    lobe: 'Frontal',
    color: '#4B327D',
    functions: [
      'Working memory',
      'Attention control',
      'Executive function',
      'Cognitive flexibility'
    ],
    brodmannAreas: [9, 10, 46],
    clinicalSignificance: 'Affected in ADHD and frontotemporal dementia',
    connections: ['Dorsolateral Prefrontal Cortex', 'Caudal Middle Frontal', 'Parietal Cortex']
  },
  {
    id: 61,
    name: 'superiorfrontal_R',
    fullName: 'Right Superior Frontal Gyrus',
    hemisphere: 'right',
    lobe: 'Frontal',
    color: '#14DCA0',
    functions: [
      'Higher cognitive functions',
      'Self-awareness',
      'Working memory',
      'Social cognition'
    ],
    brodmannAreas: [6, 8, 9],
    clinicalSignificance: 'Involved in theory of mind deficits',
    connections: ['Middle Frontal Gyrus', 'Supplementary Motor Area', 'Anterior Cingulate']
  },
  {
    id: 57,
    name: 'precentral_R',
    fullName: 'Right Precentral Gyrus (Primary Motor Cortex)',
    hemisphere: 'right',
    lobe: 'Frontal',
    color: '#3C14DC',
    functions: [
      'Voluntary movement control',
      'Motor execution',
      'Fine motor control',
      'Motor planning'
    ],
    brodmannAreas: [4],
    clinicalSignificance: 'Damage causes contralateral paralysis',
    connections: ['Supplementary Motor Area', 'Premotor Cortex', 'Postcentral Gyrus']
  },
  {
    id: 50,
    name: 'paracentral_R',
    fullName: 'Right Paracentral Lobule',
    hemisphere: 'right',
    lobe: 'Frontal',
    color: '#3CDC3C',
    functions: [
      'Motor control of lower limbs',
      'Sensory processing from legs',
      'Bladder and bowel control'
    ],
    brodmannAreas: [4, 6],
    clinicalSignificance: 'Damage affects leg motor and sensory function',
    connections: ['Primary Motor Cortex', 'Supplementary Motor Area', 'Primary Somatosensory Cortex']
  },
  {
    id: 65,
    name: 'frontalpole_R',
    fullName: 'Right Frontal Pole',
    hemisphere: 'right',
    lobe: 'Frontal',
    color: '#64C264',
    functions: [
      'Meta-cognition',
      'Abstract reasoning',
      'Future planning',
      'Social cognition'
    ],
    brodmannAreas: [10],
    clinicalSignificance: 'Involved in autism spectrum disorders',
    connections: ['Medial Prefrontal Cortex', 'Orbitofrontal Cortex', 'Anterior Cingulate']
  },
  {
    id: 51,
    name: 'parsopercularis_R',
    fullName: 'Right Pars Opercularis',
    hemisphere: 'right',
    lobe: 'Frontal',
    color: '#DCB48C',
    functions: [
      'Prosody processing',
      'Music processing',
      'Motor control',
      'Attention'
    ],
    brodmannAreas: [44],
    clinicalSignificance: 'Involved in motor apraxia',
    connections: ['Pars Triangularis', 'Premotor Cortex', 'Superior Temporal Gyrus']
  },
  {
    id: 53,
    name: 'parstriangularis_R',
    fullName: 'Right Pars Triangularis',
    hemisphere: 'right',
    lobe: 'Frontal',
    color: '#DC3C14',
    functions: [
      'Prosody comprehension',
      'Emotional prosody',
      'Attention',
      'Cognitive control'
    ],
    brodmannAreas: [45],
    clinicalSignificance: 'Involved in prosodic deficits',
    connections: ['Pars Opercularis', 'Pars Orbitalis', 'Temporal Cortex']
  },
  {
    id: 52,
    name: 'parsorbitalis_R',
    fullName: 'Right Pars Orbitalis',
    hemisphere: 'right',
    lobe: 'Frontal',
    color: '#146432',
    functions: [
      'Emotional processing',
      'Social cognition',
      'Semantic processing',
      'Attention'
    ],
    brodmannAreas: [47],
    clinicalSignificance: 'Involved in social cognition deficits',
    connections: ['Pars Triangularis', 'Orbitofrontal Cortex', 'Temporal Lobe']
  },
  {
    id: 45,
    name: 'lateralorbitofrontal_R',
    fullName: 'Right Lateral Orbitofrontal Cortex',
    hemisphere: 'right',
    lobe: 'Frontal',
    color: '#234B32',
    functions: [
      'Decision making',
      'Reward processing',
      'Emotion regulation',
      'Impulse control'
    ],
    brodmannAreas: [11, 47],
    clinicalSignificance: 'Damage causes impulsivity and poor social judgment',
    connections: ['Ventromedial Prefrontal Cortex', 'Amygdala', 'Anterior Cingulate']
  },
  {
    id: 47,
    name: 'medialorbitofrontal_R',
    fullName: 'Right Medial Orbitofrontal Cortex',
    hemisphere: 'right',
    lobe: 'Frontal',
    color: '#C8234B',
    functions: [
      'Value-based decision making',
      'Emotional regulation',
      'Reward evaluation',
      'Social behavior'
    ],
    brodmannAreas: [10, 11, 14],
    clinicalSignificance: 'Implicated in OCD and addiction',
    connections: ['Lateral Orbitofrontal Cortex', 'Anterior Cingulate', 'Amygdala']
  },

  // RIGHT HEMISPHERE - PARIETAL LOBE
  {
    id: 55,
    name: 'postcentral_R',
    fullName: 'Right Postcentral Gyrus (Primary Somatosensory Cortex)',
    hemisphere: 'right',
    lobe: 'Parietal',
    color: '#DC1414',
    functions: [
      'Touch sensation',
      'Proprioception',
      'Pain processing',
      'Temperature sensation'
    ],
    brodmannAreas: [1, 2, 3],
    clinicalSignificance: 'Damage causes contralateral sensory loss',
    connections: ['Precentral Gyrus', 'Superior Parietal Lobule', 'Thalamus']
  },
  {
    id: 62,
    name: 'superiorparietal_R',
    fullName: 'Right Superior Parietal Lobule',
    hemisphere: 'right',
    lobe: 'Parietal',
    color: '#14B48C',
    functions: [
      'Spatial processing',
      'Visuomotor coordination',
      'Attention (especially spatial)',
      'Body schema'
    ],
    brodmannAreas: [5, 7],
    clinicalSignificance: 'Damage causes spatial neglect (left-sided neglect)',
    connections: ['Inferior Parietal Lobule', 'Postcentral Gyrus', 'Occipital Cortex']
  },
  {
    id: 41,
    name: 'inferiorparietal_R',
    fullName: 'Right Inferior Parietal Cortex',
    hemisphere: 'right',
    lobe: 'Parietal',
    color: '#DC3CDC',
    functions: [
      'Spatial attention',
      'Visuospatial processing',
      'Body awareness',
      'Mathematical cognition'
    ],
    brodmannAreas: [39, 40],
    clinicalSignificance: 'Damage causes hemispatial neglect',
    connections: ['Superior Parietal Lobule', 'Temporal Cortex', 'Prefrontal Cortex']
  },
  {
    id: 64,
    name: 'supramarginal_R',
    fullName: 'Right Supramarginal Gyrus',
    hemisphere: 'right',
    lobe: 'Parietal',
    color: '#50A014',
    functions: [
      'Spatial attention',
      'Phonological processing',
      'Sensorimotor integration',
      'Tool use'
    ],
    brodmannAreas: [40],
    clinicalSignificance: 'Involved in apraxia and spatial neglect',
    connections: ['Angular Gyrus', 'Superior Temporal Gyrus', 'Postcentral Gyrus']
  },
  {
    id: 58,
    name: 'precuneus_R',
    fullName: 'Right Precuneus',
    hemisphere: 'right',
    lobe: 'Parietal',
    color: '#A08CB4',
    functions: [
      'Episodic memory',
      'Visuospatial processing',
      'Self-consciousness',
      'Theory of mind'
    ],
    brodmannAreas: [7],
    clinicalSignificance: 'Altered in Alzheimer\'s disease and autism',
    connections: ['Posterior Cingulate', 'Angular Gyrus', 'Cuneus']
  },

  // RIGHT HEMISPHERE - TEMPORAL LOBE
  {
    id: 63,
    name: 'superiortemporal_R',
    fullName: 'Right Superior Temporal Gyrus',
    hemisphere: 'right',
    lobe: 'Temporal',
    color: '#8CDCDC',
    functions: [
      'Auditory processing',
      'Prosody and intonation',
      'Music processing',
      'Social cognition'
    ],
    brodmannAreas: [22, 41, 42],
    clinicalSignificance: 'Involved in auditory hallucinations in schizophrenia',
    connections: ['Middle Temporal Gyrus', 'Inferior Parietal Lobule', 'Prefrontal Cortex']
  },
  {
    id: 35,
    name: 'bankssts_R',
    fullName: 'Right Banks of the Superior Temporal Sulcus',
    hemisphere: 'right',
    lobe: 'Temporal',
    color: '#196428',
    functions: [
      'Biological motion perception',
      'Social perception',
      'Multisensory integration',
      'Theory of mind'
    ],
    brodmannAreas: [21, 22, 37],
    clinicalSignificance: 'Implicated in autism spectrum disorders',
    connections: ['Superior Temporal Gyrus', 'Middle Temporal Gyrus', 'Angular Gyrus']
  },
  {
    id: 48,
    name: 'middletemporal_R',
    fullName: 'Right Middle Temporal Gyrus',
    hemisphere: 'right',
    lobe: 'Temporal',
    color: '#A06432',
    functions: [
      'Semantic processing',
      'Visual processing',
      'Distance perception',
      'Emotional processing'
    ],
    brodmannAreas: [21, 37],
    clinicalSignificance: 'Involved in semantic dementia',
    connections: ['Superior Temporal Gyrus', 'Inferior Temporal Gyrus', 'Angular Gyrus']
  },
  {
    id: 42,
    name: 'inferiortemporal_R',
    fullName: 'Right Inferior Temporal Gyrus',
    hemisphere: 'right',
    lobe: 'Temporal',
    color: '#B42878',
    functions: [
      'Object recognition',
      'Face processing',
      'Visual memory',
      'Semantic processing'
    ],
    brodmannAreas: [20, 21],
    clinicalSignificance: 'Damage causes prosopagnosia',
    connections: ['Middle Temporal Gyrus', 'Fusiform Gyrus', 'Occipital Cortex']
  },
  {
    id: 67,
    name: 'transversetemporal_R',
    fullName: 'Right Transverse Temporal Gyrus (Heschl\'s Gyrus)',
    hemisphere: 'right',
    lobe: 'Temporal',
    color: '#DD3C3C',
    functions: [
      'Primary auditory processing',
      'Sound localization',
      'Pitch perception',
      'Music processing'
    ],
    brodmannAreas: [41, 42],
    clinicalSignificance: 'Damage causes auditory processing deficits',
    connections: ['Superior Temporal Gyrus', 'Planum Temporale', 'Auditory Association Cortex']
  },
  {
    id: 39,
    name: 'entorhinal_R',
    fullName: 'Right Entorhinal Cortex',
    hemisphere: 'right',
    lobe: 'Temporal',
    color: '#DC140A',
    functions: [
      'Memory formation',
      'Spatial navigation',
      'Grid cells and spatial mapping',
      'Odor memory'
    ],
    brodmannAreas: [28, 34],
    clinicalSignificance: 'Early degeneration in Alzheimer\'s disease',
    connections: ['Hippocampus', 'Parahippocampal Gyrus', 'Perirhinal Cortex']
  },
  {
    id: 66,
    name: 'temporalpole_R',
    fullName: 'Right Temporal Pole',
    hemisphere: 'right',
    lobe: 'Temporal',
    color: '#2196FA',
    functions: [
      'Semantic memory',
      'Social and emotional processing',
      'Face recognition',
      'Theory of mind'
    ],
    brodmannAreas: [38],
    clinicalSignificance: 'Affected in semantic dementia',
    connections: ['Amygdala', 'Orbitofrontal Cortex', 'Anterior Temporal Lobe']
  },
  {
    id: 40,
    name: 'fusiform_R',
    fullName: 'Right Fusiform Gyrus',
    hemisphere: 'right',
    lobe: 'Temporal',
    color: '#B4DC8C',
    functions: [
      'Face recognition (fusiform face area)',
      'Object recognition',
      'Color processing',
      'Body recognition'
    ],
    brodmannAreas: [37],
    clinicalSignificance: 'Damage causes prosopagnosia (face blindness)',
    connections: ['Inferior Temporal Gyrus', 'Parahippocampal Gyrus', 'Occipital Cortex']
  },
  {
    id: 49,
    name: 'parahippocampal_R',
    fullName: 'Right Parahippocampal Gyrus',
    hemisphere: 'right',
    lobe: 'Temporal',
    color: '#14DC3C',
    functions: [
      'Memory encoding',
      'Scene recognition',
      'Spatial context',
      'Navigation'
    ],
    brodmannAreas: [27, 35, 36],
    clinicalSignificance: 'Affected in Alzheimer\'s disease',
    connections: ['Hippocampus', 'Entorhinal Cortex', 'Fusiform Gyrus']
  },

  // RIGHT HEMISPHERE - OCCIPITAL LOBE
  {
    id: 44,
    name: 'lateraloccipital_R',
    fullName: 'Right Lateral Occipital Cortex',
    hemisphere: 'right',
    lobe: 'Occipital',
    color: '#141E8C',
    functions: [
      'Object recognition',
      'Shape processing',
      'Visual attention',
      'Motion processing'
    ],
    brodmannAreas: [18, 19],
    clinicalSignificance: 'Damage causes visual agnosia',
    connections: ['Inferior Temporal Gyrus', 'Superior Parietal Lobule', 'Primary Visual Cortex']
  },
  {
    id: 46,
    name: 'lingual_R',
    fullName: 'Right Lingual Gyrus',
    hemisphere: 'right',
    lobe: 'Occipital',
    color: '#E18C8C',
    functions: [
      'Visual processing',
      'Letter recognition',
      'Word encoding',
      'Visual memory'
    ],
    brodmannAreas: [17, 18],
    clinicalSignificance: 'Damage causes visual field deficits',
    connections: ['Fusiform Gyrus', 'Cuneus', 'Parahippocampal Gyrus']
  },
  {
    id: 38,
    name: 'cuneus_R',
    fullName: 'Right Cuneus',
    hemisphere: 'right',
    lobe: 'Occipital',
    color: '#DC1464',
    functions: [
      'Visual processing',
      'Visual imagery',
      'Basic visual perception',
      'Visual memory'
    ],
    brodmannAreas: [17, 18, 19],
    clinicalSignificance: 'Damage causes visual field deficits',
    connections: ['Primary Visual Cortex', 'Lingual Gyrus', 'Precuneus']
  },
  {
    id: 54,
    name: 'pericalcarine_R',
    fullName: 'Right Pericalcarine Cortex (Primary Visual Cortex, V1)',
    hemisphere: 'right',
    lobe: 'Occipital',
    color: '#78643C',
    functions: [
      'Primary visual processing',
      'Visual detection',
      'Basic visual features',
      'Retinotopic organization'
    ],
    brodmannAreas: [17],
    clinicalSignificance: 'Damage causes cortical blindness',
    connections: ['Cuneus', 'Lingual Gyrus', 'Lateral Occipital Cortex']
  },

  // RIGHT HEMISPHERE - LIMBIC/CINGULATE
  {
    id: 59,
    name: 'rostralanteriorcingulate_R',
    fullName: 'Right Rostral Anterior Cingulate Cortex',
    hemisphere: 'right',
    lobe: 'Limbic',
    color: '#50148C',
    functions: [
      'Emotion processing',
      'Cognitive control',
      'Decision making',
      'Empathy'
    ],
    brodmannAreas: [24, 32, 33],
    clinicalSignificance: 'Implicated in depression and anxiety',
    connections: ['Orbitofrontal Cortex', 'Amygdala', 'Insula']
  },
  {
    id: 36,
    name: 'caudalanteriorcingulate_R',
    fullName: 'Right Caudal Anterior Cingulate Cortex',
    hemisphere: 'right',
    lobe: 'Limbic',
    color: '#7D64A0',
    functions: [
      'Emotion regulation',
      'Conflict monitoring',
      'Error detection',
      'Pain processing'
    ],
    brodmannAreas: [24, 32],
    clinicalSignificance: 'Involved in chronic pain syndromes',
    connections: ['Dorsolateral Prefrontal Cortex', 'Amygdala', 'Insula']
  },
  {
    id: 56,
    name: 'posteriorcingulate_R',
    fullName: 'Right Posterior Cingulate Cortex',
    hemisphere: 'right',
    lobe: 'Limbic',
    color: '#DCB4DC',
    functions: [
      'Memory retrieval',
      'Self-referential thinking',
      'Default mode network',
      'Spatial memory'
    ],
    brodmannAreas: [23, 31],
    clinicalSignificance: 'Early metabolic changes in Alzheimer\'s',
    connections: ['Precuneus', 'Medial Prefrontal Cortex', 'Angular Gyrus']
  },
  {
    id: 43,
    name: 'isthmuscingulate_R',
    fullName: 'Right Isthmus of Cingulate Cortex',
    hemisphere: 'right',
    lobe: 'Limbic',
    color: '#8C148C',
    functions: [
      'Visuospatial processing',
      'Memory retrieval',
      'Default mode network',
      'Navigation'
    ],
    brodmannAreas: [23, 26, 29, 30],
    clinicalSignificance: 'Involved in spatial memory deficits',
    connections: ['Posterior Cingulate', 'Precuneus', 'Parahippocampal Gyrus']
  },

  // RIGHT HEMISPHERE - INSULA
  {
    id: 68,
    name: 'insula_R',
    fullName: 'Right Insular Cortex',
    hemisphere: 'right',
    lobe: 'Insular',
    color: '#FFC020',
    functions: [
      'Interoception',
      'Emotion',
      'Pain perception',
      'Disgust and aversion'
    ],
    brodmannAreas: [13],
    clinicalSignificance: 'Involved in anxiety and addiction',
    connections: ['Anterior Cingulate', 'Amygdala', 'Orbitofrontal Cortex']
  }
];

// Helper functions
export const getRegionById = (id) => {
  return DESIKAN_KILLIANY_REGIONS.find(region => region.id === id);
};

export const getRegionsByLobe = (lobe) => {
  return DESIKAN_KILLIANY_REGIONS.filter(region =>
    region.lobe.toLowerCase() === lobe.toLowerCase()
  );
};

export const getRegionsByHemisphere = (hemisphere) => {
  return DESIKAN_KILLIANY_REGIONS.filter(region =>
    region.hemisphere.toLowerCase() === hemisphere.toLowerCase()
  );
};

export const searchRegions = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return DESIKAN_KILLIANY_REGIONS.filter(region =>
    region.name.toLowerCase().includes(term) ||
    region.fullName.toLowerCase().includes(term) ||
    region.functions.some(f => f.toLowerCase().includes(term))
  );
};

export const getRegionColors = () => {
  return DESIKAN_KILLIANY_REGIONS.reduce((acc, region) => {
    acc[region.name] = region.color;
    return acc;
  }, {});
};

export default DESIKAN_KILLIANY_REGIONS;
