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
  var field, index;

  data.xySelector = function(xIndex, yIndex, groupIndex) {
    var mapFunc, mapped, rawData,
      _this = this;
    rawData = this.dataPoints.filter(function(dp) {
      return (String(dp[_this.groupingFieldIndex])).toLowerCase() === _this.groups[groupIndex];
    });
    if ((Number(this.fields[xIndex].typeID)) === 7) {
      mapFunc = function(dp) {
        var obj;
        return obj = {
          x: new Date(dp[xIndex]),
          y: dp[yIndex],
          name: "Temp"
        };
      };
    } else {
      mapFunc = function(dp) {
        var obj;
        return obj = {
          x: dp[xIndex],
          y: dp[yIndex],
          name: "Temp"
        };
      };
    }
    mapped = rawData.map(mapFunc);
    mapped.sort(function(a, b) {
      return a.x - b.x;
    });
    return mapped;
  };

  /*
  Selects an array of data from the given field index.
  if 'nans' is true then datapoints with NaN values in the given field will be included.
  'filterFunc' is a boolean filter that must be passed (true) for a datapoint to be included.
  */


  data.selector = function(fieldIndex, groupIndex, nans) {
    var filterFunc, newFilterFunc, rawData,
      _this = this;
    if (nans == null) {
      nans = false;
    }
    filterFunc = function(dp) {
      return (String(dp[_this.groupingFieldIndex])).toLowerCase() === _this.groups[groupIndex];
    };
    newFilterFunc = nans ? filterFunc : function(dp) {
      return (filterFunc(dp)) && (!isNaN(dp[fieldIndex])) && (dp[fieldIndex] !== null);
    };
    rawData = this.dataPoints.filter(newFilterFunc);
    return rawData.map(function(dp) {
      return dp[fieldIndex];
    });
  };

  /*
  Gets the maximum (numeric) value for the given field index.
  All included datapoints must pass the given filter (defaults to all datapoints).
  */


  data.getMax = function(fieldIndex, groupIndex) {
    var rawData;
    rawData = this.selector(fieldIndex, groupIndex);
    if (rawData.length > 0) {
      return rawData.reduce(function(a, b) {
        return Math.max(a, b);
      });
    } else {
      return null;
    }
  };

  /*
  Gets the minimum (numeric) value for the given field index.
  All included datapoints must pass the given filter (defaults to all datapoints).
  */


  data.getMin = function(fieldIndex, groupIndex) {
    var rawData;
    rawData = this.selector(fieldIndex, groupIndex);
    if (rawData.length > 0) {
      return rawData.reduce(function(a, b) {
        return Math.min(a, b);
      });
    } else {
      return null;
    }
  };

  /*
  Gets the mean (numeric) value for the given field index.
  All included datapoints must pass the given filter (defaults to all datapoints).
  */


  data.getMean = function(fieldIndex, groupIndex) {
    var rawData;
    rawData = this.selector(fieldIndex, groupIndex);
    if (rawData.length > 0) {
      return (rawData.reduce(function(a, b) {
        return a + b;
      })) / rawData.length;
    } else {
      return null;
    }
  };

  /*
  Gets the median (numeric) value for the given field index.
  All included datapoints must pass the given filter (defaults to all datapoints).
  */


  data.getMedian = function(fieldIndex, groupIndex) {
    var mid, rawData;
    rawData = this.selector(fieldIndex, groupIndex);
    rawData.sort();
    mid = Math.floor(rawData.length / 2);
    if (rawData.length > 0) {
      if (rawData.length % 2) {
        return rawData[mid];
      } else {
        return (rawData[mid - 1] + rawData[mid]) / 2.0;
      }
    } else {
      return null;
    }
  };

  /*
  Gets a list of unique, non-null, stringified vals from the given field index.
  All included datapoints must pass the given filter (defaults to all datapoints).
  */


  data.setGroupIndex = function(index) {
    this.groupingFieldIndex = index;
    return this.groups = this.makeGroups();
  };

  /*
  Gets a list of unique, non-null, stringified vals from the group field index.
  */


  data.makeGroups = function() {
    var dp, keys, result, _i, _len, _ref, _results;
    result = {};
    _ref = this.dataPoints;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      dp = _ref[_i];
      if (dp[this.groupingFieldIndex] !== null) {
        result[String(dp[this.groupingFieldIndex]).toLowerCase()] = true;
      }
    }
    _results = [];
    for (keys in result) {
      _results.push(keys);
    }
    return _results;
  };

  /*
  Gets a list of text field indicies
  */


  data.textFields = (function() {
    var _ref, _results;
    _ref = data.fields;
    _results = [];
    for (index in _ref) {
      field = _ref[index];
      if ((Number(field.typeID)) === 37) {
        _results.push(Number(index));
      }
    }
    return _results;
  })();

  /*
  Gets a list of time field indicies
  */


  data.timeFields = (function() {
    var _ref, _results;
    _ref = data.fields;
    _results = [];
    for (index in _ref) {
      field = _ref[index];
      if ((Number(field.typeID)) === 7) {
        _results.push(Number(index));
      }
    }
    return _results;
  })();

  /*
  Gets a list of non-text, non-time field indicies
  */


  data.normalFields = (function() {
    var _ref, _ref1, _results;
    _ref = data.fields;
    _results = [];
    for (index in _ref) {
      field = _ref[index];
      if ((_ref1 = Number(field.typeID)) !== 37 && _ref1 !== 7) {
        _results.push(Number(index));
      }
    }
    return _results;
  })();

  /*
  Gets a list of non-text field indicies
  */


  data.numericFields = (function() {
    var _ref, _ref1, _results;
    _ref = data.fields;
    _results = [];
    for (index in _ref) {
      field = _ref[index];
      if ((_ref1 = Number(field.typeID)) !== 37) {
        _results.push(Number(index));
      }
    }
    return _results;
  })();

  data.groupingFieldIndex = 0;

  data.groups = data.makeGroups();

}).call(this);
