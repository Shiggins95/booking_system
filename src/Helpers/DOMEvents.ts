/* eslint-disable no-unused-vars */
interface NavbarScrollProps {
  open: boolean;
  pathname: string;
  setOpen: (value:boolean) => void;
}
export const scrollEvent = ({ open, setOpen, pathname }: NavbarScrollProps): void => {
  if (pathname !== '/') {
    return;
  }
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const toDisplay: boolean = window.scrollY >= vh * 0.05 && !open;
  const toHide: boolean = window.scrollY === 0 && open;
  console.log('TD: ', toDisplay);
  console.log('TH: ', toHide);
  if (toDisplay) {
    setOpen(true);
  } else if (toHide) {
    setOpen(false);
  }
};

export const test = () => {

};
