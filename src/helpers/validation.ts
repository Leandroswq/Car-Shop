import { Schema } from 'zod';

export function checkZodSchema(data: unknown, schema: Schema<unknown>): true {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw parsed.error;
  }
  return true;
}

export function checkObjectIsEmpty<T>(obj : T): true {
  if (Object.keys(obj as unknown as object).length === 0) throw new Error('BodyEmpty');

  return true;
}