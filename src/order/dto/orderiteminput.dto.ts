import { IsNotEmpty } from 'class-validator';

export class OrderItemInputDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  raw_total: number;
}
