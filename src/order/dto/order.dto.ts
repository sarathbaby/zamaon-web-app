import { IsNotEmpty } from 'class-validator';
import { CustomerEntity } from 'src/customer/model/customer.entity';

export class OrderDto {
  @IsNotEmpty()
  customer: CustomerEntity;

  @IsNotEmpty()
  total_quantity: number;

  @IsNotEmpty()
  total_price: number;

  createdAt: Date;

  updatedAt: Date;

  public constructor(init?: Partial<OrderDto>) {
    Object.assign(this, init);
  }
}
