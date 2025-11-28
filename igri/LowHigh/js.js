let correctNumber=Math.floor(Math.random() * 20) + 1;
let correctField=document.getElementById("finalField")
let highscore=0;
let score=0;
document.getElementById("guess").focus();
document.getElementById("guess").addEventListener("keydown", function (event){
    if(event.key==="Enter"){
        check();
    }
})

function check(){
    document.getElementById("guess").focus();
    let guessed=document.getElementById("guess").value;
    if(isNaN(guessed)){
        alert("NE E TOA BROJJJJJJ" )
        return;
    }
    if(guessed==correctNumber){
        correctField.innerHTML=guessed;
        score++;
        if(score<=highscore || highscore==0){ 
            highscore=score;
            document.getElementById("highscore").innerHTML=highscore.toString();
        }
        document.getElementById("score").innerHTML=score.toString();
        document.getElementById("correctIncorrect").innerHTML="Correct!"
        document.getElementById("body").style.background="limegreen"
        document.getElementById("guess").style.background="limegreen"
        document.getElementById("header").style.background="limegreen"

    }else if (guessed<correctNumber){
        score++;
        document.getElementById("score").innerHTML=score.toString();
        document.getElementById("correctIncorrect").innerHTML="Higher!!"
    }else{
        score++;
        document.getElementById("score").innerHTML=score.toString();
        document.getElementById("correctIncorrect").innerHTML="Lower!"
    }
}
function again(){
    correctField.innerHTML="";
    document.getElementById("correctIncorrect").innerHTML="";
    correctNumber=Math.floor(Math.random() * 20) + 1;
    score=0;
    document.getElementById("score").innerHTML=score.toString();
    document.getElementById("body").style.background="gray"
    document.getElementById("guess").style.background="gray"
    document.getElementById("header").style.background="gray"
    document.getElementById("guess").value="";
    document.getElementById("guess").focus();

}