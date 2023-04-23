import React from 'react'
import { Link } from 'react-router-dom'
import PostDetails from '../../components/PostDetails/PostDetails'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import styles from './Search.module.css'

const Search = () => {
  const query = useQuery()
  const search = query.get("q")

  const { documents: posts } = useFetchDocuments("posts", search)

  return (
    <div>
      <div className={styles.search}>
      <h2>search</h2>

        {posts && posts.length === 0 && (
          <>
            <p>Não foi encontrado nenhum resultado para sua busca...</p>
            <Link to='/' className='btn btn-dark'>Voltar</Link>
          </>
        )}
        {posts && posts.map((post, index) => (
          <PostDetails key={index} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Search