import React from "react"
import { newBoard, ProgramState, resetProgram } from "./interpreter"
import instructions, { Instruction } from "./instructions"

interface SaveState {
  width: number
  height: number
  program: string[]
}


export function save(program: ProgramState): string {
  const saveObject: SaveState = {
    width: program.width,
    height: program.height,
    program: []
  }

  program.board.forEach((row) => {
    let line = ""
    row.forEach((instruction) => {
      line += instruction.bytecode
    })
    saveObject.program.push(line)
  })

  console.log(saveObject)

  const data = new Blob([JSON.stringify(saveObject, null, 2)], { type: "text/plain" })

  const file = window.URL.createObjectURL(data)
  return file
}
