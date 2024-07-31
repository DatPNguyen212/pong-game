const playerScore = document.querySelector('[data-player-score]')
const computerScore = document.querySelector('[data-computer-score]')

const playerBar = document.querySelector('[data-player-bar]')
const computerBar = document.querySelector('[data-computer-bar]')

const ball = document.querySelector('[data-ball]')

const body = document.querySelector('body')
const bodySizeAndPosition = body.getBoundingClientRect()

let playerSizeAndPosition = playerBar.getBoundingClientRect()
let computerSizeAndPosition = computerBar.getBoundingClientRect()

let playerBarCenterX = playerSizeAndPosition.width / 2 + playerSizeAndPosition.x

let playerBarCenterY =
  playerSizeAndPosition.height / 2 + playerSizeAndPosition.y

let playerBarHitBoxX = playerSizeAndPosition.x + playerSizeAndPosition.width

// topplayerHitBoxYTop    playerPostion.top to playerCenterY
// topPlayerHitBoxBottom playerCenterY to playerPositionBottom

body.addEventListener('mousemove', (event) => {
  const mouseY = event.pageY
  playerBar.style.top = mouseY.toString() + 'px'

  updatePlayerBarPosition()
})

let ballSizeAndPosition = ball.getBoundingClientRect()

let ballCenterX = ballSizeAndPosition.width / 2 + ballSizeAndPosition.x
let ballCenterY = ballSizeAndPosition.height / 2 + ballSizeAndPosition.y

let ballCurrentDirection
let isBallHitByPlayer
let isBallHitByComputer

let pxDistanceBallMove = 3
let setIntervalNumberMs = 15

const intervalIds = []

function generateBallAtRandomY() {
  const randomY = Math.floor(
    Math.random() * (bodySizeAndPosition.height - ballSizeAndPosition.height)
  )

  ball.style.left =
    (bodySizeAndPosition.width / 2 - ballSizeAndPosition.width / 2).toString() +
    'px'

  console.log(getComputedStyle(ball).getPropertyValue('left'))

  ball.style.top = randomY.toString() + 'px'
}

generateBallAtRandomY()

function moveBallFromStartingPosition() {
  updateBallPosition()

  const randomTopOrBottom = Math.floor(Math.random() * 2) + 1

  if (randomTopOrBottom === 1) {
    const startingPositionIntervalTop = setInterval(
      moveBallNorthWest,
      setIntervalNumberMs
    )
    ballCurrentDirection = 'left'

    intervalIds.push(startingPositionIntervalTop)
  } else if (randomTopOrBottom === 2) {
    const startingPositionIntervalBottom = setInterval(
      moveBallSouthWest,
      setIntervalNumberMs
    )

    ballCurrentDirection = 'left'
    intervalIds.push(startingPositionIntervalBottom)
  }

  console.log(intervalIds)
}

moveBallFromStartingPosition()

function moveBallNorthWest() {
  updateBallPosition()
  ball.style.left =
    (ballSizeAndPosition.x - pxDistanceBallMove).toString() + 'px'

  ball.style.top =
    (ballSizeAndPosition.y - pxDistanceBallMove).toString() + 'px'

  ifBallCollideLogic()
}
function moveBallSouthWest() {
  updateBallPosition()
  ball.style.left =
    (ballSizeAndPosition.x - pxDistanceBallMove).toString() + 'px'

  ball.style.top =
    (ballSizeAndPosition.y + pxDistanceBallMove).toString() + 'px'

  ifBallCollideLogic()
}

function moveBallNorthEast() {
  updateBallPosition()
  ball.style.left =
    (ballSizeAndPosition.x + pxDistanceBallMove).toString() + 'px'

  ball.style.top =
    (ballSizeAndPosition.y - pxDistanceBallMove).toString() + 'px'

  // console.log(ballSizeAndPosition.x, ballSizeAndPosition.y)
  ifBallCollideLogic()
}
function moveBallSouthEast() {
  updateBallPosition()
  ball.style.left =
    (ballSizeAndPosition.x + pxDistanceBallMove).toString() + 'px'

  ball.style.top =
    (ballSizeAndPosition.y + pxDistanceBallMove).toString() + 'px'
  // console.log(ballSizeAndPosition.x, ballSizeAndPosition.y)
  ifBallCollideLogic()
}

function moveBallEast() {
  updateBallPosition()

  ball.style.left =
    (ballSizeAndPosition.x + pxDistanceBallMove).toString() + 'px'
  ifBallCollideLogic()
}

function moveBallWest() {
  updateBallPosition()

  ball.style.left =
    (ballSizeAndPosition.x - pxDistanceBallMove).toString() + 'px'
  ifBallCollideLogic()
}

function updateBallPosition() {
  ballSizeAndPosition = ball.getBoundingClientRect()

  ballCenterX = ballSizeAndPosition.width / 2 + ballSizeAndPosition.x
  ballCenterY = ballSizeAndPosition.height / 2 + ballSizeAndPosition.y
}

function updatePlayerBarPosition() {
  playerSizeAndPosition = playerBar.getBoundingClientRect()

  playerBarCenterX = playerSizeAndPosition.width / 2 + playerSizeAndPosition.x

  playerBarCenterY = playerSizeAndPosition.height / 2 + playerSizeAndPosition.y

  playerBarHitBoxX = playerSizeAndPosition.x + playerSizeAndPosition.width
}

function ifBallCollideLogic() {
  updateBallPosition()

  if (
    ballSizeAndPosition.x <= playerBarHitBoxX &&
    ballCenterY >= playerSizeAndPosition.y &&
    ballCenterY <= playerSizeAndPosition.bottom
  ) {
    isBallHitByPlayer = true
    ballCurrentDirection = 'right'

    console.log('hit')
    ballBounceFromPlayer()
  } else if (ballSizeAndPosition.y <= bodySizeAndPosition.y) {
    if (ballCurrentDirection === 'right') {
      clearAllInterval()
      setInterval(moveBallSouthEast, setIntervalNumberMs)
    } else if (ballCurrentDirection === 'left') {
      clearAllInterval()
      setInterval(moveBallSouthWest, setIntervalNumberMs)
    }
  } else if (ballSizeAndPosition.bottom >= bodySizeAndPosition.bottom) {
    if (ballCurrentDirection === 'right') {
      clearAllInterval()
      setInterval(moveBallNorthEast, setIntervalNumberMs)
    } else if (ballCurrentDirection === 'left') {
      clearAllInterval()
      setInterval(moveBallNorthWest, setIntervalNumberMs)
    }
  }
}

function ballBounceFromPlayer() {
  clearAllInterval()

  if (ballCenterY < playerBarCenterY) {
    const intervalNorthEast = setInterval(
      moveBallNorthEast,
      setIntervalNumberMs
    )
    intervalIds.push(intervalNorthEast)
    console.log('move ball north east')
  } else if (ballCenterY > playerBarCenterY) {
    const intervalSouthEast = setInterval(
      moveBallSouthEast,
      setIntervalNumberMs
    )
    intervalIds.push(intervalSouthEast)
    console.log('move ball south east')
  } else if (ballCenterY === playerBarCenterY) {
    const intervalEast = setInterval(moveBallEast, setIntervalNumberMs)
    intervalIds.push(intervalEast)
    console.log('move ball east')
  }
}

function clearAllInterval() {
  intervalIds.forEach((interval) => {
    clearInterval(interval)
  })

  intervalIds.splice(0, intervalIds.length)

  console.log(intervalIds)
}

console.log(ballSizeAndPosition)

const ballWidth = getComputedStyle(ball).getPropertyValue('--ball-width')
