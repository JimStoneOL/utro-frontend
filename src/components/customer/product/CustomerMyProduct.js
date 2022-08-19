import { useContext, useEffect, useState } from "react"
import { Button, MenuItem, TextField } from "@mui/material"
import { Link, NavLink } from "react-router-dom"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"

export const CustomerMyProduct=({data})=>{

  const {token} = useContext(AuthContext)
  const {request,loading} = useHttp()

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

  const deleteHandler=async event=>{
    try {
      const fetch = await request(`http://localhost:8080/api/product/delete/${data.article}`, 'POST', null,{
        Authorization: `Bearer ${token}`
      })
    }catch(e){}
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
        <Link to={`/my/detail/cloth/${data.article}`}>Ткань</Link>
        <Link to={`/my/detail/furniture/${data.article}`}>Фурнитура</Link>
        <Button variant="outlined" onClick={deleteHandler}>Удалить</Button>

        </div>
            </div>
          </div>
        </div>
        </>
    )
}