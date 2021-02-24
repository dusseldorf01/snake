import type { ParsedQs } from 'qs';

export default (
  query: ParsedQs,
): {
  limit: number,
  offset: number,
} => {
  const {
    $limit: limit = 10,
    $page: page = 1,
  } = query;

  return {
    limit: Number(limit),
    offset: Number(limit) * (Number(page) - 1),
  };
};
