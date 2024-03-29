import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/fuce.png'

export default function NewIncident() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const history = useHistory()
  
  const ongId = localStorage.getItem('ongId')
  
  async function handleNewIncident(e) {
    e.preventDefault()
    const data = {
      title,
      description,
      value,
    }
    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })
      
      history.push('/profile')
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" width='100%;' />
          <h1> Cadastrar Novo Caso </h1>
          <p> Descreva o caso detalhadamente para encontrar um herói para resolver isso. </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input placeholder="Nome Completo" value={title} onChange={e => setTitle(e.target.value)} />
          <input placeholder="CPF" value={description} onChange={e => setDescription(e.target.value)} />
          <input placeholder="Instituição" value={value} onChange={e => setValue(e.target.value)} />
          <input placeholder="Matrícula" value={value} onChange={e => setValue(e.target.value)} />
          <input placeholder="CEP" value={value} onChange={e => setValue(e.target.value)} />
          <button className="button" type="submit"> Cadastrar </button>
        </form>
      </div>
    </div>
  )
}