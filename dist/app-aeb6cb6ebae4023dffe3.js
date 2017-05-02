webpackJsonp([0],[,,function(module,exports,__webpack_require__){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),EntryHelper=function(){function EntryHelper(){_classCallCheck(this,EntryHelper)}return _createClass(EntryHelper,null,[{key:"getEntryImageSource",value:function getEntryImageSource(entry){if(!entry||!entry.customFields||entry.customFields.length<=0)return!1;var field=this.getEntryField(entry);if(!field)return field;if(field=field.replace("http://","https://"),field.includes("imgur")){if(!field.includes(".gif")){var smallImgur=field.split(/\.(jpg|jpeg|tiff|png)$/i);return smallImgur=smallImgur[0]+"l."+smallImgur[1]}return field}if(field.includes("youtu")){var youtubeRegExp=/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,match=field.match(youtubeRegExp);return"https://img.youtube.com/vi/"+(!(!match||11!==match[7].length)&&match[7])+"/0.jpg"}}},{key:"getEmbed",value:function getEmbed(entry){if(!entry||!entry.customFields||entry.customFields.length<=0)return!1;var field=this.getEntryField(entry);if(!field)return field;if(field=field.replace("http://","https://"),field.includes("imgur"))return field;if(field.includes("youtu")){var youtubeRegExp=/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,match=field.match(youtubeRegExp);return"https://youtube.com/embed/"+(!(!match||11!==match[7].length)&&match[7])}}},{key:"isImage",value:function isImage(entry){var field=this.getEntryField(entry);return field?field.includes("imgur"):field}},{key:"isVideo",value:function isVideo(entry){var field=this.getEntryField(entry);return field?field.includes("youtu"):field}},{key:"getEntryField",value:function getEntryField(entry){var field=!1;return!entry||!entry.customFields||entry.customFields.length<1?field:(entry.customFields.some(function(customField){return!!(customField.fields&&customField.fields[0].length>0)&&(field=customField.fields[0],!0)}),field)}}]),EntryHelper}();exports.default=EntryHelper},function(module,exports){},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.entry=void 0;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_entryHelper=__webpack_require__(2),_entryHelper2=_interopRequireDefault(_entryHelper),EntryController=function(){function EntryController($log,$timeout,$state,$stateParams,$sce,sayonaraService){_classCallCheck(this,EntryController),this.$log=$log,this.$timeout=$timeout,this.$state=$state,this.$stateParams=$stateParams,this.$sce=$sce,this.sayonaraService=sayonaraService,this.entryHelper=_entryHelper2.default,this.sayonaraSite={},this.entry={}}return EntryController.$inject=["$log","$timeout","$state","$stateParams","$sce","sayonaraService"],_createClass(EntryController,[{key:"$onInit",value:function $onInit(){var _this=this;this.sayonaraService.getSite().then(function(siteJson){_this.sayonaraSite=siteJson,siteJson.pages[0].entryTypes[0].entries.some(function(entry){return entry.title===_this.$stateParams.title&&(_this.entry=entry,!0)})||(_this.entry={title:"Entry not found.."})})}},{key:"goBackHome",value:function goBackHome(){this.$state.go("app")}},{key:"getTrustedEmbed",value:function getTrustedEmbed(){var embedUrl=this.entryHelper.getEmbed(this.entry);return this.$sce.trustAsResourceUrl(embedUrl)}}]),EntryController}(),entry=exports.entry={template:__webpack_require__(11),controller:EntryController}},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.main=void 0;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_playButton=__webpack_require__(17),_playButton2=_interopRequireDefault(_playButton),_entryHelper=__webpack_require__(2),_entryHelper2=_interopRequireDefault(_entryHelper),MainController=function(){function MainController($log,$timeout,$sce,$location,sayonaraService){_classCallCheck(this,MainController),this.$log=$log,this.$timeout=$timeout,this.$sce=$sce,this.$location=$location,this.sayonaraService=sayonaraService,this.playButtonImage=_playButton2.default,this.entryHelper=_entryHelper2.default,this.sayonaraSite={},this.totalCategories=[],this.currentCategory=!1}return MainController.$inject=["$log","$timeout","$sce","$location","sayonaraService"],_createClass(MainController,[{key:"$onInit",value:function $onInit(){var _this=this;this.sayonaraService.getSite().then(function(siteJson){_this.$timeout(function(){_this.sayonaraSite=siteJson,_this.sayonaraSite.pages[0].entryTypes[0].entries.forEach(function(entry){entry.categories.forEach(function(category){_this.totalCategories.includes(category.title)||_this.totalCategories.push(category.title)})})},0)})}},{key:"goToEntry",value:function goToEntry(entry){this.$location.path("/entry/"+entry.title)}},{key:"entryCategoryFilter",value:function entryCategoryFilter(entry){var _this2=this;if(!this.currentCategory)return!0;if(!entry||!entry.categories||entry.categories.length<=0)return!1;var response=!1;return entry.categories.some(function(category){return category.title===_this2.currentCategory&&(response=!0,!0)}),response}},{key:"categoryClick",value:function categoryClick(category){var _this3=this,clearCategories="TIMEOUTTIMEOUTTIMEOUT",timeoutLength=10;if(this.currentCategory&&this.currentCategory===category)return this.currentCategory=clearCategories,void this.$timeout(function(){_this3.currentCategory=!1},timeoutLength);this.currentCategory=clearCategories,this.$timeout(function(){_this3.currentCategory=category},timeoutLength)}}]),MainController}(),main=exports.main={template:__webpack_require__(12),controller:MainController}},function(module,exports,__webpack_require__){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),PageController=function(){function PageController($log,$timeout,$sce,$stateParams,sayonaraService){_classCallCheck(this,PageController),this.$log=$log,this.$timeout=$timeout,this.$sce=$sce,this.$stateParams=$stateParams,this.sayonaraService=sayonaraService,this.sayonaraSite={},this.currentPage={}}return _createClass(PageController,[{key:"$onInit",value:function $onInit(){var _this=this;this.sayonaraService.getSite().then(function(siteJson){_this.$timeout(function(){_this.sayonaraSite=siteJson},0)})}},{key:"getPage",value:function getPage(){var _this2=this;if(!this.sayonaraSite||Object.keys(this.sayonaraSite).length<1)return!1;if(this.$stateParams.title===this.currentPage.title)return this.currentPage;var foundPage=!1;return this.sayonaraSite.pages.some(function(page){return page.title===_this2.$stateParams.title&&(foundPage=page,!0)}),this.currentPage=foundPage,foundPage}}]),PageController}(),page=exports.page={template:__webpack_require__(13),controller:PageController}},function(module,exports,__webpack_require__){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Sayonara=function(){function Sayonara($log,$location,$http){var _this=this;_classCallCheck(this,Sayonara),this.$log=$log,this.$location=$location,this.$http=$http,this.sayonaraPromise={},this.sayonaraSite={};var sayonaraUrlHost="";sayonaraUrlHost=this.$location.port()?"//"+this.$location.host()+":"+this.$location.port():"//"+this.$location.host(),this.sayonaraPromise=this.$http({method:"GET",url:sayonaraUrlHost+"/api/public"}).then(function(response){_this.sayonaraSite=response.data},function(response){_this.$log.error("Sayonara Error: ",response)})}return Sayonara.$inject=["$log","$location","$http"],_createClass(Sayonara,[{key:"getSite",value:function getSite(){var _this2=this;return new Promise(function(resolve){Object.keys(_this2.sayonaraSite)>0&&resolve(_this2.sayonaraSite),_this2.sayonaraPromise.then(function(){resolve(_this2.sayonaraSite)})})}}]),Sayonara}();exports.default=Sayonara},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.angularNavbarModule=void 0;var _angular=__webpack_require__(0),_angular2=_interopRequireDefault(_angular),_navbarRoute=__webpack_require__(16),_navbarRoute2=_interopRequireDefault(_navbarRoute),_navbar=__webpack_require__(15),angularNavbarModule=exports.angularNavbarModule="angularNav";_angular2.default.module(angularNavbarModule,[]).service("navbarRouteService",_navbarRoute2.default).component("angularNav",_navbar.Navbar)},function(module,exports,__webpack_require__){"use strict";function routesConfig($stateProvider,$urlRouterProvider,$locationProvider){$locationProvider.html5Mode(!1).hashPrefix(""),$urlRouterProvider.otherwise("/"),$stateProvider.state("app",{url:"/",component:"app"}).state("page",{url:"/page/:title",component:"page"}).state("entry",{url:"/entry/:title",component:"entry"})}routesConfig.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=routesConfig},,function(module,exports){module.exports='<div class="c-entry">\n    <!-- Entry Title -->\n    <div class="c-entry__entry__title-container animated fadeIn">\n      <h1 class="c-entry__entry__title-container__title">\n        {{$ctrl.entry.title}}\n      </h1>\n    </div>\n\n    <!-- Entry Image -->\n    <div class="c-entry__entry__image-container animated fadeIn"\n      ng-if="$ctrl.entryHelper.isImage($ctrl.entry)">\n      <!-- Image -->\n      <a href="{{$ctrl.entryHelper.getEmbed($ctrl.entry)}}">\n        <img class="c-entry__entry__image-container__image"\n        alt="{{$ctrl.entry.title}}"\n        ng-src="{{$ctrl.entryHelper.getEmbed($ctrl.entry)}}" />\n      </a>\n    </div>\n\n    <!-- Entry Video -->\n    <div class="c-entry__entry__iframe-container animated fadeIn"\n      ng-if="$ctrl.entryHelper.isVideo($ctrl.entry)">\n      <iframe width="560"\n      height="315"\n      class="c-entry__entry__iframe-container__iframe"\n      ng-src="{{$ctrl.getTrustedEmbed()}}"\n      frameborder="0"\n      allowfullscreen>\n      </iframe>\n    </div>\n\n    <!-- Entry Content -->\n    <div class="c-entry__entry__content animated fadeInUp"\n      ng-bind-html="$ctrl.$sce.trustAsHtml($ctrl.entry.content)">\n    </div>\n\n    <!-- Omitting Dates for now, want Leah to be able to just mention it\n    <div class="c-entry__entry__date">\n      {{$ctrl.entry.date | date:\'longDate\'}}\n    </div>\n    -->\n\n    <!-- List our categories is nice little tag looking thingys -->\n    <div class="c-entry__entry__category-container"\n    ng-if="$ctrl.entry &&\n    $ctrl.entry.categories &&\n    $ctrl.entry.categories.length > 0">\n    Categories:\n    <div class="c-main__categories-flex">\n      <div ng-repeat="category in $ctrl.entry.categories"\n        class="c-main__categories-flex__category--no-hover">\n        {{category.title}}\n      </div>\n    </div>\n  </div>\n</div>\n'},function(module,exports){module.exports='<div class="c-main">\n\n  <!-- Show our categories, if we have them -->\n  <h3 class="c-main__categories-title"\n  ng-if="$ctrl.totalCategories &&\n  $ctrl.totalCategories.length > 0">\n    Filter by category:\n  </h3>\n  <div class="c-main__categories-flex">\n    <!-- Get our categories list, and repeat through -->\n    <div ng-if="$ctrl.totalCategories &&\n      $ctrl.totalCategories.length > 0"\n      ng-repeat="category in $ctrl.totalCategories"\n      class="c-main__categories-flex__category"\n      ng-click="$ctrl.categoryClick(category)"\n      ng-class="{\'c-main__categories-flex__category--current\':\n      $ctrl.currentCategory === category}">\n      {{category}}\n    </div>\n  </div>\n\n  <!-- Organize our entries in blocks from the first page -->\n  <!-- Added some awesome animation staggering in style -->\n  <!-- Not using ng-repeat filter because I am tried at 2am -->\n  <div class="c-main__entry-flex">\n    <div class="c-main__entry animated fadeInUp"\n      ng-repeat="entry in $ctrl.sayonaraSite.pages[0].entryTypes[0].entries |\n      orderBy: [\'order\', \'-date\']"\n      ng-show="$ctrl.entryCategoryFilter(entry)"\n      style="animation-delay: {{ (0.015 * (($index % 15) + 1)) + \'s\' }}">\n      <!-- Background Image -->\n      <img class="c-main__entry__image"\n      alt="{{entry.title}}"\n      ng-src="{{$ctrl.entryHelper.getEntryImageSource(entry)}}" />\n\n      <!-- Play button Overlay -->\n      <img class="c-main__entry__image--play-button"\n      alt="Play Button"\n      ng-if="$ctrl.entryHelper.isVideo(entry)"\n      src="{{$ctrl.playButtonImage}}" />\n\n      <!-- Overlay on hover -->\n      <div class="c-main__entry__overlay"\n      ng-click="$ctrl.goToEntry(entry)">\n        <h3 class="c-main__entry__overlay__title">\n          {{entry.title}}\n        </h3>\n      </div>\n    </div>\n  </div>\n</div>\n'},function(module,exports){module.exports='<div class="c-page animated fadeIn">\n  <h2 class="c-page__title">\n    {{$ctrl.getPage().title}}\n  </h2>\n\n  <div class="c-page__content"\n    ng-if="$ctrl.getPage().content"\n    ng-bind-html="$ctrl.$sce.trustAsHtml($ctrl.getPage().content)">\n  </div>\n</div>\n'},function(module,exports){module.exports='<div class="angular-navbar animated fadeIn">\n  <!-- Desktop Horizontal Navbar -->\n  <div class="angular-navbar__desktop"\n    ng-class="{\'angular-navbar__desktop--always-show\':\n      $ctrl.navbarRouteService.alwaysDesktop,\n      \'angular-navbar__desktop--always-hide\':\n        $ctrl.navbarRouteService.alwaysMobile}">\n    <!-- Title -->\n    <div ng-if="$ctrl.navbarRouteService.title &&\n      !$ctrl.navbarRouteService.titleRoute"\n      class="angular-navbar__desktop__title">\n      {{$ctrl.navbarRouteService.title}}\n    </div>\n\n    <!-- Title Route -->\n    <div ng-if="$ctrl.navbarRouteService.titleRoute"\n      class="angular-navbar__desktop__title--route"\n      ng-click="$ctrl.goToState($ctrl.navbarRouteService.titleRoute)">\n      {{$ctrl.navbarRouteService.title}}\n    </div>\n\n    <ul class="angular-navbar__desktop__list">\n      <li ng-repeat="route in $ctrl.navbarRouteService.getRoutes()"\n        ng-click="$ctrl.goToState(route)"\n        class="angular-navbar__desktop__list__item"\n        ng-class="{\'angular-navbar__desktop__list__item--active\': $ctrl.isActive(route)}">\n        {{route.title}}\n      </li>\n    </ul>\n  </div>\n\n  <!-- Mobile Sidenav bar -->\n  <div class="angular-navbar__mobile"\n  ng-class="{\'angular-navbar__mobile--always-show\':\n    $ctrl.navbarRouteService.alwaysMobile,\n    \'angular-navbar__mobile--always-hide\':\n      $ctrl.navbarRouteService.alwaysDesktop}">\n\n    <!-- Hamburger menu button -->\n    <div class="angular-navbar__mobile__hamburger"\n      ng-click="$ctrl.showNav = true">\n      <div class="angular-navbar__mobile__hamburger__bar">\n      </div>\n      <div class="angular-navbar__mobile__hamburger__bar">\n      </div>\n      <div class="angular-navbar__mobile__hamburger__bar">\n      </div>\n    </div>\n\n    <!-- Title -->\n    <div ng-if="$ctrl.navbarRouteService.title &&\n      !$ctrl.navbarRouteService.titleRoute"\n      class="angular-navbar__mobile__title">\n      {{$ctrl.navbarRouteService.title}}\n    </div>\n\n    <!-- Title Route -->\n    <div ng-if="$ctrl.navbarRouteService.titleRoute"\n      class="angular-navbar__mobile__title--route"\n      ng-click="$ctrl.goToState($ctrl.navbarRouteService.titleRoute)">\n      {{$ctrl.navbarRouteService.title}}\n    </div>\n\n    <!-- Semi Transparent background -->\n    <div class="angular-navbar__mobile__shade"\n      ng-class="{\'angular-navbar__mobile__shade--nav-active\': $ctrl.showNav}"\n      ng-click="$ctrl.showNav = false">\n    </div>\n\n    <!-- Sidenav that slides in -->\n    <div class="angular-navbar__mobile__sidenav"\n      ng-class="{\'angular-navbar__mobile__sidenav--nav-active\': $ctrl.showNav}">\n\n      <!-- Title -->\n      <div ng-if="$ctrl.navbarRouteService.title &&\n        !$ctrl.navbarRouteService.titleRoute"\n        class="angular-navbar__mobile__sidenav__title">\n        {{$ctrl.navbarRouteService.title}}\n      </div>\n\n      <!-- Title Route -->\n      <div ng-if="$ctrl.navbarRouteService.titleRoute"\n        class="angular-navbar__mobile__sidenav__title--route"\n        ng-click="$ctrl.goToState($ctrl.navbarRouteService.titleRoute)">\n        {{$ctrl.navbarRouteService.title}}\n      </div>\n\n      <ul class="angular-navbar__mobile__sidenav__list">\n        <li ng-repeat="route in $ctrl.navbarRouteService.getRoutes()"\n          ng-click="$ctrl.goToState(route)"\n          class="angular-navbar__mobile__sidenav__list__item"\n          ng-class="{\'angular-navbar__mobile__sidenav__list__item--active\': $ctrl.isActive(route)}">\n          {{route.title}}\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n'},function(module,exports,__webpack_require__){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),NavbarController=function(){function NavbarController($log,$state,$stateParams,$location,navbarRouteService){_classCallCheck(this,NavbarController),this.$log=$log,this.$state=$state,this.$stateParams=$stateParams,this.$location=$location,this.navbarRouteService=navbarRouteService,this.showNav=!1}return NavbarController.$inject=["$log","$state","$stateParams","$location","navbarRouteService"],_createClass(NavbarController,[{key:"isActive",value:function isActive(route){var _this=this;if(route.state){if(route.stateParams){var paramsValid=!0;return Object.keys(route.stateParams).some(function(param){return _this.$stateParams[param]!==route.stateParams[param]&&(paramsValid=!1,!0)}),paramsValid&&this.$state.includes(route.state)}return this.$state.includes(route.state)}return route.url?this.$location.path().includes(route.url):(this.$log.err("Angular Navbar: Route object must contain a 'state' or 'url' key"),!1)}},{key:"goToState",value:function goToState(route){route.state?route.stateParams?this.$state.go(route.state,route.stateParams):this.$state.go(route.state):route.url&&this.$location.path(route.url),this.showNav=!1}}]),NavbarController}(),Navbar=exports.Navbar={template:__webpack_require__(14),controller:NavbarController}},function(module,exports,__webpack_require__){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),NavbarRouteService=function(){function NavbarRouteService(){_classCallCheck(this,NavbarRouteService),this.title="",this.titleRoute={},this.routes={},this.activeRoute="",this.alwaysDesktop=!1,this.alwaysMobile=!1}return _createClass(NavbarRouteService,[{key:"setRoutes",value:function setRoutes(routes){this.routes=routes}},{key:"setTitle",value:function setTitle(title,route){this.title=title,route&&(this.titleRoute=route)}},{key:"getRoutes",value:function getRoutes(){return this.routes}},{key:"enableAlwaysDesktop",value:function enableAlwaysDesktop(){this.alwaysDesktop=!0,this.alwaysMobile=!1}},{key:"enableAlwaysMobile",value:function enableAlwaysMobile(){this.alwaysDesktop=!1,this.alwaysMobile=!0}}]),NavbarRouteService}();exports.default=NavbarRouteService},function(module,exports){module.exports="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xMCAxNi41bDYtNC41LTYtNC41djl6TTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPgo8L3N2Zz4="},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _angular=__webpack_require__(0),_angular2=_interopRequireDefault(_angular),_index=__webpack_require__(8);__webpack_require__(1);var _routes=__webpack_require__(9),_routes2=_interopRequireDefault(_routes),_sayonara=__webpack_require__(7),_sayonara2=_interopRequireDefault(_sayonara),_main=__webpack_require__(5),_entry=__webpack_require__(4),_page=__webpack_require__(6);__webpack_require__(3),_angular2.default.module("app",[_index.angularNavbarModule,"ui.router"]).config(_routes2.default).service("sayonaraService",_sayonara2.default).run(function($log,$timeout,sayonaraService,navbarRouteService){sayonaraService.getSite().then(function(response){$timeout(function(){navbarRouteService.setTitle(response.siteName,{title:"Home",state:"app",url:"/"});var navbarRoutes=[];response.pages.forEach(function(page,index){0===index?navbarRoutes.push({title:page.title,state:"app",url:"/"}):navbarRoutes.push({title:page.title,state:"page",stateParams:{title:page.title},url:"/page/"+page.title})}),navbarRouteService.setRoutes(navbarRoutes)},0)})}).component("app",_main.main).component("entry",_entry.entry).component("page",_page.page)}],[18]);