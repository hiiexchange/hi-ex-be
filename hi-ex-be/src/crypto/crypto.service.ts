import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  private cryptoAddresses: Record<string, string> = {
    BTC: 'bc1qqpn79tehlxt6ae877y6kzm5ycy6kf0zgpl45my',
    ETH: '0x854d186F2027B779b24De423A23dC861EE2f3e2B',
    BCH: 'qzvqa30kdzmatjeq8vcqruvly048gaevkch4rts00s',
    LTC: 'ltc1q6jusug950v7kcgz9ldc8smt90kan3znqqnrcp2',
    DOGE: 'DT8aPP5xwNf4y5w95SHrjCx7tCRVWPge2E',
    DASH: 'Xvr1w9k5rhwwmcscJLuYx3cWxfG5GPa6WF',
    PMUSD: 'U43507830',
    PPUSD: 'exchangehi067@gmail.com',
    WMZ: '977171522260',
  };

  getAddressForToken(ticker: string): string {
    const address = this.cryptoAddresses[ticker.toUpperCase()];
    if (!address) {
      throw new Error(`No address found for token with ticker: ${ticker}`);
    }
    return address;
  }
}
