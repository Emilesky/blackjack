//
// This is my first real app (BlackJack) by Emile Ramlal
//

let kaartType = ['Harten', 'Ruiten', 'Klaver', 'Schoppen']
    kaartWaarde = ['Aas', 'Koning', 'Koningin', 'Boer', 
    'Twee', 'Drie', 'Vier', 'Vijf', 'Zes', 'Zeven', 'Acht', 'Negen', 'Tien' 
];
 
let kaartStapel = [];
for ( let kaartTypeidx = 0; kaartTypeidx < kaartType.length; kaartTypeidx++ ) {
    for ( let kaartWaardeidx = 0; kaartWaardeidx < kaartWaarde.length; kaartWaardeidx++ ) {
    kaartStapel.push( kaartType[kaartTypeidx] + " " + kaartWaarde[kaartWaardeidx] ); 
    }
}
for (i = 0 ; i < kaartStapel.length; i++) {
    console.log(kaartStapel[i])
}
if (5 === 5) {
    console.log("oh yeah");
}
if (5 === "5") {
    console.log("no way!");
}
let score = 1700;
    if(score >= 1000) {
score = score + 250
        console.log("je verdient een bonus! Je nieuwe bedrag is:", score)
    }
    else {
        console.log("Geen wanhoop je huidige bedrag in portefeuille is", score );
    }
   