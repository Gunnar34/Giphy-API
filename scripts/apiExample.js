console.log( 'api example script sourced' );

$(document).ready(function(){

$(document).on('keydown', keyDownHandler);

$('#clear').on('click', function(){
  $('#outputDiv').empty();
});

$('#outputDiv').on('mouseleave', '.imgDiv', function(){
  $(this).find(':button').hide();
    }).on('mouseenter', '.imgDiv', function(){
        $(this).find(':button').show();
});

$('#showFavorites').on('click', function(){
  $('#outputDiv').hide();
  $('#input').hide();
  $('#searchNow').hide();
  $('#showFavorites').hide();
  $('#favoritesDiv').show();
  $('#showSearchResults').show();
  $('#clear').hide();
});

$('#showSearchResults').on('click', function(){
  $('#outputDiv').show();
  $('#input').show();
  $('#searchNow').show();
  $('#showFavorites').show();
  $('#favoritesDiv').hide();
  $('#showSearchResults').hide();
  $('#clear').show();
});

$('#outputDiv').on('click', '.favorite', function(){
  var imgArray = ($(this).siblings('img'));
  console.log(imgArray);
  var imgURL = imgArray[0].currentSrc;
  var $div = $("<div class ='imgDiv favImgDiv'>");
  $div.append('<img src=' + imgURL + '>');
  $div.append('<button class="remove">Remove</button>');
  $('#favoritesDiv').prepend($div);
  $(this).remove();
});

function keyDownHandler(e) {
    if(e.keyCode == 13) {
      searchGiffy();
    }}


$('body').on('click', '.imgDiv > .remove', function(){
  console.log('remove');
  $(this).parent().remove();
});

$('#searchNow').on( 'click', searchGiffy);

function searchGiffy(){
  // assemble search URL
  var searchItem = $('#input').val();
  var searchURL = 'http://api.giphy.com/v1/gifs/search?q=' + searchItem + '&api_key=dc6zaTOxFJmzC';
  // make ajax call to Giphy to retrieve JSON
  if (searchItem === ''){
    $('#input').attr('placeholder', 'please enter a search');
  }
  else {
    $.ajax({
      url: searchURL,
      dataType: 'JSON',
      success: function( response ){
          var divCounter = 0;
        // successfully hit API
        console.log( 'successful API hit:', response );
        // console.log('url', response.data[0].images.downsized.url);
        if (response.data.length === 0){
          var $div = $("<div class ='imgDiv'>");
          console.log('why wont you append');
          $('#outputDiv').prepend($div);
          $div.append('<img src="http://media0.giphy.com/media/GDnomdqpSHlIs/giphy.gif" >');
          $div.append('<button class="remove">Remove</button>');
          $div.append('<button class="favorite">favorite</button>');
          $('#input').attr('placeholder', 'Sorry we have no matching Gifs');
        }
        else {
          for (var i = 0; i < response.data.length; i++) {
            var $div = $("<div class ='imgDiv'>");
            $div.append('<img src=' + response.data[i].images.downsized.url + '>');
            $div.append('<button class="remove">Remove</button>');
            $div.append('<button class="favorite">favorite</button>');
            // $div.append()
            $('#outputDiv').prepend($div);
            $('#input').attr('placeholder', 'Search Giphy');
          }
     }
     //end of for loop
     $('#input').val('');
    //  $('#input').attr('placeholder', 'Search Giphy');
     //clear input field

      } // end success
    }); //end ajax
}
} // end click on search button

});
