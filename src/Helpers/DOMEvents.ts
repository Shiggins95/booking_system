/* eslint-disable no-unused-vars */
import { vh } from './Dimensions';

interface NavbarScrollProps {
  open: boolean;
  pathname: string;
  setOpen: (value:boolean) => void;
}
export const scrollEvent = ({ open, setOpen, pathname }: NavbarScrollProps): void => {
  if (pathname !== '/') {
    setOpen(true);
    return;
  }
  if (pathname === '/' && window.scrollY <= vh * 0.05) {
    setOpen(false);
  }
  const toDisplay: boolean = window.scrollY >= vh * 0.05 && !open;
  const toHide: boolean = window.scrollY === 0 && open;
  if (toDisplay) {
    setOpen(true);
  } else if (toHide) {
    setOpen(false);
  }
};

export const test = () => {

};
