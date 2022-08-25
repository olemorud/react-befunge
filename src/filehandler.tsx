import React from "react"
import { newBoard, ProgramState, resetProgram } from "./interpreter"
import instructions, { Instruction } from "./instructions"

interface SaveState {
  width: number
  height: number
  program: string[]
}

export default function loadProgram(to: ProgramState, save: SaveState) {
  resetProgram(to)
  to.board = newBoard(save.width, save.height)

  save.program.forEach((line, row) => {
    line.split("").forEach((char, col) => {
      const index = instructions.findIndex((ins) => {
        ins.bytecode === char
      })

      if (index !== -1) {
        to.board[row][col] = instructions[index]
      }
    })
  })
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
