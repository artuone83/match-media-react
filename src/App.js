import React, { useEffect, useState } from "react";
import "./style.css";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(()=> {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    mediaQuery.addListener((e) => {
      if (e.matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    })
  }, []);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      {isMobile ? <p>Mobile View</p> : <p>Desktop view</p> }
    </div>
  );
}
