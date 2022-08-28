import { Button, MenuItem, TextField } from "@mui/material"
import { useCallback, useContext, useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"

export const CustomerProduct=({data})=>{

  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const [width,setWidth]=useState(data.width)
  const [length,setLength]=useState(data.length)

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

  useEffect(()=>{

    if(currency==='м'){
      setLength(data.length/1000)
      setWidth(data.width/1000)
    
    }else if(currency==='см'){
      setLength(data.length/10)
      setWidth(data.width/10)

    }else if(currency==='мм'){
      setLength(data.length)
      setWidth(data.width)

    }
      
  },[currency,length,width])

  const addToMyself= useCallback(async (article) => {
    try {
        await request(`http://localhost:8080/api/product/template/add/${article}`, 'POST', null, {
        Authorization: `Bearer ${token}`
      })
      
    } catch (e) {}
  },[token,request])

  const pressHandler=event=>{
    addToMyself(data.article)
  }
  if (loading) {
    return <Loader/>
  }
    return(
        <>
           <div class="col s12 m7">
          <div class="card horizontal">
            <div class="card-image">
              <img src={`data:image/jpeg;base64,${data.imageBytes}`}/>
            </div>
            <div class="card-stacked">
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
              <div class="card-content">
                <p>
                Артикль: {data.article} <br/>
                Наименование: {data.name} <br/>
                ширина: {width} {currency}<br/>
                длина: {length} {currency} <br/>
                Комментарий: {data.comment}
              </p>
              </div>
              <div class="card-action">
        <Link to={`/detail/cloth/${data.article}`}>Ткань</Link>
        <Link to={`/detail/furniture/${data.article}`}>Фурнитура</Link>
        <Link to={`/detail/images/${data.article}`}>Изображения</Link>
        <Button variant="outlined" onClick={pressHandler}>Добавить</Button>
        </div>
            </div>
          </div>
        </div>
        </>
    )
}