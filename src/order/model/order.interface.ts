import { CustomerEntity } from 'src/customer/model/customer.entity';

export interface OrderEntity {
  id: number;
  customer: CustomerEntity;
  total_quantity: number;
  total_price: number;
  createdAt: Date;
  updatedAt: Date;
}
