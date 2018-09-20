(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
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
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/main.js":
/*!**********************!*\
  !*** ./demo/main.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_mauve_viewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/mauve-viewer */ "./src/mauve-viewer.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var api = 'https://p3.theseed.org/services/data_api/genome/';

function main() {
  Promise.all([__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! d3 */ "./node_modules/d3/index.js")), __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.t.bind(null, /*! axios */ "./node_modules/axios/index.js", 7))]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        d3 = _ref2[0],
        axios = _ref2[1];

    axios.get("3-ecoli.json").then(function (res) {
      var data = res.data;
      var ele = document.getElementById('chart');
      new _src_mauve_viewer__WEBPACK_IMPORTED_MODULE_0__["default"]({
        ele: ele,
        data: data,
        d3: d3,
        labels: {}
      });
      return; // use different labels for each track (optional)
      // Todo: store list of names in alginment file

      var ext;
      var ids = [];
      data.forEach(function (lcbs) {
        lcbs.forEach(function (r) {
          ext = r.name.split('.').pop();
          var name = r.name.replace(".".concat(ext), '');
          if (!ids.includes(name)) ids.push(name);
        });
      });
      var url = "".concat(api, "?in(genome_id,(").concat(ids.join(','), "))&select(genome_id,genome_name)");
      axios.get(url).then(function (res) {
        var mapping = {};
        res.data.forEach(function (org) {
          mapping["".concat(org.genome_id, ".").concat(ext)] = org.genome_name;
        });
        new _src_mauve_viewer__WEBPACK_IMPORTED_MODULE_0__["default"]({
          ele: ele,
          data: data,
          d3: d3,
          labels: mapping
        });
      });
    }).catch(function (e) {
      alert("Could not fetch alignment json: ".concat(e.message));
    });
  }).catch(function (error) {
    return 'An error occurred while loading the component';
  });
}

main();

/***/ }),

/***/ "./src/backbone.js":
/*!*************************!*\
  !*** ./src/backbone.js ***!
  \*************************/
/*! exports provided: BackBone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackBone", function() { return BackBone; });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./src/colors.js");
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_colors__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts */ "./src/consts.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var BackBone =
/*#__PURE__*/
function () {
  function BackBone(params) {
    _classCallCheck(this, BackBone);

    this.d3 = params.d3;
    this.svg = params.svg;
    this.data = params.data;
    this.x = params.scale;
    this.render(this.data);
    return this;
  }

  _createClass(BackBone, [{
    key: "render",
    value: function render(data) {
      var _this = this;

      // local (not const)
      var x = this.x; // compute all LCB midpoints as list of objects through backbone

      var midSets = [];
      data.forEach(function (lcbs) {
        var lcbMids = [];
        lcbs.forEach(function (l) {
          if (l.hidden) return;
          lcbMids.push({
            start: l.start,
            end: l.end,
            x: x(l.start) + (x(l.end) - x(l.start)) / 2,
            y: _consts__WEBPACK_IMPORTED_MODULE_1__["marginTop"] + _this._getRegionYPos(l.lcb_idx, l.strand) + _consts__WEBPACK_IMPORTED_MODULE_1__["lcbHeight"] / 2
          });
        });
        midSets.push(lcbMids);
      }); // draw connections using lineFunction
      // keep line function for scaling

      this.lineFunction = this.d3.line().x(function (d) {
        return d.x;
      }).y(function (d) {
        return d.y;
      });
      midSets.forEach(function (set, i) {
        _this.svg.datum(set).insert("path", ":first-child").attr('class', 'lcb-line').attr("d", _this.lineFunction(set)).attr("stroke-width", 1).attr('stroke', _colors__WEBPACK_IMPORTED_MODULE_0__["schemeCategory20"][i % 20]).attr('fill', 'none');
      });
      return midSets;
    }
  }, {
    key: "scale",
    value: function scale(newScale) {
      var _this2 = this;

      this.svg.selectAll('path.lcb-line').attr("d", function (d) {
        var set = d.map(function (p) {
          return {
            start: p.start,
            end: p.end,
            x: newScale(p.start) + (newScale(p.end) - newScale(p.start)) / 2,
            y: p.y
          };
        });
        return _this2.lineFunction(set);
      });
    }
  }, {
    key: "_getRegionYPos",
    value: function _getRegionYPos(trackIdx, strandDirection) {
      return (strandDirection === '-' ? _consts__WEBPACK_IMPORTED_MODULE_1__["yPosOffset"] + _consts__WEBPACK_IMPORTED_MODULE_1__["lcbHeight"] : _consts__WEBPACK_IMPORTED_MODULE_1__["yPosOffset"]) + (trackIdx - 1) * _consts__WEBPACK_IMPORTED_MODULE_1__["trackOffset"];
    }
  }]);

  return BackBone;
}();

/***/ }),

/***/ "./src/colors.js":
/*!***********************!*\
  !*** ./src/colors.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

var schemeCategory20 = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];
module.exports = {
  schemeCategory20: schemeCategory20
};

/***/ }),

/***/ "./src/consts.js":
/*!***********************!*\
  !*** ./src/consts.js ***!
  \***********************/
/*! exports provided: marginTop, trackOffset, hideTrackOffset, yPosOffset, lcbHeight, ctrlPadding */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "marginTop", function() { return marginTop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackOffset", function() { return trackOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideTrackOffset", function() { return hideTrackOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yPosOffset", function() { return yPosOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lcbHeight", function() { return lcbHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ctrlPadding", function() { return ctrlPadding; });
var marginTop = 20; // margin of canvas top

var trackOffset = 105; // distance between axises

var hideTrackOffset = 35;
var yPosOffset = 30; // distance of regions from x-axis

var lcbHeight = 22; // height of regions (rectangles)

var ctrlPadding = 6;

/***/ }),

/***/ "./src/container.html":
/*!****************************!*\
  !*** ./src/container.html ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"mauve-viewer\" style=\"position: relative;\">\n    <div class=\"mv-header\" style=\"text-align: left;\">\n        <h4 class=\"title\">Mauve Viewer (Alpha)</h4>\n        <div class=\"help-text\">\n            <b>Tips:</b> click and drag to pan; use ctrl-scroll or double click to zoom.\n        </div><br>\n        <button class=\"reset-btn\">Reset</button>\n\n        <div class=\"dropdown\">\n            <button class=\"opts-btn dd-btn\">Options <i class=\"caret-down\"></i></button>\n            <div class=\"dd-content\">\n                <div>\n                    <label>\n                        <input type=\"checkbox\" name=\"fileNames\" value=\"fileNames\" />\n                        Show File Names\n                    </label>\n                </div>\n                <div>Hide track controls</div>\n            </div>\n        </div>\n\n        <div class=\"cursor-info pull-right\">\n            <span class=\"nt-pos\">-</span>\n            LCB Length: <span class=\"lcb-length\">-</span>\n        </div>\n\n\n        <br>\n    </div>\n    <br>\n    <div class=\"mv-chart\">\n        <svg></svg>\n\n        <div style=\"position: relative;\">\n            <div class=\"mv-context-menu\" style=\"display: none;\">\n                <ul>\n                    <li id=\"nucleotide-align\">Align by nucleotide</li>\n                    <li>Another item</li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</div>";

/***/ }),

/***/ "./src/cursor.js":
/*!***********************!*\
  !*** ./src/cursor.js ***!
  \***********************/
/*! exports provided: Cursor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cursor", function() { return Cursor; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/consts.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Todo: listen for mousemove on track container

var Cursor =
/*#__PURE__*/
function () {
  function Cursor(params) {
    _classCallCheck(this, Cursor);

    this.container = params.container;
    this.d3 = params.d3;
    this.svg = params.svg;
    this.scale = params.scale;
    this.trackCount = params.trackCount;
    this.hoverLines = [];
    this.render();
    return this;
  }

  _createClass(Cursor, [{
    key: "render",
    value: function render() {
      // draw the track cursor once and update
      // position for better performance
      for (var i = 1; i <= this.trackCount; i++) {
        var yPos = this._getRegionYPos(i, '-');

        var line = this.svg.append('line').attr('class', 'hover-line').style('stroke', '#222').attr('y1', _consts__WEBPACK_IMPORTED_MODULE_0__["marginTop"] + yPos - 30).attr('y2', _consts__WEBPACK_IMPORTED_MODULE_0__["marginTop"] + yPos + 30);
        this.hoverLines.push(line);
      }

      this.resetHover(this.scale);
    }
  }, {
    key: "resetHover",
    value: function resetHover(scale) {
      var svg = this.svg,
          d3 = this.d3,
          lines = this.hoverLines;
      svg.selectAll('.track').on("mouseover", null).on("mousemove", null).on("mouseout", null);
      var lengthNode = this.container.querySelector('.lcb-length'),
          ntPosNode = this.container.querySelector('.nt-pos');
      var x = scale;
      svg.selectAll('.track').on("mouseover", function (d) {
        for (var i = 0; i < lines.length; i++) {
          lines[i].attr("opacity", 1.0);
        }
      }).on("mousemove", function () {
        var clientX = d3.event.clientX,
            clientY = d3.event.clientY;
        var ele = document.elementFromPoint(clientX, clientY);
        var d = d3.select(ele).data()[0];
        if (!ele) return; // ignore non-regions

        if (ele.tagName !== 'rect' || !d || !('lcb_idx' in d)) {
          if (ele.classList.contains('cursor-line')) {
            return;
          } // if not region, hide cursors


          for (var i = 0; i < lines.length; i++) {
            lines[i].attr("opacity", 0);
          }

          return;
        }

        var xPos = d3.mouse(this)[0],
            trackIdx = d.lcb_idx,
            hoverStrand = d.strand; // base xPos on nearest integer in range

        xPos = x(Math.round(x.invert(xPos))); // position relative to lcb

        var relXPos = xPos - x(d.start); // draw cursor line for rect being hovered

        lines[trackIdx - 1].attr('class', 'cursor-line').attr('x1', xPos).attr('x2', xPos); // draw cursor line for other rects

        var groupID = d.groupID;
        svg.selectAll(".group-".concat(groupID)).each(function (d) {
          // need to skip rect that is being hovered on
          if (d.lcb_idx === trackIdx) return; // need to compute relative position based on strand

          var nextXPos;

          if (hoverStrand !== d.strand) {
            nextXPos = x(d.end) - relXPos; // start + positition relative to other blocks
          } else {
            nextXPos = x(d.start) + relXPos; // start + positition relative to other blocks
          }

          lines[d.lcb_idx - 1].attr('x1', nextXPos).attr('x2', nextXPos);
        }); // set cursor-info

        lengthNode.innerHTML = d.end - d.start + 1;
        ntPosNode.innerHTML = Math.round(x.invert(xPos));
      }).on("mouseout", function (d) {
        // ignore hover on line
        if (d3.event.relatedTarget && d3.event.relatedTarget.classList.contains('cursor-line')) {
          return;
        }

        for (var i = 0; i < lines.length; i++) {
          lines[i].attr("opacity", 0);
        }

        lengthNode.innerHTML = '-';
        ntPosNode.innerHTML = '-';
      });
    }
  }, {
    key: "_getRegionYPos",
    value: function _getRegionYPos(trackIdx, strandDirection) {
      return (strandDirection === '-' ? _consts__WEBPACK_IMPORTED_MODULE_0__["yPosOffset"] + _consts__WEBPACK_IMPORTED_MODULE_0__["lcbHeight"] : _consts__WEBPACK_IMPORTED_MODULE_0__["yPosOffset"]) + (trackIdx - 1) * _consts__WEBPACK_IMPORTED_MODULE_0__["trackOffset"];
    }
  }]);

  return Cursor;
}();

/***/ }),

/***/ "./src/mauve-viewer.js":
/*!*****************************!*\
  !*** ./src/mauve-viewer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MauveViewer; });
/* harmony import */ var _track__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./track */ "./src/track.js");
/* harmony import */ var _track_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./track-ctrl */ "./src/track-ctrl.js");
/* harmony import */ var _backbone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./backbone */ "./src/backbone.js");
/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cursor */ "./src/cursor.js");
/* harmony import */ var _container_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./container.html */ "./src/container.html");
/* harmony import */ var _container_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_container_html__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./consts */ "./src/consts.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * mauve-viewer.js
 *
 * A JS/d3.js Mauve Viewer
 *
 * Author(s): nconrad
 *
 */







var MauveViewer =
/*#__PURE__*/
function () {
  function MauveViewer(_ref) {
    var d3 = _ref.d3,
        ele = _ref.ele,
        data = _ref.data,
        labels = _ref.labels;

    _classCallCheck(this, MauveViewer);

    this.ele = ele;
    this.data = data;
    this.d3 = d3;
    this.labels = labels;
    this.hiddenTracks = [];
    this.init();
  }

  _createClass(MauveViewer, [{
    key: "init",
    value: function init() {
      var _this$getGenomeRegion = this.getGenomeRegions(this.data),
          regions = _this$getGenomeRegion.regions;

      this.genomeRegions = regions;
      this.trackCount = Object.keys(this.genomeRegions).length;
      this.setReference(1, true); // set first genome as reference

      this.ele.innerHTML = _container_html__WEBPACK_IMPORTED_MODULE_4___default.a;
      this.render();
      this.rendered = true;
      this.initControls(); // add global controls
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var d3 = this.d3,
          data = this.data;
      var genomeRegions = this.genomeRegions;
      var trackCount = this.trackCount; // get highest end value

      var endMax = Math.max.apply(Math, _toConsumableArray([].concat.apply([], data).map(function (region) {
        return region.end;
      })));
      var xLength = endMax + 100;
      console.log('xLength', xLength); // create svg dom element

      d3.select(this.ele.querySelector('svg')).remove();
      var svg = d3.select(this.ele.querySelector('.mv-chart')).append("svg").attr('width', 1000).attr('height', trackCount * 165);
      var width = +svg.attr("width"),
          height = +svg.attr("height");
      /**
       *  ctrl-mousewheel for zoom
       */

      var zoom = d3.zoom().scaleExtent([0, xLength / 10]).translateExtent([[-width, 0], [width + 100, 0]]).on("zoom", zoomed).filter(function () {
        return d3.event.ctrlKey || d3.event.type === 'mousedown' || d3.event.type == 'dblclick';
      });
      svg.call(zoom);
      d3.select(this.ele.querySelector('.reset-btn')).on("click", reset);
      /**
       *  create tracks (axises, scales, gXs)
       */

      var axises = [],
          gXs = [],
          xScales = [],
          tracks = [];
      var yPos = _consts__WEBPACK_IMPORTED_MODULE_5__["marginTop"];

      for (var id = 1; id <= trackCount; id++) {
        var isHidden = this.hiddenTracks.includes(id);
        yPos += id === 1 ? 0 : isHidden ? _consts__WEBPACK_IMPORTED_MODULE_5__["hideTrackOffset"] : _consts__WEBPACK_IMPORTED_MODULE_5__["trackOffset"];
        var name = genomeRegions[id][0].name,
            label = this.labels ? this.labels[name] : '';
        var track = new _track__WEBPACK_IMPORTED_MODULE_0__["Track"]({
          d3: d3,
          yPos: yPos,
          svg: svg,
          id: id,
          name: name,
          label: label,
          width: width,
          xLength: xLength,
          hidden: isHidden,
          regions: genomeRegions[id]
        });
        axises.push(track.xAxis);
        gXs.push(track.gX);
        xScales.push(track.x);
        tracks.push(track); // only create track ctrls once

        if (this.rendered) continue;
        new _track_ctrl__WEBPACK_IMPORTED_MODULE_1__["TrackCtrl"]({
          id: id,
          yPos: yPos,
          height: height,
          container: this.ele,
          svg: this.ele.querySelector('svg'),
          trackCount: this.trackCount,
          isReference: id === 1,
          onMoveUp: function onMoveUp(id) {
            _this.moveTrackUp(id);
          },
          onMoveDown: function onMoveDown(id) {
            _this.moveTrackDown(id);
          },
          onSetReference: function onSetReference(id) {
            _this.setReference(id);
          },
          onHide: function onHide(id) {
            _this.hideTrack(id);
          },
          onShow: function onShow(id) {
            _this.showTrack(id);
          }
        });
      }

      var x = xScales[0]; // x scale is same for all tracks
      // add hover cursor lines, initially without x position

      var cursor = new _cursor__WEBPACK_IMPORTED_MODULE_3__["Cursor"]({
        d3: d3,
        trackCount: trackCount,
        svg: svg,
        scale: x,
        container: this.ele
      }); // add backbone of lcb lines

      var backbone = new _backbone__WEBPACK_IMPORTED_MODULE_2__["BackBone"]({
        scale: x,
        data: data,
        d3: d3,
        svg: svg
      });

      function zoomed() {
        var srcEvent = d3.event.sourceEvent;
        var newScale = d3.event.transform.rescaleX(xScales[0]); // scale each axis

        for (var i = 0; i < tracks.length; i++) {
          tracks[i].rescaleAxis();
        } // scale all rectangles


        if (!srcEvent || srcEvent.type === 'wheel' || srcEvent.type === 'click') {
          svg.selectAll('.region').attr('x', function (d) {
            return newScale(d.start);
          }).attr("width", function (d) {
            return newScale(d.end) - newScale(d.start);
          });
        } else if (d3.event.sourceEvent.type === 'mousemove') {
          svg.selectAll('.region').attr("x", function (d) {
            return newScale(d.start);
          });
        } // scale lines


        backbone.scale(newScale);
        cursor.resetHover(newScale);
      }

      function reset() {
        zoom.transform(svg, d3.zoomIdentity);
      }
    }
  }, {
    key: "moveTrackUp",
    value: function moveTrackUp(id) {
      var swapID = id - 1;
      if (swapID < 1) return;
      this.swapTrack(id, swapID);
      this.swapBackbones(id, swapID);
      this.render();
    }
  }, {
    key: "moveTrackDown",
    value: function moveTrackDown(id) {
      var swapID = id + 1;
      if (swapID > this.trackCount) return;
      this.swapTrack(id, swapID);
      this.swapBackbones(id, swapID);
      this.render();
    }
  }, {
    key: "swapTrack",
    value: function swapTrack(id, newID) {
      var swapTrack = this.genomeRegions[newID];
      this.genomeRegions[newID] = this.genomeRegions[id];
      this.genomeRegions[id] = swapTrack;
    }
  }, {
    key: "swapBackbones",
    value: function swapBackbones(oldID, newID) {
      this.data.forEach(function (lcb) {
        var foundOldRegion = null,
            foundSwapRegion = null;
        lcb.forEach(function (region) {
          if (region.lcb_idx === oldID) region.lcb_idx = newID;else if (region.lcb_idx === newID) region.lcb_idx = oldID;
        });
        lcb.sort(function (a, b) {
          return a.lcb_idx - b.lcb_idx;
        });
      });
    }
  }, {
    key: "setReference",
    value: function setReference(id, noRerender) {
      this.data.forEach(function (lcb) {
        var flipped = false; // first determine if reference's (region)
        // strand direction is made positive

        lcb.forEach(function (region) {
          if (region.lcb_idx !== id) return;

          if (region.strand !== '+') {
            region.strand = '+';
            flipped = true;
          }
        });
        if (!flipped) return; // otherwise, need to flip corresponding regions

        lcb.forEach(function (region) {
          if (region.lcb_idx === id) return;
          region.strand = region.strand === '-' ? '+' : '-';
        });
      });
      if (noRerender) return;
      this.render();
    }
  }, {
    key: "hideTrack",
    value: function hideTrack(id) {
      this.data.forEach(function (lcbs) {
        lcbs.forEach(function (region) {
          if (region.lcb_idx == id) region.hidden = true;
        });
      });
      this.hiddenTracks.push(id);
      this.render();
    }
  }, {
    key: "showTrack",
    value: function showTrack(id) {
      this.data.forEach(function (lcbs) {
        lcbs.forEach(function (region) {
          if (region.lcb_idx == id) delete region.hidden;
        });
      });
      this.hiddenTracks.splice(this.hiddenTracks.indexOf(id));
      this.render();
    } // gets lcbs that have entry for every organism
    // deprecated(?)

  }, {
    key: "getSharedLCBs",
    value: function getSharedLCBs(data) {
      var maxRows = Math.max.apply(Math, _toConsumableArray(data.map(function (lcb) {
        return lcb.length;
      })));
      var filtered = data.filter(function (lcbs) {
        return lcbs.length === maxRows;
      });
      return filtered;
    } // gets regions for each organism (index); adding ids
    // also returns connections of regions

  }, {
    key: "getGenomeRegions",
    value: function getGenomeRegions(lcbs) {
      var regions = {};
      var regionID = 0;
      var lcbID = 0;
      lcbs.forEach(function (lcb, groupID) {
        //lcb.reverse(); // consider last index reference genome
        lcbID += 1;
        lcb.forEach(function (region) {
          // increment/add ids to regions
          regionID += 1;
          region.id = regionID;
          region.groupID = groupID;
          var index = region.lcb_idx;
          if (index in regions) regions[index].push(region);else regions[index] = [region];
        });
      });
      return {
        regions: regions,
        regionCount: regionID,
        lcbCount: lcbID
      };
    }
  }, {
    key: "initControls",
    value: function initControls() {
      var _this2 = this;

      this.ele.querySelector('.opts-btn').onclick = function () {
        _this2.ele.querySelector(".dd-content").classList.toggle("show");
      };

      document.onclick = function (evt) {
        var dd = _this2.ele.querySelector('.dropdown');

        if (dd.contains(evt.target)) return;

        if (!evt.target.matches('.dd-btn')) {
          var dds = _this2.ele.getElementsByClassName("dd-content");

          Array.from(dds).forEach(function (dd) {
            dd.classList.remove('show');
          });
        }
      };
    }
  }]);

  return MauveViewer;
}();



/***/ }),

/***/ "./src/track-ctrl.js":
/*!***************************!*\
  !*** ./src/track-ctrl.js ***!
  \***************************/
/*! exports provided: TrackCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackCtrl", function() { return TrackCtrl; });
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/consts.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var btnStyle = 'width: 26px; height: 23px;';
var TrackCtrl =
/*#__PURE__*/
function () {
  function TrackCtrl(params) {
    _classCallCheck(this, TrackCtrl);

    this.id = params.id;
    this.container = params.container;
    this.svg = params.svg;
    this.trackCount = params.trackCount;
    this.yPos = params.yPos || _consts__WEBPACK_IMPORTED_MODULE_0__["marginTop"] + (this.id - 1) * _consts__WEBPACK_IMPORTED_MODULE_0__["trackOffset"];
    this.ctrls;
    this.isReference = params.isReference || false;
    this.hidden; // control callbacks

    this.onMoveUp = params.onMoveUp;
    this.onMoveDown = params.onMoveDown;
    this.onSetReference = params.onSetReference;
    this.onHide = params.onHide;
    this.onShow = params.onShow;
    this.init();
    return this;
  }

  _createClass(TrackCtrl, [{
    key: "init",
    value: function init() {
      this.destroy(); // don't allow more than one controller

      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      var mvPos = this.container.querySelector('.mauve-viewer').getBoundingClientRect(),
          svgPos = this.svg.getBoundingClientRect(),
          relativeTop = svgPos.top - mvPos.top; // add container

      var ele = this.node = document.createElement('div');
      ele.setAttribute('class', "track-ctrl ctrl-".concat(this.id)); //ele.style.border = "1px solid black";

      ele.style.top = relativeTop + this.yPos + _consts__WEBPACK_IMPORTED_MODULE_0__["ctrlPadding"] + 'px';
      ele.style.left = '-35px';
      ele.style.width = '25px';
      ele.style.height = _consts__WEBPACK_IMPORTED_MODULE_0__["trackOffset"] + 'px';
      ele.style.position = 'absolute';

      this._addMainButtons();

      this.container.querySelector('.mauve-viewer').appendChild(ele);
    }
  }, {
    key: "_addMainButtons",
    value: function _addMainButtons() {
      var _this$ctrls = this.ctrls = this._getButtons(),
          upBtn = _this$ctrls.upBtn,
          downBtn = _this$ctrls.downBtn,
          hideBtn = _this$ctrls.hideBtn,
          refBtn = _this$ctrls.refBtn;

      this.node.appendChild(upBtn); //this.node.appendChild(hideBtn);

      this.node.appendChild(refBtn);
      this.node.appendChild(downBtn);
      if (this.isReference) refBtn.classList.add('active');
    }
  }, {
    key: "_getButtons",
    value: function _getButtons() {
      var upBtn = document.createElement('button');
      upBtn.title = 'Move this genome up';
      upBtn.style = btnStyle;
      upBtn.innerHTML = '▲';
      upBtn.disabled = this.id === 1 || false;
      upBtn.onclick = this.moveTrackUp.bind(this);
      var hideBtn = document.createElement('button');
      hideBtn.title = 'Hide this genome';
      hideBtn.style = btnStyle;
      hideBtn.innerHTML = '−';
      hideBtn.onclick = this.hideTrack.bind(this);
      var refBtn = document.createElement('button');
      refBtn.title = 'Set reference genome';
      refBtn.classList.add('ref-btn');
      refBtn.style = btnStyle;
      refBtn.innerHTML = 'R';
      refBtn.onclick = this.refTrack.bind(this);
      var downBtn = document.createElement('button');
      downBtn.title = 'Move this genome down';
      downBtn.style = btnStyle;
      downBtn.innerHTML = '▼';
      downBtn.disabled = this.id === this.trackCount || false;
      downBtn.onclick = this.moveTrackDown.bind(this);
      return {
        upBtn: upBtn,
        downBtn: downBtn,
        hideBtn: hideBtn,
        refBtn: refBtn
      };
    }
  }, {
    key: "_getShowButton",
    value: function _getShowButton() {
      var showBtn = document.createElement('button');
      showBtn.title = 'Show this genome';
      showBtn.classList.add('show-btn');
      showBtn.style = btnStyle;
      showBtn.innerHTML = '+';
      showBtn.onclick = this.showTrack.bind(this);
      return showBtn;
    }
  }, {
    key: "moveTrackUp",
    value: function moveTrackUp() {
      this._selectNewRef(this.id, this.id - 1);

      this.onMoveUp(this.id);
    }
  }, {
    key: "moveTrackDown",
    value: function moveTrackDown() {
      this._selectNewRef(this.id, this.id + 1);

      this.onMoveDown(this.id);
    }
  }, {
    key: "hideTrack",
    value: function hideTrack() {
      this.node.innerHTML = '';

      var showBtn = this._getShowButton();

      this.node.appendChild(showBtn);
      this.hidden = true;
      this.onHide(this.id);
    }
  }, {
    key: "showTrack",
    value: function showTrack() {
      console.log('called show');
      this.node.innerHTML = '';

      this._addMainButtons();

      this.hidden = false;
      this.onShow(this.id);
    }
  }, {
    key: "refTrack",
    value: function refTrack() {
      var eles = this.container.querySelectorAll('.ref-btn');
      eles.forEach(function (ele) {
        ele.classList.remove("active");
      });
      this.ctrls.refBtn.classList.add('active');
      this.onSetReference(this.id);
      this.isReference = true;
    }
  }, {
    key: "_selectNewRef",
    value: function _selectNewRef(oldID, newID) {
      var oldCtrl = this.container.querySelector(".ctrl-".concat(oldID, " .ref-btn")),
          newCtrl = this.container.querySelector(".ctrl-".concat(newID, " .ref-btn"));
      var newCtrlWasActive;

      if (newCtrl.classList.contains('active')) {
        newCtrl.classList.remove('active');
        oldCtrl.classList.add('active');
        newCtrlWasActive = true;
      }

      if (oldCtrl.classList.contains('active') && !newCtrlWasActive) {
        oldCtrl.classList.remove('active');
        newCtrl.classList.add('active');
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var node = this.container.querySelector(".ctrl-".concat(this.id));
      if (node) node.remove();
    }
  }]);

  return TrackCtrl;
}();

/***/ }),

/***/ "./src/track.js":
/*!**********************!*\
  !*** ./src/track.js ***!
  \**********************/
/*! exports provided: Track */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Track", function() { return Track; });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./src/colors.js");
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_colors__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts */ "./src/consts.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Track =
/*#__PURE__*/
function () {
  function Track(params) {
    _classCallCheck(this, Track);

    this.d3 = params.d3;
    this.svg = params.svg;
    this.hidden = params.hidden;
    this.id = params.id;
    this.name = params.name;
    this.label = params.label;
    this.width = params.width;
    this.xLength = params.xLength;
    this.regions = params.regions;
    this.yPos = params.yPos || _consts__WEBPACK_IMPORTED_MODULE_1__["marginTop"] + (this.id - 1) * _consts__WEBPACK_IMPORTED_MODULE_1__["trackOffset"]; // render and expose axis/scale

    this.x;
    this.xAxis;
    this.gX;
    this.track;
    this.render();
    return this;
  }

  _createClass(Track, [{
    key: "render",
    value: function render() {
      var _this = this;

      if (this.hidden) {
        this.hiddenTrack();
        return;
      }

      var d3 = this.d3;
      this.x = d3.scaleLinear().domain([1, this.xLength]).range([1, this.width + 1]);
      this.xAxis = d3.axisBottom(this.x).ticks(5).tickSize(10).tickFormat(d3.format("d"));
      var g = this.track = this.svg.append('g').attr('class', function (d) {
        return "track id-".concat(_this.id);
      });
      this.gX = g.append("g").attr('class', "axis axis-x-".concat(this.id)).call(this.xAxis).attr('transform', "translate(0, ".concat(this.yPos, ")")); // add names

      g.append('text').attr('x', 0).attr('y', this.yPos + _consts__WEBPACK_IMPORTED_MODULE_1__["trackOffset"] - 5) // -2 padding
      .text(this.label || this.name).attr('font-family', "sans-serif").attr('font-size', "10px").attr('fill', '#888');
      if (this.regions) this.addRegions(this.regions);
    }
  }, {
    key: "addRegions",
    value: function addRegions(regions) {
      var _this2 = this;

      var numOfLCBs = regions.length; // add regions

      this.track.selectAll('rect').data(regions).enter().append('rect').attr('class', function (d) {
        return "region track-id-".concat(_this2.id, " group-").concat(d.groupID, " id-").concat(d.id);
      }).attr('x', function (d) {
        return _this2.x(d.start);
      }).attr('y', function (d) {
        return _this2._getRegionYPos(_this2.id, d.strand);
      }).attr('width', function (d) {
        return _this2.x(d.end - d.start);
      }).attr('height', _consts__WEBPACK_IMPORTED_MODULE_1__["lcbHeight"]).attr('stroke', '#fffff').attr('fill', function (d) {
        return _colors__WEBPACK_IMPORTED_MODULE_0__["schemeCategory20"][d.groupID % numOfLCBs % 20];
      });
      this.regions = regions;
    }
  }, {
    key: "hiddenTrack",
    value: function hiddenTrack() {
      var _this3 = this;

      var g = this.track.append('g').attr('class', function (d) {
        return "hidden-track";
      });
      g.append('rect').attr('class', function (d) {
        return "hidden-track track-".concat(_this3.id);
      }).attr('x', 0).attr('y', function (d) {
        return (_this3.id - 1) * _consts__WEBPACK_IMPORTED_MODULE_1__["trackOffset"];
      }).attr('width', function (d) {
        return 10000;
      }).attr('height', 20).attr('stroke', '#fffff').attr('fill', function (d) {
        return '#aaa';
      });
      g.append('text').attr('x', 10).attr('y', this.yPos - 2) // -2 padding
      .text(this.label || this.name).attr("font-family", "sans-serif").attr("font-size", "10px").attr("fill", '#222');
    }
  }, {
    key: "rescaleAxis",
    value: function rescaleAxis() {
      if (this.hidden) return;
      this.gX.call(this.xAxis.scale(this.d3.event.transform.rescaleX(this.x)));
    }
  }, {
    key: "_getRegionYPos",
    value: function _getRegionYPos(trackIdx, strandDirection) {
      return this.yPos + (strandDirection === '-' ? _consts__WEBPACK_IMPORTED_MODULE_1__["yPosOffset"] + _consts__WEBPACK_IMPORTED_MODULE_1__["lcbHeight"] : _consts__WEBPACK_IMPORTED_MODULE_1__["yPosOffset"]);
    }
  }]);

  return Track;
}();

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./demo/main.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./demo/main.js */"./demo/main.js");


/***/ })

/******/ });
});
//# sourceMappingURL=app.js.map