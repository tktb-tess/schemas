import { it, expect } from 'vitest';
import { OTMJSON, parseAndValidate } from '@tktb-tess/my-zod-schema';
import { readFileSync } from 'node:fs';

it('test1', () => {
  const str = readFileSync('sample-otm.json', { encoding: 'utf8' });
  const result = parseAndValidate(str, OTMJSON.zpdicOtmSchema);

  if (!result.success) {
    expect.unreachable('failed to parse!');
  }

  const { words } = result.data;

  words.sort(({ entry: a }, { entry: b }) => a.id - b.id);

  const ids: readonly number[] = words.map(({ entry }) => entry.id);

  const res = ids.map((id, i, ids) => {
    const prev = ids[i - 1] ?? 0;
    return id - prev === 0;
  }).every((v) => !v);

  expect(res).toBe(true);
});
