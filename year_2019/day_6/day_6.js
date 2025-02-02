//so what I am gonna do is I will keep a record of every key and the no of orbits they have, lets say starting from the first, b has 1 direct,then whoever encounters b later will have 1 + b; like this total!

const calculateTotalOrbits = (outerToInners, subbedData) => {
  const x = Object.keys(outerToInners);
  return x.map((key) => {
    let ref = key;
    let count = 1;
    while (outerToInners[ref] !== "COM") {
      ref = outerToInners[ref];
      count += 1;
    }
    return count;
  });
};

const whoRevolvesWhom = (subbedData) => {
  const outerToInners = subbedData.reduce((record, [first, second]) => {
    if (!(second in record)) {
      record[second] = 0;
    }

    record[second] = first;
    return record;
  }, {});

  return calculateTotalOrbits(outerToInners, subbedData);
};

const main = () => {
  const data = Deno.readTextFileSync("puzzle_input.txt").split("\n");
  const subbedData = data.map((orbitDetails) => orbitDetails.split(")"));
  return whoRevolvesWhom(subbedData).reduce(
    (sum, currOrbit) => sum + currOrbit,
    0
  );
};

console.log(main());
