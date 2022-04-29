import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  description: string;

  image: string;

  @IsNotEmpty()
  unit_price: number;
}
