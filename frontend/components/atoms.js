import { atom } from "jotai";
import { prompts } from "./prePrompt";
import { options } from "./shapeOptions";

export const generatedAtom = atom({
    url:'',
    publicId:'',
    meta: {},
    up: false
});
export const captionAtom = atom('');
export const sizeAtom = atom('');
export const quantityAtom = atom(1);
export const isSuccessAtom = atom(false);
export const addingToCartAtom = atom(false);
export const imageStyleAtom = atom(prompts[0]);
export const modalIsOpenAtom = atom(false);
export const suggestionsAtom = atom([]);
export const isLoadingAtom = atom(false);
export const notesAtom = atom('');
export const cartAtom = atom(null);
export const promptAtom = atom('');
export const isErrorAtom = atom(false);
export const isOpenAtom = atom(false);
export const imageArrayAtom = atom([]);
export const activeIndexAtom = atom(null);
export const modifyIdAtom = atom(null);
export const detailModeAtom = atom(false);
export const detailImageAtom = atom(null);

export const isMakingVariantsAtom = atom(false);
export const isUpscalingAtom = atom(false);
export const isGeneratingAtom = atom(false);

export const  progressAtom = atom('1%');
export const finalResultAtom = atom(null);
export const webSocketAtom = atom(null);
export const wsIdAtom = atom(null);

export const isOrderingAtom = atom(false);

export const productAtom = atom(null);
export const productTypeAtom = atom(options[0]);

export const isOverlayAtom = atom(false);
export const sizeLabelAtom = atom('Select Size');

export const shapeAtom = atom({id:'', label:''});

export const stackArrayAtom = atom([]);

export const isWideAtom = atom(false);