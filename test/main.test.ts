import { it, expect } from 'vitest';
import { OTMJSON, parseAndValidate } from '@tktb-tess/my-zod-schema';
import { readFileSync } from 'node:fs';

it('test1', () => {
  const str = readFileSync('./test/sample-otm.json', { encoding: 'utf8' });
  const result = parseAndValidate(str, OTMJSON.zpdicOtmjsonSchema);

  if (result.success) {
    console.log(...result.data.words);
  }

  expect(result.success).toBe(true);
});
