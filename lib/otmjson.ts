import * as z from 'zod';

export const entrySchema = z.object({
  id: z.int().nonnegative(),
  form: z.string(),
});

export type Entry = z.infer<typeof entrySchema>;

export const translationSchema = z.object({
  title: z.string(),
  forms: z.string().array(),
  rawForms: z.string().optional(),
});

export type Translation = z.infer<typeof translationSchema>;

export const contentSchema = z.object({
  title: z.string(),
  text: z.string(),
});

export type Content = z.infer<typeof translationSchema>;

export const variationSchema = z.object({
  title: z.string(),
  form: z.string(),
});

export type Variation = z.infer<typeof variationSchema>;

export const relationSchema = z.object({
  title: z.string(),
  entry: entrySchema,
});

export type Relation = z.infer<typeof relationSchema>;

const wordShape = {
  entry: entrySchema,
  translations: translationSchema.array(),
  tags: z.string().array(),
  contents: contentSchema.array(),
  variations: variationSchema.array(),
  relations: relationSchema.array(),
};

export const wordv1Schema = z.object(wordShape);
export const wordv2Schema = z.looseObject(wordShape);

export type Wordv1 = z.infer<typeof wordv1Schema>;
export type Wordv2 = z.infer<typeof wordv2Schema>;

export const zpdicExampleSchema = z.object({
  id: z.int().nonnegative(),
  sentence: z.string(),
  translation: z.string(),
  supplement: z.string().optional(),
  tags: z.string().array(),
  words: z
    .object({
      id: z.int().nonnegative(),
    })
    .array(),
  offer: z
    .object({
      catalog: z.string(),
      number: z.int().nonnegative(),
    })
    .optional(),
});

export type ZpDICExample = z.infer<typeof zpdicExampleSchema>;

export const zpdicConfigSchema = z.object({
  explanation: z.string().optional(),
  punctuations: z.string().array(),
  ignoredPattern: z.string().optional(),
  pronunciationTitle: z.string(),
  enableMarkdown: z.boolean(),
});

export type ZpDICConfig = z.infer<typeof zpdicConfigSchema>;

export const v1Schema = z.object({
  version: z.literal(1).optional(),
  words: wordv1Schema.array(),
});

export const v2Schema = z.looseObject({
  version: z.literal(2),
  words: wordv2Schema.array(),
});

export const otmjsonSchema = z.discriminatedUnion('version', [
  v1Schema,
  v2Schema,
]);

export type Ver1 = z.infer<typeof v1Schema>;
export type Ver2 = z.infer<typeof v2Schema>;
export type Ver1or2 = Ver1 | Ver2;

export const zpdicOtmSchema = v2Schema.extend({
  examples: zpdicExampleSchema.array(),
  zpdicOnline: zpdicConfigSchema,
  snoj: z.string().optional(),
  zatlin: z.string().optional(),
});

export type ZpDICOTM = z.infer<typeof zpdicOtmSchema>;
