const extractColoredPixel = (layers) => {
  const picture = [];
  for (let i = 0; i < layers[0].length; i++) {
    let innerInd = 0;
    while (innerInd < layers.length) {
      if (layers[innerInd][i] !== "2") {
        break;
      }
      innerInd += 1;
    }

    picture.push(layers[innerInd][i]);
  }

  return picture;
};

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
  const workWith = extractColoredPixel(layers);
  const message = Array.from({ length: tall }, (_, i) =>
    workWith.slice(i * wide, (i + 1) * wide)
  );
  return message.map((x) => x.join("")).join("\n");
};

console.log(main());
