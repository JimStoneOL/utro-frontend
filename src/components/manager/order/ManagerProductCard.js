
import { MenuItem, TextField } from "@mui/material";
import { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../../utils/context/AuthContext";
import { useHttp } from "../../../utils/hooks/http.hook";

export const ManagerProductCard=({data})=>{

  const {token} = useContext(AuthContext)
  const {request,loading,error,clearError} = useHttp()
  const [price,setPrice]=useState(0)
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

  const getPriceForProduct = useCallback(async () => {
    try {
      const fetched = await request(`https://morning-production-app.herokuapp.com/api/product/price/${data.article}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
        setPrice(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getPriceForProduct()
  }, [getPriceForProduct])

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
             Комментарий: {data.comment} <br/>
             Цена: {Math.round(price * 100) / 100} руб
           </p>
           </div>

           <div class="card-action">
                <Link to={`/any/detail/cloth/${data.article}`}>Ткань</Link>
                <Link to={`/any/detail/furniture/${data.article}`}>Фурнитура</Link>
                <Link to={`/any/detail/images/${data.article}`}>Изображения</Link>
     </div>
         </div>
       </div>
     </div>
     </>
    )
}