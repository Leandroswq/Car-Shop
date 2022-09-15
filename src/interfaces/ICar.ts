import { z } from 'zod';
import { VehicleUpdateZodSchema, VehicleZodSchema } from './IVehicle';

export const CarZodSchema = VehicleZodSchema.extend({
  doorsQty: z.number().int().min(2).max(4),
  seatsQty: z.number().int().min(2).max(7),
});

export const CarUpdateZodSchema = VehicleUpdateZodSchema.extend({
  doorsQty: z.number().int().min(2).max(4)
    .optional(),
  seatsQty: z.number().int().min(2).max(7)
    .optional(),
});

export type ICar = z.infer<typeof CarZodSchema>;
export type ICarUpdate = z.infer<typeof CarUpdateZodSchema>;