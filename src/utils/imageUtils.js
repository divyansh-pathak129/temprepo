// Fallback image URL
export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x300';

// Function to get a safe image source
export const getSafeImageSrc = (imageSrc) => {
  // If imageSrc is undefined, null, or an empty string, return placeholder
  if (!imageSrc || imageSrc.trim() === '') {
    return PLACEHOLDER_IMAGE;
  }
  
  // If the image link is valid, return it
  return imageSrc;
}; 