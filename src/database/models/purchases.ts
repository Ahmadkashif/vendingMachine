import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    DataType,
} from "sequelize-typescript";
import User from "./user";
import Product from "./product";

@Table({ tableName: "purchases" })
export default class Purchases extends Model {
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    productId!: number;

    @BelongsTo(() => Product)
    product!: Product;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    quantity!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    totalCost!: number;

}
