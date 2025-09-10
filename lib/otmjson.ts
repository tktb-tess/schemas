import z from 'zod';

const entry_brand = Symbol('entry');

export const entrySchema = z
  .object({
    id: z.int().nonnegative(),
    form: z.string(),
  })
  .brand<typeof entry_brand>();

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
  supplement: z.string(),
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
  explanation: z.string(),
  punctuations: z.string().array(),
  ignoredPattern: z.string(),
  pronunciationTitle: z.string(),
  enableMarkdown: z.boolean(),
});

export type ZpDICConfig = z.infer<typeof zpdicConfigSchema>;

const otmjson_brand = Symbol('otm-json');

export const otmjsonv1Schema = z.object({
  version: z.literal(1).optional(),
  words: wordv1Schema.array(),
}).brand<typeof otmjson_brand>();

export const otmjsonv2Schema = z.looseObject({
  version: z.literal(2),
  words: wordv2Schema.array(),
  examples: zpdicExampleSchema.array().optional(),
  zpdicOnline: zpdicConfigSchema.optional(),
}).brand<typeof otmjson_brand>();



export const otmjsonSchema = z.discriminatedUnion('version', [
  otmjsonv1Schema,
  otmjsonv2Schema,
]);

export type OTMJSONv1 = z.infer<typeof otmjsonv1Schema>;
export type OTMJSONv2 = z.infer<typeof otmjsonv2Schema>;
export type OTMJSON = OTMJSONv1 | OTMJSONv2;

export const zpdicOtmjsonSchema = otmjsonv2Schema.required();

export type ZpDICOTMJSON = z.infer<typeof zpdicOtmjsonSchema>;

