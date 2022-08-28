import { useContext, useEffect, useState } from "react";
import { UploadControl } from "../../../utils/component/UploadControl";
import { AuthContext } from "../../../utils/context/AuthContext";
import { useHttp } from "../../../utils/hooks/http.hook";
import { useMessage } from "../../../utils/hooks/message.hook";
import axios from "axios";
import { MenuItem, TextField } from "@mui/material";

export const ManagerCreateFurniture=()=>{

  const message = useMessage()
  const {token} = useContext(AuthContext)
  const { request, error, clearError} = useHttp()
  const [form,setForm]=useState({
    name:'',type:'',width:null,length:null,weight:null,price:null
  })
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

  const pressHandler = async event => {
    console.log(form)
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

    let furnitureArticle;
      try {
        const data = await request('http://localhost:8080/api/furniture/create', 'POST', {...form},{
          Authorization: `Bearer ${token}`
        })
        furnitureArticle=data.article
        message('Фурнитура успешно создана '+furnitureArticle)
      }catch(e){}
      try{
        axios.post(`http://localhost:8080/api/image/upload/furniture/${furnitureArticle}`,formData,{
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'multipart/form-data'
          }
        }
        )
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

    return(
        <div className="row">
        <div className="">
          <div className="card center">
            <div className='pink lighten-5'>
            <div className="card-content white-text">
              <span className="card-title" style={{color:'rgb(105, 182, 204)'}}>Создание фурнитуры</span>
              <div className="pink lighten-5">
              <div className="input-field pink lighten-5">
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
                  <div className="input-field pink lighten-5">
                  <input
                    placeholder="Введите тип"
                    id="type"
                    type="text"
                    name="type"
                    className="yellow-input"
                    value={form.type}
                    onChange={changeHandler}
                  />
                  </div>
                  <div className="input-field pink lighten-5">
                  <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
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
                  <div className="input-field">
                  <input
                    placeholder="Введите вес"
                    id="weight"
                    type="text"
                    name="weight"
                    className="yellow-input"
                    value={form.weight}
                    onChange={changeHandler}
                  />
                  </div>
                  <div className="pink lighten-5">
                    <UploadControl onChange={handleAddBanner} accept="image/*">
                    <div style={{color:'rgb(105, 182, 204)',cursor:'pointer'}}>
                    {file ? file.name : 'Добавить изображение'}
                    </div>
                    </UploadControl>
                </div>
                  <div className="">
                  <input
                    placeholder="укажите цену"
                    id="price"
                    type="text"
                    name="price"
                    className="yellow-input"
                    value={form.price}
                    onChange={changeHandler}
                  />
                  </div>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn own-button"
                style={{marginRight: 10,borderRadius:'50px'}}
                onClick={pressHandler}
              >
                Создать
              </button>
            </div>
            </div>
          </div>
        </div>
        
      </div>
    )
}