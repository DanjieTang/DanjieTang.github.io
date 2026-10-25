import { useRef, useState } from 'react'
import type { Album } from '../content'
import { resolveHref } from '../lib/href'
import { isShown, isTodo } from '../lib/todo'

/** A 4:3 photo tile. With more than one photo it becomes a swipeable carousel. */
export function PhotoAlbum({ album }: { album: Album }) {
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const photos = album.photos.filter((photo) => isShown(photo.src))
  if (photos.length === 0) return null

  const carousel = photos.length > 1

  const goTo = (i: number) => {
    const el = track.current
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = track.current
    // Width can briefly read 0 mid-layout (e.g. while the window resizes).
    if (!el || el.clientWidth === 0) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    setIndex(Math.min(Math.max(i, 0), photos.length - 1))
  }

  return (
    <figure className="album">
      <div className="album__frame">
        <div
          ref={track}
          className="album__track"
          onScroll={carousel ? onScroll : undefined}
          {...(carousel && {
            role: 'region',
            'aria-roledescription': 'carousel',
            'aria-label': album.title,
            tabIndex: 0,
          })}
        >
          {photos.map((photo, i) => (
            <div
              key={isTodo(photo.src) ? photo.src.todo : photo.src}
              className="album__slide"
              {...(carousel && { role: 'group', 'aria-label': `${i + 1} of ${photos.length}` })}
            >
              {isTodo(photo.src) ? (
                <div className="placeholder">
                  <span className="placeholder__label">OWNER: {photo.src.todo}</span>
                </div>
              ) : (
                <img
                  src={resolveHref(photo.src)}
                  alt={photo.alt}
                  style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
                  // Later slides are clipped by the track, so lazy loading would only
                  // start once they're swiped into view. Fetch them up front instead.
                  loading={i === 0 ? 'lazy' : 'eager'}
                  fetchPriority={i === 0 ? 'auto' : 'low'}
                />
              )}
            </div>
          ))}
        </div>

        {carousel && (
          <>
            <button
              type="button"
              className="album__nav album__nav--prev"
              aria-label="Previous photo"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
            >
              <Chevron d="M10 3 5 8l5 5" />
            </button>
            <button
              type="button"
              className="album__nav album__nav--next"
              aria-label="Next photo"
              disabled={index === photos.length - 1}
              onClick={() => goTo(index + 1)}
            >
              <Chevron d="m6 3 5 5-5 5" />
            </button>
          </>
        )}
      </div>
      <figcaption className="album__caption">
        <span>{album.title}</span>
        {carousel && (
          <span className="album__dots" aria-hidden="true">
            {photos.map((_, i) => (
              <span key={i} className={i === index ? 'is-active' : undefined} />
            ))}
          </span>
        )}
      </figcaption>
    </figure>
  )
}

function Chevron({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
