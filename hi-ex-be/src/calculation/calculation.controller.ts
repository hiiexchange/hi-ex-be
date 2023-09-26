import { Controller, Options, Res } from '@nestjs/common';

@Controller('api/v1/calculation')
export class CalculationController {
  @Options()
  async optionsEndpoint(@Res() res: Response) {
    // res.headers('Access-Control-Allow-Origin', '*');
    // res.headers(
    //   'Access-Control-Allow-Methods',
    //   'OPTIONS, POST, GET, PUT, DELETE',
    // );
    // res.headers('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    console.log(300, res);
  }
}
