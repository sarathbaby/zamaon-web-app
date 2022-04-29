import { Test, TestingModule } from '@nestjs/testing';
import { CustomerModule } from 'src/customer/customer.module';
import { CreateCustomerDto } from 'src/customer/dto/Create-Customer.dto';
import { CustomerService } from 'src/customer/services/customer.service';
import { ProductService } from 'src/product/services/product.service';
import { OrderInputDto } from '../dto/orderinput.dto';
import { OrderService } from '../services/order.service';
import { OrderController } from './order.controller';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const OrderServiceProvider = {
      provide: OrderService,
      useFactory: () => ({
        createOrder: jest.fn(() => []),
        findOrderById: jest.fn(() => []),
        getAllOrders: jest.fn(() => { }),
        getAllOrderItems: jest.fn(() => { }),
        editOrder: jest.fn(() => { }),
      })
    }

    const CustomerServiceProvider = {
      provide: CustomerService,
      useFactory: () => ({
        findCustomerById: jest.fn(() => { })
      })
    }

    const ProductServiceProvider = {
      provide: ProductService,
      useFactory: () => ({
        findProductById: jest.fn(() => { })
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService, OrderServiceProvider, CustomerServiceProvider, ProductServiceProvider]
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create method with expected params', async () => {
    const dto = new OrderInputDto();
    controller.create(dto);
    expect(service.createOrder).toHaveBeenCalled();
    expect(service.createOrder).toHaveBeenCalledWith(dto);
  });

  it("calling fetchAllOrders method", () => {
    controller.fetchAllOrders();
    expect(service.getAllOrders).toHaveBeenCalled();
  })

  it("calling fetchOrderById method", () => {
    const orderId=1;
    controller.fetchOrderById(orderId);
    expect(service.findOrderById).toHaveBeenCalled();
    expect(service.findOrderById).toHaveBeenCalledWith(orderId);
  })

  it("calling fetchAllOrderItemss method", () => {
    controller.fetchAllOrderItemss();
    expect(service.getAllOrderItems).toHaveBeenCalled();
  })

  it("calling edit method", () => {
    const orderId=1;
    const dto = new OrderInputDto;
    controller.edit(orderId, dto);
    expect(service.editOrder).toHaveBeenCalled();
    expect(service.editOrder).toHaveBeenCalledWith(orderId, dto);
  })
});
