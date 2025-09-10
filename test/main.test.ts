import { it, expect } from 'vitest';
import { OTMJSON, parseAndValidate } from '@tktb-tess/my-zod-schema';
import { readFileSync } from 'node:fs';

it('test1', () => {
  const str = readFileSync('./test/sample-otm.json', { encoding: 'utf8' });
  const result = parseAndValidate(str, OTMJSON.zpdicOtmjsonSchema);

  if (!result.success) {
    expect.unreachable('failed to parse!');
  }

  const { words } = result.data;

  words.sort(({ entry: a }, { entry: b }) => a.id - b.id);

  console.log(words.map(({ entry }) => `${entry.id} ${entry.form}`).join('\n'));
});
