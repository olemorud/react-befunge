import React, { useEffect, useRef, useState } from "react"
import { Card, CardContent, Grid, IconButton, TextField, Typography } from "@mui/material"
import { Instruction } from "../instructions"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import StopIcon from "@mui/icons-material/Stop"

import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_TILE_COLOR,
  SELECTED_TILE_COLOR,
  SIDEBAR_WIDTH,
  STEP_DELAY,
  TILE_SIZE
} from "../const"
import { iterate, newProgram, ProgramState, resetProgram } from "../interpreter"

function Board() {
  let key = 0

  const [program, setProgram] = useState<ProgramState>(newProgram(DEFAULT_WIDTH, DEFAULT_HEIGHT))
  const [playing, setPlaying] = useState<boolean>(false)
  const intervalRef = useRef<NodeJS.Timer>()

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        step()
      }, STEP_DELAY)
    } else {
      clearInterval(intervalRef.current)
    }
  }, [playing])

  useEffect(() => {
    if (program.done) {
      const x = structuredClone(program)
      resetProgram(x)
      setPlaying(false)
      x.done = false
      setProgram(x)
    }
  }, [program])

  const step = () => {
    //const x = structuredClone(program)
    //iterate(x)
    setProgram((prog) => {
      const x = structuredClone(prog)
    iterate(x)
      return x
    })
  }

  const handleDrop = (
    col: number,
    row: number,
    event: React.DragEvent<HTMLDivElement> | undefined
  ): void => {
    if (event === undefined) {
      return
    }
    const data = JSON.parse(event.dataTransfer.getData("instruction")) as Instruction
    const x = structuredClone(program)
    x.board[row][col] = data
    setProgram(x)

    const target = event.target as HTMLInputElement
    target.value = data.emoji
  }

  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement> | undefined) => {
    event?.preventDefault()
    return false
  }

  const handleTextFieldChange = (
    col: number,
    row: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const x = structuredClone(program)
    x.board[row][col].emoji = event.target.value
    x.board[row][col].bytecode = event.target.value
    setProgram(x)
  }

  return (
    <div style={{ marginLeft: `${SIDEBAR_WIDTH + 1}rem` }}>
      {/* BUTTON PANEL */}
      <div style={{ display: "flex" }}>
        <Grid container>
          <Grid item xs={4}>
            <IconButton onClick={() => setPlaying(!playing)}>
              {playing ? <StopIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={() => step()}>
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
          </Grid>
          <Grid item xs={4}>
            <Typography>output: {program.output}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>stack: {JSON.stringify(program.stack)}</Typography>
          </Grid>
        </Grid>
      </div>

      {/* BOARD */}
      {program.board.map((row, rowNo): JSX.Element => {
        return (
          <Grid
            key={key++}
            container
            columns={program.width}
            sx={{ width: `${6 * program.width}rem` }}>
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
                        rowNo === program.instructionPointer.y &&
                        colNo === program.instructionPointer.x
                          ? SELECTED_TILE_COLOR
                          : DEFAULT_TILE_COLOR
                    }}>
                    <CardContent>
                      <TextField
                        sx={{ mt: "10%" }}
                        variant="standard"
                        inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
                        onChange={(event) => handleTextFieldChange(colNo, rowNo, event)}
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
