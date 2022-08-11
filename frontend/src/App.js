import React from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Container } from "react-bootstrap"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "./screens/Home"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen.js"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/OrderScreen"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import ProductListScreen from "./screens/ProductListScreen"
import ProductCreateScreen from "./screens/ProductCreateScreen"
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/product/:id">
            <ProductScreen />
          </Route>
          <Route path="/cart/:id?">
            <CartScreen />
          </Route>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path="/register">
            <RegisterScreen />
          </Route>
          <Route path="/profile">
            <ProfileScreen />
          </Route>
          <Route path="/shipping">
            <ShippingScreen />
          </Route>
          <Route path="/payment">
            <PaymentScreen />
          </Route>
          <Route path="/placeorder">
            <PlaceOrderScreen />
          </Route>
          <Route path="/order/:orderId">
            <OrderScreen />
          </Route>
          <Route path="/admin/userlist">
            <UserListScreen />
          </Route>
          <Route path="/admin/user/:id/edit">
            <UserEditScreen />
          </Route>
          <Route path="/admin/productlist">
            <ProductListScreen />
          </Route>
          <Route path="/admin/create">
            <ProductCreateScreen />
          </Route>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
