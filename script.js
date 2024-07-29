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

function generateBall() {
  const randomY = Math.floor(
    Math.random() * (bodySizeAndPosition.height - ballSizeAndPosition.height)
  )

  ball.style.top = randomY.toString() + 'px'
}

console.log(bodySizeAndPosition.height)
generateBall()

const ballWidth = getComputedStyle(ball).getPropertyValue('--ball-width')
