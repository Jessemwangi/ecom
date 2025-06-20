import { server } from "./functions";

 // Helper function to build image URL
  export const buildImageUrl = (imageUrl) => {
    if (!imageUrl) return "/path/to/placeholder-image.jpg";
    
    // Check if URL already starts with http or https
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Otherwise, prepend server URL
    return server + imageUrl;
  };
  