export interface IComment {
  id: number;
  createdAt: number;
  login: string;
  text: string;
}

export interface IThread {
  id: number;
  createdAt: number;
  login: string;
  title: string;
  text: string;
  comments: IComment[];
}

export interface ICreatingThreadModel {
  login: string;
  title: string;
  text: string;
}

export const creatingThreadInitialModel: ICreatingThreadModel = {
  login: '',
  title: '',
  text: '',
};

export interface ICreatingComment {
  text: string;
}

export const creatingCommentInitialModel: ICreatingComment = {
  text: '',
};
