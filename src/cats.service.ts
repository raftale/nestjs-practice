import { Injectable, Logger } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  private readonly logger = new Logger(CatsService.name);
  constructor(private readonly httpService: HttpService) {}

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  async listAll(): Promise<Cat[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Cat[]>('http://localhost:3000/cats').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}
