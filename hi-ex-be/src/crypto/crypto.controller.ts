import { Controller, Get, Param } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { Public } from '../auth/public.decorator';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Public()
  @Get(':ticker/address')
  getAddress(@Param('ticker') ticker: string): string {
    const address = this.cryptoService.getAddressForToken(ticker);
    return `Crypto address for ${ticker}: ${address}`;
  }
}
