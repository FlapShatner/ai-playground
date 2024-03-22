export const upscale = async (meta, i) => {
 try {
  const resp = await fetch('/a/image/upscale', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    job: meta,
    index: i,
   }),
  })
  if (!resp.ok) {
   throw new Error('Failed to generate image')
  }
  const data = await resp.json()
  return { ok: true, resp: data }
 } catch (error) {
  console.log(error)
  return { ok: false, error: error }
 }
}
