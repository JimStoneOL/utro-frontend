import { Button } from "@mui/material"
import { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../../../utils/component/Loader"
import { UploadControl } from "../../../utils/component/UploadControl"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { useMessage } from "../../../utils/hooks/message.hook"
import { ManagerProductImageList } from "./ManagerProductImageList"
import axios from "axios";


export const ManagerProductImageRepository=()=>{

    const productId = useParams().id
    const {loading, request,error,clearError} = useHttp()
    const {token} = useContext(AuthContext)
    const [productImage, setProductImage]=useState([{}])
    const [file,setFile]=useState(null)
    const message = useMessage()


    const handleAddBanner = ({ target: { files } }) => {

        const loadedImage = files[0];
        if(loadedImage.type.split('/')[0]==='image'){

            const formData=new FormData()
            formData.append("file",loadedImage)
    
            try{
                axios.post(`https://morning-production-app.herokuapp.com/api/product/image/repository/upload/template/${productId}`,formData,{
                    headers:{
                      'Authorization':`Bearer ${token}`,
                      'Content-Type':'multipart/form-data'
                    }
                  }
                  )
                  window.location.reload()
        }catch(e){
          
        }
        }else{
          message('Неверный формат файла')
        }
      };

      useEffect(() => {
        message(error)
        clearError()
      }, [error, message, clearError])

    const getAllProductImages = useCallback(async () => {
        try {
          const fetched = await request(`https://morning-production-app.herokuapp.com/api/product/image/repository/get/template/${productId}`, 'GET', null, {
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

    return(<>
    <br/>
    <br/>
    <br/>
       <div className="pink lighten-5 center" style={{height:'30px',borderRadius:'50px'}}>
                    <UploadControl onChange={handleAddBanner} accept="image/*">
                    <h6 style={{color:'rgb(105, 182, 204)',cursor:'pointer'}}>
                    Добавить изображение
                    </h6>
                    </UploadControl>
                </div>
                <br/>
    {productImage.length>0 && !loading && <ManagerProductImageList dataList={productImage} productId={productId} update={getAllProductImages}/>}
    </>)
}