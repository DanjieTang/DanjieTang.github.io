import type { Image } from '../content'
import { resolveHref } from '../lib/href'
import { isShown, isTodo } from '../lib/todo'

type FigureProps = {
  image: Image
  /** panel: framed, centred image (model samples)
   *  wide: full-width screenshot */
  variant?: 'panel' | 'wide'
}

export function Figure({ image, variant = 'wide' }: FigureProps) {
  if (!isShown(image.src)) return null

  const caption = image.caption && (
    <figcaption className={image.captionAbove ? 'figure__intro' : undefined}>{image.caption}</figcaption>
  )

  return (
    <figure
      className={`figure figure--${variant}`}
      style={image.maxWidth ? { maxWidth: image.maxWidth, marginInline: 'auto' } : undefined}
    >
      {image.captionAbove && caption}
      {isTodo(image.src) ? (
        <div className="figure__media placeholder">
          <span className="placeholder__label">OWNER: {image.src.todo}</span>
        </div>
      ) : (
        <img className="figure__media" src={resolveHref(image.src)} alt={image.alt} loading="lazy" />
      )}
      {!image.captionAbove && caption}
    </figure>
  )
}
