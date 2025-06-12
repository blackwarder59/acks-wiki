/**
 * ACKS II Content Type Detection
 * 
 * This module analyzes markdown content to automatically determine
 * what type of ACKS II content it contains (monster, spell, class, etc.)
 * based on structural patterns, headers, and keywords.
 * 
 * @author ACKS II Wiki Development Team
 * @version 1.0.0
 */

import { ContentType } from '../types/content';
import { ContentDetectionResult } from './types';
import { extractSection, cleanMarkdownText } from './parsing-utils';

/**
 * Detect the content type of markdown content
 * 
 * @param markdown - Raw markdown content to analyze
 * @returns Detection result with confidence scores
 */
export function detectContentType(markdown: string): ContentDetectionResult {
  const cleanText = cleanMarkdownText(markdown).toLowerCase();
  const sections = extractSection(markdown);
  const headers = sections.map(s => s.title.toLowerCase());
  
  // Calculate confidence scores for each content type
  const scores = {
    [ContentType.MONSTER]: calculateMonsterScore(cleanText, headers, markdown),
    [ContentType.SPELL]: calculateSpellScore(cleanText, headers, markdown),
    [ContentType.CLASS]: calculateClassScore(cleanText, headers, markdown),
    [ContentType.EQUIPMENT]: calculateEquipmentScore(cleanText, headers, markdown),
    [ContentType.RULE]: calculateRuleScore(cleanText, headers),
    [ContentType.PROFICIENCY]: calculateProficiencyScore(cleanText, headers),
    [ContentType.DOMAIN_RULE]: calculateDomainRuleScore(cleanText, headers),
    [ContentType.JUDGE_TOOL]: calculateJudgeToolScore(cleanText, headers)
  };
  
  // Find the highest scoring content type
  const sortedScores = Object.entries(scores)
    .map(([type, data]) => ({ contentType: type as ContentType, ...data }))
    .sort((a, b) => b.confidence - a.confidence);
  
  const best = sortedScores[0];
  const alternatives = sortedScores.slice(1, 3).map(({ contentType, confidence }) => ({
    contentType,
    confidence
  }));
  
  return {
    contentType: best.contentType,
    confidence: best.confidence,
    indicators: best.indicators,
    alternatives
  };
}

/**
 * Calculate confidence score for monster content
 */
function calculateMonsterScore(
  cleanText: string, 
  headers: string[], 
  markdown: string
): { confidence: number; indicators: string[] } {
  const indicators: string[] = [];
  let score = 0;
  
  // Strong indicators (high weight)
  if (markdown.includes('| Hit Dice |') || markdown.includes('|Hit Dice|')) {
    score += 0.4;
    indicators.push('Hit Dice table field');
  }
  
  if (markdown.includes('| Armor Class |') || markdown.includes('|Armor Class|')) {
    score += 0.3;
    indicators.push('Armor Class table field');
  }
  
  if (markdown.includes('| Attacks |') || markdown.includes('|Attacks|')) {
    score += 0.3;
    indicators.push('Attacks table field');
  }
  
  // Medium indicators
  if (cleanText.includes('monstrosity') || cleanText.includes('bestial')) {
    score += 0.2;
    indicators.push('Monster type keywords');
  }
  
  if (headers.some(h => h.includes('encounter') || h.includes('combat'))) {
    score += 0.15;
    indicators.push('Encounter/Combat sections');
  }
  
  if (headers.some(h => h.includes('ecology') || h.includes('spoils'))) {
    score += 0.15;
    indicators.push('Ecology/Spoils sections');
  }
  
  // Weak indicators
  if (cleanText.includes('treasure type') || cleanText.includes('experience points')) {
    score += 0.1;
    indicators.push('Treasure/XP references');
  }
  
  return { confidence: Math.min(score, 1.0), indicators };
}

/**
 * Calculate confidence score for spell content
 */
function calculateSpellScore(
  cleanText: string, 
  headers: string[], 
  markdown: string
): { confidence: number; indicators: string[] } {
  const indicators: string[] = [];
  let score = 0;
  
  // Strong indicators
  if (cleanText.includes('spell level') || markdown.includes('Level:')) {
    score += 0.4;
    indicators.push('Spell level reference');
  }
  
  if (cleanText.includes('arcane') || cleanText.includes('divine')) {
    score += 0.3;
    indicators.push('Magic type (Arcane/Divine)');
  }
  
  if (cleanText.includes('range:') || cleanText.includes('duration:')) {
    score += 0.3;
    indicators.push('Spell parameters (Range/Duration)');
  }
  
  // Medium indicators
  if (cleanText.includes('caster') || cleanText.includes('casting')) {
    score += 0.2;
    indicators.push('Casting references');
  }
  
  if (cleanText.includes('components') || cleanText.includes('material component')) {
    score += 0.15;
    indicators.push('Spell components');
  }
  
  // Weak indicators
  if (cleanText.includes('saving throw') || cleanText.includes('spell resistance')) {
    score += 0.1;
    indicators.push('Spell mechanics');
  }
  
  return { confidence: Math.min(score, 1.0), indicators };
}

/**
 * Calculate confidence score for character class content
 */
function calculateClassScore(
  cleanText: string, 
  headers: string[], 
  markdown: string
): { confidence: number; indicators: string[] } {
  const indicators: string[] = [];
  let score = 0;
  
  // Strong indicators
  if (headers.some(h => h.includes('level progression') || h.includes('advancement'))) {
    score += 0.4;
    indicators.push('Level progression section');
  }
  
  if (markdown.includes('| Experience |') || markdown.includes('| Level |')) {
    score += 0.3;
    indicators.push('Experience/Level table');
  }
  
  if (cleanText.includes('hit dice') && cleanText.includes('proficiencies')) {
    score += 0.3;
    indicators.push('Class mechanics (Hit Dice + Proficiencies)');
  }
  
  // Medium indicators
  if (headers.some(h => h.includes('combat') && h.includes('progression'))) {
    score += 0.2;
    indicators.push('Combat progression section');
  }
  
  if (cleanText.includes('class powers') || cleanText.includes('class abilities')) {
    score += 0.15;
    indicators.push('Class powers/abilities');
  }
  
  if (headers.some(h => h.includes('templates') || h.includes('starting'))) {
    score += 0.15;
    indicators.push('Character templates section');
  }
  
  return { confidence: Math.min(score, 1.0), indicators };
}

/**
 * Calculate confidence score for equipment content
 */
function calculateEquipmentScore(
  cleanText: string, 
  headers: string[], 
  markdown: string
): { confidence: number; indicators: string[] } {
  const indicators: string[] = [];
  let score = 0;
  
  // Strong indicators
  if (markdown.includes('| Cost |') || markdown.includes('| Weight |')) {
    score += 0.4;
    indicators.push('Cost/Weight table fields');
  }
  
  if (cleanText.includes('gold pieces') || cleanText.includes('gp')) {
    score += 0.3;
    indicators.push('Currency references');
  }
  
  // Medium indicators
  if (cleanText.includes('weapon') || cleanText.includes('armor') || cleanText.includes('shield')) {
    score += 0.2;
    indicators.push('Equipment type keywords');
  }
  
  if (cleanText.includes('damage') && cleanText.includes('range')) {
    score += 0.15;
    indicators.push('Weapon statistics');
  }
  
  if (headers.some(h => h.includes('availability') || h.includes('market'))) {
    score += 0.15;
    indicators.push('Market availability section');
  }
  
  return { confidence: Math.min(score, 1.0), indicators };
}

/**
 * Calculate confidence score for rule content
 */
function calculateRuleScore(
  cleanText: string, 
  headers: string[]
): { confidence: number; indicators: string[] } {
  const indicators: string[] = [];
  let score = 0;
  
  // Strong indicators
  if (headers.some(h => h.includes('rule') || h.includes('procedure'))) {
    score += 0.3;
    indicators.push('Rule/Procedure headers');
  }
  
  if (cleanText.includes('game master') || cleanText.includes('judge')) {
    score += 0.2;
    indicators.push('GM/Judge references');
  }
  
  // Medium indicators
  if (headers.some(h => h.includes('example') || h.includes('application'))) {
    score += 0.15;
    indicators.push('Examples/Applications section');
  }
  
  if (cleanText.includes('roll') || cleanText.includes('check') || cleanText.includes('throw')) {
    score += 0.1;
    indicators.push('Dice mechanics');
  }
  
  return { confidence: Math.min(score, 1.0), indicators };
}

/**
 * Calculate confidence score for proficiency content
 */
function calculateProficiencyScore(
  cleanText: string, 
  headers: string[]
): { confidence: number; indicators: string[] } {
  const indicators: string[] = [];
  let score = 0;
  
  // Strong indicators
  if (cleanText.includes('proficiency') && (cleanText.includes('general') || cleanText.includes('class'))) {
    score += 0.4;
    indicators.push('Proficiency type classification');
  }
  
  if (cleanText.includes('prerequisite') || cleanText.includes('requirements')) {
    score += 0.2;
    indicators.push('Prerequisites section');
  }
  
  // Medium indicators
  if (cleanText.includes('bonus') || cleanText.includes('modifier')) {
    score += 0.15;
    indicators.push('Mechanical bonuses');
  }
  
  if (headers.some(h => h.includes('effect') || h.includes('benefit'))) {
    score += 0.15;
    indicators.push('Effects/Benefits section');
  }
  
  return { confidence: Math.min(score, 1.0), indicators };
}

/**
 * Calculate confidence score for domain rule content
 */
function calculateDomainRuleScore(
  cleanText: string, 
  headers: string[]
): { confidence: number; indicators: string[] } {
  const indicators: string[] = [];
  let score = 0;
  
  // Strong indicators
  if (cleanText.includes('domain') && (cleanText.includes('rule') || cleanText.includes('management'))) {
    score += 0.4;
    indicators.push('Domain management keywords');
  }
  
  if (headers.some(h => h.includes('domain') || h.includes('realm'))) {
    score += 0.3;
    indicators.push('Domain/Realm sections');
  }
  
  // Medium indicators
  if (cleanText.includes('stronghold') || cleanText.includes('settlement')) {
    score += 0.2;
    indicators.push('Settlement references');
  }
  
  if (cleanText.includes('population') || cleanText.includes('revenue')) {
    score += 0.15;
    indicators.push('Domain statistics');
  }
  
  return { confidence: Math.min(score, 1.0), indicators };
}

/**
 * Calculate confidence score for judge tool content
 */
function calculateJudgeToolScore(
  cleanText: string, 
  headers: string[]
): { confidence: number; indicators: string[] } {
  const indicators: string[] = [];
  let score = 0;
  
  // Strong indicators
  if (headers.some(h => h.includes('judge') && (h.includes('tool') || h.includes('guide')))) {
    score += 0.4;
    indicators.push('Judge tool/guide headers');
  }
  
  if (cleanText.includes('game master') || cleanText.includes('referee')) {
    score += 0.2;
    indicators.push('GM/Referee references');
  }
  
  // Medium indicators
  if (headers.some(h => h.includes('table') || h.includes('generator'))) {
    score += 0.15;
    indicators.push('Random table/generator sections');
  }
  
  if (cleanText.includes('campaign') || cleanText.includes('adventure')) {
    score += 0.1;
    indicators.push('Campaign/Adventure references');
  }
  
  return { confidence: Math.min(score, 1.0), indicators };
} 