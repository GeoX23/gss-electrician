const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;
const SOURCE_EXTENSIONS = [".jpg", ".jpeg", ".png"];
const IMG_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

const FOLDERS = ["compressed"];

function getPublicImgPath(folder: string): string {
  return path.join(process.cwd(), "public", "img", folder);
}

function listImageFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((file: string) =>
      IMG_EXTENSIONS.includes(path.extname(file).toLowerCase()),
    )
    .sort((a: string, b: string) =>
      a.localeCompare(b, undefined, { numeric: true }),
    );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function compressImage(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  const outputPath = path.join(dir, `${baseName}.webp`);
  const tempPath = path.join(dir, `${baseName}.tmp.webp`);

  const originalSize = fs.statSync(filePath).size;

  await sharp(filePath)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(tempPath);

  const compressedSize = fs.statSync(tempPath).size;

  if (ext === ".webp") {
    if (compressedSize < originalSize) {
      fs.renameSync(tempPath, filePath);
      return { saved: originalSize - compressedSize, outputPath: filePath };
    }
    fs.unlinkSync(tempPath);
    return null;
  }

  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }

  fs.renameSync(tempPath, outputPath);
  fs.unlinkSync(filePath);

  return {
    saved: originalSize - compressedSize,
    outputPath,
  };
}

async function compressFolder(folder: string) {
  const dirPath = getPublicImgPath(folder);
  const files = listImageFiles(dirPath).filter((file: string) => {
    const ext = path.extname(file).toLowerCase();
    return SOURCE_EXTENSIONS.includes(ext) || ext === ".webp";
  });

  let totalSaved = 0;
  let processed = 0;

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const before = fs.statSync(filePath).size;

    try {
      const result = await compressImage(filePath);
      if (result) {
        totalSaved += result.saved;
        processed += 1;
        const after = fs.statSync(result.outputPath).size;
        console.log(
          `  ✓ ${file} → ${path.basename(result.outputPath)} (${formatBytes(before)} → ${formatBytes(after)})`,
        );
      }
    } catch (error) {
      console.error(`  ✗ ${file}:`, error);
    }
  }

  return { processed, totalSaved };
}

async function main() {
  console.log("Συμπίεση εικόνων σε WebP...\n");

  let totalProcessed = 0;
  let totalSaved = 0;

  for (const folder of FOLDERS) {
    console.log(`📁 ${folder}/`);
    const { processed, totalSaved: saved } = await compressFolder(folder);
    totalProcessed += processed;
    totalSaved += saved;
    console.log("");
  }

  console.log(
    `Ολοκληρώθηκε: ${totalProcessed} εικόνες, εξοικονόμηση ${formatBytes(totalSaved)}`,
  );
}

main().catch((error: Error) => {
  console.error(error);
  process.exit(1);
});
