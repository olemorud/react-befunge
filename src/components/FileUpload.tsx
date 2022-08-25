import React from "react"

export default function FileUpload() {
  //fetch("/upload/")
  const fileHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files
    if (files) {
      console.log(files[0])
      const reader = new FileReader()
      reader.addEventListener("load", (event) => {
        console.log(event.target)
      })
      reader.readAsText(files[0])
    }
  }

  return <input type="file" onInput={fileHandler} />
}
