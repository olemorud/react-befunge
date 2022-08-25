import React from "react"
import ReactDOM from "react-dom/client"
import Board from "./components/Board"
import InstructionMenu from "./components/InstructionMenu"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <InstructionMenu />
    <br />
    <Board />
  </React.StrictMode>
)
