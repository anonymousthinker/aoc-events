const lieInBetween = (point, rear1, rear2) => {
  const min = Math.min(rear1, rear2);
  const max = Math.max(rear1, rear2);

  return min <= point && max >= point;
};

const doesLinesIntersect = (firstWire, secondWire) => {
  const intersections = [];
  for (let i = 0; i < firstWire.length - 1; i += 1) {
    for (let j = 0; j < secondWire.length - 1; j += 1) {
      if (
        lieInBetween(secondWire[j].x, firstWire[i].x, firstWire[i + 1].x) &&
        lieInBetween(firstWire[i].y, secondWire[j].y, secondWire[j + 1].y)
      ) {
        intersections.push([secondWire[j].x, firstWire[i].y]);
      }

      if (
        lieInBetween(firstWire[i].x, secondWire[j].x, secondWire[j + 1].x) &&
        lieInBetween(secondWire[j].y, firstWire[i].y, firstWire[i + 1].y)
      ) {
        intersections.push([firstWire[i].x, secondWire[j].y]);
      }
    }
  }

  return intersections;
};

const extractCoordinates = (path) => {
  let [x, y] = [0, 0];
  return path.split(",").map((coord) => {
    const location = Number(coord.slice(1));
    if (coord.startsWith("R")) {
      x = x + location;
      return { x: x, y: y };
    }

    if (coord.startsWith("L")) {
      x = x - location;
      return { x: x, y: y };
    }

    if (coord.startsWith("U")) {
      y = y + location;
      return { x: x, y: y };
    }

    if (coord.startsWith("D")) {
      y = y - location;
      return { x: x, y: y };
    }
  });
};

const main = () => {
  const data = Deno.readTextFileSync("puzzleInput.txt").split("\n");
  const [firstWire, secondWire] = data.map((path) => extractCoordinates(path));

  const allSums = doesLinesIntersect(firstWire, secondWire).map(
    ([x, y]) => Math.abs(x) + Math.abs(y)
  );
  const min = Math.min(...allSums);
  return min;
};

console.log(main());
