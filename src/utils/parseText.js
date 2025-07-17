// utils/parseText.js

import { techStack } from './techStack';
import { normalizeSkill } from './normalizeSkills';

export function parseText(text) {
  const skillCounts = {};
  const lowerText = text.toLowerCase();

  for (const skills of Object.values(techStack)) {
    for (const skill of skills) {
      const skillLower = skill.toLowerCase();
      const regex = new RegExp(`\\b${skillLower}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) {
        const { normalized, area } = normalizeSkill(skillLower);
        const key = normalized;

        if (!skillCounts[key]) {
          skillCounts[key] = { count: 0, area };
        }

        skillCounts[key].count += matches.length;
      }
    }
  }

  const skills = Object.entries(skillCounts).map(([skill, data]) => ({
    skill,
    count: data.count,
    area: data.area,
  }));

  return { skills }; // Agora com skill, count e area
}
