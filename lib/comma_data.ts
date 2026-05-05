import * as z from 'zod';

export const metadataSchema = z.object({
  lastUpdate: z.iso.datetime(),
  numberOf: z.int().nonnegative(),
});

export type Metadata = z.infer<typeof metadataSchema>;

export const contentBaseSchema = z.object({
  id: z.string(),
  name: z.string().array(),
  colorName: z.tuple([z.string(), z.string()]),
  namedBy: z.string().optional(),
});

export const rationalSchema = contentBaseSchema.extend({
  commaType: z.literal('rational'),
  monzo: z.string().regex(/|(?:\d+:-?\d+(?:,\d+:-?\d+)*)/),
});

export const irrationalSchema = contentBaseSchema.extend({
  commaType: z.literal('irrational'),
  ratio: z.string(),
  cents: z.number().nonnegative(),
});

export type Rational = z.infer<typeof rationalSchema>;
export type Irational = z.infer<typeof irrationalSchema>;

export const contentSchema = z.discriminatedUnion('commaType', [
  rationalSchema,
  irrationalSchema,
]);

export type Content = z.infer<typeof contentSchema>;

export const commaDataSchema = z.object({
  metadata: metadataSchema,
  commas: contentSchema.array(),
});

export type CommaData = z.infer<typeof commaDataSchema>;
