// Architecture sketch for GemmaLLM. Each inner list is drawn as a column of
// boxes joined by short connector lines.

const inputStreams = [
  ['Image', 'CLIP image encoder', 'Late fusion'],
  ['Text tokens', 'Token embedding'],
]

const decoderBlock = [
  'Pre-norm RMSNorm',
  'Gated attention · grouped KV heads · RoPE',
  'Pre-norm RMSNorm',
  'MoE gated feed-forward · router + load-balancing loss',
]

const heads = ['Next-token head', 'Multi-token prediction (MTP) module']

export function GemmaDiagram() {
  return (
    <figure className="arch" aria-label="GemmaLLM architecture">
      <div className="arch__diagram">
        <div className="arch__inputs">
          {inputStreams.map((stream) => (
            <Stack key={stream[0]} items={stream} />
          ))}
        </div>
        <div className="arch__block">
          <p className="arch__block-label">Decoder block (repeated)</p>
          <Stack items={decoderBlock} />
        </div>
        <ul className="arch__heads">
          {heads.map((head) => (
            <li key={head} className="arch__box">
              {head}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}

function Stack({ items }: { items: string[] }) {
  return (
    <ol className="arch__stack">
      {items.map((item, i) => (
        <li key={i} className="arch__box">
          {item}
        </li>
      ))}
    </ol>
  )
}
