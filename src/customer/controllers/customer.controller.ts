import { Body, Controller, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateCustomerDto } from '../dto/Create-Customer.dto';
import { CustomerService } from '../services/customer.service';

@Controller('customer')
export class CustomerController {
  constructor(
    @Inject(forwardRef(() => CustomerService))
    private readonly customerService: CustomerService) {}

    @Get()
    getDefault() {
      return this.customerService.getHello();
    }

  @ApiTags('customer')
  //@ApiBody({ type: Customer.class })
  @ApiOkResponse({
    description: 'Create customer',
  })
  @ApiNotFoundResponse({ description: 'Create Customer-POST request failed' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto): Observable<any> {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @ApiTags('customer')
  //@ApiBody({ type: Customer.class })
  @ApiOkResponse({
    description: 'Get all customers',
  })
  @ApiNotFoundResponse({ description: 'Get all Customers request failed' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  getAllCustomersCont(): Observable<any[]> {
    return this.customerService.getAllCustomers();
  }

  @ApiTags('customer')
  //@ApiBody({ type: Customer.class })
  @ApiOkResponse({
    description: 'Get customer by Id',
  })
  @ApiNotFoundResponse({ description: 'Get Customer by Id request failed' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getCustById(@Param('id') custId: number) {
    return this.customerService.findCustomerById(custId);
  }
}
