export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const toggleInput = () => {
  var htmlElement = document.querySelector('html')

  if (htmlElement.getAttribute('typing') == 'false') {
    htmlElement.setAttribute('typing', 'true')
    return
  }

  htmlElement.setAttribute('typing', 'false')
}

export const date = () => {
  const D = new Date();

  var hours = `${D.getHours()}:${D.getMinutes()}`;
  var month = D.getMonth() + 1;
  var day = D.getDate();
  var date = `${D.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`

  return {
    currentHour: hours,
    currentDate: date,
    fullDate: D
  }
}