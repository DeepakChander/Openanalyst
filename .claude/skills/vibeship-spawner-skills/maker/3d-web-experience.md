# 3D Web Experience

> Expert in building 3D experiences for the web - Three.js, React Three Fiber,
Spline, WebGL, and interactive 3D scenes. Covers product configurators, 3D
portfolios, immersive websites, and bringing depth to web experiences.


**Category:** maker | **Version:** 1.0.0

---

## Identity

[object Object]

## Expertise Areas

- Three.js implementation
- React Three Fiber
- WebGL optimization
- 3D model integration
- Spline workflows
- 3D product configurators
- Interactive 3D scenes
- 3D performance optimization

## Patterns

### 3D Stack Selection
Choosing the right 3D approach
```
## 3D Stack Selection

### Options Comparison
| Tool | Best For | Learning Curve | Control |
|------|----------|----------------|---------|
| Spline | Quick prototypes, designers | Low | Medium |
| React Three Fiber | React apps, complex scenes | Medium | High |
| Three.js vanilla | Max control, non-React | High | Maximum |
| Babylon.js | Games, heavy 3D | High | Maximum |

### Decision Tree
```
Need quick 3D element?
└── Yes → Spline
└── No → Continue

Using React?
└── Yes → React Three Fiber
└── No → Continue

Need max performance/control?
└── Yes → Three.js vanilla
└── No → Spline or R3F
```

### Spline (Fastest Start)
```jsx
import Spline from '@splinetool/react-spline';

export default function Scene() {
  return (
    <Spline scene="https://prod.spline.design/xxx/scene.splinecode" />
  );
}
```

### React Three Fiber
```jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/model.glb');
  return <primitive object={scene} />;
}

export default function Scene() {
  return (
    <Canvas>
      <ambientLight />
      <Model />
      <OrbitControls />
    </Canvas>
  );
}
```

```

### 3D Model Pipeline
Getting models web-ready
```
## 3D Model Pipeline

### Format Selection
| Format | Use Case | Size |
|--------|----------|------|
| GLB/GLTF | Standard web 3D | Smallest |
| FBX | From 3D software | Large |
| OBJ | Simple meshes | Medium |
| USDZ | Apple AR | Medium |

### Optimization Pipeline
```
1. Model in Blender/etc
2. Reduce poly count (< 100K for web)
3. Bake textures (combine materials)
4. Export as GLB
5. Compress with gltf-transform
6. Test file size (< 5MB ideal)
```

### GLTF Compression
```bash
# Install gltf-transform
npm install -g @gltf-transform/cli

# Compress model
gltf-transform optimize input.glb output.glb \
  --compress draco \
  --texture-compress webp
```

### Loading in R3F
```jsx
import { useGLTF, useProgress, Html } from '@react-three/drei';
import { Suspense } from 'react';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}%</Html>;
}

export default function Scene() {
  return (
    <Canvas>
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
    </Canvas>
  );
}
```

```

### Scroll-Driven 3D
3D that responds to scroll
```
## Scroll-Driven 3D

### R3F + Scroll Controls
```jsx
import { ScrollControls, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function RotatingModel() {
  const scroll = useScroll();
  const ref = useRef();

  useFrame(() => {
    // Rotate based on scroll position
    ref.current.rotation.y = scroll.offset * Math.PI * 2;
  });

  return <mesh ref={ref}>...</mesh>;
}

export default function Scene() {
  return (
    <Canvas>
      <ScrollControls pages={3}>
        <RotatingModel />
      </ScrollControls>
    </Canvas>
  );
}
```

### GSAP + Three.js
```javascript
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.to(camera.position, {
  scrollTrigger: {
    trigger: '.section',
    scrub: true,
  },
  z: 5,
  y: 2,
});
```

### Common Scroll Effects
- Camera movement through scene
- Model rotation on scroll
- Reveal/hide elements
- Color/material changes
- Exploded view animations

```

### Performance Optimization
Keeping 3D fast
```
## 3D Performance

### Performance Targets
| Device | Target FPS | Max Triangles |
|--------|------------|---------------|
| Desktop | 60fps | 500K |
| Mobile | 30-60fps | 100K |
| Low-end | 30fps | 50K |

### Quick Wins
```jsx
// 1. Use instances for repeated objects
import { Instances, Instance } from '@react-three/drei';

// 2. Limit lights
<ambientLight intensity={0.5} />
<directionalLight /> // Just one

// 3. Use LOD (Level of Detail)
import { LOD } from 'three';

// 4. Lazy load models
const Model = lazy(() => import('./Model'));
```

### Mobile Detection
```jsx
const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

<Canvas
  dpr={isMobile ? 1 : 2} // Lower resolution on mobile
  performance={{ min: 0.5 }} // Allow frame drops
>
```

### Fallback Strategy
```jsx
function Scene() {
  const [webGLSupported, setWebGLSupported] = useState(true);

  if (!webGLSupported) {
    return <img src="/fallback.png" alt="3D preview" />;
  }

  return <Canvas onCreated={...} />;
}
```

```


## Anti-Patterns

### 3D For 3D's Sake
Adding 3D that doesn't serve the content
**Why it's bad:** Slows down the site.
Confuses users.
Battery drain on mobile.
Doesn't help conversion.


### Desktop-Only 3D
3D that breaks or kills mobile
**Why it's bad:** Most traffic is mobile.
Kills battery.
Crashes on low-end devices.
Frustrated users.


### No Loading State
Blank screen while 3D loads
**Why it's bad:** Users think it's broken.
High bounce rate.
3D takes time to load.
Bad first impression.



## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

*Sharp edges documented in full version.*

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `scroll animation|parallax|GSAP` | scroll-experience | Scroll integration |
| `react|next|frontend` | frontend | React integration |
| `performance|slow|fps` | performance-hunter | 3D performance optimization |
| `product page|landing|marketing` | landing-page-design | Product landing with 3D |

### Receives Work From

- **scroll-experience**: Scroll-driven 3D animations
- **ui-design**: 3D integrated with UI

### Works Well With

- scroll-experience
- interactive-portfolio
- frontend
- landing-page-design

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/maker/3d-web-experience/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
