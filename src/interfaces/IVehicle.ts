import { z } from 'zod';

export const VehicleZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max(2022),
  color: z.string().min(3),
  status: z.optional(z.boolean()),
  buyValue: z.number().int(),
});

export const VehicleUpdateZodSchema = z.object({
  model: z.string().min(3).optional(),
  year: z.number().min(1900).max(2022).optional(),
  color: z.string().min(3).optional(),
  status: z.optional(z.boolean()).optional(),
  buyValue: z.number().int().optional(),
});

export type IVehicle = z.infer<typeof VehicleZodSchema>;
export type IVehicleUpdate = z.infer<typeof VehicleUpdateZodSchema>;
