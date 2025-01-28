export const readData = (filePath) => {
  try {
    const data = Deno.readTextFileSync(filePath);
    return data;
  } catch (error) {
    throw error;
  }
};

const operation = (element) => {
  return Math.floor(Number(element) / 3) - 2;
};

const calculateExtraFuels = (element) => {
  const extras = [];

  while (element >= 0) {
    extras.push(element);
    element = operation(element);
  }

  return extras;
};

export const totalFuel = () => {
  const splittedData = readData("puzzleInput.txt").split("\n");
  const fuels = splittedData.map((mass) => operation(mass));
  return fuels;
};

const add = (sum, element) => {
  return sum + element;
};

export const totalAndAdditional = () => {
  const totalFuels = totalFuel();
  const totalNdExtras = totalFuels.map((element) =>
    calculateExtraFuels(element)
  );

  return totalNdExtras.reduce(
    (sum, fuels) => sum + fuels.reduce((sum, fuel) => add(sum, fuel), 0),
    0
  );
};

console.log(totalAndAdditional());
