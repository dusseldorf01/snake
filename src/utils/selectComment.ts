import produce from 'immer';
import type { IComment } from '@/models/forum';

const selectComment = (comments: IComment[], id: number): IComment[] => (
  produce<IComment[]>(comments, (currentComments) => {
    const checkComment = (comment: IComment) => {
      if (comment.id !== id && comment.isSelected) {
        // eslint-disable-next-line no-param-reassign
        comment.isSelected = false;
      }

      if (comment.id === id) {
        // eslint-disable-next-line no-param-reassign
        comment.isSelected = true;
      }

      comment.children.forEach((item) => {
        checkComment(item);
      });
    };

    currentComments.forEach((item) => {
      checkComment(item);
    });
  })
);

export default selectComment;
