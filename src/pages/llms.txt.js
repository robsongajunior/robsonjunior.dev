import { renderLlms } from '@utils/markdown.js'

export async function GET() {
  return new Response(await renderLlms(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
