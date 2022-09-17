import { z } from 'zod';
import { VehicleUpdateZodSchema, VehicleZodSchema } from './IVehicle';

export const MotorcycleZodSchema = VehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().min(0).max(2500),
});

export const MotorcycleUpdateZodSchema = VehicleUpdateZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']).optional(),
  engineCapacity: z.number().int().min(0).max(2500)
    .optional(),
});

export type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;
export type IMotorcycleUpdate = z.infer<typeof MotorcycleUpdateZodSchema>;