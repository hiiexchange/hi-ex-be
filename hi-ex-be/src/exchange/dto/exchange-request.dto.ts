import { IsNumber, IsString } from 'class-validator';

export class ExchangeRequestDto {
  @IsNumber()
  inputTokenAmount: number;

  @IsString()
  inputToken: string;

  @IsString()
  outputToken: string;
}
