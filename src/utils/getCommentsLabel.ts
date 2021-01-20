export default (count: number) => {
  let s = '';

  switch (count) {
    case 1:
      s = 'комментарий';
      break;
    case 2:
    case 3:
    case 4:
      s = 'комментария';
      break;
    default:
      s = 'комментариев';
  }

  return `${count} ${s}`;
};
