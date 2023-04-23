import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PostDetails from '../../components/PostDetails/PostDetails'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import styles from './Home.module.css'

const Home = () => {
  const [query, setQuery] = useState("")
  const { documents: posts, error, loading} = useFetchDocuments("posts")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes.</h1>
      <form className={styles.form_search} onSubmit={handleSubmit}>
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Ou pesquise por tags...'
          name="search" />

        <button 
          type="submit" 
          className="btn btn-dark">Pesquisar</button>
      </form>

    <div>
      {loading && <p>Carregando...</p>}
      {error && <p> {error} </p>}
      { posts && posts.map((post) => (
        <PostDetails key={post.id} post={post} />
      ))}

     {posts && posts.length === 0 && (
       <div className={styles.noposts}>
          <p>Não foi encontrado nenhum post</p>
          <Link to="/posts/create" className='btn'>
            Criar primeiro post.
          </Link>
        </div>
     )}
    </div>

  </div>
  )
}

export default Home