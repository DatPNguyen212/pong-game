const playerScore = document.querySelector('[data-player-score]')
const computerScore = document.querySelector('[data-computer-score]')

const playerBar = document.querySelector('[data-player-bar]')
const computerBar = document.querySelector('[data-computer-bar]')

const ball = document.querySelector('[data-ball]')

const body = document.querySelector('body')
const bodySizeAndPosition = body.getBoundingClientRect()

const playerSizeAndPosition = playerBar.getBoundingClientRect()
const computerSizeAndPosition = computerBar.getBoundingClientRect()

const playerBarCenterX =
  playerSizeAndPosition.width / 2 + playerSizeAndPosition.x

const playerBarCenterY =
  playerSizeAndPosition.height / 2 + playerSizeAndPosition.y

body.addEventListener('mousemove', (event) => {
  const mouseY = event.pageY
  playerBar.style.top = mouseY.toString() + 'px'
})

const ballSizeAndPosition = ball.getBoundingClientRect()

const ballCenterX = ballSizeAndPosition.width / 2 + ballSizeAndPosition.x
const ballCenterY = ballSizeAndPosition.height / 2 + ballSizeAndPosition.y

function generateBallAtRandomY() {
  const randomY = Math.floor(
    Math.random() * (bodySizeAndPosition.height - ballSizeAndPosition.height)
  )

  ball.style.top = randomY.toString() + 'px'
}

generateBallAtRandomY()

const randomTopOrBottom = Math.floor(Math.random() * 2) + 1

function moveBallFromStartingPosition() {
  const number = 3

  const ballSizeAndPosition = ball.getBoundingClientRect()

  const ballCenterX = ballSizeAndPosition.width / 2 + ballSizeAndPosition.x
  const ballCenterY = ballSizeAndPosition.height / 2 + ballSizeAndPosition.y

  if (randomTopOrBottom === 1) {
    ball.style.left = (ballSizeAndPosition.x - number).toString() + 'px'

    ball.style.top = (ballSizeAndPosition.y - number).toString() + 'px'
  } else if (randomTopOrBottom === 2) {
    ball.style.left = (ballSizeAndPosition.x - number).toString() + 'px'

    ball.style.top = (ballSizeAndPosition.y + number).toString() + 'px'
  }
}

setInterval(moveBallFromStartingPosition, 30)

function moveBallUpwards() {}

console.log(ballSizeAndPosition)

const ballWidth = getComputedStyle(ball).getPropertyValue('--ball-width')
