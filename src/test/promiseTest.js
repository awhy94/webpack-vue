const promise1 = new Promise((resolve) => {
  console.log(3);
  resolve();
});

const promise2 = new Promise((resolve) => {
  console.log('promise2');
  resolve();
});

promise1.then(() => {
  console.log('res1');
  return promise2;
}).then(() => {
  console.log(567890);
}).finally(() => {
  console.log('finally');
});
