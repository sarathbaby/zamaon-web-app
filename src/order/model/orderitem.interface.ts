import { ProductEntity } from 'src/product/model/product.entity';
import { OrderEntity } from './order.entity';

export interface OrderItemEntity {
  id?: number;
  order?: OrderEntity;
  product?: ProductEntity;
  quantity?: number;
  price?: number;
  raw_total?: number;
}
