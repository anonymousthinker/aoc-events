// --- Day 4: Secure Container ---
// You arrive at the Venus fuel depot only to discover it's protected by a password. The Elves had written the password on a sticky note, but someone threw it out.

// However, they do remember a few key facts about the password:

// It is a six-digit number.
// The value is within the range given in your puzzle input.
// Two adjacent digits are the same (like 22 in 122345).
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
// Other than the range rule, the following are true:

// 111111 meets these criteria (double 11, never decreases).
// 223450 does not meet these criteria (decreasing pair of digits 50).
// 123789 does not meet these criteria (no double).
// How many different passwords within the range given in your puzzle input meet these criteria?

// Your puzzle input is 124075-580769.

const adjacentEqual = (number) => {
  const input = number.toString().split("");
  for (let index = 0; index < input.length; index += 1) {
    if (Number(input[index]) === Number(input[index + 1])) {
      return true;
    }
  }

  return false;
};

const neverDecrease = (number) => {
  const input = number.toString().split("");
  for (let index = 0; index < input.length - 1; index += 1) {
    if (Number(input[index]) > Number(input[index + 1])) {
      return false;
    }
  }

  return true;
};

const main = () => {
  let noOfPasswords = 0;
  const range = Deno.readTextFileSync("puzzleInput.txt").split("-");

  const numbersInRange = Array.from(
    { length: +range[1] - +range[0] + 1 },
    (_, i) => +range[0] + i
  );

  for (const number of numbersInRange) {
    if (adjacentEqual(number) && neverDecrease(number)) {
      noOfPasswords += 1;
    }
  }

  return noOfPasswords;
};

console.log(main());
