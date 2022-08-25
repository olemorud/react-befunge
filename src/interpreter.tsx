import { BOARD_HEIGHT, BOARD_WIDTH } from "./const"
import instructions, { Instruction } from "./instructions"

export interface ProgramState {
  instructionPointer: Point
  direction: Point
  stack: number[]
  board: Instruction[][]
  output: string
  stringmode: boolean
  done: boolean
}

export interface Point {
  x: number
  y: number
}

const Direction = {
  Up: { x: 0, y: -1 },
  Right: { x: 1, y: 0 },
  Left: { x: -1, y: 0 },
  Down: { x: 0, y: 1 }
}

/**
 * Creates a new program
 * @returns new program object with initialized attributes
 */
export const newProgram = () => {
  const program: ProgramState = {
    instructionPointer: { x: 0, y: 0 },
    direction: Direction.Right,
    stack: [],
    board: newBoard(),
    output: "",
    stringmode: false,
    done: true
  }

  return program
}

/**
 * Sets all program values to their default state
 * @param program - program to be reset
 */
export const resetProgram = (program: ProgramState) => {
  /*program.board.forEach((row) => {
    row.forEach((tile) => {
      tile.bytecode = instructions[0].bytecode
      tile.description = instructions[0].description
      tile.emoji = instructions[0].emoji
      tile.name = instructions[0].name
      tile.searchtags = instructions[0].searchtags
    })
  })*/

  program.direction = Direction.Right
  program.done = false
  program.instructionPointer.x = 0
  program.instructionPointer.y = 0
  program.output = ""
  program.stack.length = 0
  program.stringmode = false
}

/**
 * Initializes a 2D array of instructions with all elements set to the NOOP instruction
 * @returns Instruction[BOARD_HEIGHT][BOARD_WIDTH]
 */
export const newBoard = () => {
  return new Array(BOARD_HEIGHT)
    .fill(0)
    .map(() => new Array(BOARD_WIDTH).fill(0).map(() => structuredClone(instructions[0])))
}

/**
 * Removes the last element from an array and returns it. If the array is empty it returns 0
 * @param arr array to pop from
 * @returns last element of array if array is non-empty, zero otherwise
 */
const safepop = (arr: number[]): number => {
  const result = arr.pop()

  if (result !== undefined) {
    return result
  } else {
    return 0
  }
}

/**
 * Increments the instructionPointer of a program according to the programs direction attribute
 * @param program program to increment its instruction pointer
 */
const step = (program: ProgramState) => {
  program.instructionPointer.x += program.direction.x
  program.instructionPointer.y += program.direction.y

  if (
    program.instructionPointer.x >= BOARD_WIDTH ||
    program.instructionPointer.x < 0 ||
    program.instructionPointer.y >= BOARD_HEIGHT ||
    program.instructionPointer.y < 0
  ) {
    console.log("pointer out of bounds, resetting program")
    resetProgram(program)
  }
}

/**
 * Reads the current instruction pointed at and executes it, then moves the instruction pointer
 * according to the direction
 * @param program program to iterate
 * @see step()
 * @see safepop()
 */
export const iterate = (program: ProgramState) => {
  const cmd = program.board[program.instructionPointer.y][program.instructionPointer.x].bytecode
  let a: number
  let b: number
  let maybeA: number | undefined

  program.done = false

  if (program.stringmode && cmd !== '"') {
    program.stack.push(cmd.charCodeAt(0))
  } else if ("0123456789".includes(cmd)) {
    program.stack.push(+cmd)
  } else {
    switch (cmd) {
      case " ":
        break
      case "+":
        a = safepop(program.stack)
        b = safepop(program.stack)
        program.stack.push(a + b)
        break
      case "-":
        a = safepop(program.stack)
        b = safepop(program.stack)
        program.stack.push(b - a)
        break
      case "*":
        a = safepop(program.stack)
        b = safepop(program.stack)
        program.stack.push(a * b)
        break
      case "/":
        a = safepop(program.stack)
        b = safepop(program.stack)
        program.stack.push(b / a)
        break
      case "%":
        a = safepop(program.stack)
        b = safepop(program.stack)
        program.stack.push(b % a)
        break
      case "!":
        a = safepop(program.stack)
        program.stack.push(a === 0 ? 1 : 0)
        break
      case "`":
        a = safepop(program.stack)
        b = safepop(program.stack)
        program.stack.push(a < b ? 1 : 0)
        break
      case ">":
        program.direction = Direction.Right
        break
      case "<":
        program.direction = Direction.Left
        break
      case "^":
        program.direction = Direction.Up
        break
      case "v":
        program.direction = Direction.Down
        break
      case "?":
        program.direction =
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          [Direction.Up, Direction.Down, Direction.Left, Direction.Right].at(
            Math.floor(Math.random() * 4)
          )!
        break
      case "_":
        a = safepop(program.stack)
        program.direction = a === 0 ? Direction.Right : Direction.Left
        break
      case "|":
        a = safepop(program.stack)
        program.direction = a === 0 ? Direction.Down : Direction.Up
        break
      case '"':
        program.stringmode = !program.stringmode
        break
      case ":":
        maybeA = program.stack.at(-1)
        if (maybeA !== undefined) {
          program.stack.push(maybeA)
        }
        break
      case "\\":
        a = safepop(program.stack)
        b = safepop(program.stack)
        program.stack.push(b, a)
        break
      case "$":
        safepop(program.stack)
        break
      case ".":
        a = safepop(program.stack)
        program.output += a
        break
      case ",":
        a = safepop(program.stack)
        program.output += String.fromCharCode(a)
        break
      case "#":
        step(program)
        break
      case "g":
        a = safepop(program.stack)
        b = safepop(program.stack)
        program.stack.push(program.board[b][a].bytecode.charCodeAt(0))
        break
      case "p":
        // TODO
        break
      case "&":
        // TODO
        break
      case "~":
        // TODO
        break
      case "@":
        program.done = true
        break
      default:
        break
    }
  }

  step(program)
}
