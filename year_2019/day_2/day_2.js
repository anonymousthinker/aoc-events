const data = Deno.readTextFileSync("puzzleInput.txt").split(",");

let instructionPointer = 0;
while (data[instructionPointer] !== "99") {
  if (data[instructionPointer] === "1") {
    data[data[instructionPointer + 3]] = (
      +data[data[instructionPointer + 1]] + +data[data[instructionPointer + 2]]
    ).toString();
    instructionPointer += 4;
  }

  if (data[instructionPointer] === "2") {
    data[data[instructionPointer + 3]] = (
      +data[data[instructionPointer + 1]] * +data[data[instructionPointer + 2]]
    ).toString();
    instructionPointer += 4;
  }
}

console.log(data);
