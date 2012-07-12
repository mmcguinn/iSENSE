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
  var _ref, _ref1, _ref2, _ref3, _ref4,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if ((_ref = window.globals) == null) {
    window.globals = {};
  }

  if ((_ref1 = globals.groupIndex) == null) {
    globals.groupIndex = 0;
  }

  if ((_ref2 = globals.groupSelection) == null) {
    globals.groupSelection = data.getUnique(globals.groupIndex);
  }

  if ((_ref3 = globals.fieldSelection) == null) {
    globals.fieldSelection = [];
  }

  if ((_ref4 = globals.xAxis) == null) {
    globals.xAxis = 1;
  }

  window.BaseVis = (function() {

    function BaseVis(canvas) {
      this.canvas = canvas;
    }

    BaseVis.prototype.buildOptions = function() {
      return this.chartOptions = {
        chart: {
          renderTo: this.canvas
        },
        colors: globals.getColors(),
        credits: {
          enabled: false
        },
        title: {}
      };
    };

    BaseVis.prototype.generateColors = function() {
      var groups;
      return groups = data.getUnique(globals.groupIndex);
    };

    BaseVis.prototype.start = function() {
      this.buildOptions();
      if (this.chart != null) {
        this.chart.destroy();
      }
      this.chart = new Highcharts.Chart(this.chartOptions);
      ($('#' + this.canvas)).show();
      return this.update();
    };

    BaseVis.prototype.end = function() {
      this.clearControls();
      return ($('#' + this.canvas)).hide();
    };

    BaseVis.prototype.update = function() {
      this.clearControls();
      return this.drawControls();
    };

    BaseVis.prototype.clearControls = function() {
      ($('#controldiv')).find('*').unbind();
      return ($('#controldiv')).innerHTML = '';
    };

    BaseVis.prototype.drawControls = function() {
      return alert('CALLED DRAW CONTROLS STUB IN BASEVIS');
    };

    BaseVis.prototype.drawGroupControls = function() {
      var controls, counter, fieldIndex, group, _i, _j, _len, _len1, _ref5, _ref6,
        _this = this;
      controls = '<div id="groupControl" class="vis_controls">';
      controls += '<table class="vis_control_table"><tr><td class="vis_control_table_title">Groups:</tr></td>';
      controls += '<tr><td><div class="vis_control_table_div">';
      controls += '<select class="group_selector">';
      _ref5 = data.getTextFields();
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        fieldIndex = _ref5[_i];
        controls += "<option value=\"" + fieldIndex + "\">" + data.fields[fieldIndex].fieldName + "</option>";
      }
      controls += "</select></div></td></tr>";
      counter = 0;
      _ref6 = data.getUnique(globals.groupIndex);
      for (_j = 0, _len1 = _ref6.length; _j < _len1; _j++) {
        group = _ref6[_j];
        controls += '<tr><td>';
        controls += "<div class=\"vis_control_table_div\" style=\"color:" + this.chartOptions.colors[counter] + ";\">";
        controls += "<input class=\"group_input\" type=\"checkbox\" value=\"" + group + "\" " + (__indexOf.call(globals.groupSelection, group) >= 0 ? "checked" : "") + "></input>&nbsp";
        controls += "" + group + "&nbsp";
        controls += "</div></td></tr>";
        counter += 1;
      }
      controls += '</table></div>';
      ($('#controldiv')).html(($('#controldiv')).html() + controls);
      ($('.group_selector')).change(function(e) {
        var element;
        element = e.target || e.srcElement;
        globals.groupIndex = Number(element.value);
        globals.groupSelection = data.getUnique(globals.groupIndex);
        return _this.init();
      });
      return ($('.group_input')).click(function(e) {
        var selection;
        selection = [];
        ($('.group_input')).each(function() {
          if (this.checked) {
            return selection.push(this.value);
          }
        });
        globals.groupSelection = selection;
        return _this.update();
      });
    };

    BaseVis.prototype.drawFieldChkControls = function() {
      var controls, field, _ref5,
        _this = this;
      controls = '<div id="fieldControl" class="vis_controls">';
      controls += '<table class="vis_control_table"><tr><td class="vis_control_table_title">Fields:</tr></td>';
      for (field in data.fields) {
        if ((7 !== (_ref5 = Number(data.fields[field].typeID)) && _ref5 !== 37)) {
          controls += '<tr><td>';
          controls += '<div class="vis_control_table_div">';
          controls += "<input class=\"field_input\" type=\"checkbox\" value=\"" + field + "\" " + (__indexOf.call(globals.fieldSelection, field) >= 0 ? "checked" : "") + "></input>&nbsp";
          controls += "" + data.fields[field].fieldName + "&nbsp";
          controls += "</div></td></tr>";
        }
      }
      controls += '</table></div>';
      ($('#controldiv')).html(($('#controldiv')).html() + controls);
      return ($('.field_input')).click(function(e) {
        var selection;
        selection = [];
        ($('.field_input')).each(function() {
          if (this.checked) {
            return selection.push(this.value);
          }
        });
        globals.fieldSelection = selection;
        return _this.update();
      });
    };

    BaseVis.prototype.drawXAxisControls = function() {
      var controls, field,
        _this = this;
      controls = '<div id="xAxisControl" class="vis_controls">';
      controls += '<table class="vis_control_table"><tr><td class="vis_control_table_title">X Axis:</tr></td>';
      for (field in data.fields) {
        if ((Number(data.fields[field].typeID)) !== 37) {
          controls += '<tr><td>';
          controls += '<div class="vis_control_table_div">';
          controls += "<input class=\"xAxis_input\" type=\"radio\" name=\"xaxis\" value=\"" + field + "\" " + (__indexOf.call(globals.fieldSelection, field) >= 0 ? "checked" : "") + "></input>&nbsp";
          controls += "" + data.fields[field].fieldName + "&nbsp";
          controls += "</div></td></tr>";
        }
      }
      controls += '</table></div>';
      ($('#controldiv')).html(($('#controldiv')).html() + controls);
      return ($('.xAxis_input')).click(function(e) {
        var selection;
        selection = null;
        ($('.xAxis_input')).each(function() {
          if (this.checked) {
            return selection = this.value;
          }
        });
        globals.xAxis = selection;
        return _this.update();
      });
    };

    return BaseVis;

  })();

}).call(this);