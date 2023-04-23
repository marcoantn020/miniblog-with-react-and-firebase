import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import styles from './EditPost.module.css'

const EditPost = () => {
  const { id } = useParams()
  const {document: post} = useFetchDocument("posts", id)

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if(post) {
      setTitle(post.title)
      setImage(post.image)
      setBody(post.body)
      const textTags = post.tagsArray.join(", ")
      setTags(textTags)
    }
  }, [post]);

  const { user } = useAuthValue()
  const { updateDocument, response } = useUpdateDocument("posts")
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
    let tagsArray
    if(tags.length > 0) {
      tagsArray = tags.split(",").map(tag => tag.trim().toLowerCase())
    } else {
      tagsArray = ['notag']
    }

    // checar todos o valores
    if(!title || !body || !image || !tags) {
      setFormError("Preencha todos os campos.")
    }

    if(formError) return
    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }
    updateDocument(id, data)

    // redirect to home page
    navigate("/dashboard")
  }

  return (
    <div className={styles.post}>
      {post && (
        <>
          <h2>Editar post: {post.title}</h2>
          <p>Altere os dados do post como desejar.</p>
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

            <p className={styles.preview_title}>Preview da imagem atual</p>
            <img className={styles.preview_image} src={post.image} alt={post.title} />

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

            {!response.loading && <button className='btn' type="submit">Editar</button>}
            {response.loading && <button className='btn' disabled type="submit">Aguarde...</button>}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost