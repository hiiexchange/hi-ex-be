import { IsNumber, IsString } from 'class-validator';

export class ExchangeResponseDto {
  @IsNumber()
  inputTokenAmount: number;

  @IsNumber()
  outputTokenAmount: number;

  @IsString()
  outputToken: string;
}
