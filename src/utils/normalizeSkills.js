// utils/normalizeSkills.js

const normalizationMap = {
  'vue': 'Vue.js',
  'vuejs': 'Vue.js',
  'vue.js': 'Vue.js',
  'react': 'React',
  'reactjs': 'React',
  'react.js': 'React',
  'next': 'Next.js',
  'nextjs': 'Next.js',
  'next.js': 'Next.js',
  'nuxt': 'Nuxt.js',
  'nuxtjs': 'Nuxt.js',
  'node': 'Node.js',
  'nodejs': 'Node.js',
  'js': 'JavaScript',
  'ts': 'TypeScript',
  'tailwind': 'TailwindCSS',
  'tailwindcss': 'TailwindCSS',
  'mui': 'Material UI',
  'material-ui': 'Material UI',
  'scss': 'SASS',
  'sass': 'SASS',
  'postgresql': 'PostgreSQL',
  'mongo': 'MongoDB',
  'mongodb': 'MongoDB'
};

const skillToArea = {
  'Vue.js': 'Front-End',
  'React': 'Front-End',
  'Next.js': 'Front-End',
  'Nuxt.js': 'Front-End',
  'Angular': 'Front-End',
  'SASS': 'Styling',
  'TailwindCSS': 'Styling',
  'Material UI': 'Styling',
  'JavaScript': 'Linguagem',
  'TypeScript': 'Linguagem',
  'Node.js': 'Back-End',
  'Python': 'Back-End',
  'Java': 'Back-End',
  'C#': 'Back-End',
  'Ruby': 'Back-End',
  'Go': 'Back-End',
  'SQL': 'Banco de Dados',
  'PostgreSQL': 'Banco de Dados',
  'MongoDB': 'Banco de Dados',
  'MySQL': 'Banco de Dados',
  'Redis': 'Banco de Dados',
  'Docker': 'DevOps',
  'Kubernetes': 'DevOps',
  'AWS': 'DevOps',
  'GCP': 'DevOps',
  'Azure': 'DevOps',
  'Jenkins': 'DevOps',
  'Git': 'Ferramentas',
  'Figma': 'Design',
  'Photoshop': 'Design',
};

export function normalizeSkill(skill) {
  const normalized = normalizationMap[skill.toLowerCase().trim()] || skill;
  const area = skillToArea[normalized] || 'Outros';
  return { normalized, area };
}
