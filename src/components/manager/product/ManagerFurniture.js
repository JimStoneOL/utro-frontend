import { useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { ManagerFurnitureImage } from "./ManagerFurnitureImage"

export const ManagerFurniture=()=>{

    const furnitureId = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
     const [isLoaded,setIsLoaded]=useState(false)
    const [furniture, setFurniture]=useState()

    const getFurnitureByArticle= useCallback(async (data) => {
        try {
        
          const fetched = await request(`http://localhost:8080/api/furniture/get/${furnitureId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          console.log(fetched)
      setFurniture(fetched)
        } catch (e) {}
      },[token,request])
      
      useEffect(()=>{
        getFurnitureByArticle(furnitureId)
      } ,[])
      

    return(
        <>
        {!loading && furniture ? <ManagerFurnitureImage data={furniture}/> : <h6 className="center" style={{marginTop:'20%'}}>Фурнитура не найдена</h6>}
        </>
    )
}