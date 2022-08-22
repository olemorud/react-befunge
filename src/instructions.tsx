export interface Instruction {
  symbol: string
  name: string
  ascii: string
  description: string
  searchtags: string
}

// first element should be the NOOP instruction
const instructions: Instruction[] = [
  {
    symbol: " ",
    name: "NOOP",
    ascii: " ",
    description: "do nothing and move program counter further",
    searchtags: "nothing blank empty noop"
  },
  {
    symbol: "0️⃣",
    name: "0",
    ascii: "0",
    description: "Push 0 to the stack",
    searchtags: "zero  0 number value"
  },
  {
    symbol: "1️⃣",
    name: "1",
    ascii: "1",
    description: "Push 1 to the stack",
    searchtags: "one   1 number value"
  },
  {
    symbol: "2️⃣",
    name: "2",
    ascii: "2",
    description: "Push 2 to the stack",
    searchtags: "two   2 number value"
  },
  {
    symbol: "3️⃣",
    name: "3",
    ascii: "3",
    description: "Push 3 to the stack",
    searchtags: "three 3 number value"
  },
  {
    symbol: "4️⃣",
    name: "4",
    ascii: "4",
    description: "Push 4 to the stack",
    searchtags: "four  4 number value"
  },
  {
    symbol: "5️⃣",
    name: "5",
    ascii: "5",
    description: "Push 5 to the stack",
    searchtags: "five  5 number value"
  },
  {
    symbol: "6️⃣",
    name: "6",
    ascii: "6",
    description: "Push 6 to the stack",
    searchtags: "six   6 number value"
  },
  {
    symbol: "7️⃣",
    name: "7",
    ascii: "7",
    description: "Push 7 to the stack",
    searchtags: "seven 7 number value"
  },
  {
    symbol: "8️⃣",
    name: "8",
    ascii: "8",
    description: "Push 8 to the stack",
    searchtags: "eight 8 number value"
  },
  {
    symbol: "9️⃣",
    name: "9",
    ascii: "9",
    description: "Push 9 to the stack",
    searchtags: "nine  9 number value"
  },
  {
    symbol: "👈",
    name: "left",
    ascii: "<",
    description: "Make program counter point left",
    searchtags: "hand left direction"
  },
  {
    symbol: "👉",
    name: "right",
    ascii: ">",
    description: "Make program counter point right",
    searchtags: "hand right direction"
  },
  {
    symbol: "👇",
    name: "down",
    ascii: "v",
    description: "Make program counter point down",
    searchtags: "hand down direction"
  },
  {
    symbol: "👆",
    name: "up",
    ascii: "^",
    description: "Make program counter point up",
    searchtags: "hand up direction"
  },
  {
    symbol: "➕",
    name: "add",
    ascii: "+",
    description: "Pop two values a and b, then push the result of a+b",
    searchtags: "add plus +"
  },
  {
    symbol: "➖",
    name: "subtract",
    ascii: "-",
    description: "Pop two values a and b, then push the result of a-b",
    searchtags: "subtract minus -"
  },
  {
    symbol: "✖️",
    name: "multiply",
    ascii: "*",
    description: "Pop two values a and b, then push the result of a*b",
    searchtags: "multiply multiplication x *"
  },
  {
    symbol: "➗",
    name: "divide",
    ascii: "/",
    description: "Pop two values a and b, then push the result of a/b",
    searchtags: "divide division /"
  },
  {
    symbol: "🚮",
    name: "modulo",
    ascii: "%",
    description: "Pop two values a and b, then push the result of a mod b",
    searchtags: "modulo remainder"
  },
  {
    symbol: "🚫",
    name: "logical not",
    ascii: "!",
    description: "Pop a value. If the value is zero, push 1; otherwise, push zero.",
    searchtags: "logical not"
  },
  {
    symbol: "📏",
    name: "greater than",
    ascii: "`",
    description: "Pop two values a and b, then push 1 if b>a, otherwise zero.",
    searchtags: "greater than > < ruler"
  },
  {
    symbol: "🎲",
    name: "random direction",
    ascii: "?",
    description: "Change direction randomly",
    searchtags: "random direction dice"
  },
  {
    symbol: "🔛",
    name: "horizontal if",
    ascii: "_",
    description: "Pop a value; set direction to right if value=0, set to left otherwise",
    searchtags: "left right conditional if leftright"
  },
  {
    symbol: "🪜",
    name: "vertical if",
    ascii: "|",
    description: "pop a value; set direction to down if value=0, set to up otherwise",
    searchtags: "up down conditional if ladder"
  },
  {
    symbol: "📜",
    name: "string mode",
    ascii: "''",
    description:
      "Toggle stringmode (push each character's ASCII value all the way up to the next \")",
    searchtags: "string stringmode char scroll"
  },
  {
    symbol: "🧬",
    name: "duplicate",
    ascii: ":",
    description: "Duplicate top stack value",
    searchtags: "duplicate dna"
  },
  {
    symbol: "💱",
    name: "swap",
    ascii: "\\",
    description: "Swap top stack values",
    searchtags: "swap"
  },
  {
    symbol: "🗑️",
    name: "discard",
    ascii: "$",
    description: "Pop top of stack and discard",
    searchtags: "pop discard trash delete"
  },
  {
    symbol: "🔢",
    name: "print number",
    ascii: ".",
    description: "Pop top of stack and output as integer",
    searchtags: "pop print write integer number"
  },
  {
    symbol: "✍",
    name: "print character",
    ascii: ",",
    description: "Pop top of stack and output as ASCII character",
    searchtags: "pop print write char"
  },
  {
    symbol: "🦘",
    name: "jump",
    ascii: "#",
    description: "Jump over next command",
    searchtags: "bridge jump skip kangaroo"
  },
  {
    symbol: "📥",
    name: "get",
    ascii: "g",
    description:
      'A "get" call (a way to retrieve data in storage). Pop two values y and x, then push the ASCII value of the character at that position in the program. If (x,y) is out of bounds, push 0',
    searchtags: "get"
  },
  {
    symbol: "📤",
    name: "put",
    ascii: "p",
    description:
      'A "put" call (a way to store a value for later use). Pop three values y, x and v, then change the character at the position (x,y) in the program to the character with ASCII value v',
    searchtags: "put"
  },
  {
    symbol: "📲",
    name: "number input",
    ascii: "&",
    description: "Get number from user input and push it",
    searchtags: "input integer"
  },
  {
    symbol: "🔤",
    name: "character input",
    ascii: "~",
    description: "Get character from user and push it",
    searchtags: "input character"
  },
  {
    symbol: "🏁",
    name: "end",
    ascii: "@",
    description: "End program",
    searchtags: "end return finish done exit"
  }
]

export default instructions
