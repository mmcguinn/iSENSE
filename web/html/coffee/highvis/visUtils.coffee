###
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
###

window.globals ?= {}

###
Generated using http://jiminy.medialab.sciences-po.fr/tools/palettes/palettes.php
Colors: 30
Hue:       0.0 - 360.00
Chroma:    0.0 -   1.70
Lightness: 0.3 -   0.95
K-means
###
globals.getColors = ->
    ['#5E5A83', '#609B36', '#DC644F', '#9A8867', '#DA6694', '#40938C', '#A78E20', '#884646', '#546222', '#688CCF', '#529F69', '#415B62', '#AE8188', '#D1762F', '#408FB2', '#B18347', '#944B70', '#9F7FBC', '#C77967', '#914C2A', '#396B43', '#625744', '#C25562', '#735521', '#7D9080', '#715365', '#8A9044', '#C573B2', '#788AA2', '#EC5D7A']
 
###
This function should return a list of strings corisponding to the symbols.
Currently it returns the list of default symbols in Highcharts.
###
globals.getSymbols = ->
    ['circle', 'square', 'triangle', 'diamond', 'triangle-down']
    
    
    
###
Eric - You should put your symbol generation code here, then fill in the
       globals.getSymbols function above with the correct strings.
###

addRadialMarkerStyle = (name, points, phase=0.0, magnitudes=[1]) ->

    extension = {}

    extension[name] = (x, y, w, h) ->

        svg = Array()

        verticies = Array()

        offset = phase*2*Math.PI

        modpoints = points * magnitudes.length

        for i in [0..modpoints]

            tx = (Math.sin 2*Math.PI*i/modpoints+offset) * magnitudes[i % magnitudes.length]
            ty = (Math.cos 2*Math.PI*i/modpoints+offset) * magnitudes[i % magnitudes.length]

            tx = tx/2+0.5
            ty = ty/2+0.5

            verticies.push [tx*w+x, ty*h+y]

        svg.push "M"
        svg.push verticies[0][0]
        svg.push verticies[0][1]
        svg.push "L"

        for [vx, vy] in verticies

            svg.push vx
            svg.push vy

        svg.push "Z"

        svg

    Highcharts.extend Highcharts.Renderer.prototype.symbols, extension

addRadialMarkerStyle('blank', 0)