import React, { useEffect, useState } from "react";
import "./style.css";

const mediaQuery = window.matchMedia('(max-width: 600px)'); // ssr will throw error
// with gatsby.js or next.js comment line above uncomment the rest below

export default function App() {
  const [isMobile, setIsMobile] = useState(mediaQuery.matches); // remove mediaQuery.matches from useState

  // useEffect(()=> {
  //   const mediaQueryDidMountCheck = () => window.matchMedia('(max-width: 600px)');
  //   setIsMobile(mediaQueryDidMountCheck());
  // }, []);

  useEffect(() => {
    // const mediaQuery = window.matchMedia('(max-width: 600px)');
    mediaQuery.addListener((e) => {
      if (e.matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    })
  }, [isMobile]);

  return (
    <div>
      <h1>Hello matchMedia API</h1>
      {isMobile ? <p>Mobile View</p> : <p>Desktop view</p>}
    </div>
  );
}
