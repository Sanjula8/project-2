$(function(){
  $(".stock-search").on("submit", function(event) {
    event.preventDefault();
    
    var newStock = {name: $(".stock-search").val().trim(),};
   
    $.ajax("/api/stocks/", {
      type: "POST",
      data: newStock,
    }).then(
      function() {
        location.reload();
        //If it all works, console log displays
        console.log("Search button works!" + newStock);
      });
});

  $(".delete-stock").on("click", function(event) {
    var id = $(this).data("id");

    $.ajax("/api/stocks/" + id, {
      type: "DELETE",
    }).then(
      function() {
        //If it all works, console log displays
        console.log("Delete button works!");
        console.log(id + "deleted");
        location.reload();
      }
    );
  });

});