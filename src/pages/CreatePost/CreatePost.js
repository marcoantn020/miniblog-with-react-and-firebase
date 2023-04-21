import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import styles from './Createpost.module.css'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const { user } = useAuthValue()
  const { insertDocument, response } = useInsertDocument("posts")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")
    // validar image url
    try {
      new URL(image)
    } catch (error) {
      setFormError("A url não é valida.")
    }

    // criar array de tags
    const tagsArray = tags.split(",").map(tag => tag.trim().toLowerCase())

    // checar todos o valores
    if(!title || !body || !image || !tags) {
      setFormError("Preencha todos os campos.")
    }

    if(formError) return
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // redirect to home page
    navigate("/")
  }

  return (
    <div className={styles.post}>
      <h2>Criar post</h2>
      <p>Escreva um post sobre o que quiser e compatilhe sua experiencia/conhecimento.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo:</span>
          <input 
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            placeholder='Titulo do post' />
        </label>

        <label>
          <span>URL da imagem:</span>
          <input 
            type="text"
            name="image"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            placeholder='url da imagem' />
        </label>

        <label>
          <span>Conteudo:</span>
          <textarea 
            placeholder='conteudo do seu post'
            onChange={(e) => setBody(e.target.value)}
            value={body}
            required
            name="body" >
            </textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input 
            type="text"
            name="tags"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            placeholder='insira as tags separadas por virgula (,).' />
        </label>

        {!response.loading && <button className='btn' type="submit">Cadastrar</button>}
        {response.loading && <button className='btn' disabled type="submit">Aguarde...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost