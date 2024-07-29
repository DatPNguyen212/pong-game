const playerScore = document.querySelector('[data-player-score]')
const computerScore = document.querySelector('[data-computer-score]')

const playerBar = document.querySelector('[data-player-bar]')
const computerBar = document.querySelector('[data-computer-bar]')

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
