let playerState = 'fall'
const dropdown = document.getElementById('animations')
dropdown.addEventListener('change', function (evt) {
  playerState = evt.target.value
})

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = (canvas.width = 600)
const CANVAS_HEIGHT = (canvas.height = 600)

const playerImage = new Image()
playerImage.src = 'https://www.frankslaboratory.co.uk/downloads/shadow_dog.png'
const spriteWidth = 575
const spriteHeight = 523
let gameFrame = 0
let staggerFrame = 4
const spriteAnimations = []
const animationStates = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'gethit',
    frames: 4,
  },
]
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  }
  for (let i = 0; i < state.frames; i++) {
    let positionX = i * spriteWidth
    let positionY = index * spriteHeight
    frames.loc.push({ x: positionX, y: positionY })
  }
  spriteAnimations[state.name] = frames
})

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  let position =
    Math.floor(gameFrame / staggerFrame) %
    spriteAnimations[playerState].loc.length
  let frameX = spriteWidth * position
  let frameY = spriteAnimations[playerState].loc[position].y

  //syntax drawImage(image, sourceX, sourceY, sourceWidth, SourceHeight,
  //then dx dy dw dh
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  )
  if (gameFrame % staggerFrame == 0) {
    if (frameX < 9) frameX++
    else frameX = 0
  }

  gameFrame++
  requestAnimationFrame(animate)
}
animate()
