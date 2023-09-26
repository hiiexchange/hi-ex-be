import { Controller, Body, Post } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { ApiTags } from '@nestjs/swagger';
import { SendToAddressDTO, ReceiveToAddressDTO } from './addresses.dto';

@ApiTags('addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addresses_service: AddressesService) {}

  @Post('/send-to')
  async getSendToAddresses(@Body() payload: SendToAddressDTO) {
    return payload;
  }

  @Post('/receive-to')
  async getReceiveToAddresses(@Body() payload: ReceiveToAddressDTO) {
    return payload;
  }
}
