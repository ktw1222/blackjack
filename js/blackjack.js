  $(document).ready(function(){
  var bet;
  var betInput = $(".betAmount");

//buttons
  var startButton = $("#start");
  var hitButton = $("#hit");
  var standButton = $("#stand");
  var resetButton = $("reset");

// game entry by age
  var age=21;
  var yesButton = $("#yes");
  var noButton = $("#no");

  yesButton.on("click", function(){
    $("div.yes").html("** Welcome!! Let's have fun! Proceed with GAME section **")
  });
  noButton.on("click", function(){
      $("div.no").html("**You are not allowed to play!! Please close the window!**")
  });

  startButton.on("click", function(){
    cardDeal();
  });

  hitButton.on("click", function() {
	   hitMe();
  });

  resetButton.on("click", function(){
      resetTable();
  });

// Card Types
CardType = {
  Hearts: 0,
  Spades: 1,
  Clubs: 2,
  Diamonds: 3
};

// Deck of 52 Cards initialization
function cardDeck(){
	var deckOfCards = new Array();
	var cardId = 0;
	var types = CardType;

	for (var typeValue in types) {
		for (numberValue = 1; numberValue <= 13; numberValue++) {
			deckOfCards[cardId] = {type:typeValue, number:numberValue};
			cardId++;
		}
	}
	return deckOfCards;
};

function shuffle(myDeckOfCards) {
	var theLength = myDeckOfCards.length - 1; //52 - 1 = 51

        for (i = theLength; i > 0; i--) {
            toSwap = Math.floor(Math.random() * i); // random card's index or id
            tempCard = myDeckOfCards[i]; // currently last card
            myDeckOfCards[i] = myDeckOfCards[toSwap];
            myDeckOfCards[toSwap] = tempCard;
        }
        //console.log("Cards after shuffle: "+cards);
        //drawCards();

		return myDeckOfCards;
    }

var shuffledDeck;
var currentCardIndex;
var playerSlot;
var dealerSlot;
var bjTable = document.getElementById('playTable');
var playerPoints_low;
var playerPoints_high;
var dealerPoints_low;
var dealerPoints_high;



function init() {
	/* initial */
	var newDeck = cardDeck();
	shuffledDeck = shuffle(newDeck);
	currentCardIndex = 0;
	playerSlot = 0;
	dealerSlot = 0;
	playerPoints_low = 0;
	playerPoints_high = 0;
	dealerPoints_low = 0;
	dealerPoints_high = 0;

}

function calculatePoints(currentPoint, newCardNumber) {
	if (newCardNumber == 1) {
		currentPoint = currentPoint + 1;
	} else if (shuffledDeck[currentCardIndex].number > 9) {
		currentPoint = currentPoint + 10;
	} else {
		currentPoint = currentPoint + newCardNumber;
	}

	return currentPoint;


}



// deal the card
function cardDeal(){

	init();

	// player gets first card
	playerPoints_low = calculatePoints(playerPoints_low, shuffledDeck[currentCardIndex].number);
	playerPoints_high = calculatePoints(playerPoints_high, shuffledDeck[currentCardIndex].number);
	bjTable.rows[2].cells[playerSlot++].innerHTML = shuffledDeck[currentCardIndex].number + ' of ' + shuffledDeck[currentCardIndex].type;
	currentCardIndex++; // next card

	// dealer gets second card
	dealerPoints_low = calculatePoints(dealerPoints_low, shuffledDeck[currentCardIndex].number);
	dealerPoints_high = calculatePoints(dealerPoints_high, shuffledDeck[currentCardIndex].number);
	bjTable.rows[1].cells[dealerSlot++].innerHTML = shuffledDeck[currentCardIndex].number + ' of ' + shuffledDeck[currentCardIndex].type;
	currentCardIndex++; // next card

	// player gets third card
	playerPoints_low = calculatePoints(playerPoints_low, shuffledDeck[currentCardIndex].number);
	playerPoints_high = calculatePoints(playerPoints_high, shuffledDeck[currentCardIndex].number);
	bjTable.rows[2].cells[playerSlot++].innerHTML = shuffledDeck[currentCardIndex].number + ' of ' + shuffledDeck[currentCardIndex].type  + ' and the point is ' + playerPoints_low;
	currentCardIndex++; // next card

	// dealer gets fourth card
	dealerPoints_low = calculatePoints(dealerPoints_low, shuffledDeck[currentCardIndex].number);
	dealerPoints_high = calculatePoints(dealerPoints_high, shuffledDeck[currentCardIndex].number);
	bjTable.rows[1].cells[dealerSlot++].innerHTML = shuffledDeck[currentCardIndex].number + ' of ' + shuffledDeck[currentCardIndex].type  + ' and the point is ' + dealerPoints_low;
	currentCardIndex++; // next card


}; //end of cardDeal

function hitMe() {
	// player gets another card
	playerPoints_low = calculatePoints(playerPoints_low, shuffledDeck[currentCardIndex].number);
	playerPoints_high = calculatePoints(playerPoints_high, shuffledDeck[currentCardIndex].number);
	bjTable.rows[2].cells[playerSlot++].innerHTML = shuffledDeck[currentCardIndex].number + ' of ' + shuffledDeck[currentCardIndex].type   + ' and the point is ' + playerPoints_low;
	currentCardIndex++; // next card

	// since you have five slots only, your code will break if you hit more than 3 times with your current implmentation
	// you need a way to check your current point 1 = 1 or 11, 10,j,q,k are all 10, others are as they are`
	// you need a way to check if you are busted (over 21) or not
}

function stay() {}




function resetTable(){

}
}) //document.ready


  //
  // // card deck
  // var full_deck = [];
  // var deck = function() {
  //     for (var i = 1; i <= 52; i++) {
  //        full_deck.push(i);
  //       }

//
//   // shuffle the card deck
//       // Fisher-Yates shuffle
//       function shuffle(full_deck) {
//         var m = full_deck.length, t, i;
//         // While there remain elements to shuffle…
//         while (m) {
//         // Pick a remaining element
//           i = Math.floor(Math.random() * m--);
//         // And swap it with the current element
//           t = full_deck[m];
//           full_deck[m] = full_deck[i];
//           full_deck[i] = t;
//         };
//
//         return full_deck;
//
//       // this.shuffle = function () {
//       //     var i,j,x;
//       //     for (i = full_deck.length -1; i > 0; i--) {
//       //         j = Math.floor(Math.random()*i);
//       //         x = full_deck[i];
//       //         full_deck[i] = full_deck[j];
//       //         full_deck[j] = x;
//       //     }
//       // };
//
//       this.getNewCard = function() {
//           var card_number = full_deck.pop();
//           var val = card_number % 13 + 1;
//           var suit = Math.ceil(card_number/ 13);
//           return new Card(suit, val);
//       }
//   }
// } //end of deck function
//
//   function dealCard() {
//     return full_deck.getNewCard();
//   }
//
//     var Hand = function () {
//       var my_hand = [];
//       my_hand.push(dealCard());
//       my_hand.push(dealCard());
//
//       this.getHand = function(){
//           return my_hand;
//       };
//       this.score = function(){
//           var i,x;
//           var sum = 0;
//           var aces = 0;
//           for (i = 0; i < my_hand.length; i++) {
//               x = my_hand[i].getValue();
//               if (x === 11) {
//                   aces++;
//                   sum++; // Lowest value of an ace
//               }
//               else { sum += x; }
//           }
//           while (sum < 21 && aces > 0) {
//               // Calulate based on 10 since a 1 was already
//               // added above as a minimum for an ace.
//               if (sum + 10 <= 21) {
//                   sum += 10;
//                   aces--;
//               }
//               else { break; }
//           }
//           return sum;
//       }
//     }
//   }) // closing
//
//
//

// //   var card = function(suit, number) {
// //
// //     this.getSuit = function(){
// //       return suit;
// //      };
// //     this.getNumber = function(){
// //       return number;
// //     };
// //     this.getSuitStr = function() {
// //       if (suit == 1){
// //         return "diamonds";
// //       } else if (suit == 2){
// //         return "hearts";
// //       } else if (suit == 3){
// //         return "spades";
// //       } else if (suit == 4){
// //         return "clubs";
// //       } else {
// //         return "wrong value" + suit;
// //       }
// //     }
// //     this.getValueStr = function(){
// //       if (number == 1){
// //         return "Ace";
// //       } else if (number == 11){
// //         return "Jack";
// //       } else if (number == 12){
// //         return "Queen";
// //       } else if (number == 13){
// //         return "King";
// //       } else {
// //         return "" + number;
// //       }
// //     };
// //     this.getValue = function() {
// //           if (number == 1) {
// //             return 11;
// //          } else if (card_number >= 10) {
// //             return 10;
// //          } else {
// //            return card_number;
// //          }
// //       }
// //   };
