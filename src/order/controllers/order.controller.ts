import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderInputDto } from '../dto/orderinput.dto';
import { OrderUpdateDto } from '../dto/orderUpdate.dto';
import { OrderService } from '../services/order.service';

@Controller('order')
export class OrderController {
  constructor(
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
  ) {}

  @ApiTags('order')
  @ApiBody({ type: OrderInputDto })
  @ApiOkResponse({
    description: 'Create order',
  })
  @ApiNotFoundResponse({ description: 'POST create order failed' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post()
  create(@Body() orderInputDto: OrderInputDto): Promise<any> {
    return this.orderService.createOrder(orderInputDto);
  }

  @ApiTags('order')
  @ApiOkResponse({
    description: 'Get Order by Id',
  })
  @ApiNotFoundResponse({ description: 'Get order by Id failed' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('id/:id')
  fetchOrderById(@Param('id') orderId: number) {
    return this.orderService.findOrderById(orderId);
  }

  @ApiTags('order')
  //@ApiBody({ type: Customer.class })
  @ApiOkResponse({
    description: 'Get All orders',
  })
  @ApiNotFoundResponse({ description: 'Get All orders failed' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('all')
  fetchAllOrders() {
    return this.orderService.getAllOrders();
  }

  @ApiTags('order')
  //@ApiBody({ type: Customer.class })
  @ApiOkResponse({
    description: 'Get All order-items',
  })
  @ApiNotFoundResponse({ description: 'Get All order-items failed' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get('items')
  fetchAllOrderItemss() {
    return this.orderService.getAllOrderItems();
  }

  @ApiTags('order')
  //@ApiBody({ type: Customer.class })
  @ApiOkResponse({
    description: 'Edit Order',
  })
  @ApiNotFoundResponse({ description: 'Edit Order failed' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Put('edit/:id')
  edit(@Param('id') orderId: number, @Body() orderUpdateDto: OrderUpdateDto) {
    return this.orderService.editOrder(orderId, orderUpdateDto);
  }
}
