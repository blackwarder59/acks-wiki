'use client';

import { Search, ChevronDown, ChevronRight, Shield, Sword, Crown, Heart, Zap, Users, Book } from 'lucide-react'
import { useState, useEffect } from 'react'
import allClasses from '@/data/all-classes.json'

// Type for class data
type ClassData = typeof allClasses[0]

// API function to load class content
async function loadClassContent(sourceFile: string): Promise<string> {
  try {
    const response = await fetch(`/api/load-class-content?file=${encodeURIComponent(sourceFile)}`);
    if (!response.ok) {
      throw new Error(`Failed to load content: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.warn('Failed to load class content:', error);
    return '';
  }
}

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Core': true,
    'Optional': false,
    'Racial': false
  });
  const [expandedClasses, setExpandedClasses] = useState<Record<string, boolean>>({});
  const [classContents, setClassContents] = useState<Record<string, string>>({});
  const [loadingContent, setLoadingContent] = useState<Record<string, boolean>>({});
  
  // Filter classes based on search term
  const filteredClasses = allClasses.filter(classData => {
    if (!searchTerm) return true;
    return classData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           classData.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           classData.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           classData.keyAttribute?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Group classes by category
  const classesByCategory = {
    'Core': filteredClasses.filter(c => c.category === 'Core'),
    'Optional': filteredClasses.filter(c => c.category === 'Optional'),
    'Racial': filteredClasses.filter(c => c.category === 'Racial')
  };

  // Toggle category accordion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Toggle class expansion and load content if needed
  const toggleClass = async (classId: string) => {
    const isExpanding = !expandedClasses[classId];
    
    setExpandedClasses(prev => ({
      ...prev,
      [classId]: isExpanding
    }));

    // Load class content if expanding and not already loaded
    if (isExpanding && !classContents[classId]) {
      const classData = allClasses.find(c => c.id === classId);
      if (classData) {
        setLoadingContent(prev => ({ ...prev, [classId]: true }));
        
        try {
          const content = await loadClassContent(classData.sourceFile);
          setClassContents(prev => ({
            ...prev,
            [classId]: content || `# ${classData.name}\n\n${classData.description}\n\n*Full content could not be loaded.*`
          }));
        } catch (error) {
          console.warn(`Could not load content for ${classId}:`, error);
          setClassContents(prev => ({
            ...prev,
            [classId]: `# ${classData.name}\n\n${classData.description}\n\n*Error loading full content.*`
          }));
        } finally {
          setLoadingContent(prev => ({ ...prev, [classId]: false }));
        }
      }
    }
  };

  // Category icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Core': return <Shield className="h-4 w-4 text-blue-500" />;
      case 'Optional': return <Sword className="h-4 w-4 text-green-500" />;
      case 'Racial': return <Crown className="h-4 w-4 text-purple-500" />;
      default: return <Book className="h-4 w-4" />;
    }
  };

  // Get category description
  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'Core': return 'Essential character classes for any campaign';
      case 'Optional': return 'Advanced character options for expanded gameplay';
      case 'Racial': return 'Culture-specific classes with unique abilities';
      default: return '';
    }
  };

  // Convert markdown to basic HTML (simplified)
  const markdownToHtml = (markdown: string) => {
    let html = markdown;
    
    // Split content into blocks and process tables
    const blocks = html.split(/\n\s*\n/);
    
    const processedBlocks = blocks.map((block, index) => {
      // Check if this block contains a table (multiple lines with |)
      const lines = block.trim().split('\n');
      const tableLines = lines.filter(line => line.includes('|') && line.trim().length > 2);
      
      if (tableLines.length >= 3) { // At least header, separator, and one data row
        // This is a table block
        let tableHtml = '<table class="w-full border-collapse border border-gray-400 mb-6 text-sm">';
        let isFirstDataRow = true;
        
        for (const line of tableLines) {
          // Split by | but preserve content within each cell
          const rawCells = line.split('|');
          const cells = rawCells.slice(1, -1).map(cell => cell.trim()); // Remove empty first/last and trim
          
          // Skip separator rows (only dashes and spaces)
          if (cells.every(cell => /^[\s-:]*$/.test(cell))) {
            continue;
          }
          
          // Skip empty rows
          if (cells.length === 0 || cells.every(cell => cell === '')) {
            continue;
          }
          
          // Determine if header (has ** or is first meaningful row)
          const isHeader = cells.some(cell => cell.includes('**')) || isFirstDataRow;
          if (isFirstDataRow) isFirstDataRow = false;
          
          const cellTag = isHeader ? 'th' : 'td';
          const headerClass = 'border border-gray-400 px-3 py-2 font-bold bg-gray-200 dark:bg-gray-700 text-center';
          const dataClass = 'border border-gray-400 px-3 py-2 text-left';
          
          tableHtml += '<tr>';
          cells.forEach((cell, cellIndex) => {
            // Clean cell content but preserve spaces and structure
            let cleanCell = cell
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\\\*/g, '*')
              .replace(/\s+/g, ' ') // Normalize multiple spaces to single space
              .trim();
            
            // Handle empty cells
            if (!cleanCell) {
              cleanCell = '&nbsp;';
            }
            
            // For first column (usually numbers/ranges), center align
            const cellClass = cellIndex === 0 ? 
              (isHeader ? headerClass : 'border border-gray-400 px-3 py-2 text-center') :
              (isHeader ? headerClass : dataClass);
            
            tableHtml += `<${cellTag} class="${cellClass}">${cleanCell}</${cellTag}>`;
          });
          tableHtml += '</tr>';
        }
        
        tableHtml += '</table>';
        return tableHtml;
      }
      
      return block; // Not a table, return as is
    });
    
    html = processedBlocks.join('\n\n');
    
    // Now handle other markdown elements
    html = html
      // Headers
      .replace(/^######\s+(.*$)/gim, '<h6 class="text-sm font-semibold mt-4 mb-2 text-purple-600 border-b border-purple-200 pb-1">$1</h6>')
      .replace(/^#####\s+(.*$)/gim, '<h5 class="text-base font-semibold mt-5 mb-3 text-indigo-600">$1</h5>')
      .replace(/^####\s+(.*$)/gim, '<h4 class="text-lg font-semibold mt-6 mb-3 text-blue-600">$1</h4>')
      .replace(/^###\s+(.*$)/gim, '<h3 class="text-xl font-semibold mt-8 mb-4 text-green-600 border-b border-green-200 pb-2">$1</h3>')
      .replace(/^##\s+(.*$)/gim, '<h2 class="text-2xl font-semibold mt-10 mb-6 text-orange-600 border-b-2 border-orange-200 pb-3">$1</h2>')
      .replace(/^#\s+(.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-8 text-red-600 border-b-2 border-red-200 pb-4">$1</h1>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Handle paragraph breaks
      .replace(/\n\n+/g, '</p><p class="mb-4">')
      // Convert single newlines to spaces
      .replace(/\n(?!<)/g, ' ');
    
    // Wrap in container
    html = '<div class="prose prose-sm max-w-none text-foreground">' + html + '</div>';
    
    // Clean up paragraph wrapping
    html = html.replace(/^([^<])/gm, '<p class="mb-4">$1');
    html = html.replace(/([^>])$/gm, '$1</p>');
    
    // Clean up extra paragraph tags around block elements
    html = html.replace(/<p class="mb-4">(<(?:table|h[1-6])[^>]*>)/g, '$1');
    html = html.replace(/(<\/(?:table|h[1-6])>)<\/p>/g, '$1');
    html = html.replace(/<p class="mb-4"><\/p>/g, '');
    
    return html;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Character Classes</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Explore the {filteredClasses.length} character classes available in the Auran Empire. 
          From mighty fighters to wise mages, discover the perfect class for your adventuring career.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search classes by name, category, or abilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Class Categories Accordion */}
      <div className="space-y-4">
        {Object.entries(classesByCategory).map(([category, classes]) => {
          if (classes.length === 0) return null;
          
          return (
            <div key={category} className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(category)}
                  <div className="text-left">
                    <h2 className="text-xl font-semibold text-foreground">
                      {category} Classes
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {getCategoryDescription(category)} • {classes.length} classes
                    </p>
                  </div>
                </div>
                {expandedCategories[category] ? 
                  <ChevronDown className="h-5 w-5 text-muted-foreground" /> : 
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                }
              </button>

              {/* Category Content */}
              {expandedCategories[category] && (
                <div className="border-t border-border">
                  {/* Classes Directory */}
                  <div className="divide-y divide-border">
                    {classes.map((classData) => (
                      <div key={classData.id}>
                        {/* Class Row */}
                        <button
                          onClick={() => toggleClass(classData.id)}
                          className="w-full p-4 hover:bg-accent/30 transition-colors text-left"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                              {/* Class Name */}
                              <div className="md:col-span-2">
                                <h3 className="font-semibold text-foreground">{classData.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {classData.description}
                                </p>
                              </div>
                              
                              {/* Key Stats */}
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Zap className="h-3 w-3 text-yellow-500" />
                                <span>{classData.keyAttribute}</span>
                              </div>
                              
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Heart className="h-3 w-3 text-red-500" />
                                <span>{classData.hitDice}</span>
                              </div>
                              
                              <div className="text-sm text-muted-foreground">
                                Level 1-{classData.maximumLevel}
                              </div>
                              
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Users className="h-3 w-3 text-blue-500" />
                                <span>{classData.templatesCount} templates</span>
                              </div>
                            </div>
                            
                            {/* Expand Icon */}
                            <div className="ml-4">
                              {loadingContent[classData.id] ? (
                                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                              ) : expandedClasses[classData.id] ? (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </button>

                        {/* Expanded Class Content */}
                        {expandedClasses[classData.id] && (
                          <div className="px-4 pb-4 bg-accent/20">
                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-background border border-border rounded-lg mb-4">
                              <div>
                                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Requirements</div>
                                <div className="text-sm font-medium">{classData.requirements}</div>
                              </div>
                              <div>
                                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Key Attribute</div>
                                <div className="text-sm font-medium">{classData.keyAttribute}</div>
                              </div>
                              <div>
                                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Hit Dice</div>
                                <div className="text-sm font-medium">{classData.hitDice}</div>
                              </div>
                              <div>
                                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Max Level</div>
                                <div className="text-sm font-medium">{classData.maximumLevel}</div>
                              </div>
                            </div>

                            {/* Class Powers */}
                            {classData.classPowers && classData.classPowers.length > 0 && (
                              <div className="mb-4 p-4 bg-background border border-border rounded-lg">
                                <h4 className="text-sm font-semibold mb-2 flex items-center">
                                  <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                                  Class Powers
                                </h4>
                                <div className="text-sm text-muted-foreground">
                                  {classData.classPowers.join(' • ')}
                                </div>
                              </div>
                            )}

                            {/* Combat & Proficiency Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              {classData.combatProgression && (
                                <div className="p-4 bg-background border border-border rounded-lg">
                                  <h4 className="text-sm font-semibold mb-2">Combat Progression</h4>
                                  <p className="text-xs text-muted-foreground">{classData.combatProgression}</p>
                                </div>
                              )}
                              {classData.proficiencyProgression && (
                                <div className="p-4 bg-background border border-border rounded-lg">
                                  <h4 className="text-sm font-semibold mb-2">Proficiency Progression</h4>
                                  <p className="text-xs text-muted-foreground">{classData.proficiencyProgression}</p>
                                </div>
                              )}
                            </div>

                            {/* Full Class Content */}
                            <div className="p-4 bg-background border border-border rounded-lg">
                              <h4 className="text-sm font-semibold mb-4 flex items-center">
                                <Book className="h-4 w-4 mr-2 text-purple-500" />
                                Complete Class Description
                              </h4>
                              {loadingContent[classData.id] ? (
                                <div className="text-center py-8">
                                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                                  <p className="text-sm text-muted-foreground">Loading class content...</p>
                                </div>
                              ) : classContents[classData.id] ? (
                                <div className="overflow-x-auto">
                                  <div 
                                    className="rpg-content text-foreground"
                                    dangerouslySetInnerHTML={{ 
                                      __html: markdownToHtml(classContents[classData.id]) 
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="text-sm text-muted-foreground italic">
                                  Content will load when expanded...
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No Results Message */}
      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Classes Found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms.
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-primary hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
} 