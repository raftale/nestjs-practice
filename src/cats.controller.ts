import {
  Controller,
  Get,
  Post,
  Req,
  HttpCode,
  Header,
  Redirect,
  Query,
  Param,
  HostParam,
  Body,
  HttpStatus,
  Res,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './create-cat.dto';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  // constructor(private catsService: CatsService) {}

  @Inject()
  private readonly catsService: CatsService;

  @Post()
  @HttpCode(203)
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action add a new car';
  }

  @Get()
  @Redirect('https://nestjs.com', 301)
  findAll(@Req() request: Request): string {
    console.log(request.body);
    return 'This action returns all cats';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // http://localhost:3000/cats/100
  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get('/async/promise')
  async findAllPromise(): Promise<any[]> {
    return [];
  }

  @Get('/async/observable')
  findAllObservable(): Observable<any[]> {
    return of([]);
  }

  @Post('/body')
  async createCat(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    return 'This action adds a new cat: ' + createCatDto.name;
  }

  @Get('/findAll/response')
  findAllResponse(@Res() res: Response) {
    res.status(HttpStatus.OK).json([]);
  }

  @Get('/all/injectable')
  async findALLByInj(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}

@Controller({ host: ':admin.example.com' })
export class AdminController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}
