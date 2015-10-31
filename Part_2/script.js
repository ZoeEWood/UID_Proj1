/* Zoe Wood * Spotify Search * HW1 * October 8, 2015 */

$("#refresh").hide('fast');
$("#more").hide('fast');

var moreCount = 0; 
document.getElementById('more').onclick = function(){
	moreCount = moreCount + 1; 
	
	var track = $("input[name='track']").val(); 

	var artist = $("input[name='artist']").val(); 
 
	var album = $("input[name='album']").val(); 
	
	var genre = $("input[name='genre']").val(); 
	
	var year = $("input[name='year']").val(); 
	
	
	var req = 'http://api.spotify.com/v1/search?type=track&q='; 
	if(track !== ''){
		req = req + 'track:'
		req = req + encodeURIComponent(track);
		req = req + '%20'
	}
	if(artist !== ''){
		req = req + 'artist:'
		req = req + encodeURIComponent(artist);
		req = req + '%20'
	}
	if(album !== ''){
		req = req + 'album:'
		req = req + encodeURIComponent(album);
		req = req + '%20'
	}
	if(genre !== ''){
		req = req + 'genre:'
		req = req + encodeURIComponent(genre);
		req = req + '%20'
	}
	if(year !== ''){
		req = req + 'year:'
		req = req + encodeURIComponent(year);
		req = req + '%20'
	}
	req = req.substring(0, req.length-3);
	
	$.ajax({
		url: req,
		success: function(objJSON){ //replaced 'response' with 'objJSON'

			var i = null; 
			for(i = 10*moreCount; i < 10*moreCount + 10 && i < objJSON.tracks.items.length; i++){
				var track = objJSON.tracks.items[i];
				var button = '<p>' + '</p><iframe src="https://embed.spotify.com/?uri=' + track.uri + '" width="300" height="80" frameborder="0" allowtransparency="true"></iframe> ';
				if(objJSON.tracks.items.length === 0)
				{
					document.getElementById('out1').innerHTML = document.getElementById('out1').innerHTML + 'Sorry, your search matches no results. You can try another search, if you like!';
				}
				if(i%2 == 0){
					document.getElementById('out1').innerHTML = document.getElementById('out1').innerHTML + button;
				}
				else{
					document.getElementById('out2').innerHTML = document.getElementById('out2').innerHTML + button;
				}
			}
			
		}
	}); 
}

function scrollToElement(selector, time, verticalOffset) {
    time = typeof(time) != 'undefined' ? time : 1000;
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $(selector);
    offset = element.offset();
    offsetTop = offset.top + verticalOffset;
    $('html, body').animate({
        scrollTop: offsetTop
    }, time);           
}

var searchSpotify = function(query){

	var track = $("input[name='track']").val(); 

	var artist = $("input[name='artist']").val(); 
 
	var album = $("input[name='album']").val(); 
	
	var genre = $("input[name='genre']").val(); 
	
	var year = $("input[name='year']").val(); 
	
	
	var req = 'http://api.spotify.com/v1/search?type=track&limit=49&q='; 
	if(track !== ''){
		req = req + 'track:'
		req = req + encodeURIComponent(track);
		req = req + '%20'
	}
	if(artist !== ''){
		req = req + 'artist:'
		req = req + encodeURIComponent(artist);
		req = req + '%20'
	}
	if(album !== ''){
		req = req + 'album:'
		req = req + encodeURIComponent(album);
		req = req + '%20'
	}
	if(genre !== ''){
		req = req + 'genre:'
		req = req + encodeURIComponent(genre);
		req = req + '%20'
	}
	if(year !== ''){
		req = req + 'year:'
		req = req + encodeURIComponent(year);
		req = req + '%20'
	}
	req = req.substring(0, req.length-3);
	
	$.ajax({
		url: req,
		success: function(objJSON){ //replaced 'response' with 'objJSON'
			
			
			document.getElementById('out1').innerHTML = '';
			document.getElementById('out2').innerHTML = '';
			
			//load the first results
			var i = null; 
			for(i = 0; i < 10 && i < objJSON.tracks.items.length; i++){
				var track = objJSON.tracks.items[i];
				var button = '<p>' + '</p><iframe src="https://embed.spotify.com/?uri=' + track.uri + '" width="300" height="80" frameborder="0" allowtransparency="true"></iframe> ';
				if(i%2 == 0){
					document.getElementById('out1').innerHTML = document.getElementById('out1').innerHTML + button;
				}
				else{
					document.getElementById('out2').innerHTML = document.getElementById('out2').innerHTML + button;
				}
			}
			scrollToElement('#content', 400, 0); 
			$("#refresh").show('fast');
			$("#more").show('fast');
			
		}
	}); 
}; 

var audio = new Audio();
document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
	searchSpotify(document.getElementById('query').value);  
}, false);