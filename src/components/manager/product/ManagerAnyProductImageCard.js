import { Button, Card, CardMedia } from "@mui/material"
import { useCallback, useContext } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"

export const ManagerAnyProductImageCard=({data})=>{
 
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