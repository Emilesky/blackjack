//
// This is my first real app (BlackJack) by Emile Ramlal
//
// kaartvariablen
let kaartTypes = ['Harten', 'Ruiten', 'Klaver', 'Schoppen']
    kaartWaardes = ['Aas', 'Koning', 'Koningin', 'Boer', 
    'Tien', 'Negen', 'Acht', 'Zeven', 'Zes', 'Vijf', 'Vier', 'Drie', 'Twee' 
];

// DOM variabelen = Laten zien acties (buttons) van de kaarten in de stapel
let kaartArea = document.getElementById('kaart-area');
let startButton = document.getElementById('spel-ok');
let hitButton = document.getElementById('hit-kaarten');
let holdButton = document.getElementById('hold-kaarten');

// Spel variabelen
let spelGestart = false;
    gameOver = false;
    spelerWin = false;
    dealerCards = [];
    spelerCards = [];
    dealerScore = 0;
    playerScore = 0;
    kaartStapel = [];

// HTML & knoppen interacties DOM
    hitButton.style.display = 'none';
    holdButton.style.display = 'none';
    showStatus();
        
    startButton.addEventListener ('click', function() {
      spelGestart = true;
      gameOver = false;
      spelerWin = false;
      
      kaartStapel = maakStapel();
      shuffleStapel(kaartStapel);
      dealerCards = [pakKaart(), pakKaart()];
      spelerCards = [pakKaart(), pakKaart()];
 
      startButton.style.display = 'none';
      hitButton.style.display = 'inline';
      holdButton.style.display = 'inline';
      showStatus()
    });  

    hitButton.addEventListener('click', function() {
        spelerCards.push(pakKaart());
        checkforEndOfGame();
        showStatus();
    });
    holdButton.addEventListener('click', function() {
        gameOver = true;
        checkforEndOfGame();
        showStatus();
    });

    
// Het aanmaken van en stapel speelkaarten 
function maakStapel(){
let kaartStapel = [];
for ( let kaartTypeidx = 0; kaartTypeidx < kaartTypes.length; kaartTypeidx++ ) {
    for ( let kaartWaardeidx = 0; kaartWaardeidx < kaartWaardes.length; kaartWaardeidx++ ) {
        let kaart = {
            kaartType: kaartTypes[kaartTypeidx],
            kaartWaarde: kaartWaardes[kaartWaardeidx]
        };
            kaartStapel.push( kaart ); 
    }
}
return kaartStapel;
};

function shuffleStapel(kaartStapel) {
    for (let i = 0; i < kaartStapel.length; i++) {
    let swapIdx = Math.trunc(Math.random() * kaartStapel.length);
    let tmp = kaartStapel[swapIdx];
    kaartStapel[swapIdx] = kaartStapel[i];
    kaartStapel[i] = tmp;
}

}
// kaartnaam mooi weergeven in een string
function kaartNaam(kaart){
    return kaart.kaartType + ' '  + kaart.kaartWaarde
    };

// volgende kaart trekken
function pakKaart(){
    return kaartStapel.shift();
}

// Score uitrekenen met een switch statement, loops en if statement

function getCardNumericValue(kaart) {
    switch(kaart.kaartWaarde){
        case 'Aas':
        return 1;
        case 'Twee':
        return 2;
        case 'Drie':
        return 3;
        case 'Vier':
        return 4;
        case 'Vijf':
        return 5;
        case 'Zes':
        return 6;
        case 'Zeven':
        return 7;
        case 'Acht':
        return 8;
        case 'Negen':
        return 9;
        default:
        return 10;
    }

   }

function getScore(kaartArray){
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < kaartArray.length; i++){
        let kaart = kaartArray[i];
        score += getCardNumericValue(kaart);
        if (kaart.kaartWaarde === 'Ace') {
            hasAce = true;
        }
    }
if (hasAce && score + 10 <= 21) {
    return score + 10;
}
return score;
    }

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(spelerCards);
}

function checkforEndOfGame() {

     updateScores();
    
     if (gameOver) {
         // dealer kaarten laten pakken
         while (dealerScore < playerScore
            && playerScore <= 21
            && dealerScore <= 21) {
                dealerCards.push(pakKaart());
                updateScores();
            }
        }
         if (playerScore > 21) {
         spelerWin = false;
         gameOver = true;
      }      
    else if (dealerScore > 21){
        spelerWin = true;
        gameOver = true;
    }
else if (gameOver){
    if (playerScore > dealerScore){
        spelerWin = true;
    } 
    else {spelerWin = false;}
}
}

// status van het spel weergeven
function showStatus() {
    if (!spelGestart) {
        kaartArea.innerText = "Ben je klaar om te beginnen met BlackJack?";
        return;
    }

let dealerCardsWeergave = '';
for (let i = 0; i < dealerCards.length; i++) {
    dealerCardsWeergave += kaartNaam(dealerCards[i]) + '\n';
}

let spelerCardsWeergave = '';
for (let i = 0; i < spelerCards.length; i++) {
    spelerCardsWeergave += kaartNaam(spelerCards[i]) + '\n';
}

updateScores();

kaartArea.innerText = 
'Dealer heeft :\n' +
dealerCardsWeergave +
'(score: '+ dealerScore + ') \n\n' +

'Speler heeft: \n' +
spelerCardsWeergave +
'(score: '+ playerScore + ')\n\n';

if (gameOver) {
    if(spelerWin) {
        kaartArea.innerText += "JIJ HEBT GEWONNEN!!";
    }
    else {
        kaartArea.innerText += "HELAAS! Dealer wint";
    }
    startButton.style.display = 'inline';
    hitButton.style.display = 'none';
    holdButton.style.display = 'none';
}}