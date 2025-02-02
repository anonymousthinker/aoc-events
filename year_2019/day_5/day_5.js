// Opcode 3 takes a single integer as input and saves it to the position given by its only parameter. For example, the instruction 3,50 would take an input value and store it at address 50.
// Opcode 4 outputs the value of its only parameter. For example, the instruction 4,50 would output the value at address 50.

const handle8 = (data, mode1, mode2, curr) => {
  if (mode1 === 0 && mode2 === 0) {
    data[data[curr + 3]] =
      Number(data[data[curr + 1]]) === Number(data[data[curr + 2]]) ? 1 : 0;
  }
  if (mode1 === 0 && mode2 === 1) {
    data[data[curr + 3]] =
      Number(data[data[curr + 1]]) === Number(data[curr + 2]) ? 1 : 0;
  }
  if (mode1 === 1 && mode2 === 0) {
    data[data[curr + 3]] =
      Number(data[curr + 1]) === Number(data[data[curr + 2]]) ? 1 : 0;
  }
  if (mode1 === 1 && mode2 === 1) {
    data[data[curr + 3]] =
      Number(data[curr + 1]) === Number(data[curr + 2]) ? 1 : 0;
  }

  return curr + 4;
};

const handle7 = (data, mode1, mode2, curr) => {
  if (mode1 === 0 && mode2 === 0) {
    data[data[curr + 3]] =
      Number(data[data[curr + 1]]) < Number(data[data[curr + 2]]) ? 1 : 0;
  }
  if (mode1 === 0 && mode2 === 1) {
    data[data[curr + 3]] =
      Number(data[data[curr + 1]]) < Number(data[curr + 2]) ? 1 : 0;
  }
  if (mode1 === 1 && mode2 === 0) {
    data[data[curr + 3]] =
      Number(data[curr + 1]) < Number(data[data[curr + 2]]) ? 1 : 0;
  }
  if (mode1 === 1 && mode2 === 1) {
    data[data[curr + 3]] =
      Number(data[curr + 1]) < Number(data[curr + 2]) ? 1 : 0;
  }

  return curr + 4;
};

const handle6 = (data, mode1, mode2, curr) => {
  if (mode1 === 0 && mode2 === 0) {
    return Number(data[data[curr + 1]]) === 0
      ? +data[data[curr + 2]]
      : curr + 3;
  }
  if (mode1 === 0 && mode2 === 1) {
    return Number(data[data[curr + 1]]) === 0 ? +data[curr + 2] : curr + 3;
  }
  if (mode1 === 1 && mode2 === 0) {
    return Number(data[curr + 1]) === 0 ? +data[data[curr + 2]] : curr + 3;
  }
  if (mode1 === 1 && mode2 === 1) {
    return Number(data[curr + 1]) === 0 ? +data[curr + 2] : curr + 3;
  }
};

const handle5 = (data, mode1, mode2, curr) => {
  if (mode1 === 0 && mode2 === 0) {
    return Number(data[data[curr + 1]]) !== 0
      ? +data[data[curr + 2]]
      : curr + 3;
  }
  if (mode1 === 0 && mode2 === 1) {
    return Number(data[data[curr + 1]]) !== 0 ? +data[curr + 2] : curr + 3;
  }
  if (mode1 === 1 && mode2 === 0) {
    return Number(data[curr + 1]) !== 0 ? +data[data[curr + 2]] : curr + 3;
  }
  if (mode1 === 1 && mode2 === 1) {
    return Number(data[curr + 1]) !== 0 ? +data[curr + 2] : curr + 3;
  }
};

const handle4 = (data, mode1, curr) => {
  if (mode1 === 1) {
    console.log(data[curr + 1]);
    return curr + 2;
  }

  console.log(data[data[curr + 1]]);
  return curr + 2;
};

const handle3 = (data, curr) => {
  data[data[curr + 1]] = prompt("Enter input: ");
  return curr + 2;
};

const handle2 = (data, mode1, mode2, curr) => {
  if (mode1 === 0 && mode2 === 0) {
    data[data[curr + 3]] =
      Number(data[data[curr + 1]]) * Number(data[data[curr + 2]]);
  }
  if (mode1 === 0 && mode2 === 1) {
    data[data[curr + 3]] =
      Number(data[data[curr + 1]]) * Number(data[curr + 2]);
  }
  if (mode1 === 1 && mode2 === 0) {
    data[data[curr + 3]] =
      Number(data[curr + 1]) * Number(data[data[curr + 2]]);
  }
  if (mode1 === 1 && mode2 === 1) {
    data[data[curr + 3]] = Number(data[curr + 1]) * Number(data[curr + 2]);
  }

  return curr + 4;
};

const handle1 = (data, mode1, mode2, curr) => {
  if (mode1 === 0 && mode2 === 0) {
    data[data[curr + 3]] =
      Number(data[data[curr + 1]]) + Number(data[data[curr + 2]]);
  }
  if (mode1 === 0 && mode2 === 1) {
    data[data[curr + 3]] =
      Number(data[data[curr + 1]]) + Number(data[curr + 2]);
  }
  if (mode1 === 1 && mode2 === 0) {
    data[data[curr + 3]] =
      Number(data[curr + 1]) + Number(data[data[curr + 2]]);
  }
  if (mode1 === 1 && mode2 === 1) {
    data[data[curr + 3]] = Number(data[curr + 1]) + Number(data[curr + 2]);
  }

  return curr + 4;
};

const traverse = (data, paraOneMode, paraTwoMode, opcode, curr) => {
  const mode1 = paraOneMode || 0;
  const mode2 = paraTwoMode || 0;

  switch (opcode) {
    case 1:
      return handle1(data, mode1, mode2, +curr);
    case 2:
      return handle2(data, mode1, mode2, +curr);
    case 3:
      return handle3(data, +curr);
    case 4:
      return handle4(data, mode1, +curr);
    case 5:
      return handle5(data, mode1, mode2, +curr);
    case 6:
      return handle6(data, mode1, mode2, +curr);
    case 7:
      return handle7(data, mode1, mode2, +curr);
    case 8:
      return handle8(data, mode1, mode2, +curr);
  }
};

const parseInstruction = (inst) => {
  const padded = inst.toString().padStart(4, "0");
  const instSplit = padded.split("");
  const [paraTwoMode, paraOneMode, ...opcode] = instSplit;
  return [Number(paraTwoMode), Number(paraOneMode), Number(opcode.join(""))];
};

const main = () => {
  const data = Deno.readTextFileSync("puzzle_input.txt").split(",");

  let pointer = 0;
  while (data[pointer] !== "99") {
    const [paraTwoMode, paraOneMode, opcode] = parseInstruction(data[pointer]);
    pointer = traverse(data, paraOneMode, paraTwoMode, opcode, pointer);
  }

  return data;
};

console.log(main());
