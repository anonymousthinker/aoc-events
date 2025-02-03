//so what I am gonna do is I will keep a record of every key and the no of orbits they have, lets say starting from the first, b has 1 direct,then whoever encounters b later will have 1 + b; like this total!

const getCommonPath = (youPath, sanPath) => {
  for (let index = 0; index < youPath.length; index += 1) {
    if (sanPath.includes(youPath[index])) {
      return youPath[index];
    }
  }
  return;
};

const calculatePath = (ref, outerToInners) => {
  let key = ref;
  const planets = [outerToInners[key]];
  while (outerToInners[key] !== "COM") {
    key = outerToInners[key];
    planets.push(outerToInners[key]);
  }
  return planets;
};

const calculateTotalOrbits = (outerToInners) => {
  const x = Object.keys(outerToInners);
  const youPath = calculatePath("YOU", outerToInners);
  const sanPath = calculatePath("SAN", outerToInners);

  const commonPlanet = getCommonPath(youPath, sanPath);
  const commonPath = calculatePath(commonPlanet, outerToInners);

  return youPath.length + sanPath.length - commonPath.length * 2 - 2;
};

const whoRevolvesWhom = (subbedData) => {
  const outerToInners = subbedData.reduce((record, [first, second]) => {
    if (!(second in record)) {
      record[second] = 0;
    }

    record[second] = first;
    return record;
  }, {});

  return calculateTotalOrbits(outerToInners);
};

const main = () => {
  const data = Deno.readTextFileSync("puzzle_input.txt").split("\n");
  const subbedData = data.map((orbitDetails) => orbitDetails.split(")"));
  return whoRevolvesWhom(subbedData);
};

console.log(main());
