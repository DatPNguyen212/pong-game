const playerScore = document.querySelector('[data-player-score]')
const computerScore = document.querySelector('[data-computer-score]')

const playerBar = document.querySelector('[data-player-bar]')
const computerBar = document.querySelector('[data-computer-bar]')

const ball = document.querySelector('[data-ball]')

const body = document.querySelector('body')
let bodySizeAndPosition = body.getBoundingClientRect()

const playerWinContainer = document.querySelector('[data-player-win-container]')
const computerWinContainer = document.querySelector(
  '[data-computer-win-container]'
)
const overlay = document.querySelector('[data-overlay]')

const allPopupPlayerScores = document.querySelectorAll(
  '[data-popup-player-score]'
)
const allPopupComputerScores = document.querySelectorAll(
  '[data-popup-computer-score]'
)

const allPlayAgainButton = document.querySelectorAll('[data-play-again-button]')
const allInfiniteModeButton = document.querySelectorAll(
  '[data-infinite-button]'
)

let playerSizeAndPosition = playerBar.getBoundingClientRect()
let computerSizeAndPosition = computerBar.getBoundingClientRect()

let playerBarCenterX = playerSizeAndPosition.width / 2 + playerSizeAndPosition.x

let playerBarCenterY =
  playerSizeAndPosition.height / 2 + playerSizeAndPosition.y

let playerBarHitBoxX = playerSizeAndPosition.x + playerSizeAndPosition.width

let computerBarCenterX =
  computerSizeAndPosition.x + computerSizeAndPosition.width / 2
let computerBarCenterY =
  computerSizeAndPosition.y + computerSizeAndPosition.height / 2

computerBar.style.top =
  (computerSizeAndPosition.y - computerSizeAndPosition.height / 2).toString() +
  'px'

// topplayerHitBoxYTop    playerPostion.top to playerCenterY
// topPlayerHitBoxBottom playerCenterY to playerPositionBottom

let ballSizeAndPosition = ball.getBoundingClientRect()

let ballCenterX = ballSizeAndPosition.width / 2 + ballSizeAndPosition.x
let ballCenterY = ballSizeAndPosition.height / 2 + ballSizeAndPosition.y

let ballCurrentDirection
let isBallHitByPlayer
let isBallHitByComputer

// distance and interval for ball
let pxDistanceBallMove = 3
let setIntervalNumberMs = 15

// distance and interval for computer bar
let pxDistanceComputerMove = 6
let setTimeoutComputer = 0.5

let moveTimeoutComputerNorth
let moveTimeoutComputerSouth

let playerScoreNum = 0
let computerScoreNum = 0

const numberOfRoundsToWin = 5
let isPlayerWin

let isInfiniteMode = false

const intervalIds = []
const timeoutIds = []

allPlayAgainButton.forEach((playAgainButton) => {
  playAgainButton.addEventListener('click', (event) => {
    location.reload()
  })
})

allInfiniteModeButton.forEach((infiniteButton) => {
  infiniteButton.addEventListener('click', (event) => {
    playerWinContainer.classList.remove('active')
    computerWinContainer.classList.remove('active')
    overlay.classList.remove('active')
    isInfiniteMode = true
    gameInit()
  })
})

body.addEventListener('mousemove', (event) => {
  const mouseY = event.pageY
  playerBar.style.top = mouseY.toString() + 'px'

  updatePlayerBarPosition()
})

gameInit()

function generateBallAtRandomY() {
  pxDistanceBallMove = 3
  pxDistanceComputerMove = 6
  const randomY = Math.floor(
    Math.random() * (bodySizeAndPosition.height - ballSizeAndPosition.height)
  )

  ball.style.left =
    (bodySizeAndPosition.width / 2 - ballSizeAndPosition.width / 2).toString() +
    'px'

  // console.log(getComputedStyle(ball).getPropertyValue('left'))

  ball.style.top = randomY.toString() + 'px'

  computerBar.style.top =
    (
      bodySizeAndPosition.height / 2 -
      computerSizeAndPosition.height / 2
    ).toString() + 'px'
}

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

  // console.log(intervalIds)
}

function moveBallNorthWest() {
  updateBallPosition()
  ball.style.left =
    (ballSizeAndPosition.x - pxDistanceBallMove).toString() + 'px'

  ball.style.top =
    (ballSizeAndPosition.y - pxDistanceBallMove).toString() + 'px'

  moveComputerBar()
  ifBallCollideLogic()
}
function moveBallSouthWest() {
  updateBallPosition()
  ball.style.left =
    (ballSizeAndPosition.x - pxDistanceBallMove).toString() + 'px'

  ball.style.top =
    (ballSizeAndPosition.y + pxDistanceBallMove).toString() + 'px'
  moveComputerBar()
  ifBallCollideLogic()
}

function moveBallNorthEast() {
  updateBallPosition()
  ball.style.left =
    (ballSizeAndPosition.x + pxDistanceBallMove).toString() + 'px'

  ball.style.top =
    (ballSizeAndPosition.y - pxDistanceBallMove).toString() + 'px'

  // console.log(ballSizeAndPosition.x, ballSizeAndPosition.y)
  moveComputerBar()
  ifBallCollideLogic()
}
function moveBallSouthEast() {
  updateBallPosition()
  ball.style.left =
    (ballSizeAndPosition.x + pxDistanceBallMove).toString() + 'px'

  ball.style.top =
    (ballSizeAndPosition.y + pxDistanceBallMove).toString() + 'px'
  // console.log(ballSizeAndPosition.x, ballSizeAndPosition.y)
  moveComputerBar()
  ifBallCollideLogic()
}

function moveBallEast() {
  updateBallPosition()

  ball.style.left =
    (ballSizeAndPosition.x + pxDistanceBallMove).toString() + 'px'
  moveComputerBar()
  ifBallCollideLogic()
}

function moveBallWest() {
  updateBallPosition()

  ball.style.left =
    (ballSizeAndPosition.x - pxDistanceBallMove).toString() + 'px'
  moveComputerBar()
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
  updateBodySizeAndPosition()

  if (
    ballSizeAndPosition.x <= playerBarHitBoxX &&
    ballCenterY >= playerSizeAndPosition.y &&
    ballCenterY <= playerSizeAndPosition.bottom
  ) {
    isBallHitByPlayer = true
    isBallHitByComputer = false
    ballCurrentDirection = 'right'

    // console.log('hit')
    increaseBallSpeed()
    ballBounceFromPlayer()
  } else if (ballSizeAndPosition.y <= bodySizeAndPosition.y) {
    if (ballCurrentDirection === 'right') {
      clearAllInterval()
      const intervalBounceTopBody1 = setInterval(
        moveBallSouthEast,
        setIntervalNumberMs
      )
      intervalIds.push(intervalBounceTopBody1)
    } else if (ballCurrentDirection === 'left') {
      clearAllInterval()
      const intervalBounceTopBody2 = setInterval(
        moveBallSouthWest,
        setIntervalNumberMs
      )
      intervalIds.push(intervalBounceTopBody2)
    }
  } else if (ballSizeAndPosition.bottom >= bodySizeAndPosition.bottom) {
    if (ballCurrentDirection === 'right') {
      clearAllInterval()
      const intervalBounceBottomBody1 = setInterval(
        moveBallNorthEast,
        setIntervalNumberMs
      )
      intervalIds.push(intervalBounceBottomBody1)
    } else if (ballCurrentDirection === 'left') {
      clearAllInterval()
      const intervalBounceBottomBody2 = setInterval(
        moveBallNorthWest,
        setIntervalNumberMs
      )
      intervalIds.push(intervalBounceBottomBody2)
    }
  } else if (
    ballSizeAndPosition.right >= computerSizeAndPosition.left &&
    ballCenterY >= computerSizeAndPosition.y &&
    ballCenterY <= computerSizeAndPosition.bottom
  ) {
    isBallHitByComputer = true
    isBallHitByPlayer = false
    ballCurrentDirection = 'left'
    // console.log('Collided with computer bar')
    increaseBallSpeed()
    ballBounceFromComputer()
  } else if (ballSizeAndPosition.left <= bodySizeAndPosition.left) {
    computerScoreNum += 1
    updateScoreBoard()
    generateBallAtRandomY()
  } else if (ballSizeAndPosition.right >= bodySizeAndPosition.right) {
    playerScoreNum += 1
    updateScoreBoard()
    generateBallAtRandomY()
  }
}

function updateScoreBoard() {
  playerScore.textContent = playerScoreNum.toString()
  computerScore.textContent = computerScoreNum.toString()

  allPopupPlayerScores.forEach((playerElement) => {
    playerElement.textContent = playerScoreNum.toString()
  })

  allPopupComputerScores.forEach((computerElement) => {
    computerElement.textContent = computerScoreNum.toString()
  })

  if (isInfiniteMode === false) {
    checkPlayerWin()
  }
}

function ballBounceFromPlayer() {
  clearAllInterval()

  // console.log('bouncing')
  if (ballCenterY < playerBarCenterY) {
    const intervalBouncePlayer1 = setInterval(
      moveBallNorthEast,
      setIntervalNumberMs
    )
    intervalIds.push(intervalBouncePlayer1)
    // console.log('move ball north east')
  } else if (ballCenterY > playerBarCenterY) {
    const intervalBouncePlayer2 = setInterval(
      moveBallSouthEast,
      setIntervalNumberMs
    )
    intervalIds.push(intervalBouncePlayer2)
    // console.log('move ball south east')
  } else if (ballCenterY === playerBarCenterY) {
    const intervalBouncePlayer3 = setInterval(moveBallEast, setIntervalNumberMs)
    intervalIds.push(intervalBouncePlayer3)
    // console.log('move ball east')
  }
}

function ballBounceFromComputer() {
  clearAllInterval()
  // console.log('bouncing')

  if (ballCenterY < computerBarCenterY) {
    const intervalBounceComputer1 = setInterval(
      moveBallNorthWest,
      setIntervalNumberMs
    )
    intervalIds.push(intervalBounceComputer1)
  } else if (ballCenterY > computerBarCenterY) {
    const intervalBounceComputer2 = setInterval(
      moveBallSouthWest,
      setIntervalNumberMs
    )
    intervalIds.push(intervalBounceComputer2)
  } else if (ballCenterY === computerBarCenterY) {
    const intervalBounceComputer3 = setInterval(
      moveBallWest,
      setIntervalNumberMs
    )
    intervalIds.push(intervalBounceComputer3)
  }
}

function clearAllInterval() {
  intervalIds.forEach((interval) => {
    clearInterval(interval)
  })

  intervalIds.splice(0, intervalIds.length)

  // console.log(intervalIds)
}

function moveComputerBar() {
  updateBallPosition()
  updateComputerBarPosition()
  // console.log(timeoutIds)

  if (ballCenterY < computerBarCenterY) {
    moveTimeoutComputerNorth = setTimeout(
      moveComputerBarNorth,
      setTimeoutComputer
    )

    timeoutIds.push(moveTimeoutComputerNorth)
    // console.log(computerSizeAndPosition.y)
    // console.log('computer bar moving top')
  } else if (ballCenterY > computerBarCenterY) {
    moveTimeoutComputerSouth = setTimeout(
      moveComputerBarSouth,
      setTimeoutComputer
    )
    timeoutIds.push(moveTimeoutComputerSouth)

    // console.log(computerSizeAndPosition.y)
    // console.log('computer bar moving bottom')
  } else {
    clearAllTimeout()
  }
}

function moveComputerBarNorth() {
  updateComputerBarPosition()
  computerBar.style.top =
    (computerSizeAndPosition.y - pxDistanceComputerMove).toString() + 'px'
}
function moveComputerBarSouth() {
  updateComputerBarPosition()
  computerBar.style.top =
    (computerSizeAndPosition.y + pxDistanceComputerMove).toString() + 'px'
}

function clearAllTimeout() {
  timeoutIds.forEach((timeout) => {
    clearTimeout(timeout)
  })

  timeoutIds.splice(0, timeoutIds.length)
}

function updateComputerBarPosition() {
  computerSizeAndPosition = computerBar.getBoundingClientRect()

  computerBarCenterX =
    computerSizeAndPosition.x + computerSizeAndPosition.width / 2
  computerBarCenterY =
    computerSizeAndPosition.y + computerSizeAndPosition.height / 2
}

function increaseBallSpeed() {
  pxDistanceBallMove += 0.5
  if (pxDistanceComputerMove < 8) {
    pxDistanceComputerMove += 0.3
  }
}

function checkPlayerWin() {
  console.log(playerScoreNum, computerScoreNum)
  if (playerScoreNum === numberOfRoundsToWin) {
    isPlayerWin = true
    stopAllMovement()
    playerWinContainer.classList.add('active')
    overlay.classList.add('active')
  } else if (computerScoreNum === numberOfRoundsToWin) {
    console.log('computer wins')
    isPlayerWin = false
    stopAllMovement()
    computerWinContainer.classList.add('active')
    overlay.classList.add('active')
  }
}

function resetGameState() {
  ballCurrentDirection
  isBallHitByPlayer
  isBallHitByComputer

  // distance and interval for ball
  pxDistanceBallMove = 3
  setIntervalNumberMs = 15

  // distance and interval for computer bar
  pxDistanceComputerMove = 6
  setTimeoutComputer = 0.5

  moveTimeoutComputerNorth
  moveTimeoutComputerSouth

  playerScoreNum = 0
  computerScoreNum = 0

  isPlayerWin

  isInfiniteMode
}

function stopAllMovement() {
  clearAllInterval()
  clearAllTimeout()
}

function updateBodySizeAndPosition() {
  bodySizeAndPosition = body.getBoundingClientRect()
}

function gameInit() {
  generateBallAtRandomY()
  moveBallFromStartingPosition()
}
