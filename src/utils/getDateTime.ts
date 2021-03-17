import addZero from '@/utils/addZero';

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export default (date: string): string => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = d.getMinutes();

  return `${day} ${months[month]} ${year} в ${addZero(hours)}:${addZero(minutes)}`;
};
