'use client';

import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * StagewiseWrapper - Handles Stagewise toolbar integration
 * 
 * This component creates a separate React root for the Stagewise toolbar
 * to avoid interfering with the main application tree. It only runs in
 * development mode and properly handles client-side initialization.
 */
export function StagewiseWrapper() {
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    // Dynamic import to avoid SSR issues
    import('@stagewise/toolbar-next').then(({ StagewiseToolbar }) => {
      // Create a dedicated container for Stagewise
      const stagewiseContainer = document.createElement('div');
      stagewiseContainer.id = 'stagewise-root';
      stagewiseContainer.style.position = 'fixed';
      stagewiseContainer.style.top = '0';
      stagewiseContainer.style.left = '0';
      stagewiseContainer.style.zIndex = '999999';
      stagewiseContainer.style.pointerEvents = 'none';
      
      // Add to body
      document.body.appendChild(stagewiseContainer);

      // Create separate React root for Stagewise
      const stagewiseRoot = createRoot(stagewiseContainer);
      
      // Configuration for Stagewise
      const stagewiseConfig = {
        plugins: [], // Add custom plugins here if needed
      };

      // Render Stagewise toolbar in separate root
      stagewiseRoot.render(<StagewiseToolbar config={stagewiseConfig} />);

      // Cleanup function
      return () => {
        stagewiseRoot.unmount();
        if (stagewiseContainer.parentNode) {
          stagewiseContainer.parentNode.removeChild(stagewiseContainer);
        }
      };
    }).catch((error) => {
      console.warn('Failed to load Stagewise toolbar:', error);
    });
  }, []);

  // This component doesn't render anything visible
  return null;
} 