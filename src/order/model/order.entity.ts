import { CustomerEntity } from 'src/customer/model/customer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customerId' })
  customerId: number;

  @ManyToOne(() => CustomerEntity, { nullable: false })
  customer: CustomerEntity;

  @Column()
  total_quantity: number;

  @Column()
  total_price: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
