import z from 'zod';

const metadataSchema = z.object({
  lastUpdate: z.iso.datetime(),
  numberOf: z.int().nonnegative(),
});

export type Metadata = z.infer<typeof metadataSchema>;

const monzoSchema = z.tuple([z.int().nonnegative(), z.int()]).readonly().array();

export type Monzo = z.infer<typeof monzoSchema>;

const contentBaseSchema = z.object({
  id: z.string(),
  name: z.string().array(),
  colorName: z.tuple([z.string(), z.string()]),
  namedBy: z.string().optional()
});

const contentSchema = z.discriminatedUnion('commaType', [
  contentBaseSchema.extend({
    commaType: z.literal('rational'),
    monzo: monzoSchema,
  }),
  contentBaseSchema.extend({
    commaType: z.literal('irrational'),
    ratio: z.string(),
    cents: z.number().nonnegative(),
  }),
]);

export type Content = z.infer<typeof contentSchema>;

export const commaDataSchema = z.object({
  metadata: metadataSchema,
  commas: contentSchema.array(),
});

export type CommaData = z.infer<typeof commaDataSchema>;


