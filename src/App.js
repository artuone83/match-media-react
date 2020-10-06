import React, { useEffect, useState, useRef, forwardRef } from "react";
import "./style.css";

const navOptions = [
  {
    id: 1,
    name: "Home"
  },
  {
    id: 2,
    name: "About"
  },
  {
    id: 3,
    name: "Contact"
  }
];

const DesktopNavigation = () => {
  return (
    <ul className="desktop-nav">
      {navOptions.map(option => (
        <li key={option.name}>{option.name}</li>
      ))}
    </ul>
  );
};

const MobileNavigatoin = forwardRef(({ isMobileNavOpen }, ref) => {
  return (
    <ul
      ref={ref}
      className={`mobile-nav ${
        isMobileNavOpen ? "mobile-nav--open" : "mobile-nav--close"
      }`}
    >
      {navOptions.map(option => (
        <li key={option.name}>{option.name}</li>
      ))}
    </ul>
  );
});

const mediaQuery = window.matchMedia("(max-width: 600px)"); // ssr will throw error
// with gatsby.js or next.js comment line above uncomment the rest below

export default function App() {
  const [isMobile, setIsMobile] = useState(mediaQuery.matches); // remove mediaQuery.matches from useState
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const mobileNav = useRef(null);

  // useEffect(()=> {
  //   const mediaQueryDidMountCheck = () => window.matchMedia('(max-width: 600px)');
  //   setIsMobile(mediaQueryDidMountCheck());
  // }, []);

  useEffect(() => {
    // const mediaQuery = window.matchMedia('(max-width: 600px)');
    console.log("render");
    mediaQuery.addListener(e => {
      if (e.matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, [isMobile]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isMobileNavOpen]);

  const handleOpenMobileNav = () => {
    setIsMobileNavOpen(true);
    console.log(mobileNav.current);
  };

  const handleClickOutside = event => {
    if (mobileNav.current && !mobileNav.current.contains(event.target)) {
      setIsMobileNavOpen(false);
    }
  };

  return (
    <div>
      <h1>Hello matchMedia API</h1>
      <header>
        {isMobile && <p onClick={handleOpenMobileNav}>MENU</p>}
        <nav>
          {isMobile ? (
            <MobileNavigatoin
              ref={mobileNav}
              isMobileNavOpen={isMobileNavOpen}
            />
          ) : (
            <DesktopNavigation />
          )}
        </nav>
      </header>
    </div>
  );
}
