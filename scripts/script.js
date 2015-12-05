/**
 * Created by Harshit on 12/5/2015.
 */

var imageMap={};

function loadTable(){
    var table= $('#imageTable');
    console.log(table.attr("id"));
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
                    .attr('src', 'images/Image ('+(i+1)+').jpg')
                    .attr('id','Image ('+(i+1)+')')
                    .mouseover(function(){
                      $(this).attr('style','opacity:0.5');
                    })
            )
        );
    }
}

function generateID(){
    for(var i=0;i<25;i++){
        imageMap[i+1] = 'Image ('+(i+1)+').jpg'
    }
    console.log(imageMap);
}

function main(){
    generateID();
    loadTable();
}