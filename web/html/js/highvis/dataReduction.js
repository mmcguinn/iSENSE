// Generated by CoffeeScript 1.3.3

/*
 * Copyright (c) 2011, iSENSE Project. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer. Redistributions in binary
 * form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials
 * provided with the distribution. Neither the name of the University of
 * Massachusetts Lowell nor the names of its contributors may be used to
 * endorse or promote products derived from this software without specific
 * prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
 * DAMAGE.
 *
*/


(function() {
  var _ref;

  if ((_ref = window.globals) == null) {
    window.globals = {};
  }

  globals.curvatureAnalysis = function(arr, num) {
    var curve, curves, i, index, point, postSlope, preSlope, result, _i, _j, _k, _len, _len1, _ref1, _ref2;
    curves = new Array(arr.length);
    for (i = _i = 1, _ref1 = arr.length - 1; 1 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 1 <= _ref1 ? ++_i : --_i) {
      postSlope = (arr[i + 1].y - arr[i].y) / (arr[i + 1].x - arr[i].x);
      preSlope = (arr[i].y - arr[i - 1].y) / (arr[i].x - arr[i - 1].x);
      curves[i] = {
        curve: Math.abs(postSlope - preSlope),
        index: i
      };
    }
    curves.sort(function(a, b) {
      return a.curve - b.curve;
    });
    _ref2 = curves.slice(0, arr.length - num);
    for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
      curve = _ref2[_j];
      arr[curve.index].marked = true;
    }
    result = [];
    for (index = _k = 0, _len1 = arr.length; _k < _len1; index = ++_k) {
      point = arr[index];
      if (!(point.marked != null)) {
        result.push(point);
      }
    }
    return result;
  };

  globals.blur = function(arr, w) {
    var blurFunc, i, j, range, res, sumFunc, window, windowSize, _i, _ref1;
    range = arr[arr.length - 1].x - arr[0].x;
    windowSize = (range / arr.length) * w;
    res = [];
    globals.extendObject(res, arr);
    window = [];
    sumFunc = function(a, b) {
      return a + b.y;
    };
    blurFunc = function(win, center) {
      var i, item, result, weights, ws, _i, _j, _len, _ref1;
      weights = [];
      for (_i = 0, _len = win.length; _i < _len; _i++) {
        item = win[_i];
        weights.push(1.0 - (Math.abs(item.x - center) / windowSize));
      }
      ws = weights.reduce(function(a, b) {
        return a + b;
      });
      result = 0;
      for (i = _j = 0, _ref1 = win.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        result += (win[i].y * weights[i]) / ws;
      }
      return result;
    };
    j = 0;
    for (i = _i = 0, _ref1 = arr.length; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
      while (j < arr.length && (arr[j].x - arr[i].x) <= windowSize) {
        window.push(arr[j]);
        j += 1;
      }
      while ((arr[i].x - window[0].x) > windowSize) {
        window.shift();
      }
      res[i].y = blurFunc(window, arr[i].x);
    }
    return res;
  };

  globals.dataReduce = function(arr, xBounds, yBounds, xCells, yCells) {
    var cells, dataPoint, index, res, x, xRange, xStep, y, yRange, yStep, _i, _len, _ref1;
    xRange = xBounds.max - xBounds.min;
    yRange = yBounds.max - yBounds.min;
    xStep = xRange / xCells;
    yStep = yRange / yCells;
    cells = {};
    for (index = _i = 0, _len = arr.length; _i < _len; index = ++_i) {
      dataPoint = arr[index];
      x = Math.round((dataPoint.x - xBounds.min) / xStep);
      y = Math.round((dataPoint.y - yBounds.min) / yStep);
      if (cells[x] === void 0 || cells[x][y] === void 0) {
        if ((_ref1 = cells[x]) == null) {
          cells[x] = {};
        }
        cells[x][y] = true;
      } else {
        arr[index]["delete"] = true;
        console.log('del');
      }
    }
    res = arr.filter(function(dataPoint) {
      return !(dataPoint["delete"] != null);
    });
    console.log([xStep, yStep]);
    console.log([arr.length, res.length]);
    return res;
  };

}).call(this);
