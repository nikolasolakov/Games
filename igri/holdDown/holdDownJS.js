

let correctTime=Math.floor(Math.random() * 8) + 1;
document.getElementById("targetNum").innerHTML=correctTime.toString();
let startTime=0;
let isHeld = false;
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isHeld) {
        event.preventDefault();
        document.getElementById("heldFor").style.background = "gray";
        document.getElementById("targetHeld").style.color = "white";
        startTime = performance.now();
        isHeld=true;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.code === "Space" && isHeld) {
        event.preventDefault();
        document.getElementById("heldFor").style.background = "";
        document.getElementById("targetHeld").style.color = "";
        const endTime = performance.now();
        const duration = endTime - startTime;
        const seconds = Number((duration / 1000).toFixed(3));
        isHeld = false;
        console.log(seconds);
        if(Math.abs(correctTime-seconds)>2){
            document.getElementById("resultHeld").innerHTML=`you held for ${seconds} seconds, youre wayyyy off`
        }else if(Math.abs(correctTime-seconds)>=1 && Math.abs(correctTime-seconds)<=2){
            document.getElementById("resultHeld").innerHTML=`you held for ${seconds} seconds, getting there`
        }else if(Math.abs(correctTime-seconds)>=0.5 && Math.abs(correctTime-seconds)<1){
            document.getElementById("resultHeld").innerHTML=`you held for ${seconds} seconds, veerryy cloosee`
        } else if(Math.abs(correctTime-seconds)>=0.1 && Math.abs(correctTime-seconds)<0.5){
            document.getElementById("resultHeld").innerHTML=`you held for ${seconds} seconds, AMAZING`
        }else if(Math.abs(correctTime-seconds)<0.1){
            document.getElementById("resultHeld").innerHTML=`you held for ${seconds} seconds, YAAAYYYY`
        }
    }
});
function again(){
    correctTime=Math.floor(Math.random() * 10) + 1;
    document.getElementById("targetNum").innerHTML=correctTime.toString();
    document.getElementById("resultHeld").innerHTML="";
    document.body.focus();
}