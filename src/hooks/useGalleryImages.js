import { useMemo } from 'react';
import content from '../data/content.json';

export function useGalleryImages() {
  return useMemo(() => {
    // 1. Load local images from assets folder
    const globModules = import.meta.glob('/src/assets/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
    
    const localEntries = Object.entries(globModules);
    
    const localImages = localEntries.map(([path, mod]) => {
      const fileName = path.split('/').pop() || '';
      const nameWithoutExt = fileName.split('.')[0] || '';
      // Convert "img12" or "class_photo" to "Class Photo" or "Memory 12"
      const cleanName = nameWithoutExt
        .replace(/^img(\d+)/i, 'Memory $1')
        .replace(/[_-]/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());

      return {
        id: `local-${path}`,
        src: mod.default,
        caption: cleanName || 'Cherished Moment',
        category: 'Local'
      };
    });

    // 2. Load external/manual images from content.json
    const jsonImages = (content.photos || []).map(p => ({
      ...p,
      id: `json-${p.id}`,
      // Ensure category is present
      category: p.category || 'Memories'
    }));

    const combined = [...localImages, ...jsonImages];

    if (combined.length === 0) {
      console.warn('No images found in /src/assets/photos/ or content.json');
    } else {
      console.info(`Loaded ${combined.length} images (${localImages.length} local, ${jsonImages.length} from JSON)`);
    }

    return combined;
  }, []);
}
