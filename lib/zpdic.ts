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

const exampleSchema = z.object({
  id: objectIDSchema,
  number: z.int().nonnegative(),
  sentence: z.string(),
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

export type Example = z.infer<typeof exampleSchema>;

const editableWordSchema = z.object({
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

export const wordWithExamplesResponseSchema = z.object({
  word: wordWithExamplesSchema,
});

export type WordWithExamplesResponse = z.infer<typeof wordWithExamplesResponseSchema>;

export const zpdicWordsResponseSchema = z.object({
  words: wordWithExamplesSchema.array(),
  total: z.int().nonnegative(),
});

export type ZpDICWordsResponse = z.infer<typeof zpdicWordsResponseSchema>;

export const zpdicEditableWordResponseSchema = z.object({
  word: wordSchema,
});

export type ZpDICEditableWordResponse = z.infer<typeof zpdicEditableWordResponseSchema>;
