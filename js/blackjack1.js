function BlackJack(){
  this.reset();
}

BlackJack.prototype = {
  deck: [],
  dHand: {},
  pHand: {},
  bank: 100,
  pot: 0,
  betting: true,
  deal: false,
  handOver: false,
  playerTurn: false,
  result: "",

  reset: function() {
    this.deck = this.shuffle();
    this.dHand = {val: 0, soft: 0, cards: 0};
    this.pHand = {val: 0, soft: 0, cards: 0};
    this.pot = 0;
    this.playerTurn = false;
    this.betting = true;
    this.handOver = false,
    this.result = "Please bet to start the game!";
  },

  shuffle: function(){
    //Fisher-Yates inside out shuffle
    var deck = [];
    for (var i = 0; i < 52; i++){
      var j = Math.floor(Math.random() * i);
      if (j != i){deck[i] = deck[j];}
      deck[j] = i;
    }
    return deck;
  },

  bet: function(amount){
    if (amount > this.bank){
      return false;
    }
    this.pot += amount * 2;
    this.bank -= amount;
  },

  settle: function(){
    this.handOver = true;

    if(this.checkBust(this.pHand)){
      this.textOut = "Dealer wins!";
      return;
    }
    if(this.checkBust(this.dHand)){
      var payout = this.pot;
      this.bank += this.pot;
      this.textOut = ("Dealer busts! You win with "+ this.pHand.val +"! Payout: $" + payout);
      return;
    }
    if(this.pHand.val > this.dHand.val){
      var payout = this.pot
      this.bank += this.pot;
      this.textOut = ("You win with "+ this.pHand.val +" to " + this.dHand.val + "! Payout: $" + payout);
      return
    }
    if(this.pHand.val < this.dHand.val){
      this.textOut = ("Dealer wins with " + this.dHand.val + " to " + this.pHand.val +"!");
      return
    }
    if (this.pHand.val === this.dHand.val){
      this.bank += (this.pot / 2);
      this.textOut = "Push";
      return;
    }
  },

  drawCard: function(player) {
    var card = this.deck.pop();
    var val = this.cardValue(card);
    player.val += val;
    if (val === 11){player.soft++;}
    player.cards++;
    return card;
  },

  cardValue: function(card){
    var val = Math.floor(card / 4) + 1;
    if (val == 1){val = 11;}
    else if (val > 10){val = 10;}
    return val;
  },
  checkBust: function(player){
    if (player.val > 21){
      if(player.soft > 0){
        player.val -= 10;
        player.soft--;
        return this.checkBust(player);
      }
      else{return true;}
    }
    else{return false;}
  }
}//
