import "./App.css";
import Header from "./components/Header";
import React, { useState } from "react";
import { Redirect,Route,Switch } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import AlbumList from "./components/AlbumList";
// import About from "./pages/about";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import About from './pages/about';
import ProductDetail from "./pages/ProductDetail";

const productsArr = [
  {
    id: "a1",
    title: "Album1",
    price: 100,
    quantity: 1,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    id: "a2",
    title: "Album2",
    price: 50,
    quantity: 1,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    id: "a3",
    title: "Album3",
    price: 70,
    quantity: 1,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    id: "a4",
    title: "Album4",
    price: 100,
    quantity: 1,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

function App() {
  const [cart, setCart] = useState(false);

  const productList = productsArr.map((product) => {
    return (
      <AlbumList
        id={product.id}
        title={product.title}
        image={product.imageUrl}
        price={product.price}
        quantity={product.quantity}
      />
    );
  });

  const openCartHandler = () => {
    setCart(true);
  };

  const closeCartHandller = () => {
    setCart(false);
  };

  const submitUserDetails = async (details) => {
    const response = await fetch(
      "https://react-http-44f2c-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Context-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <CartProvider>
      <Header onShow={openCartHandler} />
      <main>
        <Switch>
          <Route path="/store" exact>
            {cart && <Cart onClose={closeCartHandller} />}
            <div className="title">
              <h1>The Generics</h1>
            </div>
            <h1 className="category">Music</h1>
            <main>{productList}</main>
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/contact">
            <ContactUs getUserDetails={submitUserDetails} />
          </Route>
          <Route path="/store/:productId">
            <ProductDetail />
          </Route>
          <Redirect to="/store" />
        </Switch>
      </main>
    </CartProvider>
  );
}

export default App;
