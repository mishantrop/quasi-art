// @ts-ignore
import { LuminousGallery } from 'luminous-lightbox'

export const initLightbox = () => {
  return new LuminousGallery(document.querySelectorAll('.fancybox-thumbs'), {})
}
