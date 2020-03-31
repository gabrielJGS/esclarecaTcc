import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'

import logoImg from '../../assets/logo.png'

import { FiPower } from 'react-icons/fi'

import api from '../../services/api'

export default function Profile() {
    const history = useHistory()

    const [posts, setPosts] = useState([])
    const userId = localStorage.getItem('userId')
    const userNome = localStorage.getItem('userNome')

    useEffect(() => {
        api.get('posts', {
            headers: {
                user_id: userId,
            }
        }).then(response => {
            console.log(response.data)
            setPosts(response.data)
        })
    }, [userId])

    function handleLogout() {
        localStorage.clear('')

        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img height={364} src={logoImg} alt="" />
                <span>Bem vindo(a), {userNome}</span>

                <Link className="button" to="/newpost">Nova dúvida</Link>
                <button onClick={handleLogout} >
                    <FiPower size={16} color="#2b475e"></FiPower>
                </button>
            </header>
            <h1>Dúvidas de seu interesse:</h1>
            <ul>
                {posts.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso: </strong>
                        <p>{incident.titulo}</p>
                        <strong>Tags: </strong>
                        <p>{incident.tag}</p>
                        <strong>Descrição</strong>
                        <p>{incident.descricao}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}