import { useState } from 'react';
import { sendGAEvent } from '../utils/analytics';

export default function TextInput({ onExtractText }) {  // mudou aqui
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    sendGAEvent("analisar_texto", "Interação", "Texto colado manualmente");
    if (value.trim()) onExtractText(value);  // aqui usa onExtractText
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Cole o currículo abaixo:</label>
      <textarea
        className="text-black w-full p-4 border border-gray-300 rounded-lg h-48"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cole aqui o conteúdo do CV..."
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Analisar texto
      </button>
    </div>
  );
}
