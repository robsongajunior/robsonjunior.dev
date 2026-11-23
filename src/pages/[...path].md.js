import { markdownPages, renderMarkdown } from '@utils/markdown.js'

export async function getStaticPaths() {
  const pages = await markdownPages()
  return pages.map((page) => ({ params: { path: page.path.replace(/^\/|\/$/g, '') }, props: page }))
}

export async function GET({ props }) {
  return new Response(await renderMarkdown(props), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
  })
}
