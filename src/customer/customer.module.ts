import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controllers/customer.controller';
import { CustomerEntity } from './model/customer.entity';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
