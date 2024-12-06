for(var i=0;i<document.querySelectorAll(".drum").length;i++){
document.querySelectorAll(".drum")[i].addEventListener("click",handleclick);

}
function handleclick(){
    var audio=new Audio("./sounds/tom-1.mp3");
    audio.play();
}