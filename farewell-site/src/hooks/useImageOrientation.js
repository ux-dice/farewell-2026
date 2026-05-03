import { useState, useEffect } from 'react';

export function useImageOrientation(images) {
  const [orientations, setOrientations] = useState(new Map());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!images || images.length === 0) {
      setIsReady(true);
      return;
    }

    setIsReady(false);
    let loadedCount = 0;
    const currentBatchOrientations = new Map();

    images.forEach((img) => {
      // If we already have the orientation, don't reload
      if (orientations.has(img.id)) {
        currentBatchOrientations.set(img.id, orientations.get(img.id));
        loadedCount++;
        if (loadedCount === images.length) {
          setIsReady(true);
        }
        return;
      }

      const imageElement = new Image();
      imageElement.onload = () => {
        const { naturalWidth, naturalHeight } = imageElement;
        const ratio = naturalWidth / naturalHeight;

        let orientation = "square";
        if (ratio >= 1.6) orientation = "landscape";
        else if (ratio <= 0.7) orientation = "portrait";

        currentBatchOrientations.set(img.id, orientation);
        loadedCount++;

        if (loadedCount === images.length) {
          setOrientations((prev) => {
            const newMap = new Map(prev);
            currentBatchOrientations.forEach((val, key) => newMap.set(key, val));
            return newMap;
          });
          setIsReady(true);
        }
      };
      
      imageElement.onerror = () => {
        currentBatchOrientations.set(img.id, "square"); // fallback
        loadedCount++;
        if (loadedCount === images.length) {
          setOrientations((prev) => {
            const newMap = new Map(prev);
            currentBatchOrientations.forEach((val, key) => newMap.set(key, val));
            return newMap;
          });
          setIsReady(true);
        }
      };

      imageElement.src = img.src;
    });
  }, [images]);

  return { orientations, isReady };
}
