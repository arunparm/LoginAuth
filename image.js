var lastClicked;
var user_names = ["admin","root","anonymous"];

var userVerify = function(username){
    console.log("Got username = ",username);
    if(user_names.indexOf(username) > -1) {
        console.log("User exists");
    } else {
        console.log("User doesn't exist");
    }
}

userVerify("root");
userVerify("roooot");

var grid = clickableGrid(5,5,function(el,row,col,i){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);

    el.className='clicked';
    if (lastClicked) lastClicked.className='';
    lastClicked = el;
});

document.body.appendChild(grid);
     
function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            var cellImage = cell.appendChild(document.createElement('img'))
            cellImage.src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAilBMVEX///8AAABTU1Pw8PD19fX6+vrl5eX39/f8/PwvLy/V1dVkZGTt7e2oqKgrKyva2trHx8eNjY04ODhpaWl0dHRGRka0tLS7u7t6enqenp5XV1fg4OBMTEyXl5eBgYFVVVUVFRUcHByJiYmjo6Ovr68jIyMMDAwaGhp4eHjOzs7ExMS5ubk2NjY/Pz/8t9m3AAADHklEQVRYhe2YbaNyMBjHrZYwkiIxKlLdevj+X+8mNpbZ7Jzzsv/LK/vZrl1P0rSvvvrqT7R0H4UTRefiYc1/T7NTFDyzK6h0vZkB8vRfwAz9bIKBMg8vfsZzo2yIe8srDXUcjF4juEqrXPnkWICrZYZKOMMR42rlcDoP5nIeANvpx95P4QEQT93jpP299ziNmE7lAeAvJ/DCy3QgOMt5dqDAAzdLCvRUeAAcZTxdjQeALMAnRkynWJzW+kYVeFkLgRNS7lOeiLf4pw6MRRmIZ+rAVTnOM5xV9+DT24XF/joAbJ3wkfaDtRgHLg/des+uC/1ST1hc5tb5a8yLzuSNd4Q5Ig9dd9TIlIotDRKLHuYwntBz6sKoZ9x2vFnvAna31uiP1xybnA/ZPeudVotT313QJ7seB86Pww1WigkwYBp9cZLukPjQZGsILZB7xkyySuBD2EbJi43VBwGmjNlIpLe8iBp3vWzGfOdcVa0W6IzyNCNsTrHBjJkmOJu2sI3u+zhQ0xv/3x6MlVwnQIy5bCJxIyraxqFZmfeLnE6HCPayUk6IDXTmrIy6wM57/setC3MRjxwDoG6l1RvpTp2/yGFOOx6nE8nmVxvDxrqJpNWzsRftmyBJyETSmkPqL8fSbVy2jrrcLRLGa9fWrR0tQpGYp2ndGGceUZIBGmuPNqWvAYq7znOVzg40ivt6jxzcji0fHQzOuibQIac/+BPGbRsNluWaXpZY2w1+SCaNiHgw3aA8Xl1mh8EQYAr6E7NHnrN4cqfx6qo/bHZDCRvyhxbnTIY7eQpDu0YzxjzOPnRsU0aWIZ9qMnVmwfmHIG7eheQMRk3ZQXhZbwTCKtwMCKuitoB2Ux59RWCbMAmq+ogbI8fQ1iiuak2ESCdRBEJ6l5q2rkrCQiveeUa7vngs5IhEd4L1CuW7uKo7qa7TNFLl1dsSKZUTPrT0RbxA2Ej4cgUfuBe1j9tW4Xj+Scs0X/fTCE8wK4i1Tni4jWAGlgmnw2Mf5J93Ahl4y+JmlmJRGAoWfvBcXbKV+dqefxAtXKZbhmH5F39UffXVV43+AwN8LNzXRJKiAAAAAElFTkSuQmCC"
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell,r,c,i),false);
        }
    }
    return grid;
}

