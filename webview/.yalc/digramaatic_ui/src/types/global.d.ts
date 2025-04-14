declare module 'leader-line' {
  interface LeaderLineOptions {
    color?: string;
    size?: number;
    path?: 'straight' | 'arc' | 'fluid' | 'magnet' | 'grid';
    startSocket?: 'auto' | 'top' | 'right' | 'bottom' | 'left' | string;
    endSocket?: 'auto' | 'top' | 'right' | 'bottom' | 'left' | string;
    startSocketGravity?: number;
    endSocketGravity?: number;
    startPlug?: 'disc' | 'square' | 'arrow1' | 'arrow2' | 'arrow3' | 'hand' | 'crosshair' | 'behind';
    endPlug?: 'disc' | 'square' | 'arrow1' | 'arrow2' | 'arrow3' | 'hand' | 'crosshair';
    startPlugSize?: number;
    endPlugSize?: number;
    outline?: boolean;
    outlineColor?: string;
    outlineSize?: number;
    startPlugOutline?: boolean;
    endPlugOutline?: boolean;
    startPlugOutlineColor?: string;
    endPlugOutlineColor?: string;
    startPlugOutlineSize?: number;
    endPlugOutlineSize?: number;
    dash?: boolean | object;
    gradient?: boolean | object;
    dropShadow?: boolean | object;
    lineOffset?: number | string;
    startOffset?: number | string;
    endOffset?: number | string;
    middleLabel?: string;
    middleLabelSize?: number;
    middleLabelClassName?: string;
    animOptions?: {
      duration?: number;
      timing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
    }
  }
  
  class LeaderLine {
    constructor(start: HTMLElement, end: HTMLElement, options?: LeaderLineOptions);
    remove(): void;
    setOptions(options: LeaderLineOptions): void;
    position(): void;
  }
  
  export default LeaderLine;
} 