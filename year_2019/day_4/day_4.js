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

// --- Part Two ---
// An Elf just remembered one more important detail: the two adjacent matching digits are not part of a larger group of matching digits.

// Given this additional criterion, but still ignoring the range rule, the following are now true:

// 112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.
// 123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
// 111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).
// How many different passwords within the range given in your puzzle input meet all of the criteria?

//I have to check if the sum of repeated digits is less than or equal to the sum of the remaining digits, and this will be done for tall the repeating digits

const extractRepeating = (number) => {
  const input = number.toString().split("");
  const occurencesOfEach = Object.entries(
    input.reduce((record, char) => {
      record[char] = record[char] || 0;
      record[char] += 1;
      return record;
    }, {})
  );
  const max = Math.max(...occurencesOfEach.map(([_, count]) => count));
  const [char, count] = occurencesOfEach.find(([_, count]) => count === max);
  const remaining = occurencesOfEach.filter(
    ([curr, times]) => times <= max && curr !== char
  );
  const secondMax = Math.max(...remaining.map(([_, count]) => count));
  return max === 2 || (max > 2 && secondMax === 2);
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
    if (extractRepeating(number) && neverDecrease(number)) {
      noOfPasswords += 1;
    }
  }

  return noOfPasswords;
};

console.log(main());
