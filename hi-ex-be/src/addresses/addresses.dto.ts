import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendToAddressDTO {
  @IsNotEmpty()
  @ApiProperty()
  address: string;
}

export class ReceiveToAddressDTO {
  @IsNotEmpty()
  @ApiProperty()
  destination: string;

  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
