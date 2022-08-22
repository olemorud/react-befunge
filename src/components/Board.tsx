import React, { useState } from "react"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import instructions, { Instruction } from "../Instructions"
import { BOARD_HEIGHT, BOARD_WIDTH, SELECTED_COLOR, SIDEBAR_WIDTH, TILE_SIZE } from "../const"

// considering renaming this to vector
interface Point {
  x: number
  y: number
}

const Direction = {
  Up: { x: -1, y: 0 },
  Right: { x: 0, y: 1 },
  Left: { x: 0, y: -1 },
  Down: { x: 1, y: 0 }
}

function Board() {
  let key = 0

  const [direction, setDirection] = useState<Point>(Direction.Right)
  const [pointer, setPointer] = useState<Point>({ x: 0, y: 0 })

  // this sure is a clean readable way to initialize a 2d array
  const [board, setBoard] = useState<Instruction[][]>(
    new Array(BOARD_HEIGHT)
      .fill(0)
      .map(() => new Array(BOARD_WIDTH).fill(0).map(() => structuredClone(instructions[0])))
  )

  const handleDrop = (
    col: number,
    row: number,
    event: React.DragEvent<HTMLDivElement> | undefined
  ): void => {
    if (event === undefined) {
      console.log("invalid drop target")
      return
    }

    const x = [...board]
    x[row][col].symbol = event.dataTransfer.getData("text/plain")
    console.log(x)
    setBoard(x)
  }

  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement> | undefined) => {
    event?.preventDefault()
    return false
  }

  const iterate = () => {
    return null
  }

  return (
    <div style={{ marginLeft: `${SIDEBAR_WIDTH + 1}rem` }}>
      {board.map((row, rowNo): JSX.Element => {
        return (
          <Grid key={key++} container columns={BOARD_WIDTH} sx={{ width: `${5 * 12}rem` }}>
            {row.map((element, colNo): JSX.Element => {
              return (
                <div
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    verticalAlign: "middle"
                  }}
                  key={key++}
                  onDragOver={handleOnDragOver}
                  onDrop={(event) => handleDrop(colNo, rowNo, event)}>
                  <Card
                    sx={{
                      height: `${TILE_SIZE}rem`,
                      width: `${TILE_SIZE}rem`,
                      margin: 1,
                      color:
                        rowNo === pointer.x && colNo === pointer.y ? SELECTED_COLOR : "0xFFFFFF"
                    }}>
                    <CardContent
                      sx={{
                        display: "inline",
                        float: "none",
                        margin: "auto"
                      }}>
                      <Typography sx={{ mt: "10%" }} variant="body1">
                        {element.symbol}
                      </Typography>
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
