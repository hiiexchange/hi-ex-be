import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeService {
  constructor(private readonly httpService: HttpService) {}

  async calculateEquivalentAmount(
    inputToken: string,
    outputToken: string,
    inputTokenAmount: number,
  ): Promise<number> {
    try {
      const apiKey = process.env.CMC_API_KEY;

      const response = await this.httpService
        .get(`https://pro-api.coinmarketcap.com/v1/tools/price-conversion`, {
          headers: {
            'X-CMC_PRO_API_KEY': apiKey,
          },
          params: {
            amount: inputTokenAmount,
            symbol: inputToken,
            convert: outputToken,
          },
        })
        .toPromise();

      const equivalentAmount = response.data.data.quote[outputToken].price;

      return equivalentAmount;
    } catch (error) {
      throw new Error('Unable to calculate equivalent amount');
    }
  }
}
