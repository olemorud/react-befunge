export interface Instruction {
  emoji: string
  name: string
  bytecode: string
  description: string
  searchtags: string
}

// first element should be the NOOP instruction
const instructions: Instruction[] = [
  {
    emoji: " ",
    name: "NOOP",
    bytecode: " ",
    description: "do nothing and move program counter further",
    searchtags: "nothing blank empty noop"
  },
  {
    emoji: "0️⃣",
    name: "0",
    bytecode: "0",
    description: "Push 0 to the stack",
    searchtags: "zero  0 number value"
  },
  {
    emoji: "1️⃣",
    name: "1",
    bytecode: "1",
    description: "Push 1 to the stack",
    searchtags: "one   1 number value"
  },
  {
    emoji: "2️⃣",
    name: "2",
    bytecode: "2",
    description: "Push 2 to the stack",
    searchtags: "two   2 number value"
  },
  {
    emoji: "3️⃣",
    name: "3",
    bytecode: "3",
    description: "Push 3 to the stack",
    searchtags: "three 3 number value"
  },
  {
    emoji: "4️⃣",
    name: "4",
    bytecode: "4",
    description: "Push 4 to the stack",
    searchtags: "four  4 number value"
  },
  {
    emoji: "5️⃣",
    name: "5",
    bytecode: "5",
    description: "Push 5 to the stack",
    searchtags: "five  5 number value"
  },
  {
    emoji: "6️⃣",
    name: "6",
    bytecode: "6",
    description: "Push 6 to the stack",
    searchtags: "six   6 number value"
  },
  {
    emoji: "7️⃣",
    name: "7",
    bytecode: "7",
    description: "Push 7 to the stack",
    searchtags: "seven 7 number value"
  },
  {
    emoji: "8️⃣",
    name: "8",
    bytecode: "8",
    description: "Push 8 to the stack",
    searchtags: "eight 8 number value"
  },
  {
    emoji: "9️⃣",
    name: "9",
    bytecode: "9",
    description: "Push 9 to the stack",
    searchtags: "nine  9 number value"
  },
  {
    emoji: "👈",
    name: "left direction",
    bytecode: "<",
    description: "Make program counter point left",
    searchtags: "hand left direction"
  },
  {
    emoji: "👉",
    name: "right direction",
    bytecode: ">",
    description: "Make program counter point right",
    searchtags: "hand right direction"
  },
  {
    emoji: "👇",
    name: "down direction",
    bytecode: "v",
    description: "Make program counter point down",
    searchtags: "hand down direction"
  },
  {
    emoji: "👆",
    name: "up direction",
    bytecode: "^",
    description: "Make program counter point up",
    searchtags: "hand up direction"
  },
  {
    emoji: "➕",
    name: "add",
    bytecode: "+",
    description: "Pop two values a and b, then push the result of a+b",
    searchtags: "add plus +"
  },
  {
    emoji: "➖",
    name: "subtract",
    bytecode: "-",
    description: "Pop two values a and b, then push the result of a-b",
    searchtags: "subtract minus -"
  },
  {
    emoji: "✖️",
    name: "multiply",
    bytecode: "*",
    description: "Pop two values a and b, then push the result of a*b",
    searchtags: "multiply multiplication x *"
  },
  {
    emoji: "➗",
    name: "divide",
    bytecode: "/",
    description: "Pop two values a and b, then push the result of a/b",
    searchtags: "divide division /"
  },
  {
    emoji: "🚮",
    name: "modulo",
    bytecode: "%",
    description: "Pop two values a and b, then push the result of a mod b",
    searchtags: "modulo remainder"
  },
  {
    emoji: "🚫",
    name: "logical not",
    bytecode: "!",
    description: "Pop a value. If the value is zero, push 1; otherwise, push zero.",
    searchtags: "logical not"
  },
  {
    emoji: "📏",
    name: "greater than",
    bytecode: "`",
    description: "Pop two values a and b, then push 1 if b>a, otherwise zero.",
    searchtags: "greater than > < ruler"
  },
  {
    emoji: "🎲",
    name: "random direction",
    bytecode: "?",
    description: "Change direction randomly",
    searchtags: "random direction dice"
  },
  {
    emoji: "🔛",
    name: "horizontal if",
    bytecode: "_",
    description: "Pop a value; set direction to right if value=0, set to left otherwise",
    searchtags: "left right conditional if leftright"
  },
  {
    emoji: "🪜",
    name: "vertical if",
    bytecode: "|",
    description: "pop a value; set direction to down if value=0, set to up otherwise",
    searchtags: "up down conditional if ladder"
  },
  {
    emoji: "📜",
    name: "string mode",
    bytecode: '"',
    description:
      "Toggle stringmode (push each character's ASCII value all the way up to the next \")",
    searchtags: "string stringmode char scroll"
  },
  {
    emoji: "🧬",
    name: "duplicate",
    bytecode: ":",
    description: "Duplicate top stack value",
    searchtags: "duplicate dna"
  },
  {
    emoji: "💱",
    name: "swap",
    bytecode: "\\",
    description: "Swap top stack values",
    searchtags: "swap"
  },
  {
    emoji: "🗑️",
    name: "discard",
    bytecode: "$",
    description: "Pop top of stack and discard",
    searchtags: "pop discard trash delete"
  },
  {
    emoji: "🔢",
    name: "print number",
    bytecode: ".",
    description: "Pop top of stack and output as integer",
    searchtags: "pop print write integer number"
  },
  {
    emoji: "✍",
    name: "print character",
    bytecode: ",",
    description: "Pop top of stack and output as ASCII character",
    searchtags: "pop print write char"
  },
  {
    emoji: "🦘",
    name: "jump",
    bytecode: "#",
    description: "Jump over next command",
    searchtags: "bridge jump skip kangaroo"
  },
  {
    emoji: "📥",
    name: "get",
    bytecode: "g",
    description:
      'A "get" call (a way to retrieve data in storage). Pop two values y and x, then push the ASCII value of the character at that position in the program. If (x,y) is out of bounds, push 0',
    searchtags: "get"
  },
  {
    emoji: "📤",
    name: "put",
    bytecode: "p",
    description:
      'A "put" call (a way to store a value for later use). Pop three values y, x and v, then change the character at the position (x,y) in the program to the character with ASCII value v',
    searchtags: "put"
  },
  {
    emoji: "📲",
    name: "number input",
    bytecode: "&",
    description: "Get number from user input and push it",
    searchtags: "input integer"
  },
  {
    emoji: "🔤",
    name: "character input",
    bytecode: "~",
    description: "Get character from user and push it",
    searchtags: "input character"
  },
  {
    emoji: "🏁",
    name: "end",
    bytecode: "@",
    description: "End program",
    searchtags: "end return finish done exit"
  }
]

export default instructions
