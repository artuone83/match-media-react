import React, { useEffect, useState } from "react";
import "./style.css";

const mediaQuery = window.matchMedia('(max-width: 600px)');

export default function App() {
  const [isMobile, setIsMobile] = useState(mediaQuery);

  // useEffect(()=> {
  //   const mediaQueryDidMountCheck = () => mediaQuery;
  //   setIsMobile(mediaQueryDidMountCheck());
  // }, []);

  useEffect(()=> {
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
      <h1>Hello StackBlitz!</h1>
      {isMobile ? <p>Mobile View</p> : <p>Desktop view</p> }
    </div>
  );
}
