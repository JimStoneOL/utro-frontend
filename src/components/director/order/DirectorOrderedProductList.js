import { DirectorOrderedProductCard } from "./DirectorOrderedProductCard"

export const DirectorOrderedProductList=({dataList})=>{

    
    return(<>
        {
            dataList.map((item,i)=>{ 

              return(
               <>
               <DirectorOrderedProductCard data={item}/>
               </>
              ) 
              
             })
        }
      
      </>)

}