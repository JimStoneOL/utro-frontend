import { useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { DirectorFurnitureImage } from "./DirectorFurnitureImage"

export const DirectorFurniture=()=>{

    const furnitureId = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
     const [isLoaded,setIsLoaded]=useState(false)
    const [furniture, setFurniture]=useState()

    const getFurnitureByArticle= useCallback(async (data) => {
        try {
        
          const fetched = await request(`https://morning-production-app.herokuapp.com/api/furniture/get/${furnitureId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
           (fetched)
      setFurniture(fetched)
        } catch (e) {}
      },[token,request])
      
      useEffect(()=>{
        getFurnitureByArticle(furnitureId)
      } ,[])
      

    return(
        <>
        {!loading && furniture ? <DirectorFurnitureImage data={furniture}/> : <div>Фурнитура не найдена</div>}
        </>
    )
}