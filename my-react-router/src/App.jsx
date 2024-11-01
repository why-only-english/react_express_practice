import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import mainRouter from "./routers/main-router";
import { RouterProvider } from "react-router-dom";

function App() {

  return (
    <>
      <RouterProvider router={mainRouter} />
    </>
  );
}

export default App;
