import { useState, useRef } from "react";

interface ZoomRange {
  startIndex: number;
  endIndex: number;
}

export function useZoom(dataLength: number) {
  const [range, setRange] = useState<ZoomRange | null>(null);
  const history = useRef<ZoomRange[]>([]);

  const startIndex = range?.startIndex ?? 0;
  const endIndex = range?.endIndex ?? dataLength - 1;

  const zoomIn = () => {
    const currentRange = endIndex - startIndex + 1;
    const targetRange = Math.max(3, Math.floor(currentRange * 0.7));

    const midPoint = Math.floor((startIndex + endIndex) / 2);

    const newStart = Math.max(0, midPoint - Math.floor(targetRange / 2));
    const newEnd = Math.min(dataLength - 1, newStart + targetRange - 1);

    history.current.push({ startIndex, endIndex });
    setRange({ startIndex: newStart, endIndex: newEnd });
  };

  const zoomOut = () => {
    if (history.current.length > 0) {
      const prev = history.current.pop()!;
      setRange(prev);
      return;
    }

    const currentRange = endIndex - startIndex + 1;
    const targetRange = Math.min(dataLength, Math.floor(currentRange * 1.5));
    const midPoint = Math.floor((startIndex + endIndex) / 2);

    const newStart = Math.max(0, midPoint - Math.floor(targetRange / 2));
    const newEnd = Math.min(dataLength - 1, newStart + targetRange - 1);

    if (newStart === 0 && newEnd === dataLength - 1) {
      setRange(null);
    } else {
      setRange({ startIndex: newStart, endIndex: newEnd });
    }
  };

  const resetZoom = () => {
    history.current = [];
    setRange(null);
  };

  return {
    range,
    startIndex,
    endIndex,
    zoomIn,
    zoomOut,
    resetZoom,
  };
}
