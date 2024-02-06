/* ============================== Phase 1 ============================== */
/* -------------------------- exploring async -------------------------- */

function num1() {
  return 1;
}

async function num2() {
  return 2;
}

console.log("num1", num1());
console.log(
  "num2",
  num2().then((result) => console.log(result))
);
/* ============================== Phase 2 ============================== */
/* -------------------------- exploring await -------------------------- */

async function waiting() {
  const value = await num2();
  console.log("waiting ", value);
}

waiting();
/* ============================== Phase 3 ============================== */
/* --------------------- creating a custom Promise --------------------- */

async function waitForMyPromise() {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("done!!!");
    }, 1000);
  });

  const result = await promise;
  console.log("my promise is", result);
}

waitForMyPromise();
/* ============================== Phase 4 ============================== */
/* -------------------------- exploring then --------------------------- */

new Promise((resolve) => {
  setTimeout(() => {
    resolve("done!");
  }, 1500);
}).then((r) => console.log("then my other promise is", r));
/* ============================== Phase 5 ============================== */
/* ------------------- turn setTimeout into a Promise ------------------ */

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForWait() {
  await wait(2000);
  console.log("waiting for wait");
}
// waitForWait();
/* ============================== Phase 6 ============================== */
/* -------------------- exploring reject and .catch -------------------- */

const tryRandomPromise = (random) =>
  new Promise((resolve, reject) => {
    if (random > 0.5) {
      resolve("successful!!!");
    } else {
      reject("random error");
    }
  });

for (let i = 1; i < 10; i++) {
  const random = Math.random();
  wait(2000 + random * 1000)
    .then(() => tryRandomPromise(random))
    .then((result) =>
      console.table({
        "random_try_#": i,
        result,

        random,
      })
    )
    .catch((error) =>
      console.log("random try #", i, error, "random number: ", random)
    );
}
/* ============================== Phase 7 ============================== */
/* ---------------- exploring async/await and try/catch ---------------- */

const tryAgain = async (i) => {
  const random = Math.random();

  await wait(3000 + random * 1000);

  try {
    const result = await tryRandomPromise(random);
    console.log(
      "random again #",
      i,
      "result: ",
      result,
      "random number: ",
      random
    );
  } catch (error) {
    console.log("random again #", i, "error: ", error, " random: ", random);
  }
};

for (let i = 1; i < 10; i++) {
  tryAgain(i);
}
/* ============================== Phase 8 ============================== */
/* -------------------- Promises are asynchronous! --------------------- */

console.log("END OF PROGRAM");
