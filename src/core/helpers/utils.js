export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}