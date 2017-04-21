import playButtonImg from '../../images/playButton.svg';

class MainController {
  /** @ngInject */
  constructor($log, $timeout, $sce, $location, sayonaraService) {
    this.$log = $log;
    this.$timeout = $timeout;
    this.$sce = $sce;
    this.$location = $location;
    this.sayonaraService = sayonaraService;

    this.playButtonImage = playButtonImg;

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

  /**
   * Ng-click to navigate to entry
   */
  goToEntry(entry) {
    this.$location.path('/entry/' + entry.title);
  }

  /**
   * Function to return if an entry is a video
   */
  isVideo(entry) {
    // Find the first field in any filled custom field
    const field = this._getEntryField(entry);

    if (!field) {
      return field;
    }

    return field.includes('youtu');
  }

  /**
   * Function to find the correct image for our main gallery
   */
  getEntryImageSource(entry) {
    // Get the first custom field if there is one
    if (!entry ||
      !entry.customFields ||
      entry.customFields.length <= 0) {
      return false;
    }

    // Find the first field in any filled custom field
    const field = this._getEntryField(entry);

    if (!field) {
      return field;
    }

    // Check if it contains imgur
    if (field.includes('imgur')) {
      // Return the small image as the background style
      return field;
    }

    // Check if it contains youtube
    if (field.includes('youtu')) {
      // Return the small image as the background style
      // https://img.youtube.com/vi/tjYUGPZtAOA/0.jpg

      // Extract the youtube video id
      // https://stackoverflow.com/questions/3452546/javascript-regex-how-do-i-get-the-youtube-video-id-from-a-url
      const youtubeRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/; // eslint-disable-line
      const match = field.match(youtubeRegExp);
      const videoId = (match && match[7].length === 11) ? match[7] : false;
      return 'https://img.youtube.com/vi/' + videoId + '/0.jpg';
    }
  }

  /**
   * Private Function to grab the first filed of an entry
   */
  _getEntryField(entry) {
    // Find the first field in any filled custom field
    let field = false;
    entry.customFields.some(customField => {
      if (customField.fields && customField.fields[0].length > 0) {
        field = customField.fields[0];
        return true;
      }
      return false;
    });

    return field;
  }
}

export const main = {
  template: require('./main.html'),
  controller: MainController
};
