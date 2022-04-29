import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { ProductController } from '../controllers/product.controller';
import { CreateProductDto } from '../dto/createProduct.dto';
import { ProductEntity } from '../model/product.entity';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductController.name);
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  createProduct(createProductDto: CreateProductDto): Observable<any> {
    const response = from(this.productRepository.save(createProductDto));
    response.subscribe((product: ProductEntity) => {
      this.logger.log('Created new Product => ' + JSON.stringify(product));
    });
    return response;
  }

  findAll(): Observable<any[]> {
    this.logger.log('findAll() orders executing');
    return from(this.productRepository.find());
  }

  async findProductById(prodId: number) {
    const product = await this.productRepository.findOne(prodId);
    if (product) return product;
    else {
      this.logger.log('No product found for id=' + prodId);
      throw new NotFoundException('Product with id=' + prodId + ' not found');
    }
  }
}
