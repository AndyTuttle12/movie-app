$(document).ready(function(){

	// for all API calls:
	var apiBaseUrl = 'http://api.themoviedb.org/3';
	var imageBaseUrl = 'http://image.tmdb.org/t/p';

	const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key=' + apiKey;
	const discoverUrl = apiBaseUrl + '/discover/movie?api_key=' + apiKey;

	$.getJSON(nowPlayingUrl, function(nowPlayingData){
		// console.log(nowPlayingData);
		var nowPlayingHTML = '';
		for(let i = 0; i < nowPlayingData.results.length; i++){
			var title = nowPlayingData.results[i].original_title;
			var release = nowPlayingData.results[i].release_date;
			// console.log(release[0]);
			var year = release.slice(0,7);
			var poster = imageBaseUrl + '/w300' + nowPlayingData.results[i].poster_path;
			// console.log(poster);
			nowPlayingHTML += '<div class="movie-item col-sm-3">';
				nowPlayingHTML += '<img src="' + poster + '">';
				nowPlayingHTML += '<div class="overlay">';
					nowPlayingHTML += '<div class="movie-title">';
						nowPlayingHTML += '<h2>' + title + '</h2>';
						nowPlayingHTML += '<h4>Released: ' + year + '<h4>';
					nowPlayingHTML += '</div>';
					nowPlayingHTML += '<div class="movie-rating text-center">';
						nowPlayingHTML += '';
					nowPlayingHTML += '</div>';
				nowPlayingHTML += '</div>';
			nowPlayingHTML += '</div>';
		}
		$('#movie-grid').html(nowPlayingHTML);
	})

	$.getJSON(discoverUrl, function(discoverData){
		console.log(discoverData);
	});


	$('.main-menu-tab').click(function(){
		animateMenu();
	});



	// $('.movie-item::hover')
});

function animateMenu(){
	$('.main-menu').toggleClass('active');
	$('.main-menu-tab').toggleClass('active');
}