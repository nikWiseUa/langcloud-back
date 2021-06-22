import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  async resolveLearning(data, token): Promise<void> {
    console.log(data);
  }
}
