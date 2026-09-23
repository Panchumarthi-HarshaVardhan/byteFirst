import { toPng } from 'html-to-image';

/**
 * Downloads the Digital ID Card as a high-resolution PNG image in its natural,
 * flat, un-mirrored orientation.
 *
 * Uses an isolated export clone with export-safe styles, ensuring zero 3D rotation,
 * zero horizontal flipping, zero outside shadows, and perfect dimensions.
 *
 * @param {HTMLElement} element - The DOM element of the ID card or its front face
 * @param {string} fileName - The desired download filename
 * @returns {Promise<boolean>}
 */
export const downloadCardAsImage = async (element, fileName = 'student-id-card.png') => {
  if (!element) {
    throw new Error('ID card element not found');
  }

  // Identify the canonical front card element (single source of truth)
  const target = element.id === 'downloadable-id-card' || element.classList.contains('id-card-front')
    ? element
    : (element.querySelector('#downloadable-id-card, .id-card-front') || element);

  const isHorizontal = target.classList.contains('face-horizontal') ||
    target.classList.contains('horizontal') ||
    (target.closest && target.closest('.horizontal') !== null);

  // Exact standard dimensions matching design ratio
  const cardWidth = isHorizontal ? 520 : 320;
  const cardHeight = isHorizontal ? 330 : 520;

  // Create temporary export clone
  const exportClone = target.cloneNode(true);

  if (isHorizontal) {
    exportClone.classList.add('face-horizontal');
    exportClone.classList.add('horizontal');
  }

  // Strip away any 3D back-face elements that might have been cloned
  exportClone.querySelectorAll('.id-card-back').forEach((el) => el.remove());

  // Apply dedicated export-safe class
  exportClone.classList.add('id-card-export');

  // Explicitly enforce flat, un-mirrored layout on the clone
  exportClone.style.transform = 'none';
  exportClone.style.perspective = 'none';
  exportClone.style.transformStyle = 'flat';
  exportClone.style.backfaceVisibility = 'visible';
  exportClone.style.webkitBackfaceVisibility = 'visible';
  exportClone.style.position = 'relative';
  exportClone.style.inset = 'auto';
  exportClone.style.width = `${cardWidth}px`;
  exportClone.style.height = `${cardHeight}px`;
  exportClone.style.boxShadow = 'none';
  exportClone.style.margin = '0';
  exportClone.style.animation = 'none';
  exportClone.style.transition = 'none';

  // Inherit all active theme CSS variables from the live element
  const computed = window.getComputedStyle(target);
  const themeVars = [
    '--theme-primary',
    '--theme-secondary',
    '--theme-accent',
    '--theme-header-bg',
    '--theme-light-bg',
    '--theme-badge-bg',
    '--theme-border'
  ];
  themeVars.forEach((varName) => {
    const val = computed.getPropertyValue(varName);
    if (val) {
      exportClone.style.setProperty(varName, val.trim());
    }
  });

  // Create off-screen sandbox container attached to DOM
  const container = document.createElement('div');
  container.className = 'id-card-export-sandbox';
  container.style.position = 'fixed';
  container.style.left = '-99999px';
  container.style.top = '0';
  container.style.width = `${cardWidth}px`;
  container.style.height = `${cardHeight}px`;
  container.style.overflow = 'hidden';
  container.style.zIndex = '-99999';
  container.style.opacity = '1';
  container.style.pointerEvents = 'none';
  container.style.background = 'transparent';

  container.appendChild(exportClone);
  document.body.appendChild(container);

  try {
    // Generate high-resolution image with 3x pixel ratio
    const dataUrl = await toPng(exportClone, {
      quality: 0.98,
      pixelRatio: 3,
      cacheBust: true,
      skipFonts: true,
      width: cardWidth,
      height: cardHeight,
      style: {
        transform: 'none',
        margin: '0',
        boxShadow: 'none',
        borderRadius: '16px'
      }
    });

    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error('Error generating card image:', error);
    throw error;
  } finally {
    // Always clean up the temporary export clone
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
};

/**
 * Trigger print dialog specifically configured for ID card print
 */
export const printCard = () => {
  window.print();
};
