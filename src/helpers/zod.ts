import { Schema } from 'zod';

export function checkZodSchema(data: unknown, schema: Schema<unknown>): true {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw parsed.error;
  }
  return true;
}

export default null;