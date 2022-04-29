import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import {
  HealthCheckService,
  TypeOrmHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @ApiTags('health')
  //@ApiBody({ type: Customer.class })
  @ApiOkResponse({
    description: 'Health check',
  })
  @ApiNotFoundResponse({ description: 'Health check failed' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.db.pingCheck('zamaonApp')]);
  }
}
