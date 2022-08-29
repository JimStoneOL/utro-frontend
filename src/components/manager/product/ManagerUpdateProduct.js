import { useCallback, useContext, useEffect, useState } from 'react'
import { UploadControl } from '../../../utils/component/UploadControl'
import { AuthContext } from '../../../utils/context/AuthContext'
import { useHttp } from '../../../utils/hooks/http.hook'
import { useMessage } from '../../../utils/hooks/message.hook'
import '../../../utils/styles/horizontal-menu.css'
import { Loader } from "../../../utils/component/Loader"
import axios from "axios";
import { MenuItem, TextField } from '@mui/material'
import { ManagerProductContext } from './ManagerProductContext'



export const ManagerUpdateProduct=({data})=>{

  const {loading, request,error,clearError} = useHttp()
  const {token} = useContext(AuthContext)
  const {update}=useContext(ManagerProductContext)
  const message = useMessage()
  const [file,setFile]=useState(null)
  

  const currencies = [
    {
      value: 'мм',
      label: 'мм',
    },
    {
      value: 'см',
      label: 'см',
    },
    {
      value: 'м',
      label: 'м',
    }
  ];

  const [currency, setCurrency] = useState('мм');

  const handleUnit = event => {
    setCurrency(event.target.value);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  

  const handleAddBanner = ({ target: { files } }) => {
    const loadedImage = files[0];
    if(loadedImage.type.split('/')[0]==='image'){
      setFile(loadedImage)
    }else{
      message('Неверный формат файла')
    }
  };

  const [form, setForm] = useState({
    article:data.article,
    name: data.name,
    width: data.width,
    length: data.length,
    comment: data.comment,
  })



  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const updateProductHandler=async event=>{
    //------------------------------------------------------------------------------------------------
    const formData=new FormData()
    formData.append("file",file)

    if(currency==='м'){
      
      form.length=form.length*1000
      form.width=form.width*1000
      setCurrency('мм')
      
    }else if(currency==='см'){

      form.length=form.length*10
      form.width=form.width*10
      setCurrency('мм')

    }
    let productId
    try{
      const data=await request('http://localhost:8080/api/product/template/update', 'POST', {...form},{
        Authorization: `Bearer ${token}`
      })
      productId=data.article
      axios.post(`http://localhost:8080/api/image/upload/template/product/${productId}`,formData,{
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'multipart/form-data'
          }
        }
        )
        update()
    message('Продукт успешно обновлён')
    }catch(e){
      update()
         ('wrong')
    }
  }

 
  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  if (loading) {
    return <Loader/>
  }

  return(
        <div className="row">
        <div className="">
          <div className="card center">
            <div className='pink lighten-5'>
            <div className="card-content white-text">
              <span className="card-title" style={{color:'rgb(105, 182, 204)'}}>Обновление шаблонного продукта</span>
              <div className="pink lighten-5">
              <div className="input-field">
                  <input
                    placeholder="Введите название"
                    id="name"
                    type="text"
                    name="name"
                    className="yellow-input"
                    value={form.name}
                    onChange={changeHandler}
                  />
                  </div>
                  <TextField
                        id="outlined-select-currency"
                        select
                        
                        value={currency}
                        onChange={handleUnit}
                        helperText="Выберите единицу измерения"
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                 </TextField>
                  <div className="input-field">
                  <input
                    placeholder="Введите ширину"
                    id="width"
                    type="text"
                    name="width"
                    className="yellow-input"
                    value={form.width}
                    onChange={changeHandler}
                  />
                  </div>
                  <div className="input-field">
                  <input
                    placeholder="Введите длину"
                    id="length"
                    type="text"
                    name="length"
                    className="yellow-input"
                    value={form.length}
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
                  <div className="input-field">
                  <input
                    placeholder="Оставьте комментарий"
                    id="comment"
                    type="text"
                    name="comment"
                    className="yellow-input"
                    value={form.comment}
                    onChange={changeHandler}
                  />
                  </div>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn own-button"
                style={{marginRight: 10,borderRadius:'50px'}}
                onClick={updateProductHandler}
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