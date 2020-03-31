import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'

import logoImg from '../../assets/logo.svg'

import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

export default function Register() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [tags, setTags] = useState('')

    const history = useHistory();
    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            nome, email, senha, tags,
        }

        try {
            await api.post('signup', data)
            //const response = await api.post('signup', data)
            //TODO: Inserir função para ir direto para o feed após cadastro com sucesso
            history.push('/')
        }
        catch (err) {
            alert(`Erro no cadastro, tente novamente: ${err}`)
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e2041"></FiArrowLeft>
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        type="text"
                        placeholder="Nome"
                    />
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        placeholder="E-mail"
                    />
                    <input
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        type="password"
                        placeholder="Senha"
                    />
                    <input
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                        type="text"
                        placeholder="Tags para seguir separadas por ' , '" />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
//48:20

//https://drive.google.com/drive/u/1/my-drive