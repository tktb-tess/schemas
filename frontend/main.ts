import { OTMJSON, parseAndValidate } from '@tktb-tess/my-zod-schema';

const main = async () => {
  const resp = await fetch('/sample-otm.json').then((r) => r.text());
  const result = parseAndValidate(resp, OTMJSON.zpdicOtmjsonSchema);
  if (result.success) {
    const { data } = result;
    data.words.sort(({ entry: a }, { entry: b }) => a.id - b.id);
    data.examples.sort(({ id: a }, { id: b }) => a - b);
    console.log(...data.words);
    console.log(...data.examples);
  }
};

main();

export {};
