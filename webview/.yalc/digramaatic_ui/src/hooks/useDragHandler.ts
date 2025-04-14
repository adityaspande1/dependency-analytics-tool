import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook that manages node dragging functionality
 */
export function useDragHandler(
  isInteractive: boolean,
  zoomScale: number,
  onPositionChange: (id: string, position: { x: number; y: number }) => void,
  nodeId: string
) {
  const [isDragging, setIsDragging] = useState(false);
  const dragThresholdRef = useRef(8); // Minimum pixel movement to start drag
  const nodePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  useEffect(() => {
    if (!isDragging || !isInteractive) return;

    // Mouse move handler that applies a direct 1:1 motion
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate delta from initial mouse position
      const deltaX = e.clientX - mousePositionRef.current.x;
      const deltaY = e.clientY - mousePositionRef.current.y;
      
      // Check if we've moved enough to start dragging
      if (!hasDraggedRef.current) {
        if (Math.abs(deltaX) > dragThresholdRef.current || 
            Math.abs(deltaY) > dragThresholdRef.current) {
          hasDraggedRef.current = true;
        } else {
          return; // Don't move yet
        }
      }

      // Calculate exact new position
      // Important: We use the original position as base and add the mouse delta
      // divided by zoom scale to create a natural 1:1 mouse movement
      const newX = nodePositionRef.current.x + (deltaX / zoomScale);
      const newY = nodePositionRef.current.y + (deltaY / zoomScale);

      // Update node position with the exact position
      onPositionChange(nodeId, { x: newX, y: newY });
      
      // Update mouse position reference to current position
      // This is the key fix - update reference position after each move
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      hasDraggedRef.current = false;
      document.body.classList.remove('cursor-grabbing');
      
      // Remove global listeners when drag ends
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    // Add global event listeners for drag
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.classList.add('cursor-grabbing');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('cursor-grabbing');
    };
  }, [isDragging, isInteractive, nodeId, onPositionChange, zoomScale]);

  // Start dragging process
  const startDrag = (e: React.MouseEvent, position: { x: number; y: number }) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Store initial positions
    nodePositionRef.current = position;
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
    
    // Start dragging process
    hasDraggedRef.current = false;
    setIsDragging(true);
  };

  return { isDragging, startDrag };
}