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

let ballSizeAndPosition = ball.getBoundingClientRect()

const ballCenterX = ballSizeAndPosition.width / 2 + ballSizeAndPosition.x
const ballCenterY = ballSizeAndPosition.height / 2 + ballSizeAndPosition.y

let pxDistanceBallMove = 3
let setIntervalNumberMs = 30

function generateBallAtRandomY() {
  const randomY = Math.floor(
    Math.random() * (bodySizeAndPosition.height - ballSizeAndPosition.height)
  )

  ball.style.top = randomY.toString() + 'px'
}

generateBallAtRandomY()

const randomTopOrBottom = Math.floor(Math.random() * 2) + 1

function moveBallFromStartingPosition() {
  ballSizeAndPosition = ball.getBoundingClientRect()

  if (randomTopOrBottom === 1) {
    setInterval(moveBallNorthWest, setIntervalNumberMs)
  } else if (randomTopOrBottom === 2) {
    setInterval(moveBallSouthWest, setIntervalNumberMs)
  }
}

moveBallFromStartingPosition()

function moveBallNorthWest() {
  ballSizeAndPosition = ball.getBoundingClientRect()
  ball.style.left =
    (ballSizeAndPosition.x - pxDistanceBallMove).toString() + 'px'

  ball.style.top =
    (ballSizeAndPosition.y - pxDistanceBallMove).toString() + 'px'
}
function moveBallSouthWest() {
  ballSizeAndPosition = ball.getBoundingClientRect()
  ball.style.left =
    (ballSizeAndPosition.x - pxDistanceBallMove).toString() + 'px'

  ball.style.top =
    (ballSizeAndPosition.y + pxDistanceBallMove).toString() + 'px'
}

function moveBallNorthEast() {
  ballSizeAndPosition = ball.getBoundingClientRect()
  ball.style.left =
    (ballSizeAndPosition.x + pxDistanceBallMove).toString() + 'px'

  ball.style.top =
    (ballSizeAndPosition.y - pxDistanceBallMove).toString() + 'px'
}
function moveBallSouthEast() {
  ballSizeAndPosition = ball.getBoundingClientRect()
  ball.style.left =
    (ballSizeAndPosition.x + pxDistanceBallMove).toString() + 'px'

  ball.style.top =
    (ballSizeAndPosition.y + pxDistanceBallMove).toString() + 'px'
}

console.log(ballSizeAndPosition)

const ballWidth = getComputedStyle(ball).getPropertyValue('--ball-width')
