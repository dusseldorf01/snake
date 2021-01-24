export default (count: number) => {
  const r = count % 10;
  let s = '';

  if (r === 0 || (r >= 5 && r <= 9) || (count >= 11 && count <= 19)) {
    s = 'комментариев';
  } else if (r === 1) {
    s = 'комментарий';
  } else {
    s = 'комментария';
  }

  return `${count} ${s}`;
};
