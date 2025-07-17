// utils/areaColors.js

export const areaColors = {
  'Front-End': '#3B82F6',     // azul
  'Back-End': '#10B981',      // verde
  'Banco de Dados': '#F59E0B',// amarelo
  'DevOps': '#EF4444',        // vermelho
  'Linguagem': '#8B5CF6',     // roxo
  'Styling': '#EC4899',       // rosa
  'Ferramentas': '#6B7280',   // cinza
  'Design': '#14B8A6',        // teal
  'Outros': '#9CA3AF',        // cinza claro
};

export function getColorForArea(area) {
  return areaColors[area] || '#9CA3AF';
}
