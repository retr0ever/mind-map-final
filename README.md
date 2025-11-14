# Interactive 3D Brain Viewer

An interactive 3D brain simulator that allows users to click on brain regions to learn about their functions.
https://www.brainfacts.org/3d-brain#intro=true

## 🚀 Quick Start

### Option 1: Modern React App (Recommended)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your brain viewer!

### Option 2: Simple HTML Version

Simply open `brain-viewer.html` in your browser - no build step required!

## 📋 Features

- ✅ Interactive 3D brain model
- ✅ Click regions to highlight and display information
- ✅ Hover tooltips showing region names
- ✅ Detailed information panel with functions
- ✅ Smooth rotations and animations
- ✅ Responsive design

## 🧠 Integrating Real BrainBrowser Models

The current implementation uses simple geometric shapes for demonstration. Here's how to integrate actual brain models:

### Method 1: Using BrainBrowser's MNI Models

1. **Download brain surface files:**
   ```bash
   # Download from BrainBrowser data repository
   wget https://brainbrowser.cbrain.mcgill.ca/models/brain-surface.obj
   wget https://brainbrowser.cbrain.mcgill.ca/models/AAL_atlas.txt
   ```

2. **Place files in public directory:**
   ```
   public/
   ├── models/
   │   ├── brain-surface.obj
   │   └── AAL_atlas.txt
   ```

3. **Update the BrainModel component:**

```javascript
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';

function BrainModel({ onRegionClick }) {
  // Load actual brain model
  const brainObj = useLoader(OBJLoader, '/models/brain-surface.obj');
  
  // Load atlas labels (mapping vertices to regions)
  const [atlasData, setAtlasData] = useState(null);
  
  useEffect(() => {
    fetch('/models/AAL_atlas.txt')
      .then(res => res.text())
      .then(data => {
        // Parse atlas data
        const labels = parseAtlasLabels(data);
        setAtlasData(labels);
      });
  }, []);

  return (
    <primitive
      object={brainObj}
      onClick={(e) => {
        const vertexIndex = e.faceIndex * 3; // Get vertex from face
        const region = getRegionFromVertex(vertexIndex, atlasData);
        onRegionClick(region);
      }}
    />
  );
}

function parseAtlasLabels(atlasText) {
  // Parse the atlas file format
  // Format is typically: vertex_index region_id region_name
  const lines = atlasText.split('\n');
  const labels = {};
  
  lines.forEach(line => {
    const [index, regionId, ...nameParts] = line.split(/\s+/);
    if (index && regionId) {
      labels[parseInt(index)] = {
        id: parseInt(regionId),
        name: nameParts.join(' ')
      };
    }
  });
  
  return labels;
}
```

### Method 2: Using FreeSurfer Models

FreeSurfer provides high-quality brain surface models. Here's how to integrate them:

1. **Convert FreeSurfer surfaces to OBJ format:**

```bash
# Install FreeSurfer tools
# Then convert surfaces
mris_convert lh.pial lh.pial.obj
mris_convert rh.pial rh.pial.obj
```

2. **Load annotation files for region labels:**

```javascript
function loadFreeSurferAnnotation(annotFile) {
  // Load .annot file to get region labels
  // You'll need a library like "freesurfer-parser" or write a custom parser
  return fetch(annotFile)
    .then(res => res.arrayBuffer())
    .then(buffer => parseAnnotFile(buffer));
}
```

### Method 3: Using NIfTI Volume Data

For volumetric brain data (like MRI scans):

```bash
npm install nifti-reader-js
```

```javascript
import * as nifti from 'nifti-reader-js';

function loadNifti(niftiFile) {
  return fetch(niftiFile)
    .then(res => res.arrayBuffer())
    .then(buffer => {
      const data = nifti.readHeader(buffer);
      const image = nifti.readImage(data, buffer);
      return { header: data, image: image };
    });
}
```

## 🎨 Color Schemes and Atlases

### Popular Brain Atlases:

1. **AAL (Automated Anatomical Labeling)** - 116 regions
2. **Desikan-Killiany** - 68 cortical regions
3. **Destrieux** - 148 cortical regions
4. **Harvard-Oxford** - Probabilistic atlas

### Using Custom Color Schemes:

```javascript
const colorSchemes = {
  anatomical: {
    frontal: '#FF6B6B',
    parietal: '#4ECDC4',
    temporal: '#95E1D3',
    occipital: '#F38181'
  },
  functional: {
    motor: '#E74C3C',
    sensory: '#3498DB',
    association: '#9B59B6',
    limbic: '#F39C12'
  },
  heatmap: (value) => {
    // Value from 0-1 representing activation level
    return `hsl(${(1 - value) * 240}, 100%, 50%)`;
  }
};
```

## 🔧 Advanced Features to Add

### 1. Real-time Highlighting with Raycasting

```javascript
import { Raycaster, Vector2 } from 'three';

function useRaycasting(meshRef, camera) {
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  
  const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(meshRef.current);
    
    if (intersects.length > 0) {
      const point = intersects[0].point;
      const face = intersects[0].face;
      // Determine region from intersection
    }
  };
  
  return onMouseMove;
}
```

### 2. Add AI-Powered Explanations

```javascript
async function getAIExplanation(regionName) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: `Explain the ${regionName} of the brain in simple terms, including its main functions and interesting facts.`
      }]
    })
  });
  
  const data = await response.json();
  return data.content[0].text;
}
```

### 3. Add Animation States

```javascript
function animateToRegion(camera, controls, targetPosition) {
  gsap.to(camera.position, {
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    duration: 1.5,
    ease: 'power2.inOut',
    onUpdate: () => controls.update()
  });
}
```

### Add Quiz Mode:

```javascript
const quizQuestions = [
  {
    question: "Which lobe is responsible for visual processing?",
    correctRegion: "occipital",
    options: ["frontal", "parietal", "occipital", "temporal"]
  },
  // Add more questions
];
```

### Add Comparison Mode:

```javascript
function ComparisonView({ regions }) {
  return (
    <div className="comparison">
      {regions.map(region => (
        <div key={region}>
          <BrainModel highlightedRegion={region} />
          <RegionInfo region={region} />
        </div>
      ))}
    </div>
  );
}
```

## 🚀 Deployment

### Deploying to Vercel:

```bash
npm run build
vercel
```

### Deploying to Netlify:

```bash
npm run build
netlify deploy --prod --dir=dist
```

## BRAIN STRUCTURE - REGIONS and PARTS

This 3D brain viewer implements a **clear hierarchical structure** with **REGIONS** and **PARTS**:

### ⭐ Understanding the Structure

- **REGIONS** (6 total): Main brain regions that appear first
- **PARTS**: Components within each REGION (3-6 parts per region)

### 🧠 The 6 Main REGIONS:

#### 1. **REGION: Cerebrum** (6 PARTS)
   - Frontal Lobe
   - Parietal Lobe
   - Occipital Lobe
   - Temporal Lobe
   - Corpus Callosum
   - Cerebral Cortex

#### 2. **REGION: Limbic System** (4 PARTS)
   - Hippocampus
   - Amygdala
   - Thalamus
   - Hypothalamus

#### 3. **REGION: Basal Ganglia** (5 PARTS)
   - Caudate Nucleus
   - Putamen
   - Globus Pallidus
   - Substantia Nigra
   - Subthalamic Nucleus

#### 4. **REGION: Midbrain** (2 PARTS)
   - Colliculi (Superior and Inferior)
   - Clusters of neurons important for reward and mood

#### 5. **REGION: Hindbrain** (3 PARTS)
   - Cerebellum
   - Pons
   - Medulla Oblongata

#### 6. **REGION: Brainstem** (3 PARTS)
   - Midbrain
   - Pons
   - Medulla Oblongata

---

### 📖 How to Navigate:

**Step 1:** View all 6 **REGIONS**
- When you first open the app, you see all main REGIONS displayed in 3D
- Each REGION is color-coded and labeled

**Step 2:** Click a **REGION**
- Click on any REGION (e.g., "Cerebrum")
- The view switches to show ONLY the PARTS of that REGION
- A gold badge shows you selected a REGION

**Step 3:** Explore the **PARTS**
- Click on any PART to see detailed information
- Each PART shows:
  - Description
  - Functions
  - Which REGION it belongs to

**Step 4:** Go Back
- Click "Back to Main Regions" to return to the REGIONS view

---

### 🎯 Visual Indicators:

| Type | Color Badge | Border | Hover Effect |
|------|------------|--------|--------------|
| **REGION** | 🟡 Gold "REGION" label | Gold border (2px) | Highlighted with region info |
| **PART** | ⚪ Gray "PART" label | Gray border (1px) | Highlighted with part info |

---

### ✨ Features:

✅ **Clear Hierarchy**: REGIONS contain PARTS - no confusion
✅ **Visual Distinction**: Gold for REGIONS, Gray for PARTS
✅ **Smart Labels**: Hover to see type (REGION or PART)
✅ **Count Display**: Each REGION shows how many PARTS it contains
✅ **Interactive 3D**: Rotate, zoom, pan, and click to explore
✅ **Detailed Info**: Each item has description and functions
✅ **Easy Navigation**: Back button to return to REGIONS
✅ **Realistic Shapes**: Organic brain-like geometries (no blocky boxes!)
✅ **Responsive Design**: Adapts to desktop, tablet, and mobile screens
✅ **Advanced Lighting**: Multiple light sources for realistic depth and shadows
✅ **Smooth Animations**: Damped camera controls and hover effects

### 🎨 Visual Improvements:

**Realistic Brain Geometry:**
- **Cerebrum**: Hemisphere shape with natural curvature
- **Lobes**: Smooth rounded capsules and spheres
- **Hippocampus**: Curved torus shape (like the real hippocampus!)
- **Cerebellum**: Partial sphere mimicking wrinkled appearance
- **Brainstem Parts**: Cylindrical tubes (pons, medulla)
- **Basal Ganglia**: Clustered organic shapes
- **Corpus Callosum**: Elongated capsule connecting hemispheres

**Professional Lighting:**
- Main directional light with shadows
- Fill lights for depth perception
- Hemisphere lighting for natural ambiance
- Spot lights for dramatic effect
- Color-tinted lights for visual interest

**Responsive Layout:**
- **Desktop** (>1200px): Side-by-side layout with full info panel
- **Tablet** (968-1200px): Compact info panel, adjusted controls
- **Mobile** (<968px): Stacked layout - 3D view on top, info below
- **Small Mobile** (<480px): Optimized for tiny screens

---

### 🔍 Search & Filter:

The structure makes it easy to:
- Understand brain organization
- Find specific structures quickly
- Learn relationships between REGIONS and their PARTS
- Study brain anatomy systematically

**Note**: This viewer uses ONLY the custom hierarchical structure - no Desikan-Killiany atlas or other classification systems.

