/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { LuminousGallery } from 'luminous-lightbox'

export const initLightbox = () => new LuminousGallery(document.querySelectorAll('.fancybox-thumbs'), {})
