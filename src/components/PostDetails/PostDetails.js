import { Link } from 'react-router-dom'
import styles from './Postdetails.module.css'

const PostDetails = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={styles.createdBy}>{post.createdBy}</p>
      <div className={styles.tags}>
        {post.tagsArray && post.tagsArray.map((tag, index) => (
          <p key={index}>
            <span>#</span>{tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ler mais...</Link>
    </div>
  )
}

export default PostDetails