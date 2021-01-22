interface DateParams {
    date: Date;
}
const days: string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const months: string[] = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];
export const _getDayOfWeek = ({ date }:DateParams) => {
  const day = days[date.getDay()];
  return day.substring(0, 1).toUpperCase() + day.substring(1, day.length);
};
export const _getMonth = ({ date }: DateParams) => {
  const month = months[date.getMonth()];
  return month.substring(0, 1).toUpperCase() + month.substring(1, month.length);
};
