// components/SkillChart.jsx

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import TagCloud from './TagCloud';
import { getColorForArea } from '../utils/areaColors';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SkillChart({ skillsWithCount = [] }) {
  const validSkills = Array.isArray(skillsWithCount) ? skillsWithCount : [];

  const topSkills = [...validSkills].sort((a, b) => b.count - a.count).slice(0, 10);
  const labelsTop = topSkills.map(({ skill }) => skill);
  const dataValuesTop = topSkills.map(({ count }) => count);
  const backgroundColors = topSkills.map(({ area }) => getColorForArea(area));

  const data = {
    labels: labelsTop,
    datasets: [
      {
        label: 'Ocorrências',
        data: dataValuesTop,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Top 10 Skills no CV',
        font: { size: 18 },
      },
    },
    scales: {
      x: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Nuvem de Skills</h3>
      <TagCloud skills={validSkills} />
      <Bar data={data} options={options} />
    </div>
  );
}
