
const gridEl = document.querySelector('.grid')
const scoreDispaly  = document.getElementById("score")

const blockwidth = 100
const blockheight = 20
const boardwidth = 560
const boardHeight = 300

const ballDiameter = 20
let xDirection = - 2
let yDirection = 2
let score = 0
let timerId


const userStart = [230,10]
let currentPosition = userStart

const ballStart = [270,40]
let ballCurrentPosition = ballStart


// create blocks
class Block{
    constructor(xAxis,yAxis) {
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis + blockwidth,yAxis]
        this.topLeft = [xAxis,yAxis + blockheight]
        this.topRight = [xAxis + blockwidth , yAxis + blockheight]
    }
}


// adding all my  blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),

]


function addBlocks() {
    
    for(let i = 0; i < blocks.length; i++){

        const blockEl = document.createElement('div');
        blockEl.classList.add('block')

       blockEl.style.left = blocks[i].bottomLeft[0] + 'px'
       blockEl.style.bottom = blocks[i].bottomLeft[1] + 'px'

        gridEl.appendChild(blockEl)

    }
}
addBlocks()


// adding user
const userEl = document.createElement('div')
userEl.classList.add('user')
drawUser()
gridEl.appendChild(userEl)



function drawUser(){
    userEl.style.left = currentPosition[0] + 'px'
    userEl.style.bottom = currentPosition[1] + 'px'
}



function drawBall(){
    ballEl.style.left =  ballCurrentPosition[0] + 'px'
    ballEl.style.bottom = ballCurrentPosition[1] + 'px'
}



// move user
function moveUser(e){
    switch(e.key) {
        case 'ArrowLeft':
            if(currentPosition[0] > 0){
                currentPosition[0] -= 10
                drawUser()
            }
            break;

        case 'ArrowRight':
            if(currentPosition[0] < boardwidth - blockwidth){
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }

}
document.addEventListener( "keydown" , moveUser )


// create ball
const ballEl = document.createElement('div')
ballEl.classList.add('ball')
drawBall()
gridEl.appendChild(ballEl)


// move the ball
function moveBall(){
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisisons()
}

timerId = setInterval(moveBall,30)






// check for collisions
function checkForCollisisons(){

    //check for block collisions
    for(let i = 0; i < blocks.length;i++){
        if(
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            console.log(allBlocks)
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirection()
            score++
            scoreDispaly.innerHTML = score

            // check for win
            if(blocks.length === 0){
                scoreDispaly.innerHTML = 'you win'
                clearInterval(timerId)
                document.removeEventListener("keydown" , moveUser)
            }
        }
    }


    // check for wall collision
    if(ballCurrentPosition[0] >= (boardwidth - ballDiameter) || 
       ballCurrentPosition[1] >= (boardHeight - ballDiameter) || 
       ballCurrentPosition[0] <= 0
    ) {
        changeDirection()
    }



    // check for user collision
    if(
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockwidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockheight)
    ){
        changeDirection()
    }



    //check for game over
    if(ballCurrentPosition[1] <= 0){
        clearInterval(timerId)
        scoreDispaly.innerHTML = "you lose"
        document.removeEventListener('keydown' , moveUser)
    }
}


function changeDirection() {

    if(xDirection === 2 && yDirection === 2){
        yDirection = -2
        return
    }
    if(xDirection === 2 && yDirection === -2){
        xDirection = -2
        return 
    }
    if(xDirection === -2 && yDirection === -2){
        yDirection = 2
        return
    }
    if(xDirection === -2 && yDirection === 2){
        xDirection = 2
        return
    }
}


