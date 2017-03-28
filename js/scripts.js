// for all API calls:
	var apiBaseUrl = 'http://api.themoviedb.org/3';
	var imageBaseUrl = 'http://image.tmdb.org/t/p';
	var tmsBaseUrl = 'http://data.tmsapi.com/v1.1';
	var currentBaseUrl = '';
	var placeholderImage = './placeholder.jpg';
	var currentPage = 1;
	var currentFilter = 'popular';
	var movieIDArr = [];
	var mpaaArr = [];
	var currentMpaa = 'NR';
	var currentID = 0;
	var today = new Date();
	var apiDate = today.toJSON().slice(0,10);
	var zip = 30350;
	var currentQuery = '';
	var searchQuery = '';
	var nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key=' + apiKey + '&region=US' + '&page=' + currentPage;
	var searchMoviesUrl = apiBaseUrl + '/search/movie?api_key=' + apiKey + '&query=' + searchQuery + '&region=US' + '&page=' + currentPage;
	var discoverBaseUrl = apiBaseUrl + '/discover/movie?api_key=' + apiKey + '&page=' + currentPage;
	var upcomingBaseUrl = apiBaseUrl + '/movie/upcoming?api_key=' + apiKey + '&region=US' + '&page=' + currentPage;
	var detailsUrl = apiBaseUrl + '/movie/' + currentID + '?api_key=' + apiKey;
	var tmsUrl = tmsBaseUrl + '/movies/showings?startDate=' + apiDate + '&zip=' + 30075 + '&api_key=' + tmsApiKey;
	
	

	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var numMonths = ['01','02','03','04','05','06','07','08','09','10','11','12'];

	var nowPlayingHTML = '';
	var upcomingHTML = '';
	var discoverHTML = '';
	var favoritesHTML = '';

$(document).ready(function(){
	var currentFilter = 'popular';
	getNowPlaying();
	// $('*').focus(function(){
	// 	$('*').toggleClass('focused');
	// });

	$('.fa-search').click(function(event){
		event.preventDefault();
		if($('.search-field').hasClass('active-search') && $('.search-field').val() !== ''){
			console.log($('.search-field').val())
			$('.search-form').submit();
		}else{
			$('.search-field').toggleClass('hidden-search');
			$('.search-field').toggleClass('active-search');
		}
	});

	$('.search-field').on('input',function(){
		$('.fa-times-circle').removeClass('hidden');
	});

	$('.fa-times-circle').click(function(){
		$('.fa-times-circle').addClass('hidden');
		$('.search-field').val('');
	});

	$('.search-field').blur(function(){
		if($('.search-field').val() === ''){
			$('.search-field').addClass('hidden-search');
			$('.search-field').removeClass('active-search');
		}
	});

	$('.search-form').submit(function(event){
		event.preventDefault();
		searchQuery = $('.search-field').val();
		currentPage = 1;
		searchMoviesUrl = apiBaseUrl + '/search/movie?api_key=' + apiKey + '&query=' + searchQuery + '&region=US' + '&page=' + currentPage;

		searchMovies(searchQuery);

	});



	$('.playing').click(function(){
		getNowPlaying();
	});

	$(window).scroll(function(){
		var newCallStart = $(document).height() - $(window).height();
		var newCallEnd = $(document).height() - $(window).height();
		// console.log(newCallStart)
		// console.log($(window).scrollTop())
		// console.log(currentFilter)
		if($(window).scrollTop() >= newCallStart && $(window).scrollTop() <= newCallEnd){
			currentPage += 1;
			// console.log(currentPage);
			nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key=' + apiKey + '&region=US' + '&page=' + currentPage;
			discoverBaseUrl = apiBaseUrl + '/discover/movie?api_key=' + apiKey + '&page=' + currentPage;
			upcomingBaseUrl = apiBaseUrl + '/movie/upcoming?api_key=' + apiKey + '&region=US' + '&page=' + currentPage;
			searchMoviesUrl = apiBaseUrl + '/search/movie?api_key=' + apiKey + '&query=' + searchQuery + '&region=US' + '&page=' + currentPage;
			// console.log(nowPlayingUrl);
			// console.log(currentQuery)
			// console.log(discoverBaseUrl)
			if(currentQuery === "nowPlaying"){
				getNowPlaying();
			}else if(currentQuery === "discover"){
				var linkVar = $("#"+currentFilter).attr('lval');
				discoverJSON(linkVar,sortVar);
			}else if(currentQuery === "upcoming"){
				getUpcoming();
			}else if(currentQuery === "searchMovies"){
				searchQuery = $('.search-field').val();
				searchMoviesUrl = apiBaseUrl + '/search/movie?api_key=' + apiKey + '&query=' + searchQuery + '&region=US' + '&page=' + currentPage;
				searchMovies(searchQuery);
			}
			
		}
	});

	function searchMovies(searchQuery){
		currentQuery = "searchMovies"; 
		$.getJSON(searchMoviesUrl, function(searchData){
			console.log(searchData)
			currentBaseUrl = searchMoviesUrl;
			if( currentPage === 1){
				movieIDArr = [];
				searchHTML = '';
				$('body').scrollTop(0);
			}
			
			for(let i = 0; i < searchData.results.length; i++){
				var title = searchData.results[i].original_title;
				var release = searchData.results[i].release_date;
				var protoDate = new Date(release);
				var day = (protoDate.getDate(release)+1);
				var month = months[protoDate.getMonth(release)];
				var year = (protoDate.getFullYear(release));
				var poster = imageBaseUrl + '/w300' + searchData.results[i].poster_path;
				
				if (poster === 'http://image.tmdb.org/t/p/w300null'){
					poster = placeholderImage;
				}
				var searchID = searchData.results[i].id;
				movieIDArr.push(searchID);

				searchHTML += '<div class="movie-item col-sm-6 col-md-4 col-lg-3" id="' + searchID + '" data-toggle="modal" data-target=".movie-modal" onclick="updateModal(this);">';
					searchHTML += '<img src="' + poster + '">';
					searchHTML += '<div class="overlay">';
						searchHTML += '<div class="movie-title">';
							searchHTML += '<h2>' + title + '</h2>';
							searchHTML += '<h4>Released: ' + month + ' ' + day + ', ' + year + '<h4>';
						searchHTML += '</div>';
						searchHTML += '<div class="movie-rating text-center">';
							searchHTML += '';
						searchHTML += '</div>';
					searchHTML += '</div>';
				searchHTML += '</div>';

				setTimeout(function(){
					$('#movie-grid').html(searchHTML);
					// $('.movie-item').addClass('view');
				}, 200);
			}
		});
	};

	function getNowPlaying(){
		currentQuery = "nowPlaying";
		$.getJSON(nowPlayingUrl, function(nowPlayingData){
			// console.log(nowPlayingData);
			// console.log(nowPlayingUrl);
			currentBaseUrl = nowPlayingUrl;
			if( currentPage === 1){
				movieIDArr = [];
				nowPlayingHTML = '';
				$('body').scrollTop(0);
			}
			
			for(let i = 0; i < nowPlayingData.results.length; i++){
				var title = nowPlayingData.results[i].original_title;
				var release = nowPlayingData.results[i].release_date;
				var protoDate = new Date(release);
				var day = (protoDate.getDate(release)+1);
				var month = months[protoDate.getMonth(release)];
				var year = (protoDate.getFullYear(release));
				var poster = imageBaseUrl + '/w300' + nowPlayingData.results[i].poster_path;
				
				if (poster === 'http://image.tmdb.org/t/p/w300null'){
					poster = placeholderImage;
				}
				var nowPlayingID = nowPlayingData.results[i].id;
				movieIDArr.push(nowPlayingID);
				// addMpaaRatings();
				// console.log(movieIDArr);

				nowPlayingHTML += '<div class="movie-item col-sm-6 col-md-4 col-lg-3" id="' + nowPlayingID + '" data-toggle="modal" data-target=".movie-modal" onclick="updateModal(this);">';
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
		// console.log(currentQuery)
	};



	$('.upcoming').click(function(){
		currentPage = 1;
		getUpcoming();
		// console.log('ok');
	});

	function getUpcoming(){
		currentQuery = "upcoming";
		$.getJSON(upcomingBaseUrl, function(upcomingData){
			// console.log(nowPlayingData);
			// console.log(upcomingUrl);
			currentBaseUrl = upcomingBaseUrl;
			if( currentPage === 1){
				movieIDArr = [];
				upcomingHTML = '';
				$('body').scrollTop(0);
			}
			for(let i = 0; i < upcomingData.results.length; i++){
				var title = upcomingData.results[i].original_title;
				var release = upcomingData.results[i].release_date;
				var protoDate = new Date(release);
				var today = new Date();
				var day = (protoDate.getDate(release)+1);
				var month = months[protoDate.getMonth(release)];
				var year = (protoDate.getFullYear(release));
				var poster = imageBaseUrl + '/w300' + upcomingData.results[i].poster_path;
				if (poster === 'http://image.tmdb.org/t/p/w300null'){
					poster = placeholderImage;
				}
				var upcomingID = upcomingData.results[i].id;
				// addMpaaRatings();
				movieIDArr.push(upcomingID);
				// console.log(movieIDArr);
				// console.log(poster);
				if(protoDate.getTime() > today.getTime()){
					upcomingHTML += '<div class="movie-item col-sm-6 col-md-4 col-lg-3" id="' + upcomingID + '" data-toggle="modal" data-target=".movie-modal" onclick="updateModal(this);">';
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
			}
			$('#movie-grid').html(upcomingHTML);
		});
		// console.log(currentQuery)
	};
	var sortVar = $('.sortBy.Active').attr('svalD');

	// $('.sortBy.Active').attr('up','false');

	$('.sortBy').click(function(){
		$('.sortBy').removeClass('Active');
		$(this).addClass('Active');
		if($('.sortBy.Active').attr('up') === 'true'){
			sortVar = $('.sortBy.Active').attr('svalA');
			$('.sortBy.Active').attr('up','false');
			$('.sortBy.Active .arrowUp').toggleClass('up');
			$('.sortBy.Active .arrowDown').toggleClass('down');
		}else{
			sortVar = $('.sortBy.Active').attr('svalD');
			$('.sortBy.Active').attr('up','true');
			$('.sortBy.Active .arrowUp').toggleClass('up');
			$('.sortBy.Active .arrowDown').toggleClass('down');
		}
	});

	var discoverUrl = discoverBaseUrl;
	$('.filter').click(function(){
		currentFilter = $(this).attr('id');
		var linkVar = $(this).attr('lval');
		currentPage = 1;
		// console.log(sortVar)
		// var sortVar = $('.sortBy.Active').attr('svalA');
		// console.log(sortVar);
		discoverJSON(linkVar,sortVar);
	});

	// $('.sortBy').click(function(){
	// 	currentUrl = 
	// });

	function discoverJSON(linkVar,sortVar){
		var discoverUrl = '';
		discoverUrl = discoverBaseUrl + linkVar + sortVar;
		// console.log(discoverUrl);
		currentQuery = "discover";
		$.getJSON(discoverUrl, function(discoverData){
			// console.log(discoverData);
			currentBaseUrl = discoverUrl;
			if( currentPage === 1){
				movieIDArr = [];
				mpaaArr = [];
				discoverHTML = '';
				$('body').scrollTop(0);
			}
			
			for(let i = 0; i < discoverData.results.length; i++){
				var title = discoverData.results[i].original_title;
				var release = discoverData.results[i].release_date;
				var protoDate = new Date(release);

				var day = (protoDate.getDate(release)+1);
				var month = months[protoDate.getMonth(release)];
				var year = (protoDate.getFullYear(release));
				// console.log(release[0]);
				var poster = imageBaseUrl + '/w300' + discoverData.results[i].poster_path;
				// console.log(poster)
				if (poster === 'http://image.tmdb.org/t/p/w300null'){
					poster = placeholderImage;
				}
				var discoverID = discoverData.results[i].id;
				// addMpaaRatings();
				movieIDArr.push(discoverID);

				discoverHTML += '<div class="movie-item col-sm-6 col-md-4 col-lg-3" id="' + discoverID + '" data-toggle="modal" data-target=".movie-modal" onclick="updateModal(this);">';
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
			// console.log(movieIDArr);
		});
		// console.log(currentQuery)
	};

	$('.main-menu-tab').click(function(){
		animateMenu();
	});

	$('.favorites-button').click(function(){
		console.log(localStorage.favorite)
		var favStr = localStorage.favorite;
		var favArray = favStr.split(',');
		console.log(favArray)
		// for(let i=0; i<favArray.length){
		// 	show
		// }
	});

	const favoritesUrl = apiBaseUrl;

	function showFavorites(favorite){
		$.getJSON(favoritesUrl, function(favoritesData){
			
		});
	}

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
	var currentUrl = apiBaseUrl + '/movie/' + currentID + '?api_key=' + apiKey +'&append_to_response=videos,images,release_dates';

	var posterHTML = '';
	var titleHTML = '';
	var infoHTML = '';
	var ratingHTML = '';
	var backdropHTML = '';
	var ticketsHTML = '';
	var trailerHTML = '';
	// console.log(currentUrl);

	// $.getJSON(discoverUrl, function(){

	// });

	$.getJSON(currentUrl, function(detailsData){
		console.log(detailsData);
		
		var zip = 30075;
		var title = detailsData.original_title;
		var release = detailsData.release_date;
		var protoDate = new Date(release);
		
		
		var day = (protoDate.getDate(release)+1);
		var month = months[protoDate.getMonth(release)];
		var year = protoDate.getFullYear(release);
		var poster = imageBaseUrl + '/w300' + detailsData.poster_path;
		if (poster === 'http://image.tmdb.org/t/p/w300null'){
			poster = placeholderImage;
		}
		var backdrop = imageBaseUrl + '/w600' + detailsData.backdrop_path;
		var description = detailsData.overview;
		var runTime = detailsData.runtime;
		var webSite = detailsData.homepage;
		if (detailsData.videos.results.length > 0){
			var trailerId = detailsData.videos.results[0].key;
		}else{
			var trailerId = undefined;
		}
		var ratingAvg = detailsData.vote_average;
		var ratingCount = detailsData.vote_count;
		var genre = '';
		var genreArray = [];
		var currentRootId = '';
		var currentTmsId = '';
		var mpaaRating = currentMpaa;
		// addMpaaRatings();

		const tmsUrl = tmsBaseUrl + '/movies/showings?startDate=' + apiDate + '&zip=' + zip + '&api_key=' + tmsApiKey;
		
		$('#main-content').html('');
		
	 	var releaseResults = detailsData.release_dates.results;
        var mpaa = 'NR';
        for (let result of releaseResults) {
            if (result.iso_3166_1 === "US") {
                var certifications = result.release_dates;
                for (let cert of certifications) {
                    if (cert.certification !== '') {
                        mpaa = cert.certification;
                        break;
                    }
                }
            }
        }

		

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
		
		
		var backdropCounter = 0;


		
		
		var backdropRotate = setInterval(function(){
			$('#main-content').html('');
			backdrop = imageBaseUrl + '/w600' + detailsData.images.backdrops[backdropCounter].file_path;
			$('#main-content').html('<img src="' + backdrop +'">');
			backdropCounter++;
			if(backdropCounter == detailsData.images.backdrops.length){
				backdropCounter = 0;
			}
		}, 10000);
		
		$('.close, .modal-backdrop').click(function stopRotate(){
			clearInterval(backdropRotate);
			$('#main-content').html('');
		});

		
		posterHTML += '<img src="' + poster + '">';

		titleHTML += '<h1 id="title-text">' + title + ' <divƒ id="mpaaRating">' + mpaa + '</div></h1>';
		titleHTML += '<hr/>';
		titleHTML += '<p id="desc">' + description + '</p>';
		titleHTML += '<p id="desc"><span>Release Date: ' + month + ' ' + day + ', ' + year + '</span></p>';
		titleHTML += '<p>';
			titleHTML += '<span id="run-time">Length: ' + runTime + ' minutes &nbsp; &nbsp; </span>';
			titleHTML += '<span id="modal-genre">Genres: ' + visGenre + '</span>';
		titleHTML += '</p';
		if(webSite != ""){
		infoHTML += '<p>';
			infoHTML += '<span id="web-site"><a href="' + webSite + '" target="_blank">Visit the Website Here</a></span>';
			infoHTML += '<span id="trailer-btn" class="btn btn-secondary"><a id="trailer-link" href="#" data-toggle="modal" data-target=".trailer-modal"  data-theVideo="https://www.youtube.com/embed/' + trailerId + '">View the trailer</a></span>';
		infoHTML += '</p>';
		}
		ratingHTML += '<div>';
			ratingHTML += '<div id="stars">';
				ratingHTML += 'Rating: &nbsp; <div class="star-ratings"><a href="#" data-toggle="tooltip" data-placement="top" title="' + (ratingAvg * 10) + '%">';
					ratingHTML += '<div class="star-ratings-top" style="width: ' + (ratingAvg * 10) + '%"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>';
					ratingHTML += '<div class="star-ratings-bottom"><span>&#9734;</span><span>&#9734;</span><span>&#9734;</span><span>&#9734;</span><span>&#9734;</span></div>';
				ratingHTML += '</a></div>';
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

		trailerHTML += '<iframe id="player" src="" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>';


		var savedFavorite = localStorage.getItem('favorite');
		// console.log(savedFavorite);
		if(savedFavorite == null){
			savedFavorite = "";	
		}
		// console.log(savedFavorite);
		var savedArray = savedFavorite.split(',');
		// console.log(savedArray);
		$('#heart').ready(function(){
			for(let i = 0; i < savedArray.length; i++){
				if(savedArray[i] == currentID){
					// console.log(savedArray[i]);
					$('#heart').removeClass();
					$('#heart').addClass('fa fa-heart');
				}
			}
		});
		
		$('#heart').removeClass();
		// $('#main-content').html(backdropHTML);
		$('#movie-poster').html(posterHTML);
		$('.modal-movie-title').html(titleHTML);
		$('#trailer').html(infoHTML);
		$('#trailer-content').html(trailerHTML);
		$('#movie-rating').html(ratingHTML);
		$('.tickets').html(ticketsHTML);
		$('[data-toggle="tooltip"]').tooltip();
		$('#heart').click(function(){
			$('#heart').toggleClass('fa fa-heart');
			$('#heart').toggleClass('fa fa-heart-o');
			var favArray = [];
			var old = localStorage.getItem('favorite');
			// console.log(old);
			// console.log(currentID);
			
		    if(old === null){
		    	localStorage.setItem('favorite', currentID);
		    	old = localStorage.getItem('favorite');
		    	favArray.push(old);
		    	// console.log(favArray);
		    }else if(old === currentID){
		    	localStorage.removeItem('favorite');
		    	// console.log(favArray);
		    }else{
		    	favArray = old.split(',');
		    	// console.log(favArray);
		    	
		    	for(let i = 0; i < favArray.length; i++){
					// console.log(favArray[i]);
					if(favArray[i] == currentID){
						removeFromStorage('favorite', currentID);
						// console.log('I was removed');
						break;
					}else if(favArray.indexOf(currentID, 0) === -1){
						// console.log('I need to be added');
						appendToStorage('favorite', currentID);
						break;
					}
				}
		    }
			

			function appendToStorage(name, data){ 
				// console.log(old);
			    localStorage.setItem(name, old + ',' + data);
			}
			function removeFromStorage(name, data){
			    // console.log(favArray);
			    for(let i = 0; i < favArray.length; i++){
			    	if(favArray[i] == currentID){
			    		favArray.splice(i,1);
			    	}
			    }
			    var favString = favArray.join();
			    localStorage.setItem('favorite', favString);
			    // console.log(favString);
			}			
		});

		function autoPlayYouTubeModal(){
			var trigger = $(".modal-body").find('[data-toggle="modal"]');
			trigger.click(function() {
				var theModal = $(this).data( "target" )
				videoSRC = $(this).attr( "data-theVideo" )
				videoSRCauto = videoSRC+"?autoplay=1" ;
				$(theModal+' iframe').attr('src', videoSRCauto);
				$(theModal).on('hidden.bs.modal',function () {
					$(theModal+' iframe').attr('src', videoSRC);
				});	 
			});
		}
		autoPlayYouTubeModal();
	});
}





