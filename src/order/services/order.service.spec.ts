import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from 'src/customer/services/customer.service';
import { ProductService } from 'src/product/services/product.service';
import { OrderInputDto } from '../dto/orderinput.dto';
import { OrderService } from './order.service';

class OrderServiceMock {
  createOrder(dto: any) {
     return [];
  }
  getAllOrders() {
    return [];
  }
  findOrderById(id: number) {
    return [];
  }
  getAllOrderItems() {
    return []
  }
  editOrder() {
    return [];
  }
}

class CustomerServiceMock {
  findCustomerById(id: number) {
    return [];
  }
}

class ProductServiceMock {
  findProductById(id: number) {
    return [];
  }
}

describe('testing OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const OrderServiceProvider = {
      provide: OrderService,
      useClass: OrderServiceMock,
    }
    const CustomerServiceProvider = {
      provide: CustomerService,
      useClass: CustomerServiceMock,
    };
    const ProductServiceProvider = {
      provide: ProductService,
      useClass: ProductServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, OrderServiceProvider, CustomerServiceProvider, ProductServiceProvider],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call createOrder method with expected params', async () => {
    const createOrderSpy = jest.spyOn(service, 'createOrder');
    const dto = new OrderInputDto();
    service.createOrder(dto);
    expect(createOrderSpy).toHaveBeenCalledWith(dto);
  });

  it('should call getAllOrders method', async () => {
    const getAllOrdersSpy = jest.spyOn(service, 'getAllOrders');
    service.getAllOrders();
    expect(getAllOrdersSpy).toHaveBeenCalled();
  });

  it('should call findOrderById method with expected params', async () => {
    const findOrderByIdSpy = jest.spyOn(service, 'findOrderById');
    const orderId = 1;
    service.findOrderById(orderId);
    expect(findOrderByIdSpy).toHaveBeenCalledWith(orderId);
  });

  it('should call getAllOrderItems method', async () => {
    const getAllOrderItemsSpy = jest.spyOn(service, 'getAllOrderItems');
    service.getAllOrderItems();
    expect(getAllOrderItemsSpy).toHaveBeenCalled();
  });

  it('should call editOrder method with expected params', async () => {
    const orderId=1;
    const dto = new OrderInputDto;
    const editOrderSpy = jest.spyOn(service, 'editOrder');
    service.editOrder(orderId, dto);
    expect(editOrderSpy).toHaveBeenCalled();
    expect(editOrderSpy).toHaveBeenCalledWith(orderId, dto);
  });

});
