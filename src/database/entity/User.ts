import { Model, Table, Column, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string;

}
