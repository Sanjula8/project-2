$(function(){
// $("#selector option:selected");
  $(".stock-search").on("click", function(event) {
    event.preventDefault();

    const selected = $("#stockSymbols").val();


    // $($( ".cardList" ).attr('id', response.price.longName).clone().toArray().pop()).appendTo( $( "#stockcardDeck" ) );

    $.ajax({
      url: "/api/stock/",
      type: "POST",
      data: {data: selected}
    })
      .then(
        function(response) {
          $($( ".cardList" ).clone().toArray().pop()).appendTo( $( "#stockcardDeck" ) ).attr("id", response.price.longName);
          
          // console.log($( ".cardList" ).attr("id", response.price.longName));

          console.log("woot:", response.price.longName);
          $(".card-Name").text(response.price.longName);
        //   console.log("woot:", response.defaultKeyStatistics.lastSplitFactor);
        //   $("#thing").text(response.defaultKeyStatistics.lastSplitFactor);
        } 
      );
    
    // var newStock = {name: $(".stock-search").val().trim(),};
   
    // $.ajax("/api/associateStock/", {
    //   type: "POST",
    //   data: newStock,
    // }).then(
    //   function() {
    //     location.reload();
    //     //If it all works, console log displays
    //     console.log("Search button works!" + newStock);
    //   });
  });

  $(".delete-stock").on("click", function() {
    var id = $(this).data("id");

    $.ajax("/api/stocks/" + id, {
      type: "DELETE",
    }).then(
      function() {
        console.log(id + "deleted");
        location.reload();
      }
    );
  });
  
  $(document).ready(function() {
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.email);
    });
  });  
});


