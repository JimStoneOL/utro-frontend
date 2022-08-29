
import '../../../utils/styles/vertical-menu.css'
import { StorekeeperEmailCard } from './StorekeeperEmailCard'

export const StorekeeperEmailList=({dataList})=>{

    return(<>
    <br/>
   <main>
        {
            dataList.map((item,i)=>{ 
              return(
               <>
              <div className="section">
                 <StorekeeperEmailCard data={item}/>
              </div>
               </>
              ) 
             })
        }
      </main>
      </>)
}