class MainController {
  /** @ngInject */
  constructor($log, $timeout, $sce, $location, sayonaraService) {
    this.$log = $log;
    this.$timeout = $timeout;
    this.$sce = $sce;
    this.$location = $location;
    this.sayonaraService = sayonaraService;

    this.sayonaraSite = {};
  }

  $onInit() {
    this.sayonaraService.getSite().then(siteJson => {
      // Using timeout to propogate controller changes
      this.$timeout(() => {
        this.sayonaraSite = siteJson;
      }, 0);
    });
  }

  goToEntry(entry) {
    this.$location.path('/entry/' + entry.title);
  }
}

export const main = {
  template: require('./main.html'),
  controller: MainController
};
