import sequelize, { Op } from 'sequelize';
import {
  Comment,
  Like,
  Post,
} from '@/server/models';
import type { GetAllQueryType } from '@/server/services/types';
import type { IPostCreate } from '@/models/forum';

export default class PostsService {
  public static create = (body: IPostCreate) => (
    Post.create(body)
  );

  public static getAll = ({
    limit,
    offset,
  }: GetAllQueryType) => (
    Post
      .findAndCountAll({
        attributes: {
          include: [[sequelize.cast(sequelize.fn('count', sequelize.col('comments.*')), 'integer'), 'commentsCount']],
          exclude: ['text'],
        },
        group: ['Post.id'],
        include: [{
          model: Comment,
          as: 'comments',
          attributes: [],
        }],
        subQuery: false,
        order: [['createdAt', 'DESC']],
        offset,
        limit,
      })
  );

  public static getById = (id: number) => (
    Post
      .findByPk(id, {
        include: [{
          model: Comment,
          as: 'comments',
          order: [['createdAt', 'ASC']],
          separate: true,
          where: {
            parentId: {
              [Op.eq]: null,
            },
          },
        }, {
          model: Like,
          as: 'likes',
          attributes: ['userId'],
        }],
      })
  );
}
