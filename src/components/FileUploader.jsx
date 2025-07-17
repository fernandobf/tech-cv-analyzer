import { useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker';
import { prepararTexto } from '../utils/textUtils';

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfWorker();

export default function FileUploader({ onExtractText }) {
  const inputRef = useRef();

  const handleFile = async (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== 'application/pdf') return;

    const reader = new FileReader();
    reader.onload = async function () {
      const typedarray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;

      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str);
        fullText += strings.join(' ') + ' ';
      }

      const textoLimpo = prepararTexto(fullText);
      onExtractText(textoLimpo);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Ou envie um PDF:</label>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFile}
        className="w-full"
      />
    </div>
  );
}
