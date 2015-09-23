  $(document).ready(function(){

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
// Card Types
CardType = {
  Hearts: 0,
  Spades: 1,
  Clubs: 2,
  Diamonds: 3
  };

});
