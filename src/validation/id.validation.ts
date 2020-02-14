import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';

import { db } from '../data/db';

@ValidatorConstraint({ async: true })
export class IsValidIdConstraint {
  public async validate(id: number, args: ValidationArguments) {
    const tableName = args.constraints[0];
    const record = await db(tableName)
      .where({ id })
      .first();

    return record ? true : false;
  }
}

export const IsValidId = (
  tableName: string,
  validationOptions?: ValidationOptions,
) => (object: object, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: validationOptions,
    constraints: [tableName],
    validator: IsValidIdConstraint,
  });
};
