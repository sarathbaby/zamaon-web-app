import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomerDto } from 'src/customer/dto/Create-Customer.dto';
import { CreateProductDto } from '../dto/createProduct.dto';
import { ProductService } from './product.service';

class ProductServiceMock {
  createProduct(dto: any) {
    return [];
  }
  findAll() {
    return [];
  }
  findProductById(id: number) {
    return [];
  }
}

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const ProductServiceProvider = {
      provide: ProductService,
      useClass: ProductServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, ProductServiceProvider],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call createProduct method with expected params', async () => {
    const createProductSpy = jest.spyOn(service, 'createProduct');
    const dto = new CreateProductDto();
    service.createProduct(dto);
    expect(createProductSpy).toHaveBeenCalledWith(dto);
  });

  it('should call findAll method', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll');
    service.findAll();
    expect(findAllSpy).toHaveBeenCalled();
  });

  it('should call findProductById method with expected params', async () => {
    const findProductByIdSpy = jest.spyOn(service, 'findProductById');
    const prodId = 1;
    service.findProductById(prodId);
    expect(findProductByIdSpy).toHaveBeenCalledWith(prodId);
  });
});
