import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExchangeRequestDto } from './dto/exchange-request.dto';
import { ExchangeService } from './exchange.service';
import { Public } from '../auth/public.decorator'

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Public()
  @Post('calculate')
  @UsePipes(new ValidationPipe({ transform: true }))
  async calculateExchange(
    @Body() exchangeRequest: ExchangeRequestDto,
  ): Promise<number> {
    try {
      const equivalentAmount =
        await this.exchangeService.calculateEquivalentAmount(
          exchangeRequest.inputToken,
          exchangeRequest.outputToken,
          exchangeRequest.inputTokenAmount,
        );

      return equivalentAmount;
    } catch (error) {
      throw new Error('Unable to calculate exchange');
    }
  }
}
