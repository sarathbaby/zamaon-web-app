import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from 'src/customer/customer.module';
import { ProductModule } from 'src/product/product.module';
import { OrderController } from './controllers/order.controller';
import { OrderEntity } from './model/order.entity';
import { OrderItemEntity } from './model/orderitem.entity';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    CustomerModule,
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
