let buttons = [...document.getElementsByClassName("buttons")];
let click;
let score=0;
let highscore=0;
document.getElementById("score").innerHTML=score.toString();
document.getElementById("highscore").innerHTML=score.toString();
buttons.forEach(btn => {
    btn.addEventListener("click", (event) => {
        buttons.forEach(b => b.classList.add("fade"));

        setTimeout(() => {
            buttons.forEach(b => b.style.display = "none");
            if(event.target.id==="e"){
                easy();
            }else if(event.target.id==="m"){
                medium();
            }else {
                hard();
            }
        }, 500);
    });
});
function easy(){
    click=document.createElement("button");
    click.className="easy";
    let container = document.getElementById("nodes");
    let maxX = container.clientWidth - 50;
    let maxY = container.clientHeight - 50;
    let x = Math.floor(Math.random() * maxX);
    let y = Math.floor(Math.random() * maxY);
    click.style.position="absolute";
    click.style.top=y+"px";
    click.style.left=x+"px";
    let start=performance.now();

    container.appendChild(click);
    click.addEventListener("click", function (){
        let end=performance.now();
        let time=end-start;
        if(time<=3500){
            score++;
            document.getElementById("score").innerHTML=score.toString();
            click.remove();
            easy();
        }else{
            click.remove();
            void document.body.offsetWidth;
            document.getElementById("body").classList.add("fade-away");
            if(score>=highscore){
                document.getElementById("highscore").innerHTML=score.toString();
            }
            score=0;
            document.getElementById("score").innerHTML=score.toString();
            setTimeout( () =>{
                document.getElementById("body").classList.remove("fade-away");
                again();
            }, 500)

        }
    })
}
function medium(){
    click=document.createElement("button");
    click.className="medium";
    let container = document.getElementById("nodes");
    let maxX = container.clientWidth - 35;
    let maxY = container.clientHeight - 35;
    let x = Math.floor(Math.random() * maxX);
    let y = Math.floor(Math.random() * maxY);
    click.style.position="absolute";
    click.style.top=y+"px";
    click.style.left=x+"px";
    let start=performance.now();

    container.appendChild(click);
    click.addEventListener("click", function (){
        let end=performance.now();
        let time=end-start;
        if(time<=3000){
            score++;
            document.getElementById("score").innerHTML=score.toString();
            click.remove();
            medium();
        }else{
            click.remove();
            void document.body.offsetWidth;
            document.getElementById("body").classList.add("fade-away");
            if(score>=highscore){
                document.getElementById("highscore").innerHTML=score.toString();
            }
            score=0;
            document.getElementById("score").innerHTML=score.toString();
            setTimeout( () =>{
                document.getElementById("body").classList.remove("fade-away");
                again();
            }, 500)
        }
    })
}
function hard(){
    click=document.createElement("button");
    click.className="hard";
    let container = document.getElementById("nodes");
    let maxX = container.clientWidth - 20;
    let maxY = container.clientHeight - 20;
    let x = Math.floor(Math.random() * maxX);
    let y = Math.floor(Math.random() * maxY);
    click.style.position="absolute";
    click.style.top=y+"px";
    click.style.left=x+"px";
    let start=performance.now();

    container.appendChild(click);
    click.addEventListener("click", function (){
        let end=performance.now();
        let time=end-start;
        if(time<=2000){
            score++;
            document.getElementById("score").innerHTML=score.toString();
            click.remove();
            hard();
        }else{
            click.remove();
            void document.body.offsetWidth;
            document.getElementById("body").classList.add("fade-away");
            if(score>=highscore){
                document.getElementById("highscore").innerHTML=score.toString();
            }
            score=0;
            document.getElementById("score").innerHTML=score.toString();
            setTimeout( () =>{
                document.getElementById("body").classList.remove("fade-away");
                again();
            }, 500)
        }
    })
}
function again(){
    click.remove();
    score=0;
    document.getElementById("score").innerHTML=score.toString();
    buttons.forEach(b => {
        b.classList.remove("fade");
        b.style.display = "inline-block";
    });
}
