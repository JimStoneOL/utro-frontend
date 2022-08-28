import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { Loader } from "../../../utils/component/Loader"
import { StorekeeperClothList } from "./StorekeeperClothList"


export const StorekeeperClothPage=()=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [clothData, setClothData]=useState([])


  const getAllCloths = useCallback(async () => {
    try {
      const fetched = await request('http://localhost:8080/api/cloth/get/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setClothData(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getAllCloths()
  }, [getAllCloths])
  
  if (loading) {
    return <Loader/>
  }
  
    return(
      <>
      {!loading && clothData && <StorekeeperClothList dataList={clothData}/>}
        </>
    )
 }
 