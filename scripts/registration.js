var userDB = {}
var imageMap = {};
var selectedSequence = {};

function reset() {

    for( image in selectedSequence) {
        $(selectedSequence[image]).attr('style','opacity:1');
    }

    selectedSequence = {}
    document.getElementById('userid').value = "";
}


function registerUser() {
    userName = document.getElementById('userid').value;

    if(userName.length == 0) {
        alert("User Name can not be empty!");
        return;
    }

    /* Check the length of selected images 
     *  - User should select 3 images at the minimum
     */
    if(Object.keys(selectedSequence).length < 3) {
        alert("Number of Images can not be less than THREE");
        return;
    }

    /* Everything so far looks good. Add user credential to userDB */
    userDB[userName] = selectedSequence;

    alert("User registration successfull!");
    window.location.replace("index.html");
}
 
function imageSelection() {
    console.log(this);
    console.log(this.id);
    $(this).attr('style','opacity:0.5');
    
    if(Object.keys(selectedSequence).length == 3 ) {
        alert("Number of images exceeded maximum allowed!\n Maximum number of images allowed are THREE");
        return;
    }

    selectedSequence[this.id] = this;
    console.log("selectedSequence so far = ", selectedSequence);

}

function loadTable(){
    var table= $('#imageTable');
    console.log(table.attr("id"));
    var currentRow;
    for(var i=0;i<25;i++){

        if(i%5 ==0){
            var rowId=i+'r';
            table
                .append($('<tr>')
                    .attr('id',rowId));

            currentRow = $('#'+rowId);
        }
        currentRow
            .append($('<td>')
                .append($('<img>')
                    .attr('src', 'images/Image ('+(i+1)+').jpg')
                    .attr('id', (i+1))
                    .click(imageSelection)
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
