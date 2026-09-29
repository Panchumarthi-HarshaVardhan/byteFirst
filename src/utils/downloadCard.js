import { toPng } from 'html-to-image';

/**
 * Downloads a side of the ID card (front or back) as a high-resolution PNG image.
 * Strips away selection rings, resize handles, floating toolbars, and guides.
 * Renders in natural flat, un-mirrored orientation.
 *
 * @param {HTMLElement|string} elementOrSide - Target element or 'front' | 'back'
 * @param {string} fileName - Desired output filename
 * @returns {Promise<boolean>}
 */
export const downloadCardAsImage = async (elementOrSide = 'front', fileName = 'student-id-card.png') => {
  let target;
  if (typeof elementOrSide === 'string') {
    target = document.getElementById(elementOrSide === 'back' ? 'downloadable-id-card-back' : 'downloadable-id-card');
  } else if (elementOrSide && elementOrSide.nodeType) {
    if (elementOrSide.id === 'downloadable-id-card' || elementOrSide.id === 'downloadable-id-card-back') {
      target = elementOrSide;
    } else {
      target = elementOrSide.querySelector('#downloadable-id-card') ||
               elementOrSide.querySelector('#downloadable-id-card-back') ||
               elementOrSide;
    }
  } else {
    target = document.getElementById('downloadable-id-card');
  }

  if (!target) {
    throw new Error('ID card element not found for export');
  }

  const isBack = target.id === 'downloadable-id-card-back' || target.classList.contains('id-card-back');
  const isHorizontal = target.style.width === '600px' ||
    target.classList.contains('face-horizontal') ||
    target.classList.contains('horizontal') ||
    (target.closest && target.closest('.orientation-horizontal') !== null);

  const cardWidth = isHorizontal ? 600 : 380;
  const cardHeight = isHorizontal ? 380 : 600;

  // Create temporary export clone
  const exportClone = target.cloneNode(true);

  // If exporting front, strip away back face elements if any
  if (!isBack) {
    exportClone.querySelectorAll('.id-card-back, .rotate-y-180').forEach((el) => el.remove());
  }

  // Strip away selection outlines and resize handles
  exportClone.querySelectorAll('[class*="ring-2"], [class*="ring-1"]').forEach((el) => {
    el.className = el.className.replace(/ring-[^\s]+/g, '').replace(/shadow-[^\s]+/g, '');
  });
  exportClone.querySelectorAll('[class*="cursor-nwse-resize"], [class*="cursor-nesw-resize"]').forEach((el) => el.remove());
  exportClone.querySelectorAll('[data-floating-toolbar="true"]').forEach((el) => el.remove());
  exportClone.querySelectorAll('[class*="alignment-guide"]').forEach((el) => el.remove());

  // Enforce flat, un-mirrored layout on the clone
  exportClone.classList.add('id-card-export');
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
  exportClone.style.pointerEvents = 'none';

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

  // Offscreen sandbox container within visible compositor bounds
  const container = document.createElement('div');
  container.className = 'id-card-export-sandbox';
  container.style.position = 'fixed';
  container.style.left = '0';
  container.style.top = '0';
  container.style.width = `${cardWidth}px`;
  container.style.height = `${cardHeight}px`;
  container.style.overflow = 'hidden';
  container.style.zIndex = '-9999';
  container.style.opacity = '1';
  container.style.pointerEvents = 'none';
  container.style.background = 'transparent';

  container.appendChild(exportClone);
  document.body.appendChild(container);

  try {
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
    console.warn('First render attempt error, retrying with fallback settings:', error);
    try {
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
    } catch (fallbackError) {
      console.error('Fallback generation also failed:', fallbackError);
      throw error;
    }
  } finally {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
};

/**
 * Downloads both front and back sides sequentially
 */
export const downloadBothSides = async (baseName = 'student') => {
  const cleanName = baseName.toLowerCase().replace(/\s+/g, '-');
  await downloadCardAsImage('front', `${cleanName}-id-card-front.png`);
  await new Promise((r) => setTimeout(r, 600));
  await downloadCardAsImage('back', `${cleanName}-id-card-back.png`);
  return true;
};

/**
 * Trigger print dialog specifically configured for ID card print
 */
export const printCard = () => {
  window.print();
};
