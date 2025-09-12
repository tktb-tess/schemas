import z from 'zod';

const equivalentSchema = z.object({
  titles: z.string().array(),
  names: z.string().array(),
  nameString: z.string(),
  ignoredPattern: z.string(),
  hidden: z.boolean(),
});

const obj_id_brand = Symbol('object-id');

const objectIDSchema = z.string().brand<typeof obj_id_brand>();

export type ObjectID = z.infer<typeof objectIDSchema>;

export type Equivalent = z.infer<typeof equivalentSchema>;

const informationSchema = z.object({
  title: z.string(),
  text: z.string(),
  hidden: z.boolean(),
});

export type Information = z.infer<typeof informationSchema>;

const phraseSchema = z.object({
  titles: z.string().array(),
  form: z.string(),
  terms: z.string().array(),
  termString: z.string(),
  ignoredPattern: z.string(),
});

export type Phrase = z.infer<typeof phraseSchema>;

const variationSchema = z.object({
  title: z.string(),
  name: z.string(),
  pronunciation: z.string(),
});

export type Variation = z.infer<typeof variationSchema>;

const relationSchema = z.object({
  titles: z.string().array(),
  number: z.int().nonnegative(),
  name: z.string(),
});

export type Relation = z.infer<typeof relationSchema>;

const catalogSchema = z.string();

export type Catalog = z.infer<typeof catalogSchema>;

export const editableExampleSchema = z.object({
  sentence: z.string(),
  supplement: z.string(),
  translation: z.string(),
  tags: z.string().array(),
  words: z
    .object({
      number: z.number(),
    })
    .array(),
  offer: z
    .object({
      catalog: catalogSchema,
      number: z.number(),
    })
    .nullable(),
});

export type EditableExample = z.infer<typeof editableExampleSchema>;

const exampleSchema = editableExampleSchema.extend({
  id: objectIDSchema,
  number: z.int().nonnegative(),
});

export type Example = z.infer<typeof exampleSchema>;

export const editableWordSchema = z.object({
  name: z.string(),
  pronunciation: z.string(),
  equivalents: equivalentSchema.array(),
  tags: z.string().array(),
  phrases: phraseSchema.array(),
  informations: informationSchema.array(),
  variations: variationSchema.array(),
  relations: relationSchema.array(),
});

export type EditableWord = z.infer<typeof editableWordSchema>;

const wordSchema = editableWordSchema.extend({
  id: objectIDSchema,
  number: z.int().nonnegative(),
});

export type Word = z.infer<typeof wordSchema>;

const wordWithExamplesSchema = wordSchema.extend({
  examples: exampleSchema.array(),
});

export type WordWithExamples = z.infer<typeof wordWithExamplesSchema>;

export const wordResponseSchema = z.object({
  word: wordSchema,
});

export type WordResponse = z.infer<typeof wordResponseSchema>;

export const wweResponseSchema = z.object({
  word: wordWithExamplesSchema,
});

export type WWEResponse = z.infer<typeof wweResponseSchema>;

export const mwweResponseSchema = z.object({
  words: wordWithExamplesSchema.array(),
  total: z.int().nonnegative(),
});

export type MWWEResponse = z.infer<typeof mwweResponseSchema>;

export const exResponseSchema = z.object({
  example: exampleSchema,
});

export type ExResponse = z.infer<typeof exResponseSchema>;

export const mExResponseSchema = z.object({
  examples: exampleSchema.array(),
  total: z.int().nonnegative(),
});

export type MExResponse = z.infer<typeof mExResponseSchema>;

const exampleOfferSchema = z.object({
  id: objectIDSchema,
  catalog: catalogSchema,
  number: z.int().nonnegative(),
  translation: z.string(),
  supplement: z.string(),
  author: z.string(),
});

export type ExampleOffer = z.infer<typeof exampleOfferSchema>;

export const exOfferResponseSchema = z.object({
  exampleOffer: exampleOfferSchema,
});

export type ExOfferResponse = z.infer<typeof exOfferResponseSchema>;

export const mExOfferResponseSchema = z.object({
  exampleOffers: exampleOfferSchema.array(),
  total: z.int().nonnegative(),
});

export type MExOfferResponse = z.infer<typeof mExOfferResponseSchema>;
