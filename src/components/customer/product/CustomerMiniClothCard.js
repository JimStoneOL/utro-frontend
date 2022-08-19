
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useEffect, useState } from 'react';


export const CustomerMiniClothCard=({data,selectCloth})=>{

  const [selected,setSelected]=useState(false)

  useEffect(()=>{
    var isSelected=selectCloth('check '+data.article)
    setSelected(isSelected)
  },[])

    return(
        <>
   <Card sx={{ maxWidth: 345,backgroundColor:'#b2dfdb'}} key={data.article}>
      <CardMedia
        component="img"
        height="140"
        image={`data:image/jpeg;base64,${data.imageBytes}`}
        alt="cloth image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
                                {data.color} <br/>
                                {data.price} руб <br/>
                                
        </Typography>
      </CardContent>
      <CardActions>
      
        <a style={{cursor: 'pointer'}} onClick={()=>setSelected(selectCloth(data.article))}>
          {selected ? <i class="material-icons">check</i> : <i class="material-icons">crop_din</i>}
        </a>
      </CardActions>
    </Card>
        </>
    )
}