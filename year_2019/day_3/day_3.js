const lieInBetween = (point, rear1, rear2) => {
  const min = Math.min(rear1, rear2);
  const max = Math.max(rear1, rear2);

  return min <= point && max >= point;
};

const countSteps = (fw, sw) => {
  const steps = [];
  let fws = Math.abs(0 - fw[0].x) + Math.abs(0 - fw[0].y);
  for (let i = 0; i < fw.length - 1; i += 1) {
    let sws = Math.abs(0 - sw[0].x) + Math.abs(0 - sw[0].y);
    for (let j = 0; j < sw.length - 1; j += 1) {
      if (
        lieInBetween(sw[j].x, fw[i].x, fw[i + 1].x) &&
        lieInBetween(fw[i].y, sw[j].y, sw[j + 1].y)
      ) {
        fws += Math.abs(fw[i].y - sw[j].y);
        sws += Math.abs(fw[i].x - sw[j].x);
        steps.push([fws, sws]);
        fws -= Math.abs(fw[i].y - sw[j].y);
        sws -= Math.abs(fw[i].x - sw[j].x);
      }

      if (
        lieInBetween(fw[i].x, sw[j].x, sw[j + 1].x) &&
        lieInBetween(sw[j].y, fw[i].y, fw[i + 1].y)
      ) {
        fws += Math.abs(fw[i].y - sw[j].y);
        sws += Math.abs(fw[i].x - sw[j].x);
        steps.push([fws, sws]);
        fws -= Math.abs(fw[i].y - sw[j].y);
        sws -= Math.abs(fw[i].x - sw[j].x);
      }
      sws += Math.abs(sw[j].x - sw[j + 1].x) + Math.abs(sw[j].y - sw[j + 1].y);
    }
    sws = 0;
    fws += Math.abs(fw[i].x - fw[i + 1].x) + Math.abs(fw[i].y - fw[i + 1].y);
  }

  return steps;
};

const extractCoordinates = (path) => {
  let [x, y] = [0, 0];
  const directions = {
    R: (x, y, location) => [x + location, y],
    L: (x, y, location) => [x - location, y],
    U: (x, y, location) => [x, y + location],
    D: (x, y, location) => [x, y - location],
  };
  return path.split(",").map((coord) => {
    const location = Number(coord.slice(1));
    [x, y] = directions[coord[0]](x, y, location);
    return { x: x, y: y };
  });
};

const main = () => {
  const data = Deno.readTextFileSync("puzzleInput.txt").split("\n");
  const [firstWire, secondWire] = data.map((path) => extractCoordinates(path));
  const allSums = countSteps(firstWire, secondWire).map(
    ([x, y]) => Math.abs(x) + Math.abs(y)
  );
  const min = Math.min(...allSums);
  return min;
};

console.log(main());
