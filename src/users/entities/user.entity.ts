import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  CUSTOMER = 'customer',
  OWNER = 'owner',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100 })
  name: string;
  @Column({ type: 'varchar', unique: true, length: 30 })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;
}
