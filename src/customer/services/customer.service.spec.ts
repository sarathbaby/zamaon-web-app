import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomerDto } from '../dto/Create-Customer.dto';
import { CustomerService } from '../services/customer.service';

class CustomerServiceMock {
  createCustomer(dto: any) {
    return [];
  }
  getAllCustomers() {
    return [];
  }
  findCustomerById(id: number) {
    return [];
  }
}

describe('testing CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const CustomerServiceProvider = {
      provide: CustomerService,
      useClass: CustomerServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService, CustomerServiceProvider],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should call createCustomer method with expected params', async () => {
    const createCustomerSpy = jest.spyOn(service, 'createCustomer');
    const dto = new CreateCustomerDto();
    service.createCustomer(dto);
    expect(createCustomerSpy).toHaveBeenCalledWith(dto);
  });

  it('should call getAllCustomers method', async () => {
    const getAllCustomersSpy = jest.spyOn(service, 'getAllCustomers');
    service.getAllCustomers();
    expect(getAllCustomersSpy).toHaveBeenCalled();
  });

  it('should call findCustomerById method with expected params', async () => {
    const findCustomerByIdSpy = jest.spyOn(service, 'findCustomerById');
    const custId = 1;
    service.findCustomerById(custId);
    expect(findCustomerByIdSpy).toHaveBeenCalledWith(custId);
  });
});
