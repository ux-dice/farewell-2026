export default function buildCollageLayout(images, orientations) {
  return images.map((img, index) => {
    const orientation = orientations.get(img.id) || "square";
    let colSpan = 4;
    let rowSpan = 1;

    const position = index % 6;

    if (position === 0) {
      colSpan = 8;
      rowSpan = 2;
    } else if (position === 1) {
      colSpan = 4;
      rowSpan = 1;
    } else if (position === 2) {
      colSpan = 4;
      rowSpan = 2;
    } else if (position === 3) {
      colSpan = 4;
      rowSpan = 1;
    } else if (position === 4) {
      colSpan = 6;
      rowSpan = 1;
    } else if (position === 5) {
      colSpan = 6;
      rowSpan = 1;
    }

    if (orientation === "portrait") {
      rowSpan = 2;
      colSpan = 3;
    } else if (orientation === "landscape" && position !== 0) {
      colSpan = 6;
      rowSpan = 1;
    }

    // Always enforce hero slot size for position 0 regardless of orientation
    if (position === 0) {
      colSpan = 8;
      rowSpan = 2;
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480;
    if (isMobile) {
      colSpan = Math.min(colSpan, 2);
      rowSpan = 1;
    }

    return {
      ...img,
      colSpan,
      rowSpan
    };
  });
}
