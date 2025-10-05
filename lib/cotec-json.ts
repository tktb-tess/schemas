import z from 'zod';

const moyuneClassSchema = z.union([
  z.literal('INT'),
  z.literal('ART'),
  z.literal('EXP'),
  z.literal('PHI'),
  z.literal('HYP'),
  z.literal('NAT'),
  z.literal('REA'),
  z.literal('IMG'),
  z.literal('CIN'),
  z.literal('CDE'),
  z.literal('GEN'),
  z.literal('SPE'),
  z.literal('SON'),
  z.literal('LIT'),
  z.literal('KIN'),
  z.literal('SER'),
  z.literal('JOK'),
  z.literal('PAV'),
  z.literal('AAV'),
  z.literal('PWL'),
  z.literal('AWL'),
  z.literal('TOL'),
  z.literal('PRI'),
  z.literal('PUB'),
  z.literal('FIX'),
]);

export type MoyuneClass = z.infer<typeof moyuneClassSchema>;

const metadataSchema = z.object({
  datasize: z.tuple([z.int().nonnegative(), z.int().nonnegative()]),
  title: z.string(),
  author: z.string().array(),
  createdDate: z.iso.datetime(),
  lastUpdate: z.iso.datetime(),
  jsonLastUpdate: z.iso.datetime(),
  license: z.object({
    name: z.string(),
    content: z.string(),
  }),
  advanced: z.int().nonnegative(),
  label: z.string().array(),
  type: z.string().array(),
});

export type Metadata = z.infer<typeof metadataSchema>;

const contentSchema = z.object({
  id: z.string(),
  messier: z.unknown().optional(),
  name: z.string().array(),
  kanji: z.string().array(),
  desc: z.string().array(),
  creator: z.string().array(),
  period: z.string().optional(),
  site: z
    .object({
      name: z.string().optional(),
      url: z.url(),
    })
    .array()
    .optional(),
  twitter: z.string().array().optional(),
  dict: z.string().array().optional(),
  grammar: z.string().array().optional(),
  world: z.string().array().optional(),
  category: z
    .object({
      name: z.string(),
      content: z.string().optional(),
    })
    .array()
    .optional(),
  moyune: moyuneClassSchema.array().optional(),
  clav3: z
    .object({
      dialect: z.string().regex(/^(?:[a-z]{2}|~)$/),
      language: z.string().regex(/^[a-z]{2}$/),
      family: z.string().regex(/^(?:[a-z]{3}|~)$/),
      creator: z.string().regex(/^[a-z]{3}$/),
    })
    .optional(),
  part: z.string().optional(),
  example: z.string().array().optional(),
  script: z.string().array().optional(),
});

export type Content = z.infer<typeof contentSchema>;

export const schema = z.object({
  metadata: metadataSchema,
  contents: contentSchema.array(),
});

export type Data = z.infer<typeof schema>;
