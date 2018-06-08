app.config(function (
    $mdThemingProvider,
    $mdIconProvider,
    $locationProvider,
    $routeProvider,
    $mdProgressCircularProvider) {

  /*
   * Routing
   */


  $locationProvider.hashPrefix('!');


  $routeProvider.when('/', {
    redirectTo: '/search'
  }).when('/search', {
    templateUrl: 'src/search.template.html',
    controller: 'SearchController'
  }).when('/results/:tokenId', {
    templateUrl: 'src/results.template.html',
    controller: 'ResultsController'
  });


  /*
   * THEMING
   */

  $mdThemingProvider.definePalette('allWhite', {
    '50': 'ffffff',
    '100': 'ffffff',
    '200': 'ffffff',
    '300': 'ffffff',
    '400': 'ffffff',
    '500': 'ffffff',
    '600': 'ffffff',
    '700': 'ffffff',
    '800': 'ffffff',
    '900': 'ffffff',
    'A100': 'ffffff',
    'A200': 'ffffff',
    'A400': 'ffffff',
    'A700': 'ffffff',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light

    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
      '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  /*
   * By default, shades
   * 500,
   * 300,
   * 800,
   * A100, are used for primary and warn intentions,
   *
   * while
   * A200,
   * A100,
   * A400,
   * A700 are used for accent.
   */

  $mdThemingProvider.theme('default')
      .primaryPalette('cyan', {
        'default': '400', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      })
      .accentPalette('allWhite')
      .warnPalette('red');
});
