import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('user')
export class user {

    constructor( username: string, password: string, deposit: number) {
        this.username = username;
        this.password = password;
        this.deposit = deposit;
    }

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({ type: 'varchar', length: 255 })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'float', default: 0 })
    deposit: number;

    // @Column({ type: 'enum', enum: UserRole })
    // role: UserRole;
}