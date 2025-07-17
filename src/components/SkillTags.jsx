// components/SkillTags.jsx

import { getColorForArea } from '../utils/areaColors';

export default function SkillTags({ skills }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map(({ skill, count, area }) => (
        <span
          key={skill}
          className="text-white px-3 py-1 rounded"
          title={`Ocorrências: ${count}`}
          style={{ backgroundColor: getColorForArea(area) }}
        >
          {skill} ({count})
        </span>
      ))}
    </div>
  );
}
