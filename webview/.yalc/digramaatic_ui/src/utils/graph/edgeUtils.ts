export function calculateNodeIntersection(
    centerX: number,
    centerY: number,
    nodeWidth: number,
    nodeHeight: number,
    angle: number,
    padding: number = 0
  ): { x: number, y: number } {
    // Half dimensions with padding
    const halfWidth = (nodeWidth / 2) - padding;
    const halfHeight = (nodeHeight / 2) - padding;
    
    // Calculate slope
    const slope = Math.tan(angle);
    
    let x, y;
    
    // Determine which edge of the rectangle the line intersects
    // This accounts for the rectangular shape rather than assuming a circle
    if (Math.abs(slope) < halfWidth / halfHeight) {
      // Intersects right or left edge
      const xSign = Math.sign(Math.cos(angle));
      x = xSign * halfWidth;
      y = slope * x;
    } else {
      // Intersects top or bottom edge
      const ySign = Math.sign(Math.sin(angle));
      y = ySign * halfHeight;
      x = y / slope;
    }
    
    return {
      x: centerX + x,
      y: centerY + y
    };
  }