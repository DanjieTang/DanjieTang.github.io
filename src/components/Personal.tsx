import { personal } from '../content'
import { PhotoAlbum } from './PhotoAlbum'

export function Personal() {
  return (
    <>
      <p className="personal__intro">{personal.intro}</p>
      <div className="photo-grid">
        {personal.albums.map((album) => (
          <PhotoAlbum key={album.title} album={album} />
        ))}
      </div>
    </>
  )
}
