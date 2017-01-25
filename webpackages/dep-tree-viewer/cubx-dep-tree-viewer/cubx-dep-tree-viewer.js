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
     * Parse a DependencyTree to a list usable by d3
     * @param tree
     * @param depList
     * @returns {*}
     */
    _treeToList: function (tree, depList) {
      var counter = depList.length;
      depList.push({
        id: counter,
        parentId: tree.parent ? tree.parent.counter : '',
        data: tree.data
      });
      if (tree.children.length === 0) {
        return depList;
      }
      else {
        for (var i = 0; i < tree.children.length; i++) {
          tree.children[i].parent.counter = counter;
          this.treeToList(tree.children[i], depList);
        }
        return depList;
      }
    }
  });
}());
