import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CustomerController } from '../controllers/customer.controller';
import { CreateCustomerDto } from '../dto/Create-Customer.dto';
import { CustomerEntity } from '../model/customer.entity';
import { Customer } from '../model/customer.interface';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerController.name);
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  getHello() : string {
    return "Hello World!";
  }

  createCustomer(createCustomerDto: CreateCustomerDto): Observable<any> {
    const response: Observable<Customer> = from(
      this.customerRepository.save(createCustomerDto),
    );
    response.subscribe((user: Customer) => {
      this.logger.log('Created new customer => ' + JSON.stringify(user));
    });
    return response;
  }

  getAllCustomers(): Observable<any[]> {
    this.logger.log('GetAllCustomers() executed');
    return from(this.customerRepository.find());
  }

  async findCustomerById(custId: number) : Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne(custId);
    if (customer) {
      this.logger.log('findCustomerById executed for id=' + custId);
      return customer;
    } else {
      this.logger.log('No customer found for id=' + custId);
      throw new NotFoundException('Customer with id=' + custId + ' not found');
    }
  }
}
