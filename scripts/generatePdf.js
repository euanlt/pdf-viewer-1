const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createPdf() {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  for (let i = 1; i <= 3; i++) {
    const page = pdfDoc.addPage([550, 750]);
    const { width, height } = page.getSize();
    
    page.drawText(`Sample PDF - Page ${i}`, {
      x: 50,
      y: height - 50,
      size: 30,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    
    page.drawText('This is a test PDF generated for the Next.js PDF viewer', {
      x: 50,
      y: height - 100,
      size: 20,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, '../public/sample.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('PDF created at:', outputPath);
}

createPdf().catch(err => console.error(err));
