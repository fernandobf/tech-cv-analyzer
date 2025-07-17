import { useState, useRef } from 'react';
import TextInput from './components/TextInput';
import FileUploader from './components/FileUploader';
import SkillTags from './components/SkillTags';
import SkillChart from './components/SkillChart';
import ExportPDF from './components/ExportPDF';
import { trackEvent } from './utils/ga';

import { parseText } from './utils/parseText';
import { determinarPerfil } from './utils/perfilUtils';
import { prepararTexto } from './utils/textUtils';

type Skill = {
  skill: string;
  count: number;
  area: string;
};

export default function App() {
  const [text, setText] = useState<string>('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [veredito, setVeredito] = useState<string>('');
  const chartRef = useRef<HTMLDivElement>(null);
  const verdictRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  const handleTextExtracted = (extractedText: string) => {
    const textoLimpo = prepararTexto(extractedText);
    console.log("Texto limpo:", textoLimpo);
    setText(textoLimpo);

    const result = parseText(textoLimpo) || { skills: [] };
    const extractedSkills = Array.isArray(result.skills) ? (result.skills as Skill[]) : [];
    setSkills(extractedSkills);
    setVeredito(determinarPerfil(extractedSkills));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-center">Tech CV Analyzer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <TextInput onExtractText={handleTextExtracted} />
        <FileUploader onExtractText={handleTextExtracted} />
      </div>

      {skills.length > 0 && (
        <>
          <div
            ref={verdictRef}
            className="mt-6 p-4 border rounded-xl bg-gray-100 text-lg mb-6"
          >
            Perfil detectado: <strong>{veredito}</strong>
          </div>

          <div ref={tagsRef}>
            <SkillTags skills={skills} />
          </div>

          <div ref={chartRef}>
            <SkillChart skillsWithCount={skills} />
          </div>

          <ExportPDF chartRef={chartRef} tagsRef={tagsRef} verdictRef={verdictRef} />
        </>
      )}

<footer className="mt-12 text-center text-sm text-gray-500 mt-auto">
  Criado por{' '}
  <a
    href="https://www.linkedin.com/in/fernandobf/"
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => {
      trackEvent('click_linkedin', {
        event_category: 'engagement',
        event_label: 'Rodapé - LinkedIn',
        value: 1,
      });
    }} 
    className="text-blue-600 hover:underline"
  >
    fernandobf
  </a>
</footer>


    </div>
  );
}
