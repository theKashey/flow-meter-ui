import {meter} from 'flow-meter';
import {VercelRequest, VercelResponse} from '@vercel/node'

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(403);
  }
  console.log(req.body);
  const {url, compression = 'gzip', h2 = true} = req.body;
  console.log({url, compression, h2});
  const messages: string[] = [];

  const data = await meter(url, {compression, http2: h2, onConsole: (m) => messages.push(m)});
  res.send({meter: data, messages});
}