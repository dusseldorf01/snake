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
  modelName: 'Comment',
})
export default class Comment extends Model {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  // @ts-ignore
  id: number;

  @AllowNull
  @Column(DataType.INTEGER)
  // @ts-ignore
  parentId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  // @ts-ignore
  text: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  // @ts-ignore
  userId: number;
}
