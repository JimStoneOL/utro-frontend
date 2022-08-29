import { useContext, useEffect, useState } from "react"
import { UploadControl } from "../../../utils/component/UploadControl"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { useMessage } from "../../../utils/hooks/message.hook"
import axios from 'axios'
import { Loader } from "../Loader"


export const UpdateProfile=()=>{
   
  const message = useMessage()
  const {token} = useContext(AuthContext)
  const {loading, request, requestFile, error, clearError} = useHttp()
  const [form,setForm]=useState({
    firstname:'',lastname:''
  })
  const [file,setFile]=useState(null)

  const pressHandler = async event => {
    const formData=new FormData()
    formData.append("file",file)
    try{
          await request('https://morning-production-app.herokuapp.com/api/user/update', 'POST', {...form},{
          Authorization: `Bearer ${token}`
        })
    }catch(e){}
    message('Данные обновлены')
      try {
        axios.post('https://morning-production-app.herokuapp.com/api/image/upload/avatar',formData,{
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'multipart/form-data'
          }
        }
        )
       message('Изображение обновлено')
      } catch (e) {}
    }

    const handleAddBanner = ({ target: { files } }) => {
      const loadedImage = files[0];
      if(loadedImage.type.split('/')[0]==='image'){
        setFile(loadedImage)
      }else{
        message('Неверный формат файла')
      }
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


  if (loading) {
    return <Loader/>
  }
  
  return(
        <div className="row">
        <div className="">
          <div className="card center">
            <div className='pink lighten-5'>
            <div className="card-content white-text">
              <span className="card-title" style={{color:'rgb(105, 182, 204)'}}>Обновление профиля</span>
              <div className="pink lighten-5">
              <div className="input-field">
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
                  <div className="input-field">
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
                
                  <div className="">
                  <UploadControl onChange={handleAddBanner} accept="image/*">
                    <div style={{color:'rgb(105, 182, 204)',cursor:'pointer'}}>
                    {file ? file.name : 'Добавить изображение'}
                    </div>
                    </UploadControl>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn own-button"
                style={{marginRight: 10,borderRadius:'50px'}}
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