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
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./src/mauve-viewer.js":
/*!*****************************!*\
  !*** ./src/mauve-viewer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MauveViewer; });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./src/colors.js");
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_colors__WEBPACK_IMPORTED_MODULE_0__);
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
  function MauveViewer(params) {
    _classCallCheck(this, MauveViewer);

    this.ele = params.ele;
    this.data = params.data;
    this.d3 = params.d3;
  }

  _createClass(MauveViewer, [{
    key: "init",
    value: function init() {
      console.log('datade', this.data);
      this.render(this.d3, this.data);
    }
  }, {
    key: "render",
    value: function render(d3, data) {
      var genomeRegions = this.getGenomeRegions(data);
      var trackCount = Object.keys(genomeRegions).length; // number of LCBs; assuming every track has same number of regions

      var numOfLCBs = genomeRegions[1].length; // get highest end value

      var endMax = Math.max.apply(Math, _toConsumableArray([].concat.apply([], data).map(function (region) {
        return region.end;
      })));
      var xLength = endMax + 100; // clear svg

      d3.select('svg').remove();
      var svg = d3.select("#chart").append("svg").attr('width', 1000).attr('height', trackCount * 165);
      var width = +svg.attr("width"),
          height = +svg.attr("height");
      var zoom = d3.zoom().scaleExtent([1, 150]).translateExtent([[-2000, 0], [width + 90, height + 100]]).on("zoom", zoomed);
      svg.on("dblclick.zoom", null);
      var x;
      var trackOffset = 140,
          marginTop = 20; // create axises

      var axises = [],
          gXs = [],
          xScales = [];

      for (var i = 0; i < trackCount; i++) {
        x = d3.scaleLinear().domain([0, xLength]).range([0, width + 1]);
        var xAxis = d3.axisBottom(x).ticks((width + 2) / (height + 2) * 10).tickSize(10);
        var gX = svg.append("g").attr("class", "axis axis-x-".concat(i)).call(xAxis).attr("transform", "translate(0, ".concat(marginTop + i * (trackOffset + 0), ")")); // add names

        svg.append('text').attr('x', 10).attr('y', marginTop + i * trackOffset - 2) // -2 padding
        .text(genomeRegions[i + 1][0].name).attr("font-family", "sans-serif").attr("font-size", "10px").attr("fill", '#aaaaaa');
        axises.push(xAxis);
        gXs.push(gX);
        xScales.push(x);
      }

      var yPos = 50,
          // distance from x-axis
      h = 20; // height of rectangles (regions)
      // for each track, generate rectangles

      var _loop = function _loop(trackIdx) {
        var regions = genomeRegions[trackIdx];
        var g = svg.select('g').append('g').attr('class', "track track-".concat(trackIdx)); // add regions

        g.selectAll('rect').data(regions).enter().append('rect').attr('class', function (d) {
          return "region region-track-".concat(trackIdx, " region-").concat(d.id, " group-").concat(d.groupID);
        }).attr('x', function (d) {
          return x(d.start);
        }).attr('y', function (d) {
          return getRegionYPos(trackIdx, d.strand);
        }).attr('width', function (d) {
          return x(d.end - d.start);
        }).attr('height', h).attr('stroke', '#fffff').attr('fill', function (d) {
          return _colors__WEBPACK_IMPORTED_MODULE_0__["schemeCategory20"][d.groupID % numOfLCBs % 20];
        });
      };

      for (var trackIdx = 1; trackIdx <= trackCount; trackIdx++) {
        _loop(trackIdx);
      } // add hover cursor lines, initially without x position


      var hoverLines = [];

      for (var _i = 1; _i <= trackCount; _i++) {
        var _yPos = getRegionYPos(_i, '-');

        var line = svg.append('line').attr('class', 'hover-line').style('stroke', '#222').attr('y1', _yPos - 20).attr('y2', _yPos + 65);
        hoverLines.push(line);
      }

      resetHover(x); // compute all LCB midpoints as list of objects

      var midSets = [];
      data.forEach(function (lcb) {
        var lcbMids = [];
        lcb.forEach(function (l) {
          var i = l.lcb_idx - 1; // make indexed

          lcbMids.push({
            start: l.start,
            end: l.end,
            x: x(l.start) + (x(l.end) - x(l.start)) / 2,
            y: marginTop + getRegionYPos(i + 1, l.strand) + h / 2
          });
        });
        midSets.push(lcbMids);
      }); // draw connections

      var lineFunction = d3.line().x(function (d) {
        return d.x;
      }).y(function (d) {
        return d.y;
      });
      midSets.forEach(function (set, i) {
        svg.datum(set).insert("path", ":first-child").attr('class', 'lcb-line').attr("d", lineFunction(set)).attr("stroke-width", 1).attr('stroke', _colors__WEBPACK_IMPORTED_MODULE_0__["schemeCategory20"][i % 20]).attr('fill', 'none');
      });
      d3.select('#reset-btn').on("click", reset);
      svg.call(zoom);
      /*
      d3.select('#shift-btn').on("click", shift)
      function shift() {
          // update axis
          gXs[0].transition().tween("axis", function(d) {
              let i = d3.interpolate(
                  [xScales[0].domain()[0], xScales[0].domain()[1]],
                  [xScales[0].domain()[0] - 300000, xScales[0].domain()[1] - 300000]
              );
               return function(t) {
                  xScales[0].domain(i(t));
                  gXs[0].call(axises[0]);
                   let newScale = xScales[0];
                   // Need to update contents as well
                  d3.selectAll('.region-track-1')
                      .attr("x", (d) => newScale(d.start) );
                    // scale lines
                  d3.selectAll('path.lcb-line')
                      .attr("d", d => {
                           let old = d[0];
                          // only rescale first track
                          d[0] = {
                              start: old.start,
                              end: old.end,
                              x: newScale(old.start) + ( (newScale(old.end) - newScale(old.start))  / 2 ),
                              y: old.y
                          }
                           return lineFunction(d)
                      });
                   resetHover(newScale);
              }
          });
      }
      */

      function zoomed() {
        var newScale = d3.event.transform.rescaleX(xScales[2]); // for each axis, scale

        for (var _i2 = 0; _i2 < axises.length; _i2++) {
          var _gX = gXs[_i2],
              _xAxis = axises[_i2],
              _x = xScales[_i2];

          _gX.call(_xAxis.scale(d3.event.transform.rescaleX(_x)));
        } // scale rectangles


        var srcEvent = d3.event.sourceEvent;

        if (!srcEvent || srcEvent.type === 'wheel' || srcEvent.type === 'click') {
          d3.selectAll('.region').attr('x', function (d) {
            return newScale(d.start);
          }).attr("width", function (d) {
            return newScale(d.end) - newScale(d.start);
          });
        } else if (d3.event.sourceEvent.type === 'mousemove') {
          d3.selectAll('.region').attr("x", function (d) {
            return newScale(d.start);
          });
        } // scale lines


        d3.selectAll('path.lcb-line').attr("d", function (d) {
          var set = d.map(function (p) {
            return {
              start: p.start,
              end: p.end,
              x: newScale(p.start) + (newScale(p.end) - newScale(p.start)) / 2,
              y: p.y
            };
          });
          return lineFunction(set);
        }); // rescale hover events

        d3.selectAll('.region').on("mousemove", null).on("mouseover", null).on("mouseenter", null).on("mouseleave", null).on("mouseout", null);
        resetHover(newScale);
      }

      function resetHover(scale) {
        var x = scale;
        var lines = hoverLines;
        svg.selectAll('.region').on("mousemove", function (d) {
          var groupID = d.groupID;
          var xPos = d3.mouse(this)[0],
              trackIdx = d.lcb_idx,
              hoverStrand = d.strand; // need relative position for other tracks

          var relXPos = xPos - x(d.start); // draw cursor line for rect being hovered

          lines[trackIdx - 1].attr('x1', xPos).attr('x2', xPos); // draw cursor line for other rects

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
          });
        });
        svg.selectAll('.region').on("mouseover", function (d) {
          for (var _i3 = 0; _i3 < lines.length; _i3++) {
            lines[_i3].attr("opacity", 1.0);
          }
        }).on("mouseout", function (d) {
          for (var _i4 = 0; _i4 < lines.length; _i4++) {
            lines[_i4].attr("opacity", 0);
          }
        });
      }

      svg.selectAll('.hover-line').on('contextmenu', function () {
        d3.event.preventDefault();
        showContextMenu.bind(this)();
      }); // show / hide context menu

      svg.selectAll('.region').on('contextmenu', function (data, index) {
        d3.event.preventDefault();
        showContextMenu.bind(this)();
      });
      /* content menu
      d3.select('#nucleotide-align').on('click', (d) => {
          d3.select('#mv-context-menu').style('display', 'none');
      })
       function showContextMenu() {
          let pos = d3.mouse(this);
          d3.select('#mv-context-menu')
              .style('position', 'absolute')
              .style('left', `${pos[0]}px`)
              .style('top', `${pos[1]}px`)
              .style('display', 'block');
           // close on click
          svg.on('click', () => {
              d3.select('#mv-context-menu').style('display', 'none');
          })
      }
      */

      function reset() {
        zoom.transform(svg, d3.zoomIdentity);
      }

      function getRegionYPos(trackIdx, strandDirection) {
        return (strandDirection === '-' ? yPos + h : yPos) + (trackIdx - 1) * trackOffset;
      }
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
      lcbs.forEach(function (lcb, groupID) {
        //lcb.reverse(); // consider last index reference genome
        lcb.forEach(function (region) {
          // increment/add ids to regions
          regionID += 1;
          region.id = regionID;
          region.groupID = groupID;
          var index = region.lcb_idx;
          if (index in regions) regions[index].push(region);else regions[index] = [region];
        });
      });
      return regions;
    }
  }]);

  return MauveViewer;
}();



/***/ }),

/***/ 1:
/*!***********************************!*\
  !*** multi ./src/mauve-viewer.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/mauve-viewer.js */"./src/mauve-viewer.js");


/***/ })

/******/ });
});
//# sourceMappingURL=mauve-viewer.js.map