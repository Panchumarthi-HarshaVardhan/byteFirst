import { toPng } from 'html-to-image';

/**
 * Downloads a DOM element as a high-resolution PNG image
 * @param {HTMLElement} element - The DOM element of the ID card
 * @param {string} fileName - The desired download filename
 * @returns {Promise<void>}
 */
export const downloadCardAsImage = async (element, fileName = 'student-id-card.png') => {
  if (!element) {
    throw new Error('ID card element not found');
  }

  try {
    // Generate high-resolution image with 3x pixel ratio for print clarity
    const dataUrl = await toPng(element, {
      quality: 0.98,
      pixelRatio: 3,
      cacheBust: true,
      skipFonts: false,
      style: {
        transform: 'none',
        margin: '0',
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
  }
};

/**
 * Trigger print dialog specifically configured for ID card print
 */
export const printCard = () => {
  window.print();
};
