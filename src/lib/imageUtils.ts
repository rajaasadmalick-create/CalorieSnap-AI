/**
 * Downscales an image base64 data URL to a specified max width.
 */
export const downscaleImage = (dataUrl: string, maxWidth = 150): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const scale = Math.min(maxWidth / img.width, 1);
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.6));
    };
  });
};

/**
 * Extracts raw base64 data and mime type from a standard data URI string.
 */
export const extractBase64Data = (imageSrc: string) => {
  const parts = imageSrc.split(',');
  if (parts.length < 2) {
    throw new Error("Invalid image source format");
  }
  const base64Data = parts[1];
  const mimeType = parts[0].split(';')[0].split(':')[1];
  
  return { base64Data, mimeType };
};
