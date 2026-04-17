import * as OTMJSON from '../lib/otm_json';
import { unified } from 'unified';
import RemarkParse from 'remark-parse';
import RemarkGfm from 'remark-gfm';
import RemarkRehype from 'remark-rehype';
import RehypeSanitize from 'rehype-sanitize';
import RehypeStringify from 'rehype-stringify';

const processor = unified()
  .use(RemarkParse)
  .use(RemarkGfm)
  .use(RemarkRehype, { allowDangerousHtml: true })
  .use(RehypeSanitize)
  .use(RehypeStringify)
  .freeze();

const mdToHtml = async (md: string) => {
  const v = await processor.process(md);
  return v.toString();
};

const main = async () => {
  const txt = await fetch('/sample-otm.json').then((r) => r.text());
  const result = OTMJSON.zpdicOtmSchema.safeParse(JSON.parse(txt));
  if (result.success) {
    const { data } = result;
    data.words.sort(({ entry: a }, { entry: b }) => a.id - b.id);
    data.examples.sort(({ id: a }, { id: b }) => a - b);

    const expr = await mdToHtml(data.zpdicOnline.explanation ?? '');

    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = expr;
  }
};

main();
