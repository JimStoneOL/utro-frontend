import { Button } from "@mui/material"
import { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../../../utils/component/Loader"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { useMessage } from "../../../utils/hooks/message.hook"
import { ManagerAnyProductImageList } from "./ManagerAnyProductImageList"


export const ManagerAnyProductImageRepository=()=>{

    const productId = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [productImage, setProductImage]=useState([{}])
    const message = useMessage()


    const getAllProductImages = useCallback(async () => {
        try {
          const fetched = await request(`http://localhost:8080/api/product/image/repository/get/all/${productId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          setProductImage(fetched)
        } catch (e) {}
      }, [token, request])
    
      useEffect(() => {
        getAllProductImages()
      }, [getAllProductImages])

     
      if (loading) {
        return <Loader/>
      }
      if(productImage.length<1 && !loading){
        return(<>
            <h6 className="center" style={{marginTop:'20%'}}>Пусто</h6>
        </>)
      }

    return(<>
    <br/>
    <br/>
    {productImage.length>0 && !loading && <ManagerAnyProductImageList dataList={productImage}/>}
    </>)
}