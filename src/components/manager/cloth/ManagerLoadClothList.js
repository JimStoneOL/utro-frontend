import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { Loader } from "../../../utils/component/Loader"
import { ManagerClothList } from "./ManagerClothList"
import { ManagerClothFilter } from "./ManagerClothFilter"


export const ManagerLoadClothList=()=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [clothData, setClothData]=useState([])


  const getAllCloths = useCallback(async () => {
    try {
      const fetched = await request('https://morning-production-app.herokuapp.com/api/cloth/get/all', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setClothData(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getAllCloths()
  }, [getAllCloths])

  if(!(clothData.length>0) && !loading){
    return <h6 className="center" style={{marginTop:'20%'}}>Пусто</h6>
  }
  
  if (loading) {
    return <Loader/>
  }
  return(<>
  {clothData.length>0 && !loading && <ManagerClothFilter dataList={clothData} update={getAllCloths}/>}
  </>)

}