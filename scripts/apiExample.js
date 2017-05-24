console.log( 'api example script sourced' );

$( document ).on( 'click', '#searchNow', function(){
  // assemble search URL
  var searchItem = $('#input').val();
  var searchURL = 'http://api.giphy.com/v1/gifs/search?q=' + searchItem + '&api_key=dc6zaTOxFJmzC';
  // make ajax call to Giphy to retrieve JSON
  if (searchItem === ''){
    alert('No search Item');
  }
  else {
    $.ajax({
      url: searchURL,
      dataType: 'JSON',
      success: function( response ){
        // successfully hit API
        console.log( 'successful API hit:', response );
        console.log('url', response.data[0].images.downsized.url);
     for (var i = 0; i < response.data.length; i++) {
       $('#outputDiv').append('<img src=' + response.data[i].images.downsized.url + '>');
     }

      } // end success
    }); //end ajax
}
}); // end click on search button
