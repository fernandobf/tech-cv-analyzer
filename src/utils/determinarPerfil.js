// utils/perfilUtils.js

import { techStack } from './techStack';

// Recebe array [{ skill, count }] e retorna o perfil baseado em somas por categoria
export function determinarPerfil(skillsWithCount) {
  // soma contagens por categoria
  const categoryCounts = {};
  for (const { skill, count } of skillsWithCount) {
    for (const [category, skills] of Object.entries(techStack)) {
      if (skills.includes(skill)) {
        categoryCounts[category] = (categoryCounts[category] || 0) + count;
        break;
      }
    }
  }

  const { frontend_fullstack = 0, backend = 0, devops_infra = 0, data_analytics = 0 } = categoryCounts;

  if (frontend_fullstack >= 3 && backend >= 3) {
    return "Fullstack";
  } else if (frontend_fullstack >= 3) {
    return "Frontend";
  } else if (backend >= 3) {
    return "Backend";
  } else if (devops_infra >= 3) {
    return "DevOps";
  } else if (data_analytics >= 2) {
    return "Data Analyst";
  }
  return "Generalista / Outros";
}
