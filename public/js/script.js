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

          var $card = $(`<li class="cardList">


          <div class="stock-card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-Name"> ${response.price.longName}</h5>
              <p class="card-symbol">${response.symbol}</p>
              <p class="card-stockPrice">${response.price.regularMarketChangePercent.fmt}</p>
              <p class="card-stockChangePercentage">${response.financialData.currentPrice.fmt}</p>
          
              <button href="#" class="btn btn-primary delete-stock" data-id="${response.symbol}">Delete</button>
              <button href="#" class="btn btn-primary save-stock" data-id="${response.symbol}">Save</button>
            </div>
          </div>
          
          
          </li>`);

          $($card).appendTo("ul");



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


