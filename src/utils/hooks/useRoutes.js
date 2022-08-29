import { Redirect, Route, Switch } from "react-router-dom"
import { AuthPage } from "../../components/auth/screen/AuthPage"
import { RegisterPage } from "../../components/auth/screen/RegisterPage"
import { CustomerClothPage } from "../../components/customer/cloth/CustomerClothPage"
import { CustomerHome } from "../../components/customer/CustomerHome"
import { CustomerEmailCreate } from "../../components/customer/email/CustomerEmailCreate"
import { CustomerFurniturePage } from "../../components/customer/furniture/CustomerFurniturePage"
import { CustomerOrderDetail } from "../../components/customer/order/CustomerOrderDetail"
import { CustomerOrderPage } from "../../components/customer/order/CustomerOrderPage"
import { CustomerProduct } from "../../components/customer/order/CustomerProduct"
import { CustomerClothProduct } from "../../components/customer/product/CustomerClothProduct"
import { CustomerFurniture } from "../../components/customer/product/CustomerFurniture"
import { CustomerFurnitureProduct } from "../../components/customer/product/CustomerFurnitureProduct"
import { CustomerMyClothProduct } from "../../components/customer/product/CustomerMyClothProduct"
import { CustomerMyFurnitureProduct } from "../../components/customer/product/CustomerMyFurnitureProduct"
import { CustomerMyProductImageRepository } from "../../components/customer/product/CustomerMyProductImageRepository"
import { CustomerProductImageRepository } from "../../components/customer/product/CustomerProductImageRepository"
import { CustomerProductPage } from "../../components/customer/product/CustomerProductPage"
import { DirectorClothPage } from "../../components/director/cloth/DirectorClothPage"
import { DirectorHome } from "../../components/director/DirectorHome"
import { DirectorEmailCreate } from "../../components/director/email/DirectorEmailCreate"
import { DirectorFurniturePage } from "../../components/director/furniture/DirectorFurniturePage"
import { DirectorOrderDetail } from "../../components/director/order/DirectorOrderDetail"
import { DirectorOrderList } from "../../components/director/order/DirectorOrderList"
import { DirectorProduct } from "../../components/director/order/DirectorProduct"
import { DirectorAnyClothProduct } from "../../components/director/product/DirectorAnyClothProduct"
import { DirectorAnyFurnitureProduct } from "../../components/director/product/DirectorAnyFurnitureProduct"
import { DirectorClothProduct } from "../../components/director/product/DirectorClothProduct"
import { DirectorFurniture } from "../../components/director/product/DirectorFurniture"
import { DirectorFurnitureProduct } from "../../components/director/product/DirectorFurnitureProduct"
import { DirectorProductList } from "../../components/director/product/DirectorProductList"
import { DirectorProductPage } from "../../components/director/product/DirectorProductPage"
import { ReportPage } from "../../components/director/report/ReportPage"
import { UserPage } from "../../components/director/users/UserPage"
import { ManagerClothPage } from "../../components/manager/cloth/ManagerClothPage"
import { ManagerEmailCreate } from "../../components/manager/email/ManagerEmailCreate"
import { ManagerEmailLoadList } from "../../components/manager/email/ManagerEmailLoadList"
import { ManagerFurniturePage } from "../../components/manager/furniture/ManagerFurniturePage"
import { ManagerHome } from "../../components/manager/ManagerHome"
import { ManagerOrderDetail } from "../../components/manager/order/ManagerOrderDetail"
import { ManagerOrderPage } from "../../components/manager/order/ManagerOrderPage"
import { ManagerProduct } from "../../components/manager/order/ManagerProduct"
import { ManagerAnyClothProduct } from "../../components/manager/product/ManagerAnyClothProduct"
import { ManagerAnyFurnitureProduct } from "../../components/manager/product/ManagerAnyFurnitureProduct"
import { ManagerAnyProductImageRepository } from "../../components/manager/product/ManagerAnyProductImageRepository"
import { ManagerClothProduct } from "../../components/manager/product/ManagerClothProduct"
import { ManagerFurniture } from "../../components/manager/product/ManagerFurniture"
import { ManagerFurnitureProduct } from "../../components/manager/product/ManagerFurnitureProduct"
import { ManagerProductImageRepository } from "../../components/manager/product/ManagerProductImageRepository"
import { ManagerProductList } from "../../components/manager/product/ManagerProductList"
import { ManagerProductPage } from "../../components/manager/product/ManagerProductPage"
import { StorekeeperClothList } from "../../components/storekeeper/cloth/StorekeeperClothList"
import { StorekeeperClothPage } from "../../components/storekeeper/cloth/StorekeeperClothPage"
import { StorekeeperEmailCreate } from "../../components/storekeeper/email/StorekeeperEmailCreate"
import { StorekeeperFurnitureList } from "../../components/storekeeper/furniture/StorekeeperFurnitureList"
import { StorekeeperFurniturePage } from "../../components/storekeeper/furniture/StorekeeperFurniturePage"
import { StorekeeperOrderList } from "../../components/storekeeper/order/StorekeeperOrderList"
import { StorekeeperProductList } from "../../components/storekeeper/product/StorekeeperProductList"
import { StorekeeperHome } from "../../components/storekeeper/StorekeeperHome"
import { AboutPage } from "../component/About"
import { BucketPage } from "../component/bucket/BucketPage"
import { ProfilePage } from "../component/profile/ProfilePage"




export const useRoutes=(isAuthenticated,role)=>{
   
    //customer
    if(isAuthenticated && role==='ROLE_CUSTOMER'){
        return(
          <Switch>
                  <Route path="/" exact>
                    <CustomerHome/>
                </Route>
                <Route path="/order" >
                    <CustomerOrderPage/>
                </Route>
                <Route path="/detail/order/:id" >
                    <CustomerOrderDetail/>
                </Route>
                <Route path="/product">
                    <CustomerProductPage/>
                </Route>
                <Route path="/detail/product/:id">
                    <CustomerProduct/>
                </Route>
                <Route path="/detail/cloth/:id">
                      <CustomerClothProduct />
                  </Route>
                  <Route path="/my/detail/cloth/:id">
                      <CustomerMyClothProduct />
                  </Route>
                <Route path="/detail/furniture/:id">
                        <CustomerFurnitureProduct />
               </Route>
               <Route path="/my/detail/furniture/:id">
                        <CustomerMyFurnitureProduct />
               </Route>
               <Route path="/detail/images/:id">
                    <CustomerProductImageRepository />
                </Route>
                <Route path="/my/detail/images/:id">
                    <CustomerMyProductImageRepository />
                </Route>
                <Route path="/cloth">
                    <CustomerClothPage/>
                </Route>
                <Route path="/furniture" exact>
                    <CustomerFurniturePage/>
                </Route>
                  <Route path="/furniture/:id">
                          <CustomerFurniture/>
                  </Route>
                <Route path="/about">
                    <AboutPage/>
                </Route>
                <Route path="/profile">
                    <ProfilePage/>
                </Route>
                <Route path="/bucket">
                    <BucketPage/>
                </Route>
                <Route path="/email">
                    <CustomerEmailCreate/>
                </Route>
                <Redirect to="/" />
        </Switch>
        )
    }
    //director
   if(isAuthenticated && role==='ROLE_DIRECTOR'){
    return(
        <Switch>
        <Route path="/" exact>
                <DirectorHome/>
        </Route>
        <Route path="/order">
                <DirectorOrderList/>
         </Route>
         <Route path="/detail/order/:id" >
                    <DirectorOrderDetail/>
                </Route>
              <Route path="/product">
                <DirectorProductPage/>
            </Route>
            <Route path="/detail/product/:id">
                    <DirectorProduct/>
                </Route>
            <Route path="/detail/cloth/:id">
                 <DirectorClothProduct />
            </Route>
            <Route path="/detail/furniture/:id">
                 <DirectorFurnitureProduct />
            </Route>                               
                  <Route path="/any/detail/cloth/:id">
                    <DirectorAnyClothProduct />
                </Route>
                <Route path="/any/detail/furniture/:id">
                    <DirectorAnyFurnitureProduct />
                </Route>
        <Route path="/cloth">
            <DirectorClothPage/>
        </Route>
        <Route path="/furniture" exact>
                <DirectorFurniturePage/>
            </Route>
            <Route path="/furniture/:id">
                <DirectorFurniture/>
            </Route>
            <Route path="/about">
                <AboutPage/>
            </Route>
            <Route path="/profile">
                <ProfilePage/>
            </Route>
            <Route path="/user">
                <UserPage/>
            </Route>
            <Route path="/report">
                <ReportPage/>
            </Route>
            <Route path="/bucket">
                    <BucketPage/>
                </Route>
                <Route path="/email">
                    <DirectorEmailCreate/>
                </Route>
        
            <Redirect to="/" />
    </Switch>
    )
    }
    //manager
   else if(isAuthenticated && role==='ROLE_MANAGER'){
    return(
        <Switch>
        <Route path="/" exact>
                <ManagerHome/>
        </Route>
        <Route path="/order">
                <ManagerOrderPage/>
         </Route>
         <Route path="/detail/order/:id" >
                    <ManagerOrderDetail/>
                </Route>
         <Route path="/product" exact>
                <ManagerProductPage/>
            </Route>
            <Route path="/detail/product/:id">
                    <ManagerProduct/>
                </Route>
            <Route path="/detail/cloth/:id">
                 <ManagerClothProduct/>
            </Route>
            <Route path="/detail/furniture/:id">
                 <ManagerFurnitureProduct />
            </Route>                               
                  <Route path="/any/detail/cloth/:id">
                    <ManagerAnyClothProduct />
                </Route>
                <Route path="/any/detail/furniture/:id">
                    <ManagerAnyFurnitureProduct />
                </Route>
                <Route path="/any/detail/images/:id">
                    <ManagerAnyProductImageRepository />
                </Route>
        <Route path="/cloth">
            <ManagerClothPage/>
        </Route>
        <Route path="/furniture" exact>
            <ManagerFurniturePage/>
        </Route>
        <Route path="/furniture/:id">
                <ManagerFurniture/>
            </Route>
        <Route path="/about">
            <AboutPage/>
        </Route>
        <Route path="/profile">
                <ProfilePage/>
            </Route>
            <Route path="/bucket">
                    <BucketPage/>
                </Route>
                <Route path="/product/images/:id">
                    <ManagerProductImageRepository/>
                </Route>
                <Route path="/email">
                    <ManagerEmailCreate/>
                </Route>
      <Redirect to="/" />
    </Switch>
    )
    }
    //storekeeper
   else if(isAuthenticated && role==='ROLE_STOREKEEPER'){
    return(
        <Switch>
            <Route path="/" exact>
            <StorekeeperHome/>
            </Route>
            <Route path="/order">
                    <StorekeeperOrderList/>
             </Route>
             <Route path="/product">
                    <StorekeeperProductList/>
                </Route>
            <Route path="/cloth">
                <StorekeeperClothPage/>
            </Route>
            <Route path="/furniture">
                <StorekeeperFurniturePage/>
            </Route>
            <Route path="/about">
                <AboutPage/>
            </Route>
            <Route path="/profile">
                <ProfilePage/>
            </Route>
            <Route path="/bucket">
                    <BucketPage/>
                </Route>
                <Route path="/email">
                    <StorekeeperEmailCreate/>
                </Route>
          <Redirect to="/" />
        </Switch>
    )
    }else{
        return(
            <Switch>
            <Route path="/" exact>
              <AuthPage/>  
            </Route>
            <Route path="/register" exact>
                <RegisterPage/>
            </Route>
            <Redirect to="/" />
        </Switch>
        )
}
}