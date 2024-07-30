import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!metadata.metatype) {
      return value;
    }

    const errors = await validate(plainToInstance(metadata.metatype, value));

    if (errors.length) {
      throw new ValidationException(
        errors.map(({ property, constraints }) =>
          constraints
            ? `${property} - ${Object.values(constraints).join(', ')}`
            : property,
        ),
      );
    }

    return value;
  }
}
