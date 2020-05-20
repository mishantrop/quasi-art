import {LuminousGallery} from 'luminous-lightbox';

const initLightbox = () => {
  let options = {
    
  };
  new LuminousGallery(document.querySelectorAll('.fancybox-thumbs'), options);
};

export {
  initLightbox,
};