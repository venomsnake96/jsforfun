const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const $sprite = document.querySelector('#sprite')
const $bricks = document.querySelector('#bricks')

canvas.width = 448
canvas.height= 400

const ballRadius = 4;
let x = canvas.width / 2
let y = canvas.height - 30
let dx = -1
let dy = -1

const paddleHeight = 10
const paddleWidth = 50 

let paddleX = (canvas.width - paddleWidth) / 2
let paddleY = (canvas.height - paddleHeight) - 10

let rigthPressed = false
let leftPressed = false 

function drawBall(){
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.closePath()
}

function drawPaddle() {
    ctx.drawImage(
    $sprite, 29, 174,
    paddleWidth,
    paddleHeight,
    paddleX,
    paddleY,
    paddleWidth,
    paddleHeight 
    )
}

function ballMovement(){

    if(x + dx > canvas.width - ballRadius ||
        x + dx < ballRadius
    ){
        dx = -dx
    }

    if(y + dy < ballRadius){
        dy = -dy
    }
const isBallSameXAsPaddle = 
    x > paddleX && 
    x < paddleX + paddleWidth

const isBallTouchingpaddle = 
    y + dy > paddleY    

    if(isBallSameXAsPaddle && isBallTouchingpaddle){
        dy = -dy
    
    }else if(y + dy > canvas.height - ballRadius){

        console.log('game over')
        document.location.reload()
    }


    x += dx
    y += dy
}

function paddleMovement() {
    if (rigthPressed && paddleX < canvas.width - paddleWidth){
        paddleX += 5
    }else if (leftPressed && paddleX > 0) {
        paddleX -= 5
    }
}

function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function initEvents(){
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)

    function keyDownHandler(event){
        const { key } = event

        if(key === 'Right' || key === 'ArrowRight'){
            rigthPressed = true
        } else if (key === 'Left' || key === 'ArrowLeft'){
            leftPressed = true
        }
    }

    function keyUpHandler(event){
        const { key } = event

        if(key === 'Right' || key === 'ArrowRight'){
            rigthPressed = false
        } else if (key === 'Left' || key === 'ArrowLeft'){
            leftPressed = false
        }
    }
}

function draw () {
    cleanCanvas()
    drawBall()
    drawPaddle()
    ballMovement()
    paddleMovement()
    window.requestAnimationFrame(draw)
}

draw()
initEvents()