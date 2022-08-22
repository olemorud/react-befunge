import { Card, CardContent, styled, Typography } from "@mui/material"
import React from "react"
import instructions, { Instruction } from "../Instructions"
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip"

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}))

function handleDragStart(
  instruction: Instruction,
  event: React.DragEvent<HTMLDivElement> | undefined
): void {
  if (event === undefined) {
    console.log("handleDragStart: event is undefined")
    return
  }

  event.dataTransfer.dropEffect = "copy"
  event.dataTransfer.setData("text/plain", instruction.symbol)
}

export default function InstructionMenu() {
  let key = 0

  return (
    <>
      <div style={{ display: "flex" }}>
        {instructions.map((instruction: Instruction) => {
          return (
            <div key={key++}>
              <HtmlTooltip
                key={key++}
                title={
                  <>
                    <Typography>{instruction.name.toUpperCase()}</Typography>
                    <Typography>{instruction.description}</Typography>
                  </>
                }>
                <div draggable="true" onDragStart={(event) => handleDragStart(instruction, event)}>
                  <Card key={key++} sx={{ height: "3rem", width: "3rem" }}>
                    <CardContent>
                      <Typography sx={{ userSelect: "none" }}>{instruction.symbol}</Typography>
                    </CardContent>
                  </Card>
                </div>
              </HtmlTooltip>
            </div>
          )
        })}
      </div>
    </>
  )
}
