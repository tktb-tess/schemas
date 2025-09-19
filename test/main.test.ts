import { it, expect } from 'vitest';
import { OTMJSON, CotecJSON, Comma } from '@tktb-tess/my-zod-schema';
import { readFileSync } from 'node:fs';
import z from 'zod';

it('otm-json', () => {
  const str = readFileSync('sample-otm.json', { encoding: 'utf8' });
  const result = OTMJSON.zpdicOtmSchema.safeParse(JSON.parse(str));

  if (!result.success) {
    expect.unreachable(z.prettifyError(result.error));
  }

  const { words } = result.data;

  words.sort(({ entry: a }, { entry: b }) => a.id - b.id);

  const ids: readonly number[] = words.map(({ entry }) => entry.id);

  const res = ids
    .map((id, i, ids) => {
      const prev = ids[i - 1] ?? 0;
      return id - prev === 0;
    })
    .every((v) => !v);

  expect(res).toBe(true);
});

it('cotec-json', async () => {
  const json = await fetch(
    'https://tktb-tess.github.io/cotec-json-data/out/conlinguistics-wiki-list-cotec.json'
  ).then((r) => r.json());

  const result = CotecJSON.schema.safeParse(json);

  if (!result.success) {
    expect.unreachable(z.prettifyError(result.error));
  }
  const { metadata, contents } = result.data;

  console.log(metadata);
  const langNames = contents.map(({ name }) => name[0]);
  console.log(...langNames);
  expect(0).toBe(0);
});

it('comma-data', async () => {
  const json = await fetch(
    'https://tktb-tess.github.io/commas/out/commas.json'
  ).then((r) => r.json());

  const result = Comma.commaDataSchema.safeParse(json);

  if (!result.success) {
    expect.unreachable(z.prettifyError(result.error));
  }

  const { metadata, commas } = result.data;
  console.log(metadata);

  const names = commas.map(({ name }) => name[0]);

  console.log(...names);
  
  expect(0).toBe(0);

});
