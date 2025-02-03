const leastZeroesIn = (noOfZeroes) => {
  return noOfZeroes.reduce(
    (least, curr) => {
      const [_, count] = curr;
      const [__, countL] = least;
      return countL < count ? least : curr;
    },
    ["", Infinity]
  );
};

const noOfCharIn = (layer, char) => {
  return [...layer].reduce((count, currChar) => {
    count += currChar === char ? 1 : 0;
    return count;
  }, 0);
};

const main = () => {
  const wide = 25;
  const tall = 6;
  const layerSize = wide * tall;
  const data = Deno.readTextFileSync("puzzle_input.txt");
  const layers = Array.from(
    { length: Math.ceil(data.length / layerSize) },
    (_, i) => data.slice(i * layerSize, (i + 1) * layerSize)
  );

  const noOfZeroes = layers.map((layer) => [layer, noOfCharIn(layer, "0")]);
  const leastZeroes = leastZeroesIn(noOfZeroes);

  return noOfCharIn(leastZeroes[0], "1") * noOfCharIn(leastZeroes[0], "2");
};

console.log(main());
