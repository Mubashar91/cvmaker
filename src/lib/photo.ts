// Prepares an optional CV photo entirely in the browser: square-crops it (biased
// towards the top, where faces usually are), masks it to a circle, and returns a
// small PNG data URL. Nothing is uploaded.
const SIZE = 320;
const MAX_BYTES = 20 * 1024 * 1024;

export async function preparePhoto(file: File): Promise<string> {
  if (!/^image\//.test(file.type) && !/\.(png|jpe?g|webp|gif|bmp|avif)$/i.test(file.name)) throw new Error("Choose a JPG, PNG, or WebP image.");
  if (file.size > MAX_BYTES) throw new Error("This image is larger than 20 MB. Choose a smaller photo.");
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const side = Math.min(image.naturalWidth, image.naturalHeight);
    if (!side) throw new Error("empty");
    const sx = (image.naturalWidth - side) / 2;
    const sy = (image.naturalHeight - side) * 0.3;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = SIZE;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("canvas");
    context.imageSmoothingQuality = "high";
    context.beginPath();
    context.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
    context.closePath();
    context.clip();
    context.drawImage(image, sx, sy, side, side, 0, 0, SIZE, SIZE);
    return canvas.toDataURL("image/png");
  } catch (error) {
    if (error instanceof Error && /Choose|larger/.test(error.message)) throw error;
    throw new Error("This image couldn’t be read. Choose a JPG, PNG, or WebP photo.");
  } finally {
    URL.revokeObjectURL(url);
  }
}
