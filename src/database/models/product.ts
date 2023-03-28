import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    DataType
} from "sequelize-typescript";
import User from './user';

@Table({ tableName: 'products' })
export default class Product extends Model {

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
        type: DataType.INTEGER,
        allowNull: false
    })
    units!: number;

    @Column({
        type: DataType.NUMBER,
        allowNull: false
    })
    cost!: number;

    @ForeignKey(() => User)
    @Column
    sellerId!: number;


    @BelongsTo(() => User, 'sellerId')
    seller!: User;

}