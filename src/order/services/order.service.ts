import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { CustomerService } from 'src/customer/services/customer.service';
import { ProductService } from 'src/product/services/product.service';
import { Repository } from 'typeorm';
import { OrderController } from '../controllers/order.controller';
import { OrderDto } from '../dto/order.dto';
import { OrderInputDto } from '../dto/orderinput.dto';
import { OrderUpdateDto } from '../dto/orderUpdate.dto';
import { OrderEntity } from '../model/order.entity';
import { OrderItemEntity } from '../model/orderitem.entity';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderController.name);

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,

    @Inject(CustomerService)
    private readonly customerService: CustomerService,

    @Inject(ProductService)
    private readonly productService: ProductService,
  ) {}

  async createOrder(orderInputDto: OrderInputDto): Promise<any> {
    const inputCustId = orderInputDto.customerId;

    const customerDb = await this.customerService.findCustomerById(inputCustId);
    const orderDto = Object.assign(new OrderDto(), {
      customer: customerDb,
      total_quantity: orderInputDto.total_quantity,
      total_price: orderInputDto.total_price,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const dbOrder = await this.orderRepository.save(orderDto);

    const orderId = dbOrder.id;
    orderInputDto.items.forEach(async (orderItem) => {
      const orderItemEntity = Object.assign(new OrderItemEntity(), {
        product: await this.productService.findProductById(orderItem.productId),        order: dbOrder,        quantity: orderItem.quantity,        price: orderItem.price,        raw_total: orderItem.raw_total,
      });
      const orderItemDb = await this.orderItemRepository.save(orderItemEntity);
      this.logger.log('OrderItem created :' + JSON.stringify(orderItemDb));
    });

    return { Status: 'OK', message: 'Order created' };
  }

  async findOrderById(orderId: number) {
    this.logger.log('finding order for id=' + orderId);
    const order = await this.orderRepository.findOne(orderId);
    if (order) return order;
    else {
      this.logger.log('Order with id=' + orderId + ' not found');
      throw new NotFoundException('Order with id=' + orderId + ' not found');
    }
  }

  async getAllOrders() {
    this.logger.log('finding all orders');
    return from(this.orderRepository.find());
  }

  async getAllOrderItems() {
    return from(this.orderItemRepository.find());
  }

  async editOrder(orderId: number, orderUpdateDto: OrderUpdateDto) {
    const order = await this.findOrderById(orderId);

    //Update order entity
    const updatedOrderDto = Object.assign(new OrderDto(), {
      total_quantity: orderUpdateDto.total_quantity,
      total_price: orderUpdateDto.total_price,
      updatedAt: new Date(),
    });

    this.orderRepository.update(order.id, updatedOrderDto);

    //Delete existing order-items associated with given order
    const existingOrderItems = await this.orderItemRepository
      .createQueryBuilder()
      .delete()
      .from(OrderItemEntity)
      .where('orderId =:orderId', { orderId })
      .execute();
    console.log('Order items for orderId=' + orderId + ' has been deleted');

    orderUpdateDto.items.forEach(async (orderItem) => {
      const orderItemEntity = Object.assign(new OrderItemEntity(), {
        product: await this.productService.findProductById(orderItem.productId),
        order: order,
        quantity: orderItem.quantity,
        price: orderItem.price,
        raw_total: orderItem.raw_total,
      });
      const orderItemDb = await this.orderItemRepository.save(orderItemEntity);
      this.logger.log('OrderItem updated :' + JSON.stringify(orderItemDb));
    });

    return { Status: 'OK', message: 'Order has been updated' };
  }
}
