
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export const CustomerMiniProductCard=({data,selectProduct})=>{

  const [selected,setSelected]=useState(false)

  const [form,setForm]=useState({
    productId:'',orderId:'',amount:null
  })

  useEffect(()=>{
    var isSelected=selectProduct('check '+data.article)
    setSelected(isSelected)
  },[])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

    return(
        <>
   <Card sx={{ maxWidth: 345,backgroundColor:'#b2dfdb'}} key={data.article}>
      <CardMedia
        component="img"
        height="140"
        image={`data:image/jpeg;base64,${data.imageBytes}`}
        alt="product image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
                                <Link to={`/detail/product/${data.article}`}>Подробнее</Link>
               <div className="input-field">
                  <input
                    hidden={selected}
                    readOnly={selected}
                    placeholder="Укажите количество"
                    id="amount"
                    type="text"
                    name="amount"
                    className="yellow-input"
                    value={form.amount}
                    onChange={changeHandler}
                  />
                  </div>              
        </Typography>
      </CardContent>
      <CardActions>
      
        <a style={{cursor: 'pointer'}} onClick={()=>setSelected(selectProduct(data.article,form))}>
          {selected ? <i class="material-icons">check</i> : <i class="material-icons">crop_din</i>}
        </a>

      </CardActions>
    </Card>
        </>
    )
}