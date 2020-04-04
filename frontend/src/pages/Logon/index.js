import React, { useState }  from 'react'
import { Link, useHistory} from 'react-router-dom'

import './styles.css'

import logoImg from '../../assets/logo.png'
import heroesImg from '../../assets/heroes.png'

import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

export default function Logon() {
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    
    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('login', { email, senha })
            console.log(response.data)
            localStorage.setItem('userId', response.data.id)
            localStorage.setItem('userNome', response.data.nome)
            history.push('/feed')
        }
        catch (err) {
            alert(`Falha no login, tente novamente: ${err}`)
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img width={364} src={logoImg} alt="Logo" style={{marginTop:20}} />
                <form onSubmit={handleLogin} style={{marginBottom:50,marginTop:0}}>
                    <h1>Faça seu Login</h1>
                    <input
                        type="text"
                        placeholder="Seu email"
                        name={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Sua senha"
                        name={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register" style={{margintop:1}}>
                        <FiLogIn size={16} color="#2b475e"></FiLogIn>
                        Não possuo cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="" />
        </div>
    )
}