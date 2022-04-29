import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomerDto } from '../dto/Create-Customer.dto';
import { CustomerService } from '../services/customer.service';
import { CustomerController } from './customer.controller';

describe('testing CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  beforeAll(async () => {
    const CustomerServiceProvider = {
      provide: CustomerService,
      useFactory: () => ({
        createCustomer: jest.fn(() => {
          [];
        }),
        getAllCustomers: jest.fn(() => {
          [];
        }),
        findCustomerById: jest.fn(() => {
          [];
        }),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService, CustomerServiceProvider],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    controller = module.get<CustomerController>(CustomerController);
  });

  it('calling create-Customer method', () => {
    const dto = new CreateCustomerDto();
    expect(controller.create(dto)).not.toEqual(null);
  });

  it('calling create-Customer method', () => {
    const dto = new CreateCustomerDto();
    controller.create(dto);
    expect(service.createCustomer).toHaveBeenCalled();
    expect(service.createCustomer).toHaveBeenCalledWith(dto);
  });

  it('calling getAllCustomersCont method', () => {
    controller.getAllCustomersCont();
    expect(service.getAllCustomers).toHaveBeenCalled();
  });

  it('calling find getCustById method', () => {
    const custId = 1;
    controller.getCustById(custId);
    expect(service.findCustomerById).toHaveBeenCalled();
    expect(service.findCustomerById).toHaveBeenCalledWith(custId);
  });
});
