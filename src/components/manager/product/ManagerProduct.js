import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom"

export const ManagerProduct=({data})=>{

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
        </div>
            </div>
          </div>
        </div>
        </>
    )
}