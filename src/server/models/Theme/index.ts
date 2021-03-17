import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  modelName: 'Theme',
  paranoid: true,
})
export default class Theme extends Model {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  // @ts-ignore
  id: number;

  @AllowNull(false)
  @Index
  @Unique
  @Column(DataType.STRING)
  // @ts-ignore
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  // @ts-ignore
  description: string;
}
