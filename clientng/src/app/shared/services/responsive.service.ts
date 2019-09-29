import { BehaviorSubject } from 'rxjs';
import getInitMediaString from './getmediastring.function';

interface Imedia {
  pixels: number;
  type: 'max'|'min';
  ord: number;
  str: string;
}
const mediaList: Imedia[] = [
  {pixels: 1024, type: 'max', ord: 0, str: '(max-width: 1024px)'},
  {pixels: 768, type: 'max', ord: 0, str: '(max-width: 768px)'},
  {pixels: 568, type: 'max', ord: 0, str: '(max-width: 568px)'},
  {pixels: 320, type: 'max', ord: 0, str: '(max-width: 320px)'},
  {pixels: 321, type: 'min', ord: 0, str: '(min-width: 321px)'},
  {pixels: 569, type: 'min', ord: 0, str: '(min-width: 569px)'},
  {pixels: 769, type: 'min', ord: 0, str: '(min-width: 769px)'},
  {pixels: 1025, type: 'min', ord: 0, str: '(min-width: 1025px)'},
]
const initMediaString = getInitMediaString();
const initMediaOb = mediaList.find((elto) => elto.str === initMediaString);

const changeWidth$ = new BehaviorSubject<Imedia>(initMediaOb);

const detectWidth = (mediaQList: MediaQueryListEvent): any => {
    if (mediaQList.matches) {
        const medOb = mediaList.find((md) => md.str === mediaQList.media);
        changeWidth$.next(medOb);
    }
};


mediaList.forEach((media) => {
  window.matchMedia(media.str).addListener(detectWidth);
})

// const mQList1024 = window.matchMedia('(max-width: 1024px)');
// const mQList768 = window.matchMedia('(max-width: 768px)');
// const mQList568 = window.matchMedia('(max-width: 568px)');
// const mQList320 = window.matchMedia('(max-width: 320px)');
// 
// const mQList321 = window.matchMedia('(min-width: 321px)');
// const mQList569 = window.matchMedia('(min-width: 569px)');
// const mQList769 = window.matchMedia('(min-width: 769px)');
// const mQList1025 = window.matchMedia('(min-width: 1025px)');
// 
// mQList1024.addListener(detectWidth);
// mQList768.addListener(detectWidth);
// mQList568.addListener(detectWidth);
// mQList320.addListener(detectWidth);
// 
// mQList321.addListener(detectWidth);
// mQList569.addListener(detectWidth);
// mQList769.addListener(detectWidth);
// mQList1025.addListener(detectWidth);

export default changeWidth$;
