import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  modelName: 'Like',
})
export default class Like extends Model {
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  // @ts-ignore
  id: number;

  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  // @ts-ignore
  postId: number;

  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  // @ts-ignore
  userId: number;
}
