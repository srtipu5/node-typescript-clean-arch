import { z } from 'zod';

export const buildingDto = z.object({
  site_area: z.number().positive('Site area must be a positive number'),
  gfa: z.number().positive('GFA must be a positive number'),
  height: z.number().nonnegative('Height cannot be negative'),
  typology_main: z.string().min(1, 'Typology is required'),
});

export type BuildingDto = z.infer<typeof buildingDto>;
