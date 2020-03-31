import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import logoImg from '../../assets/logo.png'

import api from '../../services/api'

export default function NewPost() {
    const userId = localStorage.getItem('userId')
    const history = useHistory()

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tags, setTags] = useState('')

    async function handleNewPost(e) {
        e.preventDefault()
        const data = {
            titulo, descricao, tags,
        }
        try {
            await api.post('posts', data, {
                headers: {
                    user_id: userId,
                }
            })
            history.push('/feed')
        }
        catch (err) {
            alert(`O post não pode ser cadastrado: ${err}`)
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img width={324} src={logoImg} alt="Be the Hero" />
                    <h1>Cadastrar nova dúvida</h1>
                    <p>Descreva sua dúvida da forma mais sucinta possível</p>
                    <Link className="back-link" to="/feed">
                        <FiArrowLeft size={16} color="#e2041"></FiArrowLeft>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewPost}>
                    <input
                        placeholder="Título do caso"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                    <input
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <input
                        placeholder="Tags para seguir separadas por ' , '"
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
// https://youtu.be/jFl90T6lnBQ?t=2974