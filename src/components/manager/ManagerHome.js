
import { SwiperHome } from "../../utils/component/SwiperHome"
import { ManagerEmailLoadList } from "./email/ManagerEmailLoadList"

export const ManagerHome=()=>{
    return(
        <>
        <ManagerEmailLoadList/>
        <br/>
        <SwiperHome/>
        </>
    )
}