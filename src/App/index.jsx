import React from "react";
import { ColsanitasVideoCallProvider } from "../context";
import AppUI from "./AppUI";
import "./App.css";

function App() {
  return (
    <ColsanitasVideoCallProvider>
      <AppUI />
    </ColsanitasVideoCallProvider>
  );
}

export default App;
