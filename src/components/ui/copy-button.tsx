'use client';

/**
 * Copy Button Component for ACKS II Wiki
 * 
 * Provides copy-to-clipboard functionality with visual feedback,
 * accessibility support, and multiple content format options.
 * 
 * Features:
 * - Multiple content formats (text, markdown, JSON)
 * - Visual feedback with animations
 * - Keyboard accessibility
 * - Error handling for unsupported browsers
 * - Customizable styling and positioning
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Content format options for copying
 */
export type CopyFormat = 'text' | 'markdown' | 'json' | 'html';

/**
 * Copy button configuration
 */
export interface CopyButtonConfig {
  /** Timeout for success feedback in milliseconds */
  successTimeout?: number;
  /** Show format selection dropdown */
  showFormatSelector?: boolean;
  /** Default format to use */
  defaultFormat?: CopyFormat;
  /** Custom success message */
  successMessage?: string;
  /** Custom error message */
  errorMessage?: string;
  /** Enable haptic feedback on mobile */
  enableHaptics?: boolean;
}

/**
 * Props for CopyButton component
 */
export interface CopyButtonProps {
  /** Content to copy - can be string or object with multiple formats */
  content: string | Record<CopyFormat, string>;
  /** Button label for accessibility */
  label?: string;
  /** Additional CSS classes */
  className?: string;
  /** Button size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Button style variant */
  variant?: 'default' | 'outline' | 'ghost' | 'minimal';
  /** Configuration options */
  config?: CopyButtonConfig;
  /** Callback when copy succeeds */
  onCopySuccess?: (content: string, format: CopyFormat) => void;
  /** Callback when copy fails */
  onCopyError?: (error: Error) => void;
  /** Custom icon component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Position relative to parent */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline';
  /** Show tooltip with instructions */
  showTooltip?: boolean;
}

/**
 * Copy state for managing UI feedback
 */
type CopyState = 'idle' | 'copying' | 'success' | 'error';

/**
 * Default configuration
 */
const DEFAULT_CONFIG: Required<CopyButtonConfig> = {
  successTimeout: 2000,
  showFormatSelector: false,
  defaultFormat: 'text',
  successMessage: 'Copied to clipboard!',
  errorMessage: 'Failed to copy',
  enableHaptics: true
};

/**
 * Format content based on selected format
 */
function formatContent(content: string | Record<CopyFormat, string>, format: CopyFormat): string {
  if (typeof content === 'string') {
    return content;
  }
  
  return content[format] || content.text || Object.values(content)[0] || '';
}

/**
 * Copy content to clipboard using modern API with fallback
 */
async function copyToClipboard(text: string): Promise<void> {
  // Try modern clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (error) {
      console.warn('Clipboard API failed, falling back to execCommand:', error);
    }
  }
  
  // Fallback to execCommand for older browsers
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  
  try {
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('execCommand copy failed');
    }
  } finally {
    document.body.removeChild(textArea);
  }
}

/**
 * Format selector dropdown component
 */
const FormatSelector: React.FC<{
  formats: CopyFormat[];
  selectedFormat: CopyFormat;
  onFormatChange: (format: CopyFormat) => void;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ formats, selectedFormat, onFormatChange, isOpen, onToggle }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="px-2 py-1 text-xs border border-border rounded hover:bg-muted transition-colors"
        aria-label="Select copy format"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {selectedFormat.toUpperCase()}
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-1 bg-popover border border-border rounded shadow-lg z-50 min-w-[80px]"
          role="listbox"
          aria-label="Copy format options"
        >
          {formats.map((format) => (
            <button
              key={format}
              onClick={() => {
                onFormatChange(format);
                onToggle();
              }}
              className={cn(
                "w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors",
                selectedFormat === format && "bg-muted"
              )}
              role="option"
              aria-selected={selectedFormat === format}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Main CopyButton component
 */
export const CopyButton: React.FC<CopyButtonProps> = ({
  content,
  label = 'Copy to clipboard',
  className,
  size = 'md',
  variant = 'default',
  config: userConfig = {},
  onCopySuccess,
  onCopyError,
  icon: CustomIcon,
  position = 'inline',
  showTooltip = true
}) => {
  const config = { ...DEFAULT_CONFIG, ...userConfig };
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [selectedFormat, setSelectedFormat] = useState<CopyFormat>(config.defaultFormat);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Determine available formats
  const availableFormats: CopyFormat[] = typeof content === 'string' 
    ? ['text'] 
    : Object.keys(content) as CopyFormat[];

  const showFormatSelector = config.showFormatSelector && availableFormats.length > 1;

  // Handle copy action
  const handleCopy = useCallback(async () => {
    if (copyState === 'copying') return;

    setCopyState('copying');

    try {
      const textToCopy = formatContent(content, selectedFormat);
      await copyToClipboard(textToCopy);
      
      setCopyState('success');
      onCopySuccess?.(textToCopy, selectedFormat);

      // Haptic feedback on mobile
      if (config.enableHaptics && 'vibrate' in navigator) {
        navigator.vibrate(50);
      }

      // Reset state after timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCopyState('idle');
      }, config.successTimeout);

    } catch (error) {
      setCopyState('error');
      onCopyError?.(error as Error);
      
      // Reset error state after shorter timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCopyState('idle');
      }, 1500);
    }
  }, [content, selectedFormat, copyState, config, onCopySuccess, onCopyError]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle keyboard events
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCopy();
    }
  }, [handleCopy]);

  // Size classes
  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-10 h-10 p-2'
  };

  // Variant classes
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-border bg-background hover:bg-muted',
    ghost: 'hover:bg-muted',
    minimal: 'hover:bg-muted/50'
  };

  // Position classes
  const positionClasses = {
    'top-right': 'absolute top-2 right-2',
    'top-left': 'absolute top-2 left-2',
    'bottom-right': 'absolute bottom-2 right-2',
    'bottom-left': 'absolute bottom-2 left-2',
    'inline': ''
  };

  // Icon component
  const IconComponent = CustomIcon || (() => {
    switch (copyState) {
      case 'success':
        return <Check className="w-full h-full text-green-600" />;
      case 'error':
        return <AlertCircle className="w-full h-full text-red-600" />;
      case 'copying':
        return <Copy className="w-full h-full animate-pulse" />;
      default:
        return <Copy className="w-full h-full" />;
    }
  });

  // Status message
  const statusMessage = copyState === 'success' 
    ? config.successMessage 
    : copyState === 'error' 
    ? config.errorMessage 
    : label;

  return (
    <div className={cn("flex items-center gap-2", positionClasses[position])}>
      {showFormatSelector && (
        <FormatSelector
          formats={availableFormats}
          selectedFormat={selectedFormat}
          onFormatChange={setSelectedFormat}
          isOpen={showFormatDropdown}
          onToggle={() => setShowFormatDropdown(!showFormatDropdown)}
        />
      )}
      
      <div className="relative group">
        <button
          onClick={handleCopy}
          onKeyDown={handleKeyDown}
          disabled={copyState === 'copying'}
          className={cn(
            "rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            sizeClasses[size],
            variantClasses[variant],
            copyState === 'success' && "bg-green-100 dark:bg-green-900",
            copyState === 'error' && "bg-red-100 dark:bg-red-900",
            copyState === 'copying' && "cursor-not-allowed opacity-50",
            className
          )}
          aria-label={statusMessage}
          title={showTooltip ? statusMessage : undefined}
        >
          <IconComponent />
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {statusMessage}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover" />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Hook for managing copy functionality
 */
export function useCopyToClipboard() {
  const [copyState, setCopyState] = useState<CopyState>('idle');

  const copy = useCallback(async (text: string) => {
    setCopyState('copying');
    
    try {
      await copyToClipboard(text);
      setCopyState('success');
      
      setTimeout(() => {
        setCopyState('idle');
      }, 2000);
      
      return true;
    } catch (error) {
      setCopyState('error');
      
      setTimeout(() => {
        setCopyState('idle');
      }, 1500);
      
      return false;
    }
  }, []);

  return { copy, copyState };
}

/**
 * Utility function to format content for different copy formats
 */
export function createCopyContent(data: any): Record<CopyFormat, string> {
  const text = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  
  return {
    text,
    markdown: formatAsMarkdown(data),
    json: JSON.stringify(data, null, 2),
    html: formatAsHTML(data)
  };
}

/**
 * Format data as markdown
 */
function formatAsMarkdown(data: any): string {
  if (typeof data === 'string') return data;
  
  if (data.name || data.title) {
    let markdown = `# ${data.name || data.title}\n\n`;
    
    if (data.description) {
      markdown += `${data.description}\n\n`;
    }
    
    // Add stats if available
    if (data.stats || data.attributes) {
      markdown += '## Stats\n\n';
      const stats = data.stats || data.attributes;
      for (const [key, value] of Object.entries(stats)) {
        markdown += `- **${key}**: ${value}\n`;
      }
      markdown += '\n';
    }
    
    return markdown;
  }
  
  return JSON.stringify(data, null, 2);
}

/**
 * Format data as HTML
 */
function formatAsHTML(data: any): string {
  if (typeof data === 'string') return `<p>${data}</p>`;
  
  if (data.name || data.title) {
    let html = `<h1>${data.name || data.title}</h1>`;
    
    if (data.description) {
      html += `<p>${data.description}</p>`;
    }
    
    // Add stats if available
    if (data.stats || data.attributes) {
      html += '<h2>Stats</h2><ul>';
      const stats = data.stats || data.attributes;
      for (const [key, value] of Object.entries(stats)) {
        html += `<li><strong>${key}</strong>: ${value}</li>`;
      }
      html += '</ul>';
    }
    
    return html;
  }
  
  return `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

export default CopyButton; 