import sequelize from '@/server/connection';
import Post from './Post';
import Comment from './Comment';
import Like from './Like';
import UserTheme from './UserTheme';
import Theme from './Theme';

sequelize.addModels([Post, Comment, Like, UserTheme, Theme]);

Comment.belongsTo(Post, { foreignKey: 'postId', targetKey: 'id' });

Post.hasMany(Comment, { foreignKey: 'postId', sourceKey: 'id', as: 'comments' });

Like.belongsTo(Post, { foreignKey: 'postId', targetKey: 'id' });

Post.hasMany(Like, { foreignKey: 'postId', sourceKey: 'id', as: 'likes' });

UserTheme.belongsTo(Theme, { foreignKey: 'themeName', targetKey: 'name' });

Theme.hasMany(UserTheme, { foreignKey: 'themeName', sourceKey: 'name', as: 'theme' });

Comment.hasMany(Comment, { foreignKey: 'parentId', sourceKey: 'id', as: 'children' });

export {
  Post, Comment, Like, Theme, UserTheme,
};
