import { WIDTH_MOBILE } from '../constants/size';
import { useWindowSize } from './useWindowSize';


export const useWindowSizeValue = (forMobile: any, forDesktop: any) => {
  const size = useWindowSize();
  return size && size.width < WIDTH_MOBILE ? forMobile : forDesktop;
};
