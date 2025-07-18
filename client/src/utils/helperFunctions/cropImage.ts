type CroppedAreaPixels = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export const getCroppedImg = async (
  imageSrc: string,
  croppedAreaPixels: CroppedAreaPixels,
  zoom: number
): Promise<Blob | null> => {
  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
      img.src = url;
    });

  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const width = croppedAreaPixels.width;
  const height = croppedAreaPixels.height;

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(
    image,
    croppedAreaPixels.x * scaleX,
    croppedAreaPixels.y * scaleY,
    width * scaleX,
    height * scaleY,
    0,
    0,
    width,
    height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg");
  });
};
