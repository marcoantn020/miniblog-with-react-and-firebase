import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import styles from './Dashboard.module.css'


const Dashboard = () => {
  const {user} = useAuthValue()
  const uid = user.uid
  
  const deleteDocument = (id) => {

  }

  // post do usuario
  const {documents: posts, loading, error} = useFetchDocuments("posts", null, uid)

  return (
    <div className={styles.dashboard}>
      <h2> Dashboard </h2>
      <p> Gerencie seus posts </p>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Voce não possui nenhum post ainda.</p>
          <Link className='btn' to="/posts/create">Criar primeiro post</Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Titulo</span>
            <span>acoes</span>
          </div>

          {posts && posts.map((post, index) => (
            <div className={styles.post_row} key={index}>
              <p>{post.title}</p>
              <div>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">ver</Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">editar</Link>
                <button 
                  className='btn btn-outline btn-danger' 
                  onClick={deleteDocument(post.id)}>
                  deletar
                  </button>
              </div>
            </div>
          ))}
        </>
      )}

    </div>
  )
}

export default Dashboard