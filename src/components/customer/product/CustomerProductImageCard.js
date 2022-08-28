import { Button, Card, CardMedia } from "@mui/material"

export const CustomerProductImageCard=({data})=>{
 
    return(<>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        image={`data:image/jpeg;base64,${data.imageBytes}`}
        alt="product image"
      />
    </Card>
    </>)
}