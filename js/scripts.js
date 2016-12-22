$(document).ready(function(){

	// for all API calls:
	var apiBaseUrl = 'http://api.themoviedb.org/3';
	var imageBaseUrl = 'http://image.tmdb.org/t/p';

	const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key=' + apiKey;
	const discoverBaseUrl = apiBaseUrl + '/discover/movie?api_key=' + apiKey;
	const upcomingBaseUrl = apiBaseUrl + '/movie/upcoming?api_key=' + apiKey;
	getNowPlaying();

	$('.playing').click(function(){
		getNowPlaying();
		
	});

	function getNowPlaying(){
		$.getJSON(nowPlayingUrl, function(nowPlayingData){
			// console.log(nowPlayingData);
			// console.log(nowPlayingUrl);
			var nowPlayingHTML = '';
			for(let i = 0; i < nowPlayingData.results.length; i++){
				var title = nowPlayingData.results[i].original_title;
				var release = nowPlayingData.results[i].release_date;
				// console.log(release[0]);
				var year = release.slice(0,7);
				var poster = imageBaseUrl + '/w300' + nowPlayingData.results[i].poster_path;
				// console.log(poster);
				nowPlayingHTML += '<div class="movie-item col-sm-3" data-toggle="modal" data-target=".movie-modal">';
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
		});
	};

	$('.upcoming').click(function(){
		getUpcoming();
		// console.log('ok');
	});

	function getUpcoming(){
		$.getJSON(upcomingBaseUrl, function(upcomingData){
			// console.log(nowPlayingData);
			// console.log(upcomingUrl);
			var upcomingHTML = '';
			for(let i = 0; i < upcomingData.results.length; i++){
				var title = upcomingData.results[i].original_title;
				var release = upcomingData.results[i].release_date;
				// console.log(release[0]);
				var year = release.slice(0,7);
				var poster = imageBaseUrl + '/w300' + upcomingData.results[i].poster_path;
				// console.log(poster);
				upcomingHTML += '<div class="movie-item col-sm-3" data-toggle="modal" data-target=".movie-modal">';
					upcomingHTML += '<img src="' + poster + '">';
					upcomingHTML += '<div class="overlay">';
						upcomingHTML += '<div class="movie-title">';
							upcomingHTML += '<h2>' + title + '</h2>';
							upcomingHTML += '<h4>Released: ' + year + '<h4>';
						upcomingHTML += '</div>';
						upcomingHTML += '<div class="movie-rating text-center">';
							upcomingHTML += '';
						upcomingHTML += '</div>';
					upcomingHTML += '</div>';
				upcomingHTML += '</div>';
			}
			$('#movie-grid').html(upcomingHTML);
		});
	};

	var discoverUrl = discoverBaseUrl;

	$('.filter').click(function(){
		var lval = this.lval;
		console.log(this);
		discoverJSON(lval);
	});

	function discoverJSON(lval){
		$.getJSON(discoverUrl, function(discoverData){
			// console.log(discoverData);

			var discoverUrl = '';
			discoverUrl = discoverBaseUrl + lval;
			console.log(discoverUrl);
			var discoverHTML = '';
			for(let i = 0; i < discoverData.results.length; i++){
				var title = discoverData.results[i].original_title;
				var release = discoverData.results[i].release_date;
				// console.log(release[0]);
				var year = release.slice(0,7);
				var poster = imageBaseUrl + '/w300' + discoverData.results[i].poster_path;
				// console.log(poster);
				discoverHTML += '<div class="movie-item col-sm-3" data-toggle="modal" data-target=".movie-modal">';
					discoverHTML += '<img src="' + poster + '">';
					discoverHTML += '<div class="overlay">';
						discoverHTML += '<div class="movie-title">';
							discoverHTML += '<h2>' + title + '</h2>';
							discoverHTML += '<h4>Released: ' + year + '<h4>';
						discoverHTML += '</div>';
						discoverHTML += '<div class="movie-rating text-center">';
							discoverHTML += '';
						discoverHTML += '</div>';
					discoverHTML += '</div>';
				discoverHTML += '</div>';
			}
			$('#movie-grid').html(discoverHTML);
		});
	};

	$('.main-menu-tab').click(function(){
		animateMenu();
	});

	$('.movie-item').click(function(){
		$(this).attr();
		console.log()
	});

	// $('.movie-item::hover')
});

function animateMenu(){
	$('.main-menu').toggleClass('active');
	$('.main-menu-tab').toggleClass('active');
}