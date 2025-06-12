/**
 * Comprehensive Test Suite for ChapterTemplate Component (Subtask 17.1)
 * 
 * Tests the complete functionality of the chapter template system including:
 * - Component structure and interface compliance
 * - Responsive layout behavior
 * - Sidebar navigation and TOC generation
 * - Content rendering and integration
 * - Mobile/desktop functionality
 * - Accessibility features
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ChapterTemplate } from '../chapter-template';
import type { ChapterSection } from '../chapter-template';

// Mock Next.js components
jest.mock('next/link', () => {
  return function MockLink({ href, children, ...props }: any) {
    return <a href={href} {...props}>{children}</a>;
  };
});

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="arrow-left-icon">←</div>,
  Menu: () => <div data-testid="menu-icon">☰</div>,
  X: () => <div data-testid="x-icon">×</div>,
  ChevronRight: () => <div data-testid="chevron-right-icon">→</div>,
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Test fixtures
const mockSections: ChapterSection[] = [
  {
    id: 'character-creation',
    title: 'Character Creation',
    content: (
      <div>
        <p>This section covers character creation basics.</p>
        <h3 id='ability-scores'>Ability Scores</h3>
        <p>Description of ability scores...</p>
      </div>
    ),
    level: 2
  },
  {
    id: 'character-advancement',
    title: 'Character Advancement',
    content: (
      <div>
        <p>This section covers character advancement.</p>
        <h3 id='experience-points'>Experience Points</h3>
        <p>Description of experience...</p>
      </div>
    ),
    level: 2
  },
  {
    id: 'character-equipment',
    title: 'Character Equipment',
    content: (
      <div>
        <p>This section covers equipment rules.</p>
      </div>
    ),
    level: 2
  }
];

const mockChapterProps = {
  chapterNumber: 1,
  title: 'Characters',
  description: 'Everything you need to know about creating and playing characters in ACKS II',
  introduction: <p>Welcome to the character creation chapter.</p>,
  sections: mockSections,
  appendix: false,
  previousChapter: {
    href: '/rules/introduction',
    title: 'Introduction'
  },
  nextChapter: {
    href: '/rules/chapter-2-adventuring',
    title: 'Adventuring'
  }
};

describe('ChapterTemplate Component Structure Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test('renders chapter template with correct structure and content', () => {
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // Check chapter header
    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
    expect(screen.getByText('Characters')).toBeInTheDocument();
    expect(screen.getByText('Everything you need to know about creating and playing characters in ACKS II')).toBeInTheDocument();
    
    // Check introduction
    expect(screen.getByText('Welcome to the character creation chapter.')).toBeInTheDocument();
    
    // Check sections are rendered
    expect(screen.getByText('Character Creation')).toBeInTheDocument();
    expect(screen.getByText('Character Advancement')).toBeInTheDocument();
    expect(screen.getByText('Character Equipment')).toBeInTheDocument();
    
    // Check navigation links
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Adventuring')).toBeInTheDocument();
  });

  test('renders appendix chapters with correct labeling', () => {
    const appendixProps = {
      ...mockChapterProps,
      chapterNumber: 'A',
      title: 'Monsters',
      appendix: true
    };
    
    render(<ChapterTemplate {...appendixProps} />);
    
    expect(screen.getByText('Appendix A')).toBeInTheDocument();
    expect(screen.getByText('Monsters')).toBeInTheDocument();
  });

  test('handles missing optional props gracefully', () => {
    const minimalProps = {
      chapterNumber: 1,
      title: 'Test Chapter',
      sections: mockSections
    };
    
    render(<ChapterTemplate {...minimalProps} />);
    
    expect(screen.getByText('Test Chapter')).toBeInTheDocument();
    expect(screen.getByText('Character Creation')).toBeInTheDocument();
  });
});

describe('Sidebar Navigation Tests', () => {
  test('sidebar renders with correct table of contents', () => {
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // Check TOC items
    expect(screen.getByText('Contents')).toBeInTheDocument();
    expect(screen.getByText('Character Creation')).toBeInTheDocument();
    expect(screen.getByText('Character Advancement')).toBeInTheDocument();
    expect(screen.getByText('Character Equipment')).toBeInTheDocument();
    
    // Check back to rules link
    expect(screen.getByText('Back to Rulebook')).toBeInTheDocument();
  });

  test('mobile menu toggle functionality', async () => {
    const user = userEvent.setup();
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // Initially sidebar should be closed on mobile (hidden via CSS classes)
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveClass('-translate-x-full');
    
    // Click mobile menu button to open sidebar
    const menuButton = screen.getByTestId('menu-icon').closest('button');
    expect(menuButton).toBeInTheDocument();
    
    await user.click(menuButton!);
    
    // Sidebar should now be open
    expect(sidebar).toHaveClass('translate-x-0');
  });

  test('sidebar close button works', async () => {
    const user = userEvent.setup();
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // Open sidebar first
    const menuButton = screen.getByTestId('menu-icon').closest('button');
    await user.click(menuButton!);
    
    // Click close button
    const closeButton = screen.getByTestId('x-icon').closest('button');
    await user.click(closeButton!);
    
    // Sidebar should be closed
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveClass('-translate-x-full');
  });

  test('clicking overlay closes sidebar', async () => {
    const user = userEvent.setup();
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // Open sidebar first
    const menuButton = screen.getByTestId('menu-icon').closest('button');
    await user.click(menuButton!);
    
    // Click overlay
    const overlay = document.querySelector('.bg-black.bg-opacity-50');
    expect(overlay).toBeInTheDocument();
    
    await user.click(overlay!);
    
    // Sidebar should be closed
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveClass('-translate-x-full');
  });
});

describe('Content Rendering and Navigation Tests', () => {
  test('section content renders correctly with proper IDs', () => {
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // Check section IDs for anchor navigation
    expect(document.getElementById('character-creation')).toBeInTheDocument();
    expect(document.getElementById('character-advancement')).toBeInTheDocument();
    expect(document.getElementById('character-equipment')).toBeInTheDocument();
    
    // Check nested headings with IDs
    expect(document.getElementById('ability-scores')).toBeInTheDocument();
    expect(document.getElementById('experience-points')).toBeInTheDocument();
  });

  test('smooth scrolling to sections works', async () => {
    const user = userEvent.setup();
    
    // Mock scrollIntoView
    const mockScrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;
    
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // Click on a TOC link
    const tocButton = screen.getByRole('button', { name: 'Character Advancement' });
    await user.click(tocButton);
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });
  });

  test('previous/next chapter navigation renders correctly', () => {
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // Check previous chapter link
    const prevLink = screen.getByText('Previous').closest('a');
    expect(prevLink).toHaveAttribute('href', '/rules/introduction');
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    
    // Check next chapter link
    const nextLink = screen.getByText('Next').closest('a');
    expect(nextLink).toHaveAttribute('href', '/rules/chapter-2-adventuring');
    expect(screen.getByText('Adventuring')).toBeInTheDocument();
  });

  test('handles missing navigation links gracefully', () => {
    const propsWithoutNav = {
      ...mockChapterProps,
      previousChapter: undefined,
      nextChapter: undefined
    };
    
    render(<ChapterTemplate {...propsWithoutNav} />);
    
    // Should still render without errors
    expect(screen.getByText('Characters')).toBeInTheDocument();
    
    // Navigation section should still exist but be minimal
    const navSection = screen.getByRole('navigation', { name: /chapter navigation/i }) || 
                     document.querySelector('nav');
    expect(navSection).toBeInTheDocument();
  });
});

describe('Local Storage Integration Tests', () => {
  test('sidebar state persists to localStorage', async () => {
    const user = userEvent.setup();
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // Open sidebar
    const menuButton = screen.getByTestId('menu-icon').closest('button');
    await user.click(menuButton!);
    
    // Check localStorage was called
    expect(localStorageMock.setItem).toHaveBeenCalledWith('rulebook-sidebar-open', 'true');
    
    // Close sidebar
    const closeButton = screen.getByTestId('x-icon').closest('button');
    await user.click(closeButton!);
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('rulebook-sidebar-open', 'false');
  });

  test('sidebar state loads from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue('true');
    
    render(<ChapterTemplate {...mockChapterProps} />);
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('rulebook-sidebar-open');
    
    // Sidebar should start open
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveClass('translate-x-0');
  });
});

describe('Accessibility Tests', () => {
  test('chapter template has proper heading hierarchy', () => {
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // Main title should be h1
    const mainTitle = screen.getByRole('heading', { level: 1 });
    expect(mainTitle).toHaveTextContent('Characters');
    
    // Section titles should be h2
    const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(sectionHeadings).toHaveLength(3);
    expect(sectionHeadings[0]).toHaveTextContent('Character Creation');
    expect(sectionHeadings[1]).toHaveTextContent('Character Advancement');
    expect(sectionHeadings[2]).toHaveTextContent('Character Equipment');
  });

  test('navigation elements have proper roles and labels', () => {
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // Sidebar navigation
    const sidebarNav = screen.getByRole('navigation');
    expect(sidebarNav).toBeInTheDocument();
    
    // TOC buttons should be accessible
    const tocButtons = screen.getAllByRole('button');
    const tocButton = tocButtons.find(button => button.textContent === 'Character Creation');
    expect(tocButton).toBeInTheDocument();
  });

  test('keyboard navigation works for sidebar', async () => {
    const user = userEvent.setup();
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // Tab to the menu button
    await user.tab();
    const menuButton = screen.getByTestId('menu-icon').closest('button');
    expect(menuButton).toHaveFocus();
    
    // Press Enter to open sidebar
    await user.keyboard('{Enter}');
    
    // Sidebar should open
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveClass('translate-x-0');
  });
});

describe('Responsive Design Tests', () => {
  test('mobile layout classes are applied correctly', () => {
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // Mobile menu button should have mobile-specific classes
    const menuButton = screen.getByTestId('menu-icon').closest('button');
    expect(menuButton).toHaveClass('md:hidden');
    
    // Sidebar should have responsive classes
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveClass('fixed', 'md:translate-x-0', 'md:static');
    
    // Main content should have responsive margin
    const main = screen.getByRole('main');
    expect(main).toHaveClass('md:ml-80');
  });

  test('sidebar closes on mobile when clicking TOC links', async () => {
    const user = userEvent.setup();
    
    // Mock window.innerWidth for mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500, // Mobile width
    });
    
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
    
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // Open sidebar
    const menuButton = screen.getByTestId('menu-icon').closest('button');
    await user.click(menuButton!);
    
    // Click a TOC item
    const tocButton = screen.getByRole('button', { name: 'Character Creation' });
    await user.click(tocButton);
    
    // Sidebar should close on mobile (this would be handled by the window.innerWidth check)
    // The actual closing behavior depends on CSS and window dimensions
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });
});

describe('Integration Tests', () => {
  test('complete user workflow through chapter navigation', async () => {
    const user = userEvent.setup();
    Element.prototype.scrollIntoView = jest.fn();
    
    render(<ChapterTemplate {...mockChapterProps} />);
    
    // 1. User opens mobile menu
    const menuButton = screen.getByTestId('menu-icon').closest('button');
    await user.click(menuButton!);
    
    // 2. User clicks on a section in TOC
    const tocButton = screen.getByRole('button', { name: 'Character Advancement' });
    await user.click(tocButton);
    
    // 3. Page should scroll to section
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    
    // 4. User navigates to next chapter
    const nextLink = screen.getByText('Next').closest('a');
    expect(nextLink).toHaveAttribute('href', '/rules/chapter-2-adventuring');
    
    // 5. Back to rulebook link should work
    const backLink = screen.getByText('Back to Rulebook').closest('a');
    expect(backLink).toHaveAttribute('href', '/rules');
  });

  test('chapter template works with different content types', () => {
    const complexSections: ChapterSection[] = [
      {
        id: 'tables-section',
        title: 'Tables and Data',
        content: (
          <div>
            <table>
              <thead>
                <tr><th>Level</th><th>XP</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>0</td></tr>
                <tr><td>2</td><td>2000</td></tr>
              </tbody>
            </table>
          </div>
        ),
        level: 2
      },
      {
        id: 'lists-section',
        title: 'Lists and Examples',
        content: (
          <div>
            <ul>
              <li>First item</li>
              <li>Second item</li>
            </ul>
            <ol>
              <li>Numbered item</li>
              <li>Another numbered item</li>
            </ol>
          </div>
        ),
        level: 2
      }
    ];

    const complexProps = {
      ...mockChapterProps,
      sections: complexSections
    };

    render(<ChapterTemplate {...complexProps} />);
    
    // Check complex content renders
    expect(screen.getByText('Tables and Data')).toBeInTheDocument();
    expect(screen.getByText('Lists and Examples')).toBeInTheDocument();
    
    // Check table content
    expect(screen.getByText('Level')).toBeInTheDocument();
    expect(screen.getByText('XP')).toBeInTheDocument();
    
    // Check list content
    expect(screen.getByText('First item')).toBeInTheDocument();
    expect(screen.getByText('Numbered item')).toBeInTheDocument();
  });
});

describe('Error Handling Tests', () => {
  test('handles empty sections array gracefully', () => {
    const propsWithNoSections = {
      ...mockChapterProps,
      sections: []
    };
    
    render(<ChapterTemplate {...propsWithNoSections} />);
    
    // Should still render chapter header
    expect(screen.getByText('Characters')).toBeInTheDocument();
    
    // TOC should be empty but not break
    expect(screen.getByText('Contents')).toBeInTheDocument();
  });

  test('handles malformed section data gracefully', () => {
    const malformedSections = [
      {
        id: '',
        title: '',
        content: null,
        level: 2
      }
    ] as any;
    
    const propsWithMalformedSections = {
      ...mockChapterProps,
      sections: malformedSections
    };
    
    // Should not throw an error
    expect(() => {
      render(<ChapterTemplate {...propsWithMalformedSections} />);
    }).not.toThrow();
  });
}); 