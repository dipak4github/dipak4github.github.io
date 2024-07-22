/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/img/boostrix.png":
/*!*************************************!*\
  !*** ./src/assets/img/boostrix.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "71e2af7f7817941a45fee9733d946ca6.png";

/***/ }),

/***/ "./src/assets/img/gsk.png":
/*!********************************!*\
  !*** ./src/assets/img/gsk.png ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d973b0ce82e9e97387d84501adaf53b7.png";

/***/ }),

/***/ "./src/assets/img/me.png":
/*!*******************************!*\
  !*** ./src/assets/img/me.png ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6e4c3993c5891a68f351db517ad8d363.png";

/***/ }),

/***/ "./src/assets/img/merck.png":
/*!**********************************!*\
  !*** ./src/assets/img/merck.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "961456104379bde7fbb4bd2db11d2a5d.png";

/***/ }),

/***/ "./src/assets/img/novak.png":
/*!**********************************!*\
  !*** ./src/assets/img/novak.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f4bf038044bfb9ede28dec585fbd3eef.png";

/***/ }),

/***/ "./src/assets/img/sinciguena.png":
/*!***************************************!*\
  !*** ./src/assets/img/sinciguena.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6db6a32e7842ba37f967d24cb5e9b09f.png";

/***/ }),

/***/ "./src/assets/img/stockvideos.png":
/*!****************************************!*\
  !*** ./src/assets/img/stockvideos.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d23d1f75b37973a50a1be81ceeb5bfc7.png";

/***/ }),

/***/ "./src/assets/img/thankyou.png":
/*!*************************************!*\
  !*** ./src/assets/img/thankyou.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a1338170f8da5d51b3ea1f9bfa103de4.png";

/***/ }),

/***/ "./src/assets/img/tivicay.png":
/*!************************************!*\
  !*** ./src/assets/img/tivicay.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3f5b76b141233c251fe9f03618306bbd.png";

/***/ }),

/***/ "./src/assets/img/wdupload.png":
/*!*************************************!*\
  !*** ./src/assets/img/wdupload.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8ea60932c4da825eeadc761e02e014c3.png";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.esm.js");
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.scss */ "./src/main.scss");
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_img_me_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/img/me.png */ "./src/assets/img/me.png");
/* harmony import */ var _assets_img_me_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_img_me_png__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_img_wdupload_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/img/wdupload.png */ "./src/assets/img/wdupload.png");
/* harmony import */ var _assets_img_wdupload_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_img_wdupload_png__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_img_boostrix_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/img/boostrix.png */ "./src/assets/img/boostrix.png");
/* harmony import */ var _assets_img_boostrix_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_img_boostrix_png__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_img_stockvideos_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/img/stockvideos.png */ "./src/assets/img/stockvideos.png");
/* harmony import */ var _assets_img_stockvideos_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_img_stockvideos_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_img_novak_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets/img/novak.png */ "./src/assets/img/novak.png");
/* harmony import */ var _assets_img_novak_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_img_novak_png__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assets_img_merck_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./assets/img/merck.png */ "./src/assets/img/merck.png");
/* harmony import */ var _assets_img_merck_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_img_merck_png__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _assets_img_tivicay_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./assets/img/tivicay.png */ "./src/assets/img/tivicay.png");
/* harmony import */ var _assets_img_tivicay_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_img_tivicay_png__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _assets_img_thankyou_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./assets/img/thankyou.png */ "./src/assets/img/thankyou.png");
/* harmony import */ var _assets_img_thankyou_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_img_thankyou_png__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _assets_img_gsk_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./assets/img/gsk.png */ "./src/assets/img/gsk.png");
/* harmony import */ var _assets_img_gsk_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_assets_img_gsk_png__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _assets_img_sinciguena_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./assets/img/sinciguena.png */ "./src/assets/img/sinciguena.png");
/* harmony import */ var _assets_img_sinciguena_png__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_assets_img_sinciguena_png__WEBPACK_IMPORTED_MODULE_11__);

















const websites = [
    {
        title: "Wdupload - Cloud Storage",
        img: _assets_img_wdupload_png__WEBPACK_IMPORTED_MODULE_3___default.a,
        link: "https://www.wdupload.com",
        background: "has-background-dark",
        content: {
            tags: ["HTML", "CSS", "jQuery", "PHP", "UI Design & Development", "Payment Integrations"],
            description: "This site has been built on core PHP framework. The site based on building desktop online storage web system with membership plans. This project involved building UX & UI as per client’s requirement, implement the UI using plain CSS and jQuery, building the services with core PHP and integrating them with UI."
        }
    },
    {
        title: "Stockvideos ",
        img: _assets_img_stockvideos_png__WEBPACK_IMPORTED_MODULE_5___default.a,
        link: "https://stockvideos.com",
        content: {
            tags: ["HTML", "CSS", "jQuery", "Wordpress", "3 Level Membership System", "Payment Integrations", "Theme & Plugin Customization"],
            description: "This website are built on WordPress framework and most of them are either WooCommerce or content design websites. The work involved theme & plugin customizations, UI customizations on the theme using html and jQuery, building the provided UI using free themes/template, integrating services like google map with a existing WordPress system."
        }
    },
    {
        title: "GSK Health Partner",
        img: _assets_img_gsk_png__WEBPACK_IMPORTED_MODULE_10___default.a,
        link: "https://gskhealthpartner.com/en-us/",
        content: {
            tags: ['HTML', 'CSS', 'jQuery', 'Bootstrap', 'AEM', 'Gigya RaaS Integration', 'Shopping', "UI Design & Development"],
            description: "This site are built in AEM framework. Codebase was managed by GIT and for CSS we used SASS pre-processor with bootstrap library. In these projects, work was to build the UI based on uniform style-guide provided in PDF/PSDs using Common reusable AEM components. Also, I have built a custom component using jQuery AJAX for handling external APIs and integration with the existing design."
        }
    },
    {
        title: "Boostrix",
        img: _assets_img_boostrix_png__WEBPACK_IMPORTED_MODULE_4___default.a,
        link: "https://boostrix.com",
        content: {
            tags: ["HTML", "CSS", "jQuery", "PHP", "UI Development"],
            description: "This site are built in AEM framework. Codebase was managed by GIT and for CSS we used SASS pre-processor with bootstrap library. In these projects, work was to build the UI based on uniform style-guide provided in PDF/PSDs using Common reusable AEM components. Also, I have built a custom component using jQuery AJAX for handling external APIs and integration with the existing design."
        }
    },
    {
        title: "Novak",
        img: _assets_img_novak_png__WEBPACK_IMPORTED_MODULE_6___default.a,
        link: "https://novakcontracting.com/",
        content: {
            tags: ['HTML','CSS', 'jQuery','Wordpress','UI Development', 'Theme Customization'],
            description: "This website are built on WordPress framework and most of them are either WooCommerce or content design websites. The work involved theme & plugin customizations, UI customizations on the theme using html and jQuery, building the provided UI using free themes/template, integrating services like google map with a existing WordPress system."
        }
    },
    {
        title: "Merck Group",
        img: _assets_img_merck_png__WEBPACK_IMPORTED_MODULE_7___default.a,
        link: "https://www.medimerck.fr/fr_FR/accueil.html",
        content: {
            tags: ["HTML", "CSS", "jQuery", "AEM", "UI Design & Development", "Components Development"],
            description: "This site are built in AEM framework. Codebase was managed by GIT and for CSS we used SASS pre-processor with bootstrap library. In these projects, work was to build the UI based on uniform style-guide provided in PDF/PSDs using Common reusable AEM components. Also, I have built a custom component using jQuery AJAX for handling external APIs and integration with the existing design."
        }
    },
    {
        title: "Merck",
        img: _assets_img_thankyou_png__WEBPACK_IMPORTED_MODULE_9___default.a,
        link: "https://www.yourprediabetes.info/en/home.html",
        content: {
            tags: ["HTML", "CSS", "jQuery", "AEM", "UI Design & Development"],
            description: "This site are built in AEM framework. Codebase was managed by GIT and for CSS we used SASS pre-processor with bootstrap library. In these projects, work was to build the UI based on uniform style-guide provided in PDF/PSDs using Common reusable AEM components. Also, I have built a custom component using jQuery AJAX for handling external APIs and integration with the existing design."
        }
    },
    {
        title: "Tivicay",
        img: _assets_img_tivicay_png__WEBPACK_IMPORTED_MODULE_8___default.a,
        link: "https://www.tivicay.co.nz",
        content: {
            tags: ["HTML", "CSS", "jQuery", "AEM", "UI Design & Development"],
            description: "This site are built in AEM framework. Codebase was managed by GIT and for CSS we used SASS pre-processor with bootstrap library. In these projects, work was to build the UI based on uniform style-guide provided in PDF/PSDs using Common reusable AEM components. Also, I have built a custom component using jQuery AJAX for handling external APIs and integration with the existing design."
        }
    },
    {
        title: "Sinciguena",
        img: _assets_img_sinciguena_png__WEBPACK_IMPORTED_MODULE_11___default.a,
        link: "https://www.sinciguena.com/",
        content: {
            tags: ["HTML", "CSS", "jQuery", "Wordpress", "UI Design & Development"],
            description: "This website are built on WordPress framework and most of them are either WooCommerce or content design websites. The work involved theme & plugin customizations, UI customizations on the theme using html and jQuery, building the provided UI using free themes/template, integrating services like google map with a existing WordPress system."
        }
    }
];

const buildGallery = () => {
    let markUp = "";
    websites.forEach((project, index) => {
        markUp += `
            <div class="tile is-parent is-4 this-project">
                <article class="tile is-child box">
                    <a data-project="${index}" class="is-clickable">
                        <img src="${project.img}" / >
                    </a>
                </article>
            </div>
        `;
    });  
    Object(cash_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(".this-gallery").append(Object(cash_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(markUp));
}

const buildModalContent = ({tags, description}) => {
    let tagsMarkUp = "";
    tags.forEach(tag => {
        tagsMarkUp += `<span class="tag is-dark">${tag}</span>`;
    });
    return `
        <div class="tags">${tagsMarkUp}</div>
        <div class="content">${description}</div>
    `;
}

const buildModal = projectId => {
    const project = websites[projectId];
    const Modal = `
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">${project.title}</p>
                    <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">${buildModalContent(project.content)}</section>
                <footer class="modal-card-foot">
                    <a class="button is-warning is-outlined" href="${project.link}" target="_BLANK">Visit</a>
                </footer>
            </div>
        </div>
    `;

    return Modal;
}

const buildMarkUp = () => {
    return `
        <header class="hero has-text-centered">
            <div class="hero-body">
                <div class="container">
                    <figure class="image this-logo">
                        <img src="${_assets_img_me_png__WEBPACK_IMPORTED_MODULE_2___default.a}">
                    </figure>
                    <h1 class="title is-1 is-spaced">Dipak Dhanawade</h1>
                    <h2 class="subtitle content">Graduated from <span class="title is-3 neon">Pune University
     in 2015</span>. Throughout my career, I have consistently worked in small teams, which has allowed me to take on tasks beyond my core responsibilities and gain an adequate understanding of various projects.<br>With <span class="title is-3 neon">9 years of overall experience</span>, including <span class="title is-3 neon">4 years as a Full Stack Developer</span>, I <span class="title is-3 neon">started as a Front End Developer and transitioned to Full Stack Development</span>. I <code>specialize in JavaScript and the React/Redux framework for front-end development and have built web APIs using the .NET framework</code> for the back-end. My experience includes a strong focus on collaboration and adaptability within small team environments.</h2>
                </div>
            </div>
        </header>
        <section class="section has-text-centered ">
            <div class="container">
                <h1 class="title is-2 is-spaced pb-3">This is <span class="neon">my work</span></h1>
                <div class="tile is-ancestor this-gallery"></div>
            </div>
        </section>
        <footer class="hero has-text-centered">
            <div class="hero-body">
                <div class="container">
                    <h2 class="title is-6">
                        Dipak Dhanawade &copy; 2019
                    </h2>
                </div>
            </div>
        </footer>
    `;
}

document.body.innerHTML = buildMarkUp();

buildGallery();
  
Object(cash_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(".this-gallery").find(".is-clickable").on("click", event => {
    event.preventDefault();
    if(event.tagName = "A") {
        const Key = Object(cash_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(event.target).closest(".is-clickable").data("project");
        Object(cash_dom__WEBPACK_IMPORTED_MODULE_0__["default"])("body").append(buildModal(Key));
    }
});
    
Object(cash_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(document).on("click", ".delete", event => { Object(cash_dom__WEBPACK_IMPORTED_MODULE_0__["default"])(".modal.is-active").remove(); });

/***/ }),

/***/ "./src/main.scss":
/*!***********************!*\
  !*** ./src/main.scss ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWcvYm9vc3RyaXgucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1nL2dzay5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWcvbWUucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1nL21lcmNrLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltZy9ub3Zhay5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWcvc2luY2lndWVuYS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9pbWcvc3RvY2t2aWRlb3MucG5nIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvaW1nL3RoYW5reW91LnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltZy90aXZpY2F5LnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ltZy93ZHVwbG9hZC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FB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LDRCQUE0QixXQUFXO0FBQ3ZDLCtCQUErQixZQUFZO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsY0FBYztBQUNoRTtBQUNBO0FBQ0EsbURBQW1ELG1DQUFtQztBQUN0RjtBQUNBLHFFQUFxRSxhQUFhO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHlEQUFFLENBQUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLHdEQUFDO0FBQ0Q7QUFDQTtBQUNBLG9CQUFvQix3REFBQztBQUNyQixRQUFRLHdEQUFDO0FBQ1Q7QUFDQSxDQUFDOztBQUVELHdEQUFDLDRDQUE0QyxDQUFDLHdEQUFDLDhCQUE4QixFQUFFLEU7Ozs7Ozs7Ozs7O0FDak0vRSx1QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibWFpblwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vc3JjL2luZGV4LmpzXCIsXCJ2ZW5kb3Jzfm1haW5cIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI3MWUyYWY3Zjc4MTc5NDFhNDVmZWU5NzMzZDk0NmNhNi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJkOTczYjBjZTgyZTllOTczODdkODQ1MDFhZGFmNTNiNy5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI2ZTRjMzk5M2M1ODkxYTY4ZjM1MWRiNTE3YWQ4ZDM2My5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI5NjE0NTYxMDQzNzliZGU3ZmJiNGJkMmRiMTFkMmE1ZC5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmNGJmMDM4MDQ0YmZiOWVkZTI4ZGVjNTg1ZmJkM2VlZi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI2ZGI2YTMyZTc4NDJiYTM3Zjk2N2QyNGNiNWU5YjA5Zi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJkMjNkMWY3NWIzNzk3M2E1MGExYmU4MWNlZWI1YmZjNy5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhMTMzODE3MGY4ZGE1ZDUxYjNlYTFmOWJmYTEwM2RlNC5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIzZjViNzZiMTQxMjMzYzI1MWZlOWYwMzYxODMwNmJiZC5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCI4ZWE2MDkzMmM0ZGE4MjVlZWFkYzc2MWUwMmUwMTRjMy5wbmdcIjsiLCJpbXBvcnQgJCBmcm9tIFwiY2FzaC1kb21cIjtcclxuaW1wb3J0IFwiLi9tYWluLnNjc3NcIjtcclxuXHJcblxyXG5pbXBvcnQgbWUgZnJvbSBcIi4vYXNzZXRzL2ltZy9tZS5wbmdcIjtcclxuaW1wb3J0IHdkdXBsb2FkIGZyb20gXCIuL2Fzc2V0cy9pbWcvd2R1cGxvYWQucG5nXCI7XHJcbmltcG9ydCBib29zdHJpeCBmcm9tIFwiLi9hc3NldHMvaW1nL2Jvb3N0cml4LnBuZ1wiO1xyXG5pbXBvcnQgc3RvY2t2aWRlb3MgZnJvbSBcIi4vYXNzZXRzL2ltZy9zdG9ja3ZpZGVvcy5wbmdcIjtcclxuaW1wb3J0IG5vdmFrIGZyb20gXCIuL2Fzc2V0cy9pbWcvbm92YWsucG5nXCI7XHJcbmltcG9ydCBtZXJjayBmcm9tIFwiLi9hc3NldHMvaW1nL21lcmNrLnBuZ1wiO1xyXG5pbXBvcnQgdGl2aWNheSBmcm9tIFwiLi9hc3NldHMvaW1nL3RpdmljYXkucG5nXCI7XHJcbmltcG9ydCB0aGFua3lvdSBmcm9tIFwiLi9hc3NldHMvaW1nL3RoYW5reW91LnBuZ1wiO1xyXG5pbXBvcnQgZ3NrIGZyb20gXCIuL2Fzc2V0cy9pbWcvZ3NrLnBuZ1wiO1xyXG5pbXBvcnQgc2luY2lndWVuYSBmcm9tIFwiLi9hc3NldHMvaW1nL3NpbmNpZ3VlbmEucG5nXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHdlYnNpdGVzID0gW1xyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiBcIldkdXBsb2FkIC0gQ2xvdWQgU3RvcmFnZVwiLFxyXG4gICAgICAgIGltZzogd2R1cGxvYWQsXHJcbiAgICAgICAgbGluazogXCJodHRwczovL3d3dy53ZHVwbG9hZC5jb21cIixcclxuICAgICAgICBiYWNrZ3JvdW5kOiBcImhhcy1iYWNrZ3JvdW5kLWRhcmtcIixcclxuICAgICAgICBjb250ZW50OiB7XHJcbiAgICAgICAgICAgIHRhZ3M6IFtcIkhUTUxcIiwgXCJDU1NcIiwgXCJqUXVlcnlcIiwgXCJQSFBcIiwgXCJVSSBEZXNpZ24gJiBEZXZlbG9wbWVudFwiLCBcIlBheW1lbnQgSW50ZWdyYXRpb25zXCJdLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGlzIHNpdGUgaGFzIGJlZW4gYnVpbHQgb24gY29yZSBQSFAgZnJhbWV3b3JrLiBUaGUgc2l0ZSBiYXNlZCBvbiBidWlsZGluZyBkZXNrdG9wIG9ubGluZSBzdG9yYWdlIHdlYiBzeXN0ZW0gd2l0aCBtZW1iZXJzaGlwIHBsYW5zLiBUaGlzIHByb2plY3QgaW52b2x2ZWQgYnVpbGRpbmcgVVggJiBVSSBhcyBwZXIgY2xpZW504oCZcyByZXF1aXJlbWVudCwgaW1wbGVtZW50IHRoZSBVSSB1c2luZyBwbGFpbiBDU1MgYW5kIGpRdWVyeSwgYnVpbGRpbmcgdGhlIHNlcnZpY2VzIHdpdGggY29yZSBQSFAgYW5kIGludGVncmF0aW5nIHRoZW0gd2l0aCBVSS5cIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6IFwiU3RvY2t2aWRlb3MgXCIsXHJcbiAgICAgICAgaW1nOiBzdG9ja3ZpZGVvcyxcclxuICAgICAgICBsaW5rOiBcImh0dHBzOi8vc3RvY2t2aWRlb3MuY29tXCIsXHJcbiAgICAgICAgY29udGVudDoge1xyXG4gICAgICAgICAgICB0YWdzOiBbXCJIVE1MXCIsIFwiQ1NTXCIsIFwialF1ZXJ5XCIsIFwiV29yZHByZXNzXCIsIFwiMyBMZXZlbCBNZW1iZXJzaGlwIFN5c3RlbVwiLCBcIlBheW1lbnQgSW50ZWdyYXRpb25zXCIsIFwiVGhlbWUgJiBQbHVnaW4gQ3VzdG9taXphdGlvblwiXSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGhpcyB3ZWJzaXRlIGFyZSBidWlsdCBvbiBXb3JkUHJlc3MgZnJhbWV3b3JrIGFuZCBtb3N0IG9mIHRoZW0gYXJlIGVpdGhlciBXb29Db21tZXJjZSBvciBjb250ZW50IGRlc2lnbiB3ZWJzaXRlcy4gVGhlIHdvcmsgaW52b2x2ZWQgdGhlbWUgJiBwbHVnaW4gY3VzdG9taXphdGlvbnMsIFVJIGN1c3RvbWl6YXRpb25zIG9uIHRoZSB0aGVtZSB1c2luZyBodG1sIGFuZCBqUXVlcnksIGJ1aWxkaW5nIHRoZSBwcm92aWRlZCBVSSB1c2luZyBmcmVlIHRoZW1lcy90ZW1wbGF0ZSwgaW50ZWdyYXRpbmcgc2VydmljZXMgbGlrZSBnb29nbGUgbWFwIHdpdGggYSBleGlzdGluZyBXb3JkUHJlc3Mgc3lzdGVtLlwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0aXRsZTogXCJHU0sgSGVhbHRoIFBhcnRuZXJcIixcclxuICAgICAgICBpbWc6IGdzayxcclxuICAgICAgICBsaW5rOiBcImh0dHBzOi8vZ3NraGVhbHRocGFydG5lci5jb20vZW4tdXMvXCIsXHJcbiAgICAgICAgY29udGVudDoge1xyXG4gICAgICAgICAgICB0YWdzOiBbJ0hUTUwnLCAnQ1NTJywgJ2pRdWVyeScsICdCb290c3RyYXAnLCAnQUVNJywgJ0dpZ3lhIFJhYVMgSW50ZWdyYXRpb24nLCAnU2hvcHBpbmcnLCBcIlVJIERlc2lnbiAmIERldmVsb3BtZW50XCJdLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGlzIHNpdGUgYXJlIGJ1aWx0IGluIEFFTSBmcmFtZXdvcmsuIENvZGViYXNlIHdhcyBtYW5hZ2VkIGJ5IEdJVCBhbmQgZm9yIENTUyB3ZSB1c2VkIFNBU1MgcHJlLXByb2Nlc3NvciB3aXRoIGJvb3RzdHJhcCBsaWJyYXJ5LiBJbiB0aGVzZSBwcm9qZWN0cywgd29yayB3YXMgdG8gYnVpbGQgdGhlIFVJIGJhc2VkIG9uIHVuaWZvcm0gc3R5bGUtZ3VpZGUgcHJvdmlkZWQgaW4gUERGL1BTRHMgdXNpbmcgQ29tbW9uIHJldXNhYmxlIEFFTSBjb21wb25lbnRzLiBBbHNvLCBJIGhhdmUgYnVpbHQgYSBjdXN0b20gY29tcG9uZW50IHVzaW5nIGpRdWVyeSBBSkFYIGZvciBoYW5kbGluZyBleHRlcm5hbCBBUElzIGFuZCBpbnRlZ3JhdGlvbiB3aXRoIHRoZSBleGlzdGluZyBkZXNpZ24uXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiBcIkJvb3N0cml4XCIsXHJcbiAgICAgICAgaW1nOiBib29zdHJpeCxcclxuICAgICAgICBsaW5rOiBcImh0dHBzOi8vYm9vc3RyaXguY29tXCIsXHJcbiAgICAgICAgY29udGVudDoge1xyXG4gICAgICAgICAgICB0YWdzOiBbXCJIVE1MXCIsIFwiQ1NTXCIsIFwialF1ZXJ5XCIsIFwiUEhQXCIsIFwiVUkgRGV2ZWxvcG1lbnRcIl0sXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgc2l0ZSBhcmUgYnVpbHQgaW4gQUVNIGZyYW1ld29yay4gQ29kZWJhc2Ugd2FzIG1hbmFnZWQgYnkgR0lUIGFuZCBmb3IgQ1NTIHdlIHVzZWQgU0FTUyBwcmUtcHJvY2Vzc29yIHdpdGggYm9vdHN0cmFwIGxpYnJhcnkuIEluIHRoZXNlIHByb2plY3RzLCB3b3JrIHdhcyB0byBidWlsZCB0aGUgVUkgYmFzZWQgb24gdW5pZm9ybSBzdHlsZS1ndWlkZSBwcm92aWRlZCBpbiBQREYvUFNEcyB1c2luZyBDb21tb24gcmV1c2FibGUgQUVNIGNvbXBvbmVudHMuIEFsc28sIEkgaGF2ZSBidWlsdCBhIGN1c3RvbSBjb21wb25lbnQgdXNpbmcgalF1ZXJ5IEFKQVggZm9yIGhhbmRsaW5nIGV4dGVybmFsIEFQSXMgYW5kIGludGVncmF0aW9uIHdpdGggdGhlIGV4aXN0aW5nIGRlc2lnbi5cIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6IFwiTm92YWtcIixcclxuICAgICAgICBpbWc6IG5vdmFrLFxyXG4gICAgICAgIGxpbms6IFwiaHR0cHM6Ly9ub3Zha2NvbnRyYWN0aW5nLmNvbS9cIixcclxuICAgICAgICBjb250ZW50OiB7XHJcbiAgICAgICAgICAgIHRhZ3M6IFsnSFRNTCcsJ0NTUycsICdqUXVlcnknLCdXb3JkcHJlc3MnLCdVSSBEZXZlbG9wbWVudCcsICdUaGVtZSBDdXN0b21pemF0aW9uJ10sXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoaXMgd2Vic2l0ZSBhcmUgYnVpbHQgb24gV29yZFByZXNzIGZyYW1ld29yayBhbmQgbW9zdCBvZiB0aGVtIGFyZSBlaXRoZXIgV29vQ29tbWVyY2Ugb3IgY29udGVudCBkZXNpZ24gd2Vic2l0ZXMuIFRoZSB3b3JrIGludm9sdmVkIHRoZW1lICYgcGx1Z2luIGN1c3RvbWl6YXRpb25zLCBVSSBjdXN0b21pemF0aW9ucyBvbiB0aGUgdGhlbWUgdXNpbmcgaHRtbCBhbmQgalF1ZXJ5LCBidWlsZGluZyB0aGUgcHJvdmlkZWQgVUkgdXNpbmcgZnJlZSB0aGVtZXMvdGVtcGxhdGUsIGludGVncmF0aW5nIHNlcnZpY2VzIGxpa2UgZ29vZ2xlIG1hcCB3aXRoIGEgZXhpc3RpbmcgV29yZFByZXNzIHN5c3RlbS5cIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6IFwiTWVyY2sgR3JvdXBcIixcclxuICAgICAgICBpbWc6IG1lcmNrLFxyXG4gICAgICAgIGxpbms6IFwiaHR0cHM6Ly93d3cubWVkaW1lcmNrLmZyL2ZyX0ZSL2FjY3VlaWwuaHRtbFwiLFxyXG4gICAgICAgIGNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgdGFnczogW1wiSFRNTFwiLCBcIkNTU1wiLCBcImpRdWVyeVwiLCBcIkFFTVwiLCBcIlVJIERlc2lnbiAmIERldmVsb3BtZW50XCIsIFwiQ29tcG9uZW50cyBEZXZlbG9wbWVudFwiXSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGhpcyBzaXRlIGFyZSBidWlsdCBpbiBBRU0gZnJhbWV3b3JrLiBDb2RlYmFzZSB3YXMgbWFuYWdlZCBieSBHSVQgYW5kIGZvciBDU1Mgd2UgdXNlZCBTQVNTIHByZS1wcm9jZXNzb3Igd2l0aCBib290c3RyYXAgbGlicmFyeS4gSW4gdGhlc2UgcHJvamVjdHMsIHdvcmsgd2FzIHRvIGJ1aWxkIHRoZSBVSSBiYXNlZCBvbiB1bmlmb3JtIHN0eWxlLWd1aWRlIHByb3ZpZGVkIGluIFBERi9QU0RzIHVzaW5nIENvbW1vbiByZXVzYWJsZSBBRU0gY29tcG9uZW50cy4gQWxzbywgSSBoYXZlIGJ1aWx0IGEgY3VzdG9tIGNvbXBvbmVudCB1c2luZyBqUXVlcnkgQUpBWCBmb3IgaGFuZGxpbmcgZXh0ZXJuYWwgQVBJcyBhbmQgaW50ZWdyYXRpb24gd2l0aCB0aGUgZXhpc3RpbmcgZGVzaWduLlwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0aXRsZTogXCJNZXJja1wiLFxyXG4gICAgICAgIGltZzogdGhhbmt5b3UsXHJcbiAgICAgICAgbGluazogXCJodHRwczovL3d3dy55b3VycHJlZGlhYmV0ZXMuaW5mby9lbi9ob21lLmh0bWxcIixcclxuICAgICAgICBjb250ZW50OiB7XHJcbiAgICAgICAgICAgIHRhZ3M6IFtcIkhUTUxcIiwgXCJDU1NcIiwgXCJqUXVlcnlcIiwgXCJBRU1cIiwgXCJVSSBEZXNpZ24gJiBEZXZlbG9wbWVudFwiXSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGhpcyBzaXRlIGFyZSBidWlsdCBpbiBBRU0gZnJhbWV3b3JrLiBDb2RlYmFzZSB3YXMgbWFuYWdlZCBieSBHSVQgYW5kIGZvciBDU1Mgd2UgdXNlZCBTQVNTIHByZS1wcm9jZXNzb3Igd2l0aCBib290c3RyYXAgbGlicmFyeS4gSW4gdGhlc2UgcHJvamVjdHMsIHdvcmsgd2FzIHRvIGJ1aWxkIHRoZSBVSSBiYXNlZCBvbiB1bmlmb3JtIHN0eWxlLWd1aWRlIHByb3ZpZGVkIGluIFBERi9QU0RzIHVzaW5nIENvbW1vbiByZXVzYWJsZSBBRU0gY29tcG9uZW50cy4gQWxzbywgSSBoYXZlIGJ1aWx0IGEgY3VzdG9tIGNvbXBvbmVudCB1c2luZyBqUXVlcnkgQUpBWCBmb3IgaGFuZGxpbmcgZXh0ZXJuYWwgQVBJcyBhbmQgaW50ZWdyYXRpb24gd2l0aCB0aGUgZXhpc3RpbmcgZGVzaWduLlwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0aXRsZTogXCJUaXZpY2F5XCIsXHJcbiAgICAgICAgaW1nOiB0aXZpY2F5LFxyXG4gICAgICAgIGxpbms6IFwiaHR0cHM6Ly93d3cudGl2aWNheS5jby5uelwiLFxyXG4gICAgICAgIGNvbnRlbnQ6IHtcclxuICAgICAgICAgICAgdGFnczogW1wiSFRNTFwiLCBcIkNTU1wiLCBcImpRdWVyeVwiLCBcIkFFTVwiLCBcIlVJIERlc2lnbiAmIERldmVsb3BtZW50XCJdLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGlzIHNpdGUgYXJlIGJ1aWx0IGluIEFFTSBmcmFtZXdvcmsuIENvZGViYXNlIHdhcyBtYW5hZ2VkIGJ5IEdJVCBhbmQgZm9yIENTUyB3ZSB1c2VkIFNBU1MgcHJlLXByb2Nlc3NvciB3aXRoIGJvb3RzdHJhcCBsaWJyYXJ5LiBJbiB0aGVzZSBwcm9qZWN0cywgd29yayB3YXMgdG8gYnVpbGQgdGhlIFVJIGJhc2VkIG9uIHVuaWZvcm0gc3R5bGUtZ3VpZGUgcHJvdmlkZWQgaW4gUERGL1BTRHMgdXNpbmcgQ29tbW9uIHJldXNhYmxlIEFFTSBjb21wb25lbnRzLiBBbHNvLCBJIGhhdmUgYnVpbHQgYSBjdXN0b20gY29tcG9uZW50IHVzaW5nIGpRdWVyeSBBSkFYIGZvciBoYW5kbGluZyBleHRlcm5hbCBBUElzIGFuZCBpbnRlZ3JhdGlvbiB3aXRoIHRoZSBleGlzdGluZyBkZXNpZ24uXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiBcIlNpbmNpZ3VlbmFcIixcclxuICAgICAgICBpbWc6IHNpbmNpZ3VlbmEsXHJcbiAgICAgICAgbGluazogXCJodHRwczovL3d3dy5zaW5jaWd1ZW5hLmNvbS9cIixcclxuICAgICAgICBjb250ZW50OiB7XHJcbiAgICAgICAgICAgIHRhZ3M6IFtcIkhUTUxcIiwgXCJDU1NcIiwgXCJqUXVlcnlcIiwgXCJXb3JkcHJlc3NcIiwgXCJVSSBEZXNpZ24gJiBEZXZlbG9wbWVudFwiXSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGhpcyB3ZWJzaXRlIGFyZSBidWlsdCBvbiBXb3JkUHJlc3MgZnJhbWV3b3JrIGFuZCBtb3N0IG9mIHRoZW0gYXJlIGVpdGhlciBXb29Db21tZXJjZSBvciBjb250ZW50IGRlc2lnbiB3ZWJzaXRlcy4gVGhlIHdvcmsgaW52b2x2ZWQgdGhlbWUgJiBwbHVnaW4gY3VzdG9taXphdGlvbnMsIFVJIGN1c3RvbWl6YXRpb25zIG9uIHRoZSB0aGVtZSB1c2luZyBodG1sIGFuZCBqUXVlcnksIGJ1aWxkaW5nIHRoZSBwcm92aWRlZCBVSSB1c2luZyBmcmVlIHRoZW1lcy90ZW1wbGF0ZSwgaW50ZWdyYXRpbmcgc2VydmljZXMgbGlrZSBnb29nbGUgbWFwIHdpdGggYSBleGlzdGluZyBXb3JkUHJlc3Mgc3lzdGVtLlwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5dO1xyXG5cclxuY29uc3QgYnVpbGRHYWxsZXJ5ID0gKCkgPT4ge1xyXG4gICAgbGV0IG1hcmtVcCA9IFwiXCI7XHJcbiAgICB3ZWJzaXRlcy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgIG1hcmtVcCArPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aWxlIGlzLXBhcmVudCBpcy00IHRoaXMtcHJvamVjdFwiPlxyXG4gICAgICAgICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJ0aWxlIGlzLWNoaWxkIGJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGRhdGEtcHJvamVjdD1cIiR7aW5kZXh9XCIgY2xhc3M9XCJpcy1jbGlja2FibGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Byb2plY3QuaW1nfVwiIC8gPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDwvYXJ0aWNsZT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuICAgIH0pOyAgXHJcbiAgICAkKFwiLnRoaXMtZ2FsbGVyeVwiKS5hcHBlbmQoJChtYXJrVXApKTtcclxufVxyXG5cclxuY29uc3QgYnVpbGRNb2RhbENvbnRlbnQgPSAoe3RhZ3MsIGRlc2NyaXB0aW9ufSkgPT4ge1xyXG4gICAgbGV0IHRhZ3NNYXJrVXAgPSBcIlwiO1xyXG4gICAgdGFncy5mb3JFYWNoKHRhZyA9PiB7XHJcbiAgICAgICAgdGFnc01hcmtVcCArPSBgPHNwYW4gY2xhc3M9XCJ0YWcgaXMtZGFya1wiPiR7dGFnfTwvc3Bhbj5gO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdzXCI+JHt0YWdzTWFya1VwfTwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+JHtkZXNjcmlwdGlvbn08L2Rpdj5cclxuICAgIGA7XHJcbn1cclxuXHJcbmNvbnN0IGJ1aWxkTW9kYWwgPSBwcm9qZWN0SWQgPT4ge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IHdlYnNpdGVzW3Byb2plY3RJZF07XHJcbiAgICBjb25zdCBNb2RhbCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwgaXMtYWN0aXZlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1iYWNrZ3JvdW5kXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jYXJkXCI+XHJcbiAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzPVwibW9kYWwtY2FyZC1oZWFkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJtb2RhbC1jYXJkLXRpdGxlXCI+JHtwcm9qZWN0LnRpdGxlfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlXCIgYXJpYS1sYWJlbD1cImNsb3NlXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2hlYWRlcj5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzPVwibW9kYWwtY2FyZC1ib2R5XCI+JHtidWlsZE1vZGFsQ29udGVudChwcm9qZWN0LmNvbnRlbnQpfTwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCJtb2RhbC1jYXJkLWZvb3RcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ1dHRvbiBpcy13YXJuaW5nIGlzLW91dGxpbmVkXCIgaHJlZj1cIiR7cHJvamVjdC5saW5rfVwiIHRhcmdldD1cIl9CTEFOS1wiPlZpc2l0PC9hPlxyXG4gICAgICAgICAgICAgICAgPC9mb290ZXI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuXHJcbiAgICByZXR1cm4gTW9kYWw7XHJcbn1cclxuXHJcbmNvbnN0IGJ1aWxkTWFya1VwID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICA8aGVhZGVyIGNsYXNzPVwiaGVybyBoYXMtdGV4dC1jZW50ZXJlZFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVyby1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGZpZ3VyZSBjbGFzcz1cImltYWdlIHRoaXMtbG9nb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7bWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9maWd1cmU+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwidGl0bGUgaXMtMSBpcy1zcGFjZWRcIj5EaXBhayBEaGFuYXdhZGU8L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInN1YnRpdGxlIGNvbnRlbnRcIj5IaSwgSSBhbSBhIDxzcGFuIGNsYXNzPVwidGl0bGUgaXMtMyBuZW9uXCI+V2ViIERldmVsb3Blcjwvc3Bhbj4uPGJyIC8+IEkgZ290IDxzcGFuIGNsYXNzPVwidGl0bGUgaXMtMyBuZW9uXCI+NCB5ZWFycyBvZiBleHBlcmllbmNlPC9zcGFuPiBpbiB0aGlzIGZpZWxkLjxiciAvPiBDdXJyZW50bHksIEkgYW0gd29ya2luZyBhcyA8c3BhbiBjbGFzcz1cInRpdGxlIGlzLTMgbmVvblwiPlRlY2hub2xvZ3kgU3BlY2lhbHR5PC9zcGFuPiBpbiA8c3BhbiBjbGFzcz1cInRpdGxlIGlzLTMgbmVvblwiPkluZm9zeXMgQlBNIFB2dCBMdGQuPC9zcGFuPjwvaDI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9oZWFkZXI+XHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJzZWN0aW9uIGhhcy10ZXh0LWNlbnRlcmVkIFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJ0aXRsZSBpcy0yIGlzLXNwYWNlZCBwYi0zXCI+VGhpcyBpcyA8c3BhbiBjbGFzcz1cIm5lb25cIj5teSB3b3JrPC9zcGFuPjwvaDE+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGlsZSBpcy1hbmNlc3RvciB0aGlzLWdhbGxlcnlcIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgIDxmb290ZXIgY2xhc3M9XCJoZXJvIGhhcy10ZXh0LWNlbnRlcmVkXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZXJvLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZSBpcy02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERpcGFrIERoYW5hd2FkZSAmY29weTsgMjAxOVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9mb290ZXI+XHJcbiAgICBgO1xyXG59XHJcblxyXG5kb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGJ1aWxkTWFya1VwKCk7XHJcblxyXG5idWlsZEdhbGxlcnkoKTtcclxuICBcclxuJChcIi50aGlzLWdhbGxlcnlcIikuZmluZChcIi5pcy1jbGlja2FibGVcIikub24oXCJjbGlja1wiLCBldmVudCA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYoZXZlbnQudGFnTmFtZSA9IFwiQVwiKSB7XHJcbiAgICAgICAgY29uc3QgS2V5ID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIuaXMtY2xpY2thYmxlXCIpLmRhdGEoXCJwcm9qZWN0XCIpO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmFwcGVuZChidWlsZE1vZGFsKEtleSkpO1xyXG4gICAgfVxyXG59KTtcclxuICAgIFxyXG4kKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmRlbGV0ZVwiLCBldmVudCA9PiB7ICQoXCIubW9kYWwuaXMtYWN0aXZlXCIpLnJlbW92ZSgpOyB9KTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9
