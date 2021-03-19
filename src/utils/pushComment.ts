import produce from 'immer';
import type { IComment } from '@/models/forum';

const pushComment = (comments: IComment[], comment: IComment): IComment[] => (
  produce<IComment[]>(comments, (currentComments) => {
    if (comment.parentId === null) {
      currentComments.push(comment);
      return;
    }

    const checkComment = (parent: IComment, child: IComment) => {
      if (parent.id === child.parentId) {
        parent.children.push(child);
      } else {
        parent.children.forEach((item) => {
          checkComment(item, child);
        });
      }
    };

    currentComments.forEach((item) => {
      checkComment(item, comment);
    });
  })
);

export default pushComment;
