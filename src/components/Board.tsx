import React, { useState } from "react"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import instructions, { Instruction } from "../Instructions"

interface Tile {
  pointedAt: boolean
  instruction: Instruction
}

function Board() {
  const WIDTH = 10
  const HEIGHT = 10
  let key = 0

  const [board, setBoard] = useState<Tile[][]>(
    new Array(HEIGHT).fill(0).map(() =>
      new Array(WIDTH).fill(0).map((): Tile => {
        return { pointedAt: false, instruction: structuredClone(instructions[0]) }
      })
    )
  )
  //.map(() => ({pointedAt: false, value: " ")}
  const handleDrop = (
    col: number,
    row: number,
    event: React.DragEvent<HTMLDivElement> | undefined
  ): void => {
    if (event === undefined) {
      console.log("invalid drop target")
      return
    }

    const data = event.dataTransfer.getData("text/plain")
    console.log(data, row, col)
    const x = [...board]
    x[row][col].instruction.symbol = data
    console.log(x)
    setBoard(x)
  }

  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement> | undefined) => {
    event?.preventDefault()
    return false
  }

  return (
    <>
      {
        /* PRINT GRID */
        board.map((row, rowNo): JSX.Element => {
          return (
            <Grid key={key++} container columns={WIDTH} spacing={1} rowSpacing={1}>
              {row.map((element, colNo): JSX.Element => {
                return (
                  <div
                    key={key++}
                    onDragOver={handleOnDragOver}
                    onDrop={(event) => handleDrop(colNo, rowNo, event)}>
                    <Card sx={{ height: "5rem", width: "5rem", margins: "10px" }}>
                      <CardContent>
                        <Typography variant="body1">{element.instruction.symbol}</Typography>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </Grid>
          )
        })
      }
    </>
  )
}

export default Board
