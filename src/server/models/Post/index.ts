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
  modelName: 'Post',
})
export default class Post extends Model {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  // @ts-ignore
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  // @ts-ignore
  text: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  // @ts-ignore
  title: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  // @ts-ignore
  userId: number;
}
