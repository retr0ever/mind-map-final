import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * Custom rotation control that rotates the brain object itself
 * The brain stays centered while being rotated by user drag
 * Also handles zoom via scroll wheel
 */
export function BrainRotationControl({ onRotationChange }) {
  const { gl, camera } = useThree();
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const domElement = gl.domElement;

    const handleMouseDown = (e) => {
      // Only start dragging if clicking on empty space (not on brain mesh)
      // The brain meshes have their own click handlers
      isDragging.current = true;
      previousMouse.current = { x: e.clientX, y: e.clientY };
      domElement.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - previousMouse.current.x;
      const deltaY = e.clientY - previousMouse.current.y;

      // Update rotation based on drag
      rotation.current.y += deltaX * 0.005; // Horizontal rotation
      rotation.current.x += deltaY * 0.005; // Vertical rotation

      // Clamp vertical rotation to prevent flipping
      rotation.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.current.x));

      previousMouse.current = { x: e.clientX, y: e.clientY };

      if (onRotationChange) {
        onRotationChange(rotation.current);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      domElement.style.cursor = 'grab';
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMouse.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - previousMouse.current.x;
      const deltaY = e.touches[0].clientY - previousMouse.current.y;

      rotation.current.y += deltaX * 0.005;
      rotation.current.x += deltaY * 0.005;

      // Clamp vertical rotation
      rotation.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.current.x));

      previousMouse.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };

      if (onRotationChange) {
        onRotationChange(rotation.current);
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();

      // Zoom by moving camera closer/further
      const zoomSpeed = 0.001;
      const delta = e.deltaY;

      camera.position.z += delta * zoomSpeed;

      // Clamp zoom distance
      camera.position.z = Math.max(2, Math.min(12, camera.position.z));

      camera.updateProjectionMatrix();
    };

    // Add event listeners
    domElement.addEventListener('mousedown', handleMouseDown);
    domElement.addEventListener('mousemove', handleMouseMove);
    domElement.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('mouseleave', handleMouseUp);
    domElement.addEventListener('touchstart', handleTouchStart);
    domElement.addEventListener('touchmove', handleTouchMove);
    domElement.addEventListener('touchend', handleTouchEnd);
    domElement.addEventListener('wheel', handleWheel, { passive: false });

    // Set initial cursor
    domElement.style.cursor = 'grab';

    return () => {
      domElement.removeEventListener('mousedown', handleMouseDown);
      domElement.removeEventListener('mousemove', handleMouseMove);
      domElement.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('mouseleave', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      domElement.removeEventListener('touchmove', handleTouchMove);
      domElement.removeEventListener('touchend', handleTouchEnd);
      domElement.removeEventListener('wheel', handleWheel);
      domElement.style.cursor = 'auto';
    };
  }, [gl, camera, onRotationChange]);

  return null;
}
