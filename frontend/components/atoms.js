import { atom } from "jotai";

export const generatedAtom = atom({
    url:'',
    meta: {},
    up: false
});
export const captionAtom = atom('');
export const sizeAtom = atom('');
export const quantityAtom = atom(0);
export const isSuccessAtom = atom(false);
export const loadingAtom = atom(false);
export const imageStyleAtom = atom('');
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