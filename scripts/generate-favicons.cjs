const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

async function main() {
  const root = path.resolve(__dirname, "..");
  // Extract only the existing logo symbol; keep the wordmark out of the icon.
  const symbol = await sharp(path.join(root, "public/images/korea-precision-transport-logo.png"))
    .extract({ left: 76, top: 120, width: 510, height: 480 })
    .resize(448, 448, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 32, bottom: 32, left: 32, right: 32, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const outputs = [
    ["icon.png", 512],
    ["favicon-32x32.png", 32],
    ["apple-icon.png", 180],
    ["apple-icon-152x152.png", 152],
    ["android-icon-192x192.png", 192],
  ];
  for (const [name, size] of outputs) {
    await sharp(symbol).resize(size, size).png().toFile(path.join(root, "src/app", name));
  }

  const sizes = [16, 32, 48];
  // Next.js의 favicon.ico 디코더는 PNG가 RGBA여야 해서 alpha 채널을 강제로 넣음
  const images = await Promise.all(
    sizes.map((size) => sharp(symbol).resize(size, size).ensureAlpha().png().toBuffer())
  );
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach((image, index) => {
    const entry = 6 + index * 16;
    header[entry] = sizes[index];
    header[entry + 1] = sizes[index];
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(image.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += image.length;
  });
  await fs.writeFile(path.join(root, "src/app/favicon.ico"), Buffer.concat([header, ...images]));
  console.log("Generated logo favicons: 16, 32, 48, 152, 180, 192, 512px.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
