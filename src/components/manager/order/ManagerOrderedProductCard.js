import { Link } from "react-router-dom"

export const ManagerOrderedProductCard=({data})=>{
    return(
        <>
          <div class="col s12 m7">
        <div class="card horizontal">
          <div class="card-stacked">
            <div class="card-content">
              <p>
                  продукт: {data.productId} <br/>
                  количество: {data.amount} <br/>
                  <Link to={`/detail/product/${data.productId}`}>Подробнее</Link>
            </p>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}