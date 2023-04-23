import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import styles from './Post.module.css'

const Post = () => {
  const {id} = useParams()
  const { document: post, loading, error } = useFetchDocument("posts", id)


  return (
    <div className={styles.post_container}>
      {loading && <p>Buscando...</p>}
      {error && <p>{error}</p>}
      {post && (
        <>
          <h2>{post.title}</h2>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Este post trata de:</h3>
          <div className={styles.tags}>
            {post.tagsArray && post.tagsArray.map((tag, index) => (
                <p key={index}><span>#</span>{tag}</p>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Post