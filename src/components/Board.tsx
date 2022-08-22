import React, { useEffect, useState } from "react"
import { Card, CardContent, Grid, IconButton, TextField, Typography } from "@mui/material"
import instructions, { Instruction } from "../instructions"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  DEFAULT_TILE_COLOR,
  SELECTED_TILE_COLOR,
  SIDEBAR_WIDTH,
  TILE_SIZE
} from "../const"

// considering renaming this to vector
interface Point {
  x: number
  y: number
}

const Direction = {
  Up: { x: 0, y: -1 },
  Right: { x: 1, y: 0 },
  Left: { x: -1, y: 0 },
  Down: { x: 0, y: 1 }
}

function Board() {
  let key = 0
  const [output, setOutput] = useState("")
  const [done, setDone] = useState(true)
  const [direction, setDirection] = useState<Point>(Direction.Right)
  const [programCounter, setProgramCounter] = useState<Point>({ x: -1, y: 0 })
  const [board, setBoard] = useState<Instruction[][]>(
    new Array(BOARD_HEIGHT)
      .fill(0)
      .map(() => new Array(BOARD_WIDTH).fill(0).map(() => structuredClone(instructions[0])))
  )
  let stringmode = false
  const [stack, setStack] = useState<number[]>([])

  useEffect(() => {
    if (done) {
      setProgramCounter({ x: -1, y: 0 })
      setDirection(Direction.Right)
    }
  }, [done])

  const handleDrop = (
    col: number,
    row: number,
    event: React.DragEvent<HTMLDivElement> | undefined
  ): void => {
    if (event === undefined) {
      console.log("invalid drop target")
      return
    }
    const data = JSON.parse(event.dataTransfer.getData("instruction")) as Instruction
    const x = [...board]
    x[row][col] = data
    setBoard(x)

    const target = event.target as HTMLInputElement
    target.value = data.symbol
  }

  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement> | undefined) => {
    event?.preventDefault()
    return false
  }

  const safepop = (): number => {
    if (stack.length === 0) {
      return 0
    }

    const x = [...stack]
    let result = x.pop()
    setStack(x)

    if (result === undefined) {
      result = 0
    }

    return result
  }

  const iterate = () => {
    setDone(false)
    stepProgramCounter()
    // This is asynchronous, the next line is run before program counter
    // is updated. That is bad
    console.log(board[programCounter.y][programCounter.x])

    const cmd = board[programCounter.y][programCounter.x].ascii
    let a: number
    let b: number

    if (stringmode && cmd !== '"') {
      setStack([...stack, cmd.charCodeAt(0)])
    } else if ("0123456789".includes(cmd)) {
      setStack([...stack, +cmd])
    } else {
      switch (cmd) {
        case "+":
          stack.push(safepop() + safepop())
          break
        case "-":
          stack.push(-safepop() + safepop())
          break
        case "*":
          stack.push(safepop() * safepop())
          break
        case "/":
          stack.push((1 / safepop()) * safepop())
          break
        case "%":
          a = safepop()
          b = safepop()
          stack.push(b % a)
          break
        case "!":
          stack.push(safepop() === 0 ? 1 : 0)
          break
        case "`":
          stack.push(safepop() < safepop() ? 1 : 0)
          break
        case ">":
          setDirection(Direction.Right)
          break
        case "<":
          setDirection(Direction.Left)
          break
        case "^":
          setDirection(Direction.Up)
          break
        case "v":
          setDirection(Direction.Down)
          break
        case "?":
          setDirection(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            [Direction.Up, Direction.Down, Direction.Left, Direction.Right].at(
              Math.floor(Math.random() * 4)
            )!
          )
          break
        case "_":
          setDirection(safepop() === 0 ? Direction.Right : Direction.Left)
          break
        case "|":
          setDirection(safepop() === 0 ? Direction.Down : Direction.Up)
          break
        case '"':
          stringmode = !stringmode
          break
        case ":":
          setStack([...stack, stack[stack.length - 1]])
          break
        case "\\":
          swapTopStackValues()
          break
        case "$":
          safepop()
          break
        case ".":
          setOutput(output + safepop())
          break
        case ",":
          setOutput(output + String.fromCharCode(safepop()))
          break
        case "#":
          stepProgramCounter()
          break
        case "g":
          a = safepop()
          b = safepop()
          setStack([...stack, board[b][a].ascii.charCodeAt(0)])
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
          setDone(true)
          break
        default:
          console.log("unknown command:", cmd)
          break
      }
    }

    return null
  }

  const stepProgramCounter = () => {
    const tmp: Point = {
      x: programCounter.x + direction.x,
      y: programCounter.y + direction.y
    }
    if (tmp.x >= BOARD_WIDTH || tmp.x < 0 || tmp.y >= BOARD_HEIGHT || tmp.y < 0) {
      setDone(true)
      return
    }
    setProgramCounter(tmp)
  }

  const swapTopStackValues = () => {
    const a = safepop()
    const b = safepop()
    setStack([...stack, a, b])
  }

  const handleChange = (
    col: number,
    row: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const x = [...board]
    x[row][col].symbol = event.target.value
    setBoard(x)
  }

  return (
    <div style={{ marginLeft: `${SIDEBAR_WIDTH + 1}rem` }}>
      {/* BUTTON PANEL */}
      <div style={{ display: "flex" }}>
        <IconButton onClick={() => iterate()}>
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
        <Typography>stack: {JSON.stringify(stack)}</Typography>
      </div>

      {/* BOARD */}
      {board.map((row, rowNo): JSX.Element => {
        return (
          <Grid key={key++} container columns={BOARD_WIDTH} sx={{ width: `${5 * 12}rem` }}>
            {row.map((tile, colNo): JSX.Element => {
              return (
                <div
                  style={{
                    textAlign: "center",
                    margin: "auto"
                  }}
                  key={key++}>
                  <Card
                    sx={{
                      height: `${TILE_SIZE}rem`,
                      width: `${TILE_SIZE}rem`,
                      margin: 1,
                      bgcolor:
                        rowNo === programCounter.y && colNo === programCounter.x
                          ? SELECTED_TILE_COLOR
                          : DEFAULT_TILE_COLOR
                    }}>
                    <CardContent>
                      <TextField
                        sx={{ mt: "10%" }}
                        variant="standard"
                        inputProps={{ maxLength: 1 }}
                        onChange={(event) => handleChange(colNo, rowNo, event)}
                        onDragOver={handleOnDragOver}
                        onDrop={(event) => {
                          handleDrop(colNo, rowNo, event)
                        }}
                      />
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </Grid>
        )
      })}
    </div>
  )
}

export default Board
