import { IsNotEmpty } from 'class-validator';
import { OrderItemInputDto } from './orderiteminput.dto';

export class OrderInputDto {
  @IsNotEmpty()
  customerId: number;

  @IsNotEmpty()
  total_quantity: number;

  @IsNotEmpty()
  total_price: number;

  @IsNotEmpty()
  items: OrderItemInputDto[];
}
