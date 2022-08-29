import { Button, Card, CardMedia } from "@mui/material"
import { useEffect } from "react"
import { useCallback, useContext } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { useMessage } from "../../../utils/hooks/message.hook"

export const CustomerMyProductImageCard=({data,productId,update})=>{

  const {loading, request,error,clearError} = useHttp()
  const {token} = useContext(AuthContext)
  const message = useMessage()

  const deleteTemplateProductImage=useCallback(async (productId,id) => { 
    try{
      await request(`https://morning-production-app.herokuapp.com/api/product/image/repository/delete/${productId}/${id}`, 'POST', null,{
      Authorization: `Bearer ${token}`
      })
      update()
  }catch(e){
  }
  },[token,request])


const pressHandler = event => {
  deleteTemplateProductImage(productId,data.id)
}

useEffect(() => {
  message(error)
  clearError()
}, [error, message, clearError])

    return(<>
    <Card sx={{ maxWidth: 345 }} key={data.id}>
      <CardMedia
        component="img"
        image={`data:image/jpeg;base64,${data.imageBytes}`}
        alt="product image"
      />
      <Button onClick={pressHandler}><i class="material-icons">clear</i></Button>
    </Card>
    </>)
}