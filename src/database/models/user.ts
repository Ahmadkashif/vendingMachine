import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    Unique,
    DataType,
} from 'sequelize-typescript';


@Table({ tableName: 'users' })
export default class User extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Unique
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

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    deposit!: number;

    @Column(DataType.ENUM('buyer', 'seller'))
    role!: string;

}
