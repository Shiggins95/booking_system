export interface StorageParams {
    key: string;
    value: string;
}
export const setValue = ({ key, value }: StorageParams) => {
  localStorage.setItem(key, value);
};
export const getValue = (key: string): string => localStorage.getItem(key) || '';
