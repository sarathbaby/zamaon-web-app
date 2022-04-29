import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from '../dto/createProduct.dto';
import { ProductService } from '../services/product.service';
import { ProductController } from './product.controller';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const ProductServiceProvider = {
      provide: ProductService,
      useFactory: () => ({
        createProduct: jest.fn(() => []),
        findAll: jest.fn(() => []),
        findProductById: jest.fn(() => {}),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, ProductServiceProvider],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling create method', () => {
    const dto = new CreateProductDto();
    controller.create(dto);
    expect(service.createProduct).toHaveBeenCalled();
    expect(service.createProduct).toHaveBeenCalledWith(dto);
  });

  it('calling getAll Products method', () => {
    controller.getAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('calling find fetchProductById method', () => {
    const prodId = 1;
    controller.fetchProductById(prodId);
    expect(service.findProductById).toHaveBeenCalled();
    expect(service.findProductById).toHaveBeenCalledWith(prodId);
  });
});
