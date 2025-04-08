// This file provides global type declarations for TypeScript

// Fix 'cannot find name window' errors
interface Window {
  diagramData: any;
  vscode: {
    postMessage: (message: any) => void;
  };
}

// Enable JSX
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 