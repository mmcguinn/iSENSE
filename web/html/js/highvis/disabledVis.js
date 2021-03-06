// Generated by CoffeeScript 1.6.1

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
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.DisabledVis = (function(_super) {
    var bar_err, histogram_err, map_err, motion_err, photos_err, scatter_err, time_err;

    __extends(DisabledVis, _super);

    function DisabledVis(canvas) {
      this.canvas = canvas;
    }

    motion_err = "Motion Chart could not be displayed<br>A time field was not found in this experiment";

    time_err = "Timeline could not be displayed<br>Either a time field was not found or there were not enough data";

    scatter_err = "Scatter Chart could not be displayed<br>Either two numeric fields were not found or there were not enough data";

    histogram_err = "Histogram could not be displayed<br>Either no numeric fields were found, or there were not enough data";

    bar_err = "Bar Chart could not be displayed<br>Either no numeric fields were found, or there were not enough data";

    map_err = "Map could not be displayed<br>No geographic data were found";

    photos_err = "There are no photos to display";

    DisabledVis.prototype.start = function() {
      ($('#' + this.canvas)).show();
      switch (this.canvas) {
        case "map_canvas":
          ($('#' + this.canvas)).html("<div id='vis_disabled'>" + map_err + "</div>");
          break;
        case "motion_canvas":
          ($('#' + this.canvas)).html("<div id='vis_disabled'>" + motion_err + "</div>");
          break;
        case "bar_canvas":
          ($('#' + this.canvas)).html("<div id='vis_disabled'>" + bar_err + "</div>");
          break;
        case "histogram_canvas":
          ($('#' + this.canvas)).html("<div id='vis_disabled'>" + histogram_err + "</div>");
          break;
        case "timeline_canvas":
          ($('#' + this.canvas)).html("<div id='vis_disabled'>" + time_err + "</div>");
          break;
        case "scatter_canvas":
          ($('#' + this.canvas)).html("<div id='vis_disabled'>" + scatter_err + "</div>");
          break;
        case "photos_canvas":
          ($('#' + this.canvas)).html("<div id='vis_disabled'>" + photos_err + "</div>");
      }
      return this.hideControls();
    };

    DisabledVis.prototype.end = function() {
      ($('#' + this.canvas)).hide();
      return this.unhideControls(this.controlWidth);
    };

    return DisabledVis;

  })(BaseVis);

}).call(this);
