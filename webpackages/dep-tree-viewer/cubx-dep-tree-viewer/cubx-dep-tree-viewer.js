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
      var svg = document.querySelector('svg');
      var treeHeight = (svg.scrollHeight / depTree._rootNodes.length) - this.getMargin().top;
      var treeWidth = svg.scrollWidth - this.getMargin().right - this.getMargin().left;
      for (var i = 0; i < depTree._rootNodes.length; i++) {
        this._appendTree(depTree._rootNodes[i], i, treeHeight, treeWidth);
      }
    },

    /**
     * Append a new tree to the svg
     * @param {object} treeRoot - Root node of the tree to be appened
     * @param {number} index - Number indicating the index of the tree among the list of all trees
     * to be appened
     * @param {number} height - Height of tree
     * @param {number} width - Width of the tree
     * @private
     */
    _appendTree: function (treeRoot, index, height, width) {
      var self = this;
      var svg = d3.select('svg');
      var g = svg.append('g')
        .attr('transform',
          'translate(' + self.getMargin().left + ',' + (self.getMargin().top + index * height) + ')');

      var tree = d3.tree()
        .size([height, width]);

      var root = d3.hierarchy(treeRoot);
      tree(root);
      g.selectAll('.link')
        .data(root.descendants().slice(1))
        .enter().append('path')
        .attr('class', 'link ' + self.is)
        .attr('d', function (d) {
          return 'M' + d.y + ',' + d.x +
            'C' + (d.parent.y + 100) + ',' + d.x +
            ' ' + (d.parent.y + 100) + ',' + d.parent.x +
            ' ' + d.parent.y + ',' + d.parent.x;
        });

      var node = g.selectAll('.node')
        .data(root.descendants())
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
        .attr('dy', -3)
        .attr('x', function (d) { return d.parent ? 8 : -8; })
        .style('text-anchor', function (d) { return d.parent ? 'start' : 'end'; })
        .text(function (d) {
          return d.data.data.webpackageId;
        });

      node.append('text')
        .attr('class', self.is)
        .attr('dy', 9)
        .attr('x', function (d) { return d.parent ? 8 : -8; })
        .style('text-anchor', function (d) { return d.parent ? 'start' : 'end'; })
        .text(function (d) {
          return '\\' + d.data.data.artifactId;
        });
    }
  });
}());
