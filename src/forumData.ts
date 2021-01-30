import { IThread } from '@/models/forum';

const forumData: IThread[] = [{
  id: 2,
  createdAt: 1609580160000,
  login: 'Dan Abramov',
  title: 'React v17.0',
  text: 'Today, we are releasing React 17! We’ve written at length about the role of the React 17 release and the changes it contains in the React 17 RC blog post. This post is a brief summary of it, so if you’ve already read the RC post, you can skip this one.',
  comments: [],
}, {
  id: 1,
  createdAt: 1609486560000,
  login: 'Joseph Savona',
  title: 'Building Great User Experiences with Concurrent Mode and Suspense\n',
  text: 'At React Conf 2019 we announced an experimental release of React that supports Concurrent Mode and Suspense. In this post we’ll introduce best practices for using them that we’ve identified through the process of building the new facebook.com.',
  comments: [{
    id: 1,
    createdAt: 1609487560000,
    login: 'Пользователь 1',
    text: 'Первый комментарий к последней теме на форуме, который занимает несколько строчек, чтобы проверить свойство line-height',
  }, {
    id: 2,
    createdAt: 1609488560000,
    login: 'Пользователь 2',
    text: 'Второй комментарий к первой теме на форуме',
  }],
}];

export default forumData;
