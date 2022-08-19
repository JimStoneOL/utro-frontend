import { useContext, useEffect, useState } from "react"
import { UploadControl } from "../../../utils/component/UploadControl"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { useMessage } from "../../../utils/hooks/message.hook"
import axios from 'axios'


export const CustomerUpdateProfile=()=>{
   
  const message = useMessage()
  const {token} = useContext(AuthContext)
  const {loading, request, requestFile, error, clearError} = useHttp()
  const [form,setForm]=useState({
    firstname:'',lastname:''
  })
  const [file,setFile]=useState(null)

  const pressHandler = async event => {
    console.log(file)
    const formData=new FormData()
    formData.append("file",file)
      try {
        axios.post('http://localhost:8080/api/image/upload/avatar',formData,{
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'multipart/form-data'
          }
        }
        )
        window.location.reload()
      } catch (e) {}
    }

    const handleAddBanner = ({ target: { files } }) => {
      const loadedImage = files[0];
      console.log(loadedImage)
      setFile(loadedImage)
    };

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

  const fileChangeHandler = event => {
    setFile(event.target.value)
  }
  
  return(
        <div className="row">
        <div className="">
          <div className="card center">
            <div className='teal lighten-2'>
            <div className="card-content white-text">
              <span className="card-title">Обновление профиля</span>
              <div className="teal lighten-2">
              <div className="input-field teal lighten-2">
                  <input
                    placeholder="Введите имя"
                    id="firstname"
                    type="text"
                    name="firstname"
                    className="yellow-input"
                    value={form.firstname}
                    onChange={changeHandler}
                  />
                  </div>
                  <div className="input-field teal lighten-2">
                  <input
                    placeholder="Введите фамилию"
                    id="lastname"
                    type="text"
                    name="lastname"
                    className="yellow-input"
                    value={form.lastname}
                    onChange={changeHandler}
                  />
                  </div>
                
                  <div className="teal lighten-0">
                    <UploadControl onChange={handleAddBanner} accept="image/*">
                      Добавить изображение
                    </UploadControl>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn own-button"
                style={{marginRight: 10}}
                onClick={pressHandler}
              >
                Обновить
              </button>
            </div>
            </div>
          </div>
        </div>
        
      </div>
    )
}