const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = "./imgs";
const outputDir = "./src/assets/imgs/dashboard";

// Resoluciones que quieres (ej: 1x, 2x)
const sizes = [2];

// Recorre imágenes de la carpeta
fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);
  const ext = path.extname(file);
  const name = path.basename(file, ext);

  // Por cada tamaño definido
  sizes.forEach(scale => {
    const width = 150 * scale; // ajusta al tamaño que necesites
    const outputPath = path.join(outputDir, `${name}.webp`);

    sharp(inputPath)
      .resize({ width })
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => console.log(`✅ ${outputPath} generado`))
      .catch(err => console.error(err));
  });
});
