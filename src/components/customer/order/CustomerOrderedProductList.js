import { CustomerOrderedProductCard } from "./CustomerOrderedProductCard"

export const CustomerOrderedProductList=({dataList})=>{

    
    return(<>
        {
            dataList.map((item,i)=>{ 

              return(
               <>
               <CustomerOrderedProductCard data={item}/>
               </>
              ) 
              
             })
        }
      
      </>)

}