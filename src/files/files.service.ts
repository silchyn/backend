import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { v4 } from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const path = resolve(__dirname, '..', 'static');
      const filename = `${v4()}.jpg`;

      if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
      }

      writeFileSync(join(path, filename), file.buffer);

      return filename;
    } catch {
      throw new InternalServerErrorException('File storing failed');
    }
  }
}
