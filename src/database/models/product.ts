import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    Unique,
    DataType
} from "sequelize-typescript";

@Table({ tableName: 'products' })
export default class Product extends Model {

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
        type: DataType.INTEGER,
        allowNull: false
    })
    units!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cost!: number;

}