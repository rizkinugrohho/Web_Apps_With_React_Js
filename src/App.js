import {React, useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import Browse from "./components/Browse.js";
import Arrived from "./components/Arrived.js";
import Clients from "./components/Clients.js";
import AsideMenu from "./components/AsideMenu.js";
import Footer from "./components/Footer.js";
import Offline from "./components/Offline.js";
import Splash from "./pages/Splash.js";
import Profile from "./pages/Profile.js";
import Details from "./pages/Details.js";
import Cart from "./pages/Cart.js";

function App({ cart }) {
  const [items, setItems] = useState([]);
  const [offlineStatus, setOfflineStatus] = useState(!navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);



  function handleOfflineStatus() {
    setOfflineStatus(!navigator.onLine)
  };

  useEffect(function () {
    (async function () {
      const response = await fetch(
        'https://bwacharity.fly.dev/items',
        {
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
          }
        });
      const { nodes } = await response.json();
      setItems(nodes);

      const script = document.createElement("script");
      script.src = "./carousel.js";
      script.async = false;
      document.body.appendChild(script);
    })();

    handleOfflineStatus();
    window.addEventListener('online', handleOfflineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    setTimeout(function(){
      setIsLoading(false);
    }, 1500)

    return function() {
      window.removeEventListener('online,', handleOfflineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    }
  }, [offlineStatus]);

  return (
    <>
    {isLoading === true ? <Splash /> :
    (
      <>
      {offlineStatus && <Offline />}
      <Header mode="light" cart={cart} />
      <Hero />
      <Browse />
      <Arrived items={items} />
      <Clients />
      <AsideMenu />
      <Footer />
      </>)}
    </>
  );
}

export default function AppRoutes() {
  const cachedCart = window.localStorage.getItem("cart");
  const [cart, setCart] = useState([]);

  function handleAddToCart(item) {
    const currentIndex = cart.length;
    const newCart = [...cart, { id: currentIndex + 1, item }];
    setCart(newCart);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function handleRemoveCartItem(event, id) {
    const revisedCart = cart.filter(function (item) {
      return item.id !== id;
    });
    setCart(revisedCart);
    window.localStorage.setItem("cart", JSON.stringify(revisedCart));
  }

  useEffect(function () {
    console.info("useEffect for localStorage");
    if (cachedCart !== null) {
      setCart(JSON.parse(cachedCart));
    }
  }, [cachedCart])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App cart={cart} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details/:id" element={<Details handleAddToCart={handleAddToCart} cart={cart} />} />
        <Route path="/cart" element={<Cart cart={cart} handleRemoveCartItem={handleRemoveCartItem} />} />
      </Routes>
    </BrowserRouter>

  )
};
