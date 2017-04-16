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

  getEntryImageSource(entry) {
    // Get the first custom field if there is one
    if (!entry ||
      !entry.customFields ||
      entry.customFields.length <= 0 ||
      !entry.customFields[0].fields ||
      entry.customFields[0].fields.length <= 0) {
      return false;
    }
    const customField = entry.customFields[0].fields[0];

    // Check if it contains imgur
    if (customField.includes('imgur')) {
      // Return the small image as the background style
      return customField;
    }
  }
}

export const main = {
  template: require('./main.html'),
  controller: MainController
};
