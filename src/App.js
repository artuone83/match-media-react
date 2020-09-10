import React, { useEffect, useState } from "react";
import "./style.css";

const navOptions = [
  {
    id: 1,
  },
  {
    id: 2
  },
  {
    id: 3
  },
];

const DesktopNavigation = () => {
  return (
    <ul className="desktop-nav">
      <li>Home</li>
      <li>About</li>
      <li>Contact</li>
    </ul>
  );
}

const MobileNavigatoin = ({ isMobileNavOpen }) => {
  return (
    <ul className={`mobile-nav ${isMobileNavOpen ?  'mobile-nav--open' : 'mobile-nav--close'}`}>
      <li>Home</li>
      <li>About</li>
      <li>Contact</li>
    </ul>
  );
}

const mediaQuery = window.matchMedia('(max-width: 600px)'); // ssr will throw error
// with gatsby.js or next.js comment line above uncomment the rest below

export default function App() {
  const [isMobile, setIsMobile] = useState(mediaQuery.matches); // remove mediaQuery.matches from useState
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // useEffect(()=> {
  //   const mediaQueryDidMountCheck = () => window.matchMedia('(max-width: 600px)');
  //   setIsMobile(mediaQueryDidMountCheck());
  // }, []);

  useEffect(() => {
    // const mediaQuery = window.matchMedia('(max-width: 600px)');
    console.log('render')
    mediaQuery.addListener((e) => {
      if (e.matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    })
  }, [isMobile]);

  const handleOpenMobileNav = () => {
    setIsMobileNavOpen(true);
  }

  return (
    <div>
      <h1>Hello matchMedia API</h1>
      <header>
        {isMobile && <p onClick={handleOpenMobileNav}>MENU</p>}
        <nav>
        {isMobile ? <MobileNavigatoin isMobileNavOpen={isMobileNavOpen}/> : <DesktopNavigation /> }
      </nav>
      </header>
    </div>
  );
}
