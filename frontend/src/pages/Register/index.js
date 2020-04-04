import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'

import logoImg from '../../assets/logo.png'

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
                    <img src={logoImg} alt="" width={250} height={250} style={{marginBottom:5,marginLeft:20}} />
                    <h1 style={{marginTop:0}}>Cadastre-se</h1>
                    <p>Você sem dúvidas! Efetue já o acesso.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e2041"></FiArrowLeft>
                        Já possuo cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister} style={{marginTop:20}}>
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
                        placeholder="Assuntos desejados separados por ' , ' Ex: HTML, Cálculo, NodeJS" />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
//48:20

//https://drive.google.com/drive/u/1/my-drive