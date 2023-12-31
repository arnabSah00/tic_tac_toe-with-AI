$('.main').hide();
$('.level').hide();
//after choose
let choose='ai';
let l;

//human button
$('#human').on('click',function(){
    $('.level').hide();
    $('.main').hide().delay(200).slideDown(1500);
    $('.board td').text('');
    $('.bd h3').text('Turn of: X');
    clear=false;
    currentPlayer='X'
    xScore=0;
    oScore=0;
    $('#xVal').text(xScore);
    $('#oVal').text(oScore)
    choose='human';
});

//ai button
$('#ai').on('click',function(){
    $('.main').hide();
    $('.level').hide().delay(100).slideDown(500);
    $('.board td').text('');
    $('.bd h3').text('Turn of: X');
    clear=false;
    currentPlayer='X'
    xScore=0;
    oScore=0;
    $('#xVal').text(xScore);
    $('#oVal').text(oScore);
    choose='ai';
});

//level button
$('.level button').on('click',function(){
    $('.main').hide().delay(200).slideDown(1500);
    $('.level').hide();
    l=$(this).text();
})

//for score card
$('.score h3').on('click',function(){

    if(!($('#sVal').is(':hidden'))){
        $('#sVal').hide();
        $('.score h1').hide();

        $('.score').css({
            'background-color':'rgba(0,0,0,0)'
        });

        $('.board').animate({
            marginTop: '-=100'
        },500,function(){
            $(this).slideDown();
        });
    }
    else {
        $('.score h1').hide().delay(100).slideDown(1000);
        $('#sVal').hide().delay(200).slideDown(1500);
        
        $('.score').css({
            'background-color':'rgba(0,0,0,0.1)'
        });
        
        $('.board').animate({
            marginTop: '+=100'
        },500,function(){
            $(this).slideDown();
        });
    }
});


// restart button animation
$(function(){
    $('button#restart').on('click', function () {
        clear=false;
        $('.bd').animate({
            opacity:0.0,
            paddingLeft:'+=100'
        },500,function(){
            $(this).hide();
        });

        setTimeout(function() {
            $('.board td').text('');
            $('.bd h3').text('Turn of: X');
            currentPlayer='X';
        }, 500);


        $('.bd').animate({
            opacity:1,
            paddingLeft:'-=100'
        },0,function(){
            $(this).show();
        });
        
    });
});



//for reset button

$(function(){
    $('button#reset').on('click', function () {
        $('.main').show().delay(200).slideUp(1500);

        setTimeout(function() {
            $('.board td').text('');
            $('.bd h3').text('Turn of: X');
            clear=false;
            currentPlayer='X'
            xScore=0;
            oScore=0;
            $('#xVal').text(xScore);
            $('#oVal').text(oScore);
        }, 1500);

        $('.main').show().delay(200).slideDown(1500);
    });

});


//check winer

function checkWin() {
  const cells = document.querySelectorAll('td');

  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

    for (const line of lines) {
        const [a, b, c] = line;

        if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {

            return cells[a].innerText+" wins!";
        }
    } 

  // Check for a draw
    if ([...cells].every(cell => cell.innerHTML)) {

        return "It is a draw!";

    }
}


//For AI Using first empty method

function firstEmptyAI() {
    let x;
    for (let i = 0; i < 9; i++) {
        if(!($('td').eq(i).text())){
            x= i;
            break;
        }
    }
    return x;
}

//For AI using random choosing method

function randomMove(){
    let avalable=[];
    for(let i=0;i<9;i++){
        if(!($('td').eq(i).text())){
            avalable.push(i);
        }
    }
    let randomIndex = Math.floor(Math.random() * avalable.length);
    let rmove = avalable[randomIndex];
    return rmove;
}

//For AI using min_max algorithm

//for ai best move:
function bestMove(){
    let bestScore=Infinity;
    let bMove;
    for(let i=0;i<9;i++){
        if(!($('td').eq(i).text())){
            $('td').eq(i).text('0');
            let score=minimax(0,true);
            $('td').eq(i).text('');
            if(score<bestScore){
                bestScore=score;
                bMove=i;
            }
        }
    }
    return bMove;
}

//minimax algo

function minimax(depth,isMaximizing){
    let result=checkWin();
    if(result=='X wins!')return 1;
    if(result=='0 wins!')return -1;
    if(result=='It is a draw!')return 0;

    if(isMaximizing){
        let bestScore=-Infinity;
        for(let i=0;i<9;i++){
            if(!($('td').eq(i).text())){
                $('td').eq(i).text('X');
                let score=minimax(depth+1,false);
                $('td').eq(i).text('');
                // if(score>bestScore){
                //     bestScore=score;
                // }
                bestScore=Math.max(score,bestScore);
            }
        }
        return bestScore;
    }
    else{
        let bestScore = Infinity;
        for(let i=0;i<9;i++){
            if(!($('td').eq(i).text())){
                $('td').eq(i).text('0');
                let score=minimax(depth+1,true);
                $('td').eq(i).text('');
                // if(score<bestScore){
                //     bestScore=score;
                // }
                bestScore=Math.min(score,bestScore);
            }
        }
        return bestScore;
    }
}



// game logic
let currentPlayer='X';
let xScore=0,oScore=0;
let clear=false;

$(document).ready(function(){
    $('td').on('click',function(){
        if(!($(this).text())){
            var show;

            //real game
            if(choose=='human'){
                $(this).append(currentPlayer);
                currentPlayer = (currentPlayer === 'X') ? '0' : 'X';
                show=checkWin();
            }
            if(choose=='ai'){
                $(this).append(currentPlayer);
                show=checkWin();
                currentPlayer = (currentPlayer === 'X') ? '0' : 'X';
                if(!show){
                    if(l==='Easy'){
                        var bestIndex=randomMove();
                    }
                    else{
                        var bestIndex=bestMove();
                    }
                    
                    $('td').eq(bestIndex).text('0');
                    currentPlayer = (currentPlayer === 'X') ? '0' : 'X';
                    show=checkWin();
                }
                
            }

            //extra elemantary
            if(clear){
                clear=false;
                currentPlayer='X';
                $('.board td').text('');
                $('.bd h3').text('Turn of: X');
                alert(show);
            }
            else if(show){
                clear=true;
                $('.bd h3').text(show);

                if(show=='X wins!'){
                    xScore=parseInt(xScore)+1;
                    $('#xVal').text(xScore);
                }
                else if(show=='0 wins!'){
                    oScore=parseInt(oScore)+1;
                    $('#oVal').text(oScore);
                }

            }
            else{
                $('.bd h3').text('Turn of: '+currentPlayer);
            }
        }
        });
});

