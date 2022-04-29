import { OrderItemInputDto } from './orderiteminput.dto';

export class OrderUpdateDto {
  total_quantity: number;

  total_price: number;

  items: OrderItemInputDto[];
}
