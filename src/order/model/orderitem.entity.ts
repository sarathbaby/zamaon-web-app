import { identity } from 'rxjs';
import { CustomerEntity } from 'src/customer/model/customer.entity';
import { ProductEntity } from 'src/product/model/product.entity';
import {
  Column,
  ColumnTypeUndefinedError,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('orderitem')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'orderId' })
  orderId: number;

  @ManyToOne(() => OrderEntity, { nullable: false })
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @Column({ name: 'productId' })
  productId: number;

  @ManyToOne(() => ProductEntity, { nullable: false })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  raw_total: number;
}
