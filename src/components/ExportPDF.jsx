import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ExportPDF({ chartRef, verdictRef, tagsRef }) {
  const handleExport = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const margin = 10;
    let yOffset = margin;

    // Título com data e hora
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();
    const exportInfo = `Relatório exportado em ${dateStr} às ${timeStr}`;

    pdf.setFontSize(12);
    pdf.text(exportInfo, margin, yOffset);
    yOffset += 10;

    // Captura do gráfico (canvas)
    const chartCanvas = chartRef.current?.querySelector('canvas');
    if (chartCanvas) {
      const chartImgData = chartCanvas.toDataURL('image/png');
      pdf.addImage(chartImgData, 'PNG', margin, yOffset, 190, 100); // largura ajustada
      yOffset += 110;
    }

    // Captura da nuvem de skills
    if (tagsRef.current) {
      const tagsCanvas = await html2canvas(tagsRef.current, {
        backgroundColor: '#ffffff'
      });
      const tagsImg = tagsCanvas.toDataURL('image/png');
      pdf.addImage(tagsImg, 'PNG', margin, yOffset, 190, 0); // altura automática
      yOffset += 10 + tagsCanvas.height * 0.264583; // px to mm
    }

    // Captura do veredicto
    if (verdictRef.current) {
      const verdictCanvas = await html2canvas(verdictRef.current, {
        backgroundColor: '#ffffff'
      });
      const verdictImg = verdictCanvas.toDataURL('image/png');
      pdf.addImage(verdictImg, 'PNG', margin, yOffset, 190, 0);
    }

    pdf.save('relatorio.pdf');
  };

  return (
    <button
      className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-md transition w-full"
      onClick={handleExport}
    >
      Exportar PDF
    </button>
  );
}
