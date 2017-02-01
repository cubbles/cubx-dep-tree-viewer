/* global d3 */
(function () {
  'use strict';
  /**
   * Get help:
   * > Lifecycle callbacks:
   * https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#lifecycle-callbacks
   *
   * Access the Cubbles-Component-Model:
   * > Access slot values:
   * slot 'a': this.getA(); | this.setA(value)
   */
  CubxPolymer({
    is: 'cubx-dep-tree-viewer',

    NODE_WIDTH: 240,
    NODE_HEIGHT: 10,
    VIEW_HOLDER_ID: 'viewerDiv',

    /**
     * Manipulate an element’s local DOM when the element is created.
     */
    created: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is attached to the document.
     */
    attached: function () {
    },

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    cubxReady: function () {
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'deepTree' has changed ...
     */
    modelDepTreeChanged: function (depTree) {
      this._clearViewer();
      for (var i = 0; i < depTree._rootNodes.length; i++) {
        this._appendTree(depTree._rootNodes[i], i);
      }
    },

    /**
     * Clears the dependency trees container
     * @private
     */
    _clearViewer: function () {
      d3.select('#' + this.VIEW_HOLDER_ID).html('');
    },

    /**
     * Append a new tree to the svg
     * @param {object} treeRoot - Root node of the tree to be appened
     * to be appened
     * @private
     */
    _appendTree: function (treeRoot) {
      var self = this;
      var viewerDiv = d3.select('#' + this.VIEW_HOLDER_ID);
      var treeTitle = document.createElement('h2');
      treeTitle.appendChild(
        document.createTextNode(treeRoot.data.webpackageId + '/' + treeRoot.data.artifactId + ' Dependency Tree')
      );
      viewerDiv.node().appendChild(treeTitle);

      var svg = viewerDiv
        .append('div')
        .style('width', self.getWidth())
        .style('height', self.getHeight())
        .attr('class', 'svgContainer ' + self.is)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%');
      var g = svg.append('g');

      var tree = d3.layout.tree()
        .nodeSize([self.NODE_HEIGHT, self.NODE_WIDTH])
        .separation(function (a, b) { return (a.parent === b.parent ? 3 : 5); });

      var nodes = tree.nodes(treeRoot);

      var diagonal = d3.svg.diagonal()
        .projection(function (d) { return [d.y, d.x]; });
      g.selectAll('link')
        .data(tree.links(nodes))
        .enter().append('path')
        .attr('class', 'link ' + self.is)
        .attr('d', diagonal);

      var node = g.selectAll('node')
        .data(nodes)
        .enter().append('g')
        .attr('class', function (d) {
          return 'node' + (d.children ? ' node--internal' : ' node--leaf') + ' ' + self.is;
        })
        .attr('transform', function (d) {
          return 'translate(' + d.y + ',' + d.x + ')';
        });

      node.append('circle')
        .attr('class', self.is)
        .attr('r', 2.5);

      node.append('text')
        .attr('class', self.is)
        .attr('dy', -2)
        .attr('x', function (d) { return d.parent ? 6 : -6; })
        .style('text-anchor', function (d) { return d.parent ? 'start' : 'end'; })
        .text(function (d) {
          return d.data.webpackageId;
        });

      node.append('text')
        .attr('class', self.is)
        .attr('dy', 8)
        .attr('x', function (d) { return d.parent ? 6 : -6; })
        .style('text-anchor', function (d) { return d.parent ? 'start' : 'end'; })
        .text(function (d) {
          return '\\' + d.data.artifactId;
        });

      var initialTransform = this._scaleAndCenterTree(svg, g);
      this._setZoomBehaviorToSvg(svg, g, initialTransform);
    },

    /**
     * Scale and center the tree within the svg that contains it
     * @param {object} svg - D3 selection of the svg element
     * @param {object} g - D3 selection of the svg group (<g>) that wraps the tree
     * @returns {{x: number, y: number, scale: number}} - Final position and scale ratio
     * @private
     */
    _scaleAndCenterTree: function (svg, g) {
      var svgSize = {width: svg.node().parentNode.clientWidth, height: svg.node().parentNode.clientHeight};
      var gSize = {width: g.node().getBBox().width, height: g.node().getBBox().height};
      var scaleRatio = Math.min(svgSize.width / gSize.width, svgSize.height / gSize.height);
      var newX = Math.abs(svgSize.width - gSize.width * scaleRatio) / 2 + Math.abs(g.node().getBBox().x) * scaleRatio;
      var newY = Math.abs(svgSize.height - gSize.height * scaleRatio) / 2 + Math.abs(g.node().getBBox().y) * scaleRatio;
      g.transition()
        .attr('transform', 'translate(' + newX + ',' + newY + ') ' + 'scale(' + scaleRatio + ')');
      return {x: newX, y: newY, scale: scaleRatio};
    },

    /**
     * Set the zoom behavior to the viewer
     * to the center
     * @private
     */
    _setZoomBehaviorToSvg: function (svg, g, initialTransform) {
      var zoom = d3.behavior.zoom()
        .translate([initialTransform.x, initialTransform.y])
        .scale(initialTransform.scale)
        .on('zoom', function () {
          g.attr('transform', 'translate(' + d3.event.translate + ')' + ' scale(' + d3.event.scale + ')');
        });
      svg.call(zoom);
    }
  });
}());
