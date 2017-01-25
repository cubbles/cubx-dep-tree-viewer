/*global d3*/
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
      var self = this;
      var svg = d3.select('svg')
        .attr('width', '100%')
        .attr('height', '800px');
      var width = 600;
      var height = 600;
      var g = svg.append('g').attr('transform', 'translate(40,0)');

      var tree = d3.cluster()
        .size([height, width - 160]);

      var root = d3.hierarchy(depTree._rootNodes[0]);
      tree(root);
      var link = g.selectAll('.link')
        .data(root.descendants().slice(1))
        .enter().append('path')
        .attr('class', 'link ' + self.is)
        .attr('d', function(d) {
          return 'M' + d.y + ',' + d.x
            + 'C' + (d.parent.y + 100) + ',' + d.x
            + ' ' + (d.parent.y + 100) + ',' + d.parent.x
            + ' ' + d.parent.y + ',' + d.parent.x;
        });

      var node = g.selectAll('.node')
        .data(root.descendants())
        .enter().append('g')
        .attr('class', function(d) { return 'node' + (d.children ? ' node--internal' : ' node--leaf')  + ' ' + self.is; })
        .attr('transform', function(d) {
          return 'translate(' + d.y + ',' + d.x + ')';
        });

      node.append('circle')
        .attr('class', self.is)
        .attr('r', 2.5);

      node.append('text')
        .attr('class', self.is)
        .attr('dy', 3)
        .attr('x', function(d) { return d.children ? -8 : 8; })
        .style('text-anchor', function(d) { return d.children ? 'end' : 'start'; })
        .text(function(d) {
          return d.data.data.artifactId;
        });
    }
  });
}());
