const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if(lockBoard) return;
    if(this == firstCard) return;
    //Toggle - Tira e adiciona classe
    //this.classList.toggle('flip'); 
    //Add - So adiciona class uma vez
    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}
//Checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card == secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}
//função que desabilita as cartas
function disableCards(){
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);

    resetBoard();
}
//funcão que desvira as cartas, caso elas não sejam iguais
function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;

        resetBoard();
    },1500);

}
//Função que reseta as cartas do tabuleiro
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
//função que embaralha as cartas
(function shuffle(){
    cards.forEach(card => {
        let randowPosition = Math.floor(Math.random() * 12);
        card.style.order = randowPosition;
    });
}) ();

//ForEach que adiciona evento de clique
cards.forEach((card) => {
    card.addEventListener('click',flipCard)
})

