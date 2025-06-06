'use client';

import React from 'react';
import ChapterTemplate from '@/components/rulebook/chapter-template';

/**
 * Chapter 1: Characters (Simplified)
 */
export default function Chapter1CharactersPage() {
  const chapterContent = {
    id: 'chapter-1-characters',
    chapterNumber: 1,
    title: 'Characters',
    description: 'Character creation, attributes, and basic character mechanics',
    introduction: `This chapter covers character creation in ACKS II. Here you'll learn how to create memorable characters for your adventures.`,
    sections: [
      {
        id: 'creating-characters',
        title: 'Creating Characters',
        content: `Characters in ACKS II are created through a simple process of rolling ability scores, choosing a class, and determining starting equipment.`,
        level: 2
      },
      {
        id: 'ability-scores',
        title: 'Ability Scores',
        content: `Characters have six ability scores: Strength, Intelligence, Wisdom, Dexterity, Constitution, and Charisma. These determine your character's natural capabilities.`,
        level: 2
      }
    ],
    appendix: false
  };

  return (
    <ChapterTemplate
      chapterNumber={chapterContent.chapterNumber}
      title={chapterContent.title}
      description={chapterContent.description}
      introduction={chapterContent.introduction}
      sections={chapterContent.sections}
      appendix={chapterContent.appendix}
      nextChapter={{
        href: '/rules/chapter-2-classes',
        title: 'Classes'
      }}
    />
  );
} 