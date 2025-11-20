import html2canvas from "html2canvas";
import Button from "../../UI/Button/Button";

interface Props {
  chartRef: React.RefObject<HTMLDivElement | null>; // <- Исправлено
}

export default function ExportButton({ chartRef }: Props) {
  const handleExport = async () => {
    if (!chartRef.current) return;

    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const timestamp = new Date().toISOString().slice(0, 10);
        link.href = url;
        link.download = `conversion-chart-${timestamp}.png`;
        link.click();

        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error("Failed to export chart:", error);
    }
  };

  return (
    <Button onClick={handleExport} title="Export chart to PNG">
      Export to PNG
    </Button>
  );
}
