import React from "react"
import { Card, CardContent, Grid, Typography } from "@mui/material"

function Board() {
  const WIDTH = 10
  const HEIGHT = 10
  let key = 0

  const board: string[][] = new Array(HEIGHT).fill(Array(WIDTH).fill("a"))

  return (
    <>
      {
        /* PRINT GRID */
        board.map((row): JSX.Element => {
          return (
            <Grid key={key++} container columns={WIDTH} spacing={1} rowSpacing={1}>
              {row.map((element): JSX.Element => {
                return (
                  <Card key={key++} sx={{ height: "5rem", width: "5rem", margins: "10px" }}>
                    <CardContent>
                      <Typography variant="body1">{element}</Typography>
                    </CardContent>
                  </Card>
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
