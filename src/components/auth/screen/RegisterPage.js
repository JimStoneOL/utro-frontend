import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../utils/context/AuthContext'
import { useAuth } from '../../../utils/hooks/auth.hook'
import { useHttp } from '../../../utils/hooks/http.hook'
import { useMessage } from '../../../utils/hooks/message.hook'
import morning from '../../../utils/img/morning.jpg'
import '../styles/own-card.css'
export const RegisterPage=()=>{


  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
   firstname:'',lastname:'', email: '', password: '',confirmPassword:''
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

  const registerHandler = async () => {
    try {
      const data = await request('http://localhost:8080/api/auth/signup', 'POST', {...form})
      console.log(data)
      message(data.message)
    } catch (e) {}
  }
    return(
        <div className="row">
        <div className="col s6 offset-s3">
          <div className="card center">
            <div className='own-container'>
            <div className="card-content white-text">
            <img class="" width="100%" height="100%" src={morning}/>
              <span className="card-title">Регистрация</span>
              <div>
  
              <div className="input-field">
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    className="yellow-input"
                    value={form.firstname}
                    onChange={changeHandler}
                  />
                  <label htmlFor="firstname">Имя</label>
                </div>

                <div className="input-field">
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    className="yellow-input"
                    value={form.lastname}
                    onChange={changeHandler}
                  />
                  <label htmlFor="lastname">Фамилия</label>
                </div>

                <div className="input-field">
                  <input
                    id="email"
                    type="text"
                    name="email"
                    className="yellow-input"
                    value={form.email}
                    onChange={changeHandler}
                  />
                  <label htmlFor="email">Email</label>
                </div>
  
                <div className="input-field">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="yellow-input"
                    value={form.password}
                    onChange={changeHandler}
                  />
                  <label htmlFor="password">Пароль</label>
                </div>

                <div className="input-field">
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    className="yellow-input"
                    value={form.confirmPassword}
                    onChange={changeHandler}
                  />
                  <label htmlFor="confirmPassword">Подтвердите пароль</label>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn yellow darken-4"
                style={{marginRight: 10}}
                onClick={registerHandler}
                disabled={loading}
              >
                Зарегистрироваться
              </button>
              <br/>
              <br/>
              <NavLink to="/">
              <button
                className="btn grey lighten-1 black-text"
              >
                Авторизироваться
              </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}