let tries = 0 , duration = 1000;
document.querySelector(".bg span").addEventListener("click", ()=>{
    let yourName = prompt("What's your name?");
    if(yourName == null || yourName == ""){
        document.querySelector(".hello span").innerHTML = "Unknown";
    } else{
        document.querySelector(".hello span").innerHTML = yourName;
    }
    document.querySelector(".bg").style.display = "none";
    document.querySelector(".tries span").innerHTML = tries;
    showAll();
});
let gameContainer = document.querySelector(".memory-game-blocks");
let cardArray = Array.from(gameContainer.children);
function showAll(){
    cardArray.forEach(card => {
        card.classList.add("is-flipped");
    });
    setTimeout(() => {
        cardArray.forEach(card => {
            card.classList.remove("is-flipped");
        });
    }, duration);
}
let cardIndex = [...cardArray.keys()];
function shuffle(array){
    let current = array.length , random;
    while(current > 0){
        random = Math.floor(Math.random() * array.length);
        [array[current], array[random]] = [array[random], array[current]];
        current--;
    }
}
shuffle(cardIndex);
cardArray.forEach((block, index) => {
    block.style.order = cardIndex[index];
});
function stopClicking() {
    gameContainer.classList.add('no-clicking');
    setTimeout(() => {
        gameContainer.classList.remove('no-clicking');
    }, duration);
}
let  count = 0 , images = new Array(2) , i = 0 ;
for (let index = 0; index < cardArray.length; index++) {
    cardArray[index].addEventListener("click", ()=>{
        cardArray[index].classList.add("is-flipped");
        images[i] = cardArray[index];
        i++;
        count++;
        if(count === 2){
            if(images[0].getAttribute("data-image") === images[1].getAttribute("data-image")){
                for (let j = 0; j < cardArray.length; j++) {
                    if(cardArray[j].getAttribute("data-image") === images[0].getAttribute("data-image")){
                        cardArray[j].classList.add("has-match");
                    }
                }
                stopClicking();
            }
            else{
                setTimeout(() => {
                    tries++;
                    document.querySelector(".tries span").innerHTML = tries;
                    for (let j = 0; j < cardArray.length; j++) {
                        cardArray[j].classList.remove("is-flipped");
                    }
                }, duration);
                stopClicking();
            }
            i = 0;
            count = 0;
        }
    })
}


