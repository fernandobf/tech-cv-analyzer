import { useState, useRef } from 'react';
import TextInput from './components/TextInput';
import FileUploader from './components/FileUploader';
import SkillTags from './components/SkillTags';
import SkillChart from './components/SkillChart';
import ExportPDF from './components/ExportPDF';

import { parseText } from './utils/parseText';
import { determinarPerfil } from './utils/perfilUtils';
import { prepararTexto } from './utils/textUtils';

export default function App() {
  const [text, setText] = useState('');
  const [skills, setSkills] = useState([]);
  const [veredito, setVeredito] = useState('');
  const chartRef = useRef(null);
  const verdictRef = useRef(null);
  const tagsRef = useRef(null);

  const handleTextExtracted = (extractedText) => {
    const textoLimpo = prepararTexto(extractedText);
      console.log("Texto limpo:", textoLimpo);
    setText(textoLimpo);

    const result = parseText(textoLimpo) || { skills: [] };
    console.log("Resultado do parseText:", result);
    const extractedSkills = Array.isArray(result.skills) ? result.skills : [];
  console.log("Skills extraídas:", extractedSkills);
    setSkills(extractedSkills);
    setVeredito(determinarPerfil(extractedSkills));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
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
    </div>
  );
}
