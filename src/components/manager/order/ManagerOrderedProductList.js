import { ManagerOrderedProductCard } from "./ManagerOrderedProductCard"


export const ManagerOrderedProductList=({dataList})=>{

    
    return(<>
        {
            dataList.map((item,i)=>{ 

              return(
               <>
               <ManagerOrderedProductCard data={item}/>
               </>
              ) 
              
             })
        }
      
      </>)

}