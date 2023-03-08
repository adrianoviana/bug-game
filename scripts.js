document.addEventListener('DOMContentLoaded', () => {
const hero = document.querySelector('.hero')
const grid = document.querySelector('.grid')
const body = document.querySelector('body')
const theEnd = document.getElementById('theEnd')
let isJumping = false
let gravity = 0.9
let isGameOver = false

function command(e) {
  if (e.keyCode === 32) {
    if (!isJumping) {
      isJumping = true
      jump()
    }
  }else{
    window.alert('Pressione a tecla espaço para pular!')
  }
}
document.addEventListener('keydown', command)

let heroPosition = 0
function jump() {
  let height = 0
  let upHigh = setInterval(function () {
        //move up
        heroPosition +=30
        height++
        heroPosition = heroPosition * gravity
        hero.style.bottom = heroPosition + 'px'

    //move down
    if (height === 15) {
      clearInterval(upHigh)
      let downFall = setInterval(function () {
        heroPosition -= 5
        height--
        heroPosition = heroPosition * gravity
        hero.style.bottom = heroPosition + 'px'
        if (height === 0) {
          clearInterval(downFall)
          isJumping = false
        }
    
      },20)

    }

  },20)
}

function enemies() {
  let randomTime = Math.random() * 3000
  let enemyPosition = 1200
  const enemy = document.createElement('div')
  if (!isGameOver) {
  enemy.classList.add('enemy')
  grid.appendChild(enemy)
  enemy.style.left = enemyPosition + 'px'
  }

  let upHigh = setInterval(function() {
    enemyPosition -=10
    enemy.style.left = enemyPosition + 'px'

    if (enemyPosition > 0 && enemyPosition < 64 && heroPosition < 64) {
      clearInterval(upHigh)
      theEnd.innerHTML = 'O bug te pegou! Atualize a página para tentar novamente.'
      isGameOver = true
      //remove all children
      body.removeChild(body.firstChild)
      while (grid.firstChild) {
        grid.removeChild(grid.lastChild)
      }
      
    }
   
  },20)
  if (!isGameOver) setTimeout(enemies, randomTime)
}
enemies()
})