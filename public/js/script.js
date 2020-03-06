$(function(){
  $(".stock-search").on("click", function(event) {
    event.preventDefault();

    const selected = $("#stockSymbols").val();
    $.ajax({
      url: "/api/stock/",
      type: "POST",
      data: {data: selected}
    })
      .then(
        function(response) {

          var $card = $(`<div class="cardList">


          <div class="stock-card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-Name"> Company Name: ${response.price.longName}</h5>
              <p class="card-symbol">Stock Symbol: ${response.symbol}</p>
              <p class="card-stockPrice">Stock Change: ${response.price.regularMarketChangePercent.fmt}</p>
              <p class="card-stockChangePercentage">Stock Price: $${response.financialData.currentPrice.fmt}</p>
          
              <button href="#" class="btn btn-primary delete-stock" data-name="${response.price.longName}" data-symbol="${response.symbol}">Delete</button>
              <button href="#" class="btn btn-primary save-stock" data-name="${response.price.longName}" data-symbol="${response.symbol}">Save</button>
            </div>
          </div>
          
          
          </div>`);

          $($card).appendTo("section");
        }); 
    $(".delete-stock").on("click", function() {
      var id = $(this).data(response.symbol);
      console.log(id);
      $.ajax("/api/stocks/" + id, {
        type: "DELETE",
      }).then(
        function() {
          // location.reload();
          console.log(id);
        }
      );
    });
  } 
  );


  $(document).on("click", ".save-stock", function() {
    var newStock = {
      stockName: $(this).attr("data-name"),
      stockSymbol: $(this).attr("data-symbol")
    };

    $.ajax("/stock/create", {
      type: "POST",
      data: newStock
    }).then(function(data){
    //   location.reload();
      console.log(data);
      console.log("test");
    });

  });



  $(document).ready(function() {
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.email);
    });
  });
});  