import { it, expect, describe } from 'vitest';
import { OTMJSON, CotecJSON, Comma } from '@tktb-tess/my-zod-schema';
import { readFileSync } from 'node:fs';
import z from 'zod';

describe('parse correctly...', () => {
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

    expect(typeof result.data.contents.length).toBe('number');
  });

  it('comma-data', async () => {
    const json = await fetch(
      'https://tktb-tess.github.io/commas/out/commas.json'
    ).then((r) => r.json());

    const result = Comma.commaDataSchema.safeParse(json);

    if (!result.success) {
      expect.unreachable(z.prettifyError(result.error));
    }

    const { commas } = result.data;

    const names = commas.map(({ name }) => name[0]);

    expect(typeof names.length).toBe('number');
  });
});
