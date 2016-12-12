/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
      /* This is our first test - it tests to make sure that the
      * allFeeds variable has been defined and that it is not
      * empty. Experiment with this before you get started on
      * the rest of this project. What happens when you change
      * allFeeds in app.js to be an empty array and refresh the
      * page?
      */
      it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });


      // Loop through 'allFeeds' and check if the feed's url are NOT empty
      it('url not empty', function() {
        for(key in allFeeds){
          expect(allFeeds[key].url).toBeTruthy();
        }
      });

      // Loop through 'allFeeds' and check if the feed's name are NOT empty
      it('name not empty', function() {
        for(key in allFeeds){
          expect(allFeeds[key].name).toBeTruthy();
        }
      });
    });

    describe('The menu', function() {

      // Check if the body has the 'menu-hidden' class applyed by default
      it('is hidden by default',function(){
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });

      // test if clicking on the icon, triggers the 'menu-hidden' toggle class
      it('changes visibility when the menu icon is clicked',function(){
        $('.menu-icon-link').click();
        expect($('body').hasClass('menu-hidden')).toBe(false);
        $('.menu-icon-link').click();
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });
    });

    describe('Initial Entries', function() {

      // loads all the news from feeds asynchonously
      beforeEach(function(done) {
        for (var i = 0 ; i < allFeeds.length; i++){
          loadFeed(i, function(){
            done();
          });
        }
      });

      // check how many '.entry' elements are loaded, if the number is at leat one, pass the test
      it('there is at least one entry',function(done){
        expect($(".entry").length).not.toBe(0);
        done();
      });
    });

    describe('New Feed Selection', function() {

      // compare the first two feeds
      var feed_0;

      beforeEach(function(done) {
        // load allFeeds[0]
        loadFeed(0, function() {
          // save it into
          feed_0 = $('.feed').html();
          done();
        });
      });

      it('new feed loaded chage .feed', function(done) {
        // load allFeeds[1]
        loadFeed(1, function() {
          // compare the two feed content to pass the test
          expect($('.feed').html()).not.toEqual(feed_0);
          done();
        });
      });
    });
}());
