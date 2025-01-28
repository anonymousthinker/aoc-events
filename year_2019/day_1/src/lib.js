export const readData = (filePath) => {
  try {
    const data = Deno.readTextFileSync(filePath);
    return data;
  } catch (error) {
    throw error;
  }
};

const totalFuel = () => {
  const splittedData = readData("puzzleInput.txt").split("\n");
  const fuels = splittedData.map((mass) => Math.floor(Number(mass) / 3) - 2);
  return fuels.reduce((sum, fuel) => sum + fuel, 0);
};
