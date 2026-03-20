function generateNumber() {
  const leftValue = document.querySelector('.input-left').value
  const rightValue = document.querySelector('.input-right').value

  const error = document.getElementById("error")
  const numbers = document.getElementById("numbers")
  const button = document.querySelector("button")

  const left = Math.ceil(Number(leftValue))
  const right = Math.floor(Number(rightValue))

  if (!leftValue || !rightValue || isNaN(left) || isNaN(right)) {
    error.innerHTML = "⚠️ Fill in correctly!!"
    return
  }

  if (left > right) {
    error.innerHTML = "⚠️ Invalid interval!"
    return
  }

  error.innerHTML = ""

  const finalNumber = Math.floor(Math.random() * (right - left + 1)) + left;

  button.disabled = true
  button.innerHTML = "Drawing..."

  numbers.innerHTML = ""
  numbers.classList.add("spinning")
  numbers.style.transform = "translateY(0)"
  numbers.style.transition = "none"

  const itemHeight = 180
  const spins = 50

  let sequence = []

  for (let i = 0; i < spins; i++) {
    sequence.push(Math.floor(Math.random() * (right - left + 1)) + left)
  }

  sequence.push(finalNumber)

  sequence.forEach(num => {
    const div = document.createElement("div")
    div.innerText = num
    numbers.appendChild(div)
  })

  const totalDistance = itemHeight * (sequence.length - 1)

  let start = null
  const duration = 2500

  function ease(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function animate(timestamp) {
    if (!start) start = timestamp

    const progress = timestamp - start
    const percent = Math.min(progress / duration, 1)

    const current = totalDistance * ease(percent)

    numbers.style.transform = `translateY(-${current}px)`

    if (percent < 1) {
      requestAnimationFrame(animate)
    } else {
      const finalY = totalDistance

      numbers.style.transform = `translateY(-${finalY}px)`

      setTimeout(() => {
        numbers.style.transition = "0.15s"
        numbers.style.transform = `translateY(-${finalY - 10}px)`

        setTimeout(() => {
          numbers.style.transform = `translateY(-${finalY}px)`
        }, 80)
      }, 30)

      numbers.classList.remove("spinning")

      if (numbers.lastChild) {
        numbers.lastChild.classList.add("final")
      }

      setTimeout(() => {
        button.disabled = false
        button.innerHTML = "Draw"
        numbers.style.transition = "none"
      }, 300)
    }
  }

  requestAnimationFrame(animate)
}