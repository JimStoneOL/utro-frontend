import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../utils/context/AuthContext"
import { useHttp } from "../../../utils/hooks/http.hook"
import { Loader } from "../../../utils/component/Loader"
import { ProfileInfo } from "./ProfileInfo"


export const Profile=()=>{

  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)
  const [userData, setUserData]=useState(null)
  const [img,setImg]=useState(null)

  const profileInfo = useCallback(async () => {
    try {
      const fetched = await request('http://localhost:8080/api/user/get/profile', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setUserData(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    profileInfo()
  }, [profileInfo])

  const avatar = useCallback(async () => {
    try {
      const fetched = await request('http://localhost:8080/api/image/get/avatar', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setImg(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    avatar()
  }, [avatar])
  
  if (loading) {
    return <Loader/>
  }
  return(
    <>
   {!loading && userData && img &&<ProfileInfo userData={userData} image={img} />} 
    </>
  )
}