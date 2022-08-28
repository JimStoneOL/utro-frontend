import { SwiperHome } from "../../utils/component/SwiperHome"
import { CustomerEmailLoadList } from "./email/CustomerEmailLoadList"

export const CustomerHome=()=>{
    return(
    <>
    <CustomerEmailLoadList/>
    <br/>
    <SwiperHome/>
    </>
    )
}