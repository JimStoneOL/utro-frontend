import { Button, MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const DirectorFurnitureProductDetailList=({data})=>{

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
        <div class="col s12 m7">
        <div class="card horizontal">
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
                  размещение: {data.placement} <br/>
                  ширина: {width} {currency}<br/>
                  длина: {length} {currency} <br/>
                  поворот: {data.turn} <br/>
                  количество: {data.amount} <br/>
                  <Link to={`/furniture/${data.furnitureId}`}>Подробнее</Link>
            </p>
            </div>
          </div>
        </div>
      </div>
    )
}