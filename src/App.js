import React from "react";
import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import Browse from "./components/Browse.js";
import Arrived from "./components/Arrived.js";
import Clients from "./components/Clients.js";
import AsideMenu from "./components/AsideMenu.js";
import Footer from "./components/Footer.js";
import Offline from "./components/Offline.js";
import Splash from "./pages/Splash.js";

function App() {
  const [items, setItems] = React.useState([]);
  const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine);
  const [isLoading, setIsLoading] = React.useState(true);



  function handleOfflineStatus() {
    setOfflineStatus(!navigator.onLine)
  };

  React.useEffect(function () {
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
      script.src = "Carousel.js";
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
      <Header />
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

export default App;
