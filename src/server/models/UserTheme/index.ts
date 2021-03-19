import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  modelName: 'UserTheme',
})
export default class UserTheme extends Model {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  // @ts-ignore
  id: number;

  @AllowNull(false)
  @Unique
  @Column(DataType.INTEGER)
  // @ts-ignore
  userId: number;
}
