import { Entity, PrimaryGeneratedColumn, Column, Unique  } from 'typeorm';

@Entity()
@Unique(['username'])
export class User{
    
}