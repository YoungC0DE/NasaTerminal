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
