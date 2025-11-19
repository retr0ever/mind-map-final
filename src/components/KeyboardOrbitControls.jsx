import { useEffect, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

/**
 * OrbitControls with keyboard arrow key support
 * Allows rotation via mouse drag AND arrow keys
 */
export function KeyboardOrbitControls(props) {
  const controlsRef = useRef();
  const keysPressed = useRef({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        keysPressed.current[e.key] = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        keysPressed.current[e.key] = false;
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!controlsRef.current) return;

    // Lock the target to the center to prevent any drift
    controlsRef.current.target.set(0, 0, 0);

    const rotationSpeed = 0.02;
    let azimuthChange = 0;
    let polarChange = 0;

    // Horizontal rotation (left/right)
    if (keysPressed.current.ArrowLeft) {
      azimuthChange -= rotationSpeed;
    }
    if (keysPressed.current.ArrowRight) {
      azimuthChange += rotationSpeed;
    }

    // Vertical rotation (up/down)
    if (keysPressed.current.ArrowUp) {
      polarChange -= rotationSpeed;
    }
    if (keysPressed.current.ArrowDown) {
      polarChange += rotationSpeed;
    }

    // Apply rotation via OrbitControls
    if (azimuthChange !== 0 || polarChange !== 0) {
      const controls = controlsRef.current;
      const spherical = controls.getSpherical();

      spherical.theta += azimuthChange;
      spherical.phi += polarChange;

      // Clamp phi to prevent flipping
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

      controls.setSpherical(spherical);
      controls.update();
    }
  });

  return <OrbitControls ref={controlsRef} {...props} />;
}
