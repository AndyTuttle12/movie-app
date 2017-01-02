// for all API calls:
	var apiBaseUrl = 'http://api.themoviedb.org/3';
	var imageBaseUrl = 'http://image.tmdb.org/t/p';
	var tmsBaseUrl = 'http://data.tmsapi.com/v1.1';

	const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key=' + apiKey;
	const discoverBaseUrl = apiBaseUrl + '/discover/movie?api_key=' + apiKey;
	const upcomingBaseUrl = apiBaseUrl + '/movie/upcoming?api_key=' + apiKey;
	const detailsUrl = apiBaseUrl + '/movie/' + currentID + '?api_key=' + apiKey;
	const tmsUrl = tmsBaseUrl + '/movies/showings?startDate="' +  + '"&zip="' +  + '"&api_key=' + tmsApiKey;

	var movieIDArr = [];
	var currentID = 0;

	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var numMonths = ['01','02','03','04','05','06','07','08','09','10','11','12'];

	var nowPlayingHTML = '';
	var upcomingHTML = '';
	var discoverHTML = '';

$(document).ready(function(){

	

	
	getNowPlaying();


	$('.playing').click(function(){
		getNowPlaying();
		
	});

	function getNowPlaying(){
		$.getJSON(nowPlayingUrl, function(nowPlayingData){
			// console.log(nowPlayingData);
			// console.log(nowPlayingUrl);
			movieIDArr = [];
			nowPlayingHTML = '';
			for(let i = 0; i < nowPlayingData.results.length; i++){
				var title = nowPlayingData.results[i].original_title;
				var release = nowPlayingData.results[i].release_date;
				var protoDate = new Date(release);
				var day = (protoDate.getDate(release)+1);
				var month = months[protoDate.getMonth(release)];
				var year = (protoDate.getFullYear(release));
				var poster = imageBaseUrl + '/w300' + nowPlayingData.results[i].poster_path;
				var nowPlayingID = nowPlayingData.results[i].id;
				movieIDArr.push(nowPlayingID);
				// console.log(movieIDArr);

				nowPlayingHTML += '<div class="movie-item col-sm-3" id="' + nowPlayingID + '" data-toggle="modal" data-target=".movie-modal" onclick="updateModal(this);">';
					nowPlayingHTML += '<img src="' + poster + '">';
					nowPlayingHTML += '<div class="overlay">';
						nowPlayingHTML += '<div class="movie-title">';
							nowPlayingHTML += '<h2>' + title + '</h2>';
							nowPlayingHTML += '<h4>Released: ' + month + ' ' + day + ', ' + year + '<h4>';
						nowPlayingHTML += '</div>';
						nowPlayingHTML += '<div class="movie-rating text-center">';
							nowPlayingHTML += '';
						nowPlayingHTML += '</div>';
					nowPlayingHTML += '</div>';
				nowPlayingHTML += '</div>';

				setTimeout(function(){
					$('#movie-grid').html(nowPlayingHTML);
					// $('.movie-item').addClass('view');
				}, 200);
			}
			
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
			movieIDArr = [];
			upcomingHTML = '';
			for(let i = 0; i < upcomingData.results.length; i++){
				var title = upcomingData.results[i].original_title;
				var release = upcomingData.results[i].release_date;
				var protoDate = new Date(release);

				var day = (protoDate.getDate(release)+1);
				var month = months[protoDate.getMonth(release)];
				var year = (protoDate.getFullYear(release));
				var poster = imageBaseUrl + '/w300' + upcomingData.results[i].poster_path;
				var upcomingID = upcomingData.results[i].id;
				movieIDArr.push(upcomingID);
				// console.log(movieIDArr);
				// console.log(poster);
				upcomingHTML += '<div class="movie-item col-sm-3" id="' + upcomingID + '" data-toggle="modal" data-target=".movie-modal" onclick="updateModal(this);">';
					upcomingHTML += '<img src="' + poster + '">';
					upcomingHTML += '<div class="overlay">';
						upcomingHTML += '<div class="movie-title">';
							upcomingHTML += '<h2>' + title + '</h2>';
							upcomingHTML += '<h4>Release Date: ' + month + ' ' + day + ', ' + year + '<h4>';
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
		var linkVar = $(this).attr('lval');
		// console.log(this);
		discoverJSON(linkVar);
	});

	function discoverJSON(linkVar){
		$.getJSON(discoverUrl, function(discoverData){
			// console.log(discoverData);
			movieIDArr = [];
			var discoverUrl = '';
			discoverUrl = discoverBaseUrl + linkVar;
			// console.log(discoverUrl);

			discoverHTML = '';
			for(let i = 0; i < discoverData.results.length; i++){
				var title = discoverData.results[i].original_title;
				var release = discoverData.results[i].release_date;
				var protoDate = new Date(release);

				var day = (protoDate.getDate(release)+1);
				var month = months[protoDate.getMonth(release)];
				var year = (protoDate.getFullYear(release));
				// console.log(release[0]);
				var poster = imageBaseUrl + '/w300' + discoverData.results[i].poster_path;
				var discoverID = discoverData.results[i].id;
				movieIDArr.push(discoverID);
				// console.log(movieIDArr);
				discoverHTML += '<div class="movie-item col-sm-3" id="' + discoverID + '" data-toggle="modal" data-target=".movie-modal" onclick="updateModal(this);">';
					discoverHTML += '<img src="' + poster + '">';
					discoverHTML += '<div class="overlay">';
						discoverHTML += '<div class="movie-title">';
							discoverHTML += '<h2>' + title + '</h2>';
							discoverHTML += '<h4>' + month + ' ' + year + '<h4>';
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

	// $('*').click(function(){
	// 	// $(this).attr();
	// 	// updateModal(this.id);
	// 	console.log(this);
	// });
	
	
	// updateModal();

});

function animateMenu(){
	$('.main-menu').toggleClass('active');
	$('.main-menu-tab').toggleClass('active');
}

function updateModal(thisMovie){
	// console.log(thisMovie);
	currentID = 0;
	currentID = $(thisMovie).attr('id');
	// console.log(currentID);
	var currentUrl = apiBaseUrl + '/movie/' + currentID + '?api_key=' + apiKey;

	var posterHTML = '';
	var titleHTML = '';
	var infoHTML = '';
	var ratingHTML = '';
	var backdropHTML = '';
	var ticketsHTML = '';
	// console.log(currentUrl);
	$.getJSON(currentUrl, function(detailsData){
		// console.log(detailsData);
		
		var zip = 30075;
		var title = detailsData.original_title;
		var release = detailsData.release_date;
		var protoDate = new Date(release);
		var today = new Date();
		var apiDate = today.toJSON().slice(0,10);
		var day = (protoDate.getDate(release)+1);
		var month = months[protoDate.getMonth(release)];
		var year = protoDate.getFullYear(release);
		var poster = imageBaseUrl + '/w300' + detailsData.poster_path;
		var backdrop = imageBaseUrl + '/w600' + detailsData.backdrop_path;
		var description = detailsData.overview;
		var runTime = detailsData.runtime;
		var webSite = detailsData.homepage;
		var ratingAvg = detailsData.vote_average;
		var ratingCount = detailsData.vote_count;
		var genre = '';
		var genreArray = [];
		var currentRootId = '';
		var currentTmsId = '';

		const tmsUrl = tmsBaseUrl + '/movies/showings?startDate=' + apiDate + '&zip=' + zip + '&api_key=' + tmsApiKey;

		$.getJSON(tmsUrl, function(tmsData){
			// console.log(tmsData);
			for(let i = 0; i < tmsData.length; i++){
				var tmsTitle = tmsData[i].title;
				if(tmsTitle == title){
					currentRootId = tmsData[i].rootId;
					currentTmsId = tmsData[i].tmsId;
				}
			}
		});



		for(let i = 0; i < detailsData.genres.length; i++){
			genre = detailsData.genres[i].name;
			genreArray.push(genre);
		}
		for(let i = 0; i < genreArray.length; i++){
			var visGenre = genreArray.join(', ');
		}
		
		// console.log(detailsData);
		// console.log(visGenre);
		// currentID = movieIDArr[this];
		backdropHTML += '<img src="' + backdrop +'">';
		
		posterHTML += '<img src="' + poster + '">';

		titleHTML += '<h1 id="title-text">' + title + '</h1>';
		titleHTML += '<hr/>';
		titleHTML += '<p id="desc">' + description + '</p>';
		titleHTML += '<p id="desc"><span>Release Date: ' + month + ' ' + day + ', ' + year + '</span></p>';
		titleHTML += '<p>';
			titleHTML += '<span id="run-time">Length: ' + runTime + ' minutes &nbsp; &nbsp; </span>';
			titleHTML += '<span id="modal-genre">Genres: ' + visGenre + '</span>';
		titleHTML += '</p';

		infoHTML += '<p>';
		infoHTML += '<span id="web-site"><a href="' + webSite + '" target="_blank">Visit the Website Here</a><span id="trailer"> </span>';
		infoHTML += '</p>';

		ratingHTML += '<div>';
			ratingHTML += '<div id="stars">';
				ratingHTML += 'Rating: &nbsp; <div class="star-ratings">';
					ratingHTML += '<div class="star-ratings-top" style="width: ' + (ratingAvg * 10) + '%"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>';
					ratingHTML += '<div class="star-ratings-bottom"><span>&#9734;</span><span>&#9734;</span><span>&#9734;</span><span>&#9734;</span><span>&#9734;</span></div>';
				ratingHTML += '</div>';
				ratingHTML += ' &nbsp; &nbsp; (' + ratingCount + ' reviews) &nbsp; | &nbsp; Favorite: <i id="heart" class="fa fa-heart-o" aria-hidden="true"></i>';
			ratingHTML += '</div>';
		ratingHTML += '</div>';
		// console.log(protoDate.getTime());
		// console.log(Date.now() - 3888000000);
		if(protoDate.getTime() > (Date.now() - 3888000000)){
			ticketsHTML += '<div class="col-sm-4 text-center">';
				ticketsHTML += '<a href="http://www.fandango.com/moviesintheaters" target="_blank" id="tickets-button" class="btn btn-lg btn-primary"><img width="30px" src="fandango-icon.png"> Get Tickets</a>';
			ticketsHTML += '</div>';
		}

		var savedFavorite = localStorage.getItem('favorite');
		// console.log(savedFavorite);
		if(savedFavorite == null){
			savedFavorite = "";
		}
		var savedArray = savedFavorite.split(',');
		// console.log(savedArray);
		
		for(let i = 0; i < savedArray.length; i++){
			if(savedArray[i] == currentID){
				// console.log(currentID);
				
				$('#heart').toggleClass('fa fa-heart');
				$('#heart').removeClass('fa fa-heart-o');
			}
		}
		$('#main-content').html(backdropHTML);
		$('#movie-poster').html(posterHTML);
		$('.modal-movie-title').html(titleHTML);
		$('#trailer').html(infoHTML);
		$('#movie-rating').html(ratingHTML);
		$('.tickets').html(ticketsHTML);

		$('#heart').click(function(){
			$('#heart').toggleClass('fa fa-heart');
			$('#heart').toggleClass('fa fa-heart-o');
			var favArray = [];
			var old = localStorage.getItem('favorite');
			console.log(old);
			console.log(currentID);
			
		    if(old === null){
		    	localStorage.setItem('favorite', currentID);
		    	old = localStorage.getItem('favorite');
		    	favArray.push(old);
		    	console.log(favArray);
		    }else if(old === currentID){
		    	localStorage.removeItem('favorite');
		    	console.log(favArray);
		    }else{
		    	console.log('please work');
		    	favArray.push(old);
		    	console.log(favArray);
		    	for(let i = 0; i < favArray.length; i++){
					console.log(favArray);
					if(favArray[i] == currentID){
						removeFromStorage('favorite', currentID);
						console.log('I was removed');
						break;
					}
				}
				for(let i = 0; i < favArray.length; i++){
					if(favArray[favArray.length-1] !== currentID){
						console.log('I need to be added');
						appendToStorage('favorite', currentID);
					}
				}
		    }
			

			function appendToStorage(name, data){ 
				console.log(old);
			    localStorage.setItem(name, old + ',' + data);
			}
			function removeFromStorage(name, data){
			    favArray.push(old.split(','));
			    // console.log(favArray);
			    for(let i = 0; i < favArray.length; i++){
			    	if(favArray[i] == currentID){
			    		favArray.splice(i,1);
			    	}
			    }
			    var favString = favArray.join();
			    localStorage.setItem('favorite', favString);
			    console.log(favString);
			}
			
		});
	});
}

function showFavorites(favorite){
	$.getJSON(favoritesUrl, function(favoritesData){

	});
}

