# Movie Time
### A simple movie listing app.

***

[Overview](https://github.com/AndyTuttle12/movie-app#overview)	|	[Technologies Used](https://github.com/AndyTuttle12/movie-app#technologies-used)	|	[Dependencies](https://github.com/AndyTuttle12/movie-app#dependencies)	|	[MVP](https://github.com/AndyTuttle12/movie-app#mvp)	|	[Challenges and Solutions](https://github.com/AndyTuttle12/movie-app#challenges-and-solutions)	|	[Code Snippets](https://github.com/AndyTuttle12/movie-app#code-snippets)   |   [Screen Shots](https://github.com/AndyTuttle12/movie-app#screen-shots)   |   [Live Demo](https://github.com/AndyTuttle12/movie-app#live-demo)

---

## Overview
Movie Time is a simple app where the user can browse titles in various categories, search, filter and sort to find new and interesting movies. The whole app is very fast light-weight, even though all of the data is real and coming from a live API. 

The user experience is designed to be intuitive and visually appealing. All the main controls are simplified to two buttons, and a slide out menu panel on the left. From the top, the user can start a search, or view previously saved favorites. On the left, the menu slides out to offer browsing options for 'Now Playing', 'Upcoming', and 'Popular', as well as an exhaustive list of genres to drill down into. On the bottom of that menu, the user can sort results by popularity, release date, and by title name, alphabetical, all of which can be set to ascending or decending. 

From the main movie tile grid, the user can see all the titles that are returned, and on hover, view the basic information on release date, ratings, and if it is a favorite. If the user scrolls, there will be a new page appended to the results in an infinite scroll pattern at the bottom of each page. Clicking into the tile yields a summary screen were even more options are available and where the user can favorite the title, or view the trailer.

This was one of my earlier projects as a student at [DigitalCrafts](http://www.digitalcrafts.com). It is only a front-end project, but it does call to [The Movie Database API](https://developers.themoviedb.org/3/getting-started) - a RESTful API using multiple endpoints as well as the [YouTube Player iframe API](https://developers.google.com/youtube/iframe_api_reference) for the trailers. All of the favorite information is stored in the client's local storage. Since there is no framework, pseudo-routing is acheived with extensive DOM manipulation and css styles.

In short, this project is a rather complicated implementation of basic development principles. Please take a test drive!

---

## Technologies Used
- HTML
- CSS
- Bootstrap
- javascript
- jQuery
- APIs
	- The Movie Database API (TMDb)
	- YouTube Player iframe API

---

## Dependencies
- Only the API key for TMDb. (No packages needed as all libraries are included from CDNs!)
- To fork this project, simply add a `config.js` file to the `js` folder and inside add:
	```javascript
		const apiKey = "<YOUR_TMBd_KEY_HERE>";
	```

---

## MVP
**Original MVP**
At first, this was a simple excercise to add all the basic front-end principles and technologies we had learned in the first few weeks of class together to make a grid of movies coming from an external REST API, parsing the JSON and displaying iteratively. (That literally took only a few hours in class.)

Next, I decided to add some more lofty aspirations to my goal, including a menu, multiple endpoints, and a way to view the results in a modal. 
That quickly turned into a mountain of stretch goals...

**Stretch Goals**
For the sake of brevity, I will simply list out the additional features I worked on and added so far:
- Animated side menu
	- list of categories
	- genre options
	- toggle buttons for sorting
- animated search bar with pseudo-state management
- multiple routes and dynamic searches
	- infinite scroll on every endpoint
	- consistent styling across the grid
	- sorted, accurate results for all queries
- favorites implemented across all movie results
	- persistent favorites in local storage
	- saved favorites page with live updating
- summary modal with rotating backgrounds
	- accurate information on each result
		- poster, title, run-time, MPAA rating, description, genres, release date, ratings with tooltips, favorites, & website link
		- smart button to Fandango for current movies
	- trailer modal with autoplay
		- updates on close and open

There are still plenty of fixes to be made, updates and features to add and many more stretch goals in the future, but I think this is a good start!

---

## Challenges and Solutions
Oh the challenges! 
When I first started this project, I had no clue how to build a full-featured, production-style app, and no understanding of any javascript frameworks or any backend technologies at all! Here are some of the struggles I encountered and how I overcame them:

1.	**Problem**
	How do you get multiple queries to go to separate endpoints on the API? I ran into this on my genre searches, where I started using complicated values in each link to share the same endpoint on the TMDb API.

	**Solution**
	This was quite a humdinger at the time, but it seems laughable now that I am used to full-stack apps with mountains of promises in redux and node.
	Basically, I added a value to each option in the menu as a string value, passed it into the jQuery handler, added the new variable to the inputs for the AJAX call and then boom, every time I sorted by genre, the URL included the appended query string and pulled only results from that genre. It was glorious.

2.	**Problem**
	When I started the modal work, I really wanted to have a rotating background with stills of the movie. There was an array of image URLs in the results, so I said what the hey? How hard can that be?

	**Solution**
	I started with a counter, and what I now know as the "dreaded" `setTimeout()` and `setInterval()` functions ("dreaded" since in the back-end you should never stop and wait for something; just resolve your callbacks or promises when you need data at a specific time). I knew that the image should have a keyframe fire at every 30 seconds or so, but had no clue with what was I going to stop the rotation, or if it might interfere with other movies - hint, hint, it totally messes with everything! 

	Using a basic bootstrap method for modals, I ran a `clearInterval` and cleared the html of the div on close of the modal. Success!

3.	**Problem**
	I wanted to let the users save their favorite movies and be able to refer to them later, but of course this was a front-end app. No accounts or login processes; database or secure server routes; I didn't even understand that concept, but I did know *local storage*!

	**Solution**
	Wow, what an undertaking! And still, I feel like this is only mostly resolved. In order to save all the favorites to local storage, I did need to add them to a string and save that as a favorites key in the browser. Even after that was accomplished, it fell apart when I tried to save, reload and remove from storage every time the favorite heart was clicked...  So I modularized the add and remove utilities and ran the whole interaction through console.log after console.log slowly building a bulletproof chain of conditionals that took into account every possibility and added them to the array. Finally, when I had a decent algorhythm going and the save worked, I added the saved strings to iterative AJAX calls back to the API to build the favorites page whenever the user clicked on the icon in the top bar. Yet another roaring success!

	There were plenty more issues and resolutions along the road, including integrating YouTube embeds in a modal, dynamically calling the API for infinite scrolling, and mountains of UI/UX optimizations. I would love to recant my tales of said trials and tribulations, but alas, most readers have already stopped reading this and moved to the live demo... Such is life... and I thoroughly understand. Onward!

---

## Code Snippets
Here are a few code snippets: I am including just a few of the more interesting ones. Please take a look at the whole commented codebase to really see how this trainwreck manages!

An example of the favorite mechanism:
```javascript
	$('#heart').click(function(){
		$('#heart').toggleClass('fa fa-heart');
		$('#heart').toggleClass('fa fa-heart-o');
		var favArray = [];
		var old = localStorage.getItem('favorite');
		// Setting base cases, and making sure it isn't null.
		if(old === null){
			localStorage.setItem('favorite', currentID);
			old = localStorage.getItem('favorite');
			favArray.push(old);
		}else if(old === currentID){
			localStorage.removeItem('favorite');
		}else{
			favArray = old.split(',');
			for(let i = 0; i < favArray.length; i++){
				if(favArray[i] == currentID){
					removeFromStorage('favorite', currentID);
					break;
				}else if(favArray.indexOf(currentID, 0) === -1){
					appendToStorage('favorite', currentID);
					break;
				}
			}
		}
		///////////////////////
		// Helper functions to append or remove the item.
		///////////////////////
		function appendToStorage(name, data){ 
			localStorage.setItem(name, old + ',' + data);
		}
		function removeFromStorage(name, data){
			for(let i = 0; i < favArray.length; i++){
				if(favArray[i] == currentID){
					favArray.splice(i,1);
				}
			}
			var favString = favArray.join();
			localStorage.setItem('favorite', favString);
			if(currentQuery === 'favorites'){
				favoritesHTML = '';
				$('#movie-grid').html(favoritesHTML);
				var favArr = favString.split(',');
				for(let i=0; i<favArr.length; i++){
					updateFavorites(favArr[i]);
				}
			}
		}
	...
	});
```

Here is an example of the infinite scroll function:
```javascript
	///////////////////////
	// This handles Infinite Scroll functionality.
	///////////////////////
	$(window).scroll(function(){
		var newCallStart = $(document).height() - $(window).height();
		var newCallEnd = $(document).height() - $(window).height();
		// Set a range to fire.
		// And listen for the scrollTop to hit that range.
		if($(window).scrollTop() >= newCallStart && $(window).scrollTop() <= newCallEnd){
			currentPage += 1;
			nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key=' + apiKey + '&region=US' + '&page=' + currentPage;
			discoverBaseUrl = apiBaseUrl + '/discover/movie?api_key=' + apiKey + '&page=' + currentPage;
			upcomingBaseUrl = apiBaseUrl + '/movie/upcoming?api_key=' + apiKey + '&region=US' + '&page=' + currentPage;
			searchMoviesUrl = apiBaseUrl + '/search/movie?api_key=' + apiKey + '&query=' + searchQuery + '&region=US' + '&page=' + currentPage;
			// Then, judge the current page and query.
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
```
And on each function to make an AJAX call, there is another conditional to deal with page 1. (Here is the one for search.):
```javascript
	if( currentPage === 1){
		movieIDArr = [];
		searchHTML = '';
		$('body').scrollTop(0);
	}
```

---

## Screen Shots
Holy Screen Shots Batman!
(coming soon)

---

## Live Demo
Take me out for a spin!
(coming soon)

---


