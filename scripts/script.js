/**
 * Created by Harshit on 12/5/2015.
 */

const MAX_PWD_LENGTH= 10;

var imageMap={};
var imageArray = [];
var shuffledImageArray =[];
var enteredPassword = [];
var password = [];
var lastClicked;
var validMoves=[];
var moves = [];
var isFirstMove = true;
var exceededMaximum = false;
function loadTable(){
    enteredPassword = [];
    var length =0;
    var table= $('#imageTableIndex');
    var currentRow;
    for(var i=0;i<25;i++){

        if(i%5 ==0){
            var rowId=i+'';
            table
                .append($('<tr>')
                    .attr('id',rowId));

            currentRow = $('#'+rowId);
        }
        currentRow
            .append($('<td>')
                .append($('<img>')
                    .attr('src', 'images/'+shuffledImageArray[i])
                    .attr('alt','false')
                    .attr('id',shuffledImageArray[i])
                    .click(function(){
                        console.log($(this).parent().attr('id'));
                        if(validMoves.indexOf(parseInt($(this).parent().attr('id'))) > -1 || isFirstMove){
                            if($(this).attr('alt') == 'false'){
                                $(this).attr('style','opacity:0.5');
                                $(this).attr('alt','true');
                                length++;
                                enteredPassword.push(imageMap[$(this).attr('id')]);
                            }
                            else{
                                $(this).attr('style','opacity:1.0');
                                $(this).attr('alt','false');
                                length--;
                                enteredPassword.pop();
                            }
                            if(length>MAX_PWD_LENGTH){
                                $('#alert').text("Selections exceeded maximum length.");
                                $('#alert').show();
                                exceededMaximum = true;
                            }
                            else{
                                $('#alert').hide();
                                exceededMaximum = false;
                            }

                            var currentPos = parseInt($(this).parent().attr('id'));
                            lastClicked=$(this).parent().attr('id');
                            validMoves = getValidMoves(currentPos);
                            validMoves.push(currentPos);
                            console.log(validMoves);
                            isFirstMove= false;
                        }
                        else{
                            alert("Invalid move");
                        }
                    })
            )
                .attr('id',i)
        )

    }
}

function generateID(){
    for(var i=0;i<25;i++){
        imageMap['Image ('+(i+1)+').jpg'] = i+1;
        imageArray.push('Image ('+(i+1)+').jpg');
    }
    console.log(imageMap);
}

function submit(){
    console.log("Localstorage: "+localStorage.getItem('userDatabase'));
    var arr = sessionStorage.getItem('userDatabase').split(',');
    for(var i=0;i<arr.length;i++){
        password.push(parseInt(arr[i]));
    }
    console.log("Password : "+password);

    var submitButton = $('#submitBtn');
    submitButton
        .click(function(){
            if(!exceededMaximum){
                var index=0;
                for(var i=0;i<enteredPassword.length;i++){
                    if(password.indexOf(enteredPassword[i])>-1){
                        if(password.indexOf(enteredPassword[i]) == index){
                            index++;
                        }
                    }
                }
                if(index == password.length){
                    $('#alert')
                        .text('Authenticated.')
                        .show();
                    window.location.replace('home.html');
                }
                else{
                    $('#alert')
                        .text('Password Invalid.')
                        .show();
                }
            }
            else{
                alert("Selections exceeded maximum length.")
            }
        })
}
function main(){
    generateID();
    shuffledImageArray = shuffle(imageArray);
    console.log(shuffledImageArray);
    loadTable();
    submit();
    $('#alert').hide();
    generateMoves();
}

function generateMoves(){
    var counter =0;
    for(var i=0;i<5 ;i++){
        var temp=[];
        for(var j=0;j<5;j++){
            temp[j]=counter++;
        }
        moves[i]=temp;
    }

}

function getValidMoves(position){
    var currentMoves= [];
    var flag=false;
    for(var i=0;i<5;i++){
        for(var j=0;j<5;j++){
            if(moves[i][j] == position){
                if((i+1) <5)
                    currentMoves.push(moves[i+1][j]);
                if((i-1)>=0)
                    currentMoves.push(moves[i-1][j]);
                if((j+1) <5)
                    currentMoves.push(moves[i][j+1]);
                if((j-1)>=0)
                    currentMoves.push(moves[i][j-1]);
                flag = true;
                break;
            }
        }
        if(flag)
            break;
    }
    return currentMoves;
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}