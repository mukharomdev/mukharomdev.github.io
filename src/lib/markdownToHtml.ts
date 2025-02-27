//import { remark } from "remark";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm"; // Untuk dukungan tabel
import remarkHtml from "remark-html";



export default async function markdownToHtml(markdown: string) {
  //const result = await remark().use(html).process(markdown);
  const result = await unified()
    .use(remarkParse) // Parse Markdown
    .use(remarkGfm) // Tambahkan dukungan tabel GFM
    .use(remarkHtml) // Konversi ke HTML
    
    .process(markdown);

 

  return result.toString();
}
