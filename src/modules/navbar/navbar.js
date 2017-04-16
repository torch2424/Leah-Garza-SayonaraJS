class NavbarController {
  /** @ngInject */
  constructor($log, $state, $location, navbarRouteService) {
    this.$log = $log;
    this.$state = $state;
    this.$location = $location;
    this.navbarRouteService = navbarRouteService;
    this.showNav = false;
  }

  // Check if a route is active
  isActive(route) {
    if (route.state) {
      return this.$state.includes(route.state);
    } else if (route.url) {
      return this.$location.path().includes(route.state);
    }
    this.$log.err('Angular Navbar: Route object must contain a \'state\' or \'url\' key');
    return false;
  }

  // Go to a State
  goToState(route) {
    if (route.state) {
      this.$state.go(route.state);
    } else if (route.url) {
      this.$location.path(route.url);
    }
    this.showNav = false;
  }
}

// Return the component
export const Navbar = {
  template: require('./navbar.html'),
  controller: NavbarController
};
