import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../utils/context/AuthContext'
import { useHttp } from '../../../utils/hooks/http.hook'
import { useMessage } from '../../../utils/hooks/message.hook'
import morning from '../../../utils/img/morning.jpg'
import '../styles/own-card.css'

export const AuthPage = () => {

  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    username: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    try {
      const data = await request('https://morning-production-app.herokuapp.com/api/auth/signin', 'POST', {...form})
      auth.login(data.token, data.id,data.roles)
    } catch (e) {}
  }
  
    return (
      <div className="row">
        <div className="col s6 offset-s3">
          <div className="card center">
            <div className='own-container'>
            <div className="card-content white-text">
            <img class="" width="100%" height="100%" src={morning}/>
              <span className="card-title">Авторизация</span>
              <div>
  
                <div className="input-field">
                  <input
                    placeholder="Введите email"
                    id="username"
                    type="text"
                    name="username"
                    className="yellow-input"
                    value={form.username}
                    onChange={changeHandler}
                  />
                  <label htmlFor="username">Email</label>
                </div>
  
                <div className="input-field">
                  <input
                    placeholder="Введите пароль"
                    id="password"
                    type="password"
                    name="password"
                    className="yellow-input"
                    value={form.password}
                    onChange={changeHandler}
                  />
                  <label htmlFor="password">Пароль</label>
                </div>
  
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn own-button"
                style={{marginRight: 10}}
                disabled={loading}
                onClick={loginHandler}
              >
                Войти
              </button>
              <NavLink to="/register">
              <button
                className="waves-effect waves-light btn-small"
              >
                Регистрация
              </button>
              </NavLink>
            </div>
            </div>
          </div>
        </div>
      </div>
    )
  }