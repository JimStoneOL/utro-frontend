export const ManagerEditOrder=()=>{
    return(
        <div className="row">
        <div className="">
          <div className="card center">
            <div className='teal lighten-2'>
            <div className="card-content white-text">
              <span className="card-title">Оформление заказа</span>
              <div className="teal lighten-2">
              <input
                    placeholder="Выберите продукт"
                    id="product_name"
                    type="text"
                    name="product_name"
                    className="yellow-input"
                  />
                  </div>
              </div>
            <div className="card-action">
              <button
                className="btn own-button"
                style={{marginRight: 10}}
              >
                Создать
              </button>
            </div>
            </div>
            </div>
          </div>
        </div>
        
    )
}