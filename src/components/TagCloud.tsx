// components/TagCloud.tsx

import React from 'react';
import { getColorForArea } from '../utils/areaColors';

type Skill = {
  skill: string;
  count: number;
  area: string;
};

type TagCloudProps = {
  skills: Skill[];
};

export default function TagCloud({ skills = [] }: TagCloudProps) {
  if (!skills.length) return null;

  const max = Math.max(...skills.map(s => s.count));

  return (
    <div className="flex flex-wrap gap-3 mt-4 mb-6">
      {skills.map(({ skill, count, area }) => {
        const scale = 1 + (count / max) * 1.5;
        return (
          <span
            key={skill}
            className="px-3 py-1 rounded-full font-semibold transition-all text-white"
            style={{
              fontSize: `${scale}rem`,
              lineHeight: 1,
              cursor: 'default',
              backgroundColor: getColorForArea(area),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {skill}
          </span>
        );
      })}
    </div>
  );
}
