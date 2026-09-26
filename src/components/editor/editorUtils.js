import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { jsPDF } from 'jspdf';

// CR80 Card Dimensions (Standard Credit / ID Card Ratio: 85.60mm x 53.98mm = ~1.5858)
export const CR80_DIMENSIONS = {
  mm: { width: 85.60, height: 53.98 },
  landscape: { width: 640, height: 404 }, // High-clarity 1.584 aspect
  portrait: { width: 404, height: 640 }
};

// Generate QR Code Data URL
export async function generateQrDataUrl(text, options = {}) {
  try {
    const dataUrl = await QRCode.toDataURL(text || 'ID-0000', {
      width: options.width || 200,
      margin: options.margin !== undefined ? options.margin : 1,
      color: {
        dark: options.color || '#000000',
        light: options.bgColor || '#ffffff'
      }
    });
    return dataUrl;
  } catch (err) {
    console.error('Error generating QR code:', err);
    return null;
  }
}

// Generate Barcode Data URL via an offscreen canvas
export function generateBarcodeDataUrl(value, options = {}) {
  try {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, value || '12345678', {
      format: options.format || 'CODE128',
      width: options.barWidth || 2,
      height: options.height || 60,
      displayValue: options.displayValue !== false,
      font: 'JetBrains Mono',
      fontSize: 12,
      background: options.bgColor || '#ffffff',
      lineColor: options.color || '#000000',
      margin: options.margin !== undefined ? options.margin : 6
    });
    return canvas.toDataURL('image/png');
  } catch (err) {
    console.error('Error generating barcode:', err);
    return null;
  }
}

// Replace dynamic placeholders like {{name}} or {{rollNumber}} with real data
export function resolveDynamicValue(text, data = {}) {
  if (typeof text !== 'string') return text;
  return text.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, field) => {
    // Check direct match
    if (data[field] !== undefined && data[field] !== '') {
      return data[field];
    }
    // Check aliases
    const aliases = {
      name: data.fullName || data.name,
      employee_id: data.rollNumber || data.employee_id || data.id,
      rollNumber: data.rollNumber || data.id,
      department: data.branch || data.department,
      designation: data.year || data.designation || 'Student',
      company_name: data.collegeName || data.company_name || 'Institution',
      collegeName: data.collegeName,
      phone: data.phone,
      email: data.email,
      dob: data.dob,
      bloodGroup: data.bloodGroup,
      address: data.address,
      joining_date: data.joining_date || '2023-08-01',
      expiry_date: data.expiry_date || '2027-06-30'
    };
    return aliases[field] !== undefined ? aliases[field] : match;
  });
}

// Export Konva Stage to Image (PNG / JPEG)
export function exportStageToImage(stageRef, format = 'png', pixelRatio = 3) {
  if (!stageRef?.current) return null;
  const stage = stageRef.current;
  
  // Hide transformer/guidelines prior to render
  const transformer = stage.findOne('Transformer');
  const wasVisible = transformer ? transformer.visible() : false;
  if (transformer) transformer.visible(false);

  const mime = format === 'jpeg' || format === 'jpg' ? 'image/jpeg' : 'image/png';
  const dataUrl = stage.toDataURL({
    pixelRatio,
    mimeType: mime,
    quality: 0.95
  });

  if (transformer && wasVisible) transformer.visible(true);
  return dataUrl;
}

// Trigger browser download for an image dataURL
export function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Export Card to PDF with standard physical CR80 dimensions
export function exportCardToPdf(stageRef, filename = 'id-card.pdf', orientation = 'landscape') {
  if (!stageRef?.current) return;
  const dataUrl = exportStageToImage(stageRef, 'png', 3);
  if (!dataUrl) return;

  const isLandscape = orientation === 'landscape';
  const pdf = new jsPDF({
    orientation: isLandscape ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [CR80_DIMENSIONS.mm.width, CR80_DIMENSIONS.mm.height]
  });

  const width = isLandscape ? CR80_DIMENSIONS.mm.width : CR80_DIMENSIONS.mm.height;
  const height = isLandscape ? CR80_DIMENSIONS.mm.height : CR80_DIMENSIONS.mm.width;

  pdf.addImage(dataUrl, 'PNG', 0, 0, width, height, undefined, 'FAST');
  pdf.save(filename);
}

// Print the card using an isolated printable iframe
export function printCardStage(stageRef, orientation = 'landscape') {
  const dataUrl = exportStageToImage(stageRef, 'png', 3);
  if (!dataUrl) return;

  const printWindow = window.open('', '_blank', 'width=800,height=600');
  if (!printWindow) return;

  const isLandscape = orientation === 'landscape';
  const widthMm = isLandscape ? 85.6 : 53.98;
  const heightMm = isLandscape ? 53.98 : 85.6;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print ID Card</title>
        <style>
          @page {
            size: ${widthMm}mm ${heightMm}mm;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
          }
          img {
            width: ${widthMm}mm;
            height: ${heightMm}mm;
            display: block;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <img src="${dataUrl}" onload="window.print(); window.close();" />
      </body>
    </html>
  `);
  printWindow.document.close();
}

// Snap a value to a grid step
export function snapToGrid(val, gridSize = 10) {
  return Math.round(val / gridSize) * gridSize;
}
