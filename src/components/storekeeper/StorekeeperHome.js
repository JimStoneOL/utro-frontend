import { SwiperHome } from "../../utils/component/SwiperHome"
import { StorekeeperEmailLoadList } from "./email/StorekeeperEmailLoadList"

export const StorekeeperHome=()=>{
    return(
        <>
        <StorekeeperEmailLoadList/>
        <br/>
        <SwiperHome/>
        </>
    )
}