(function () {
  'use strict';

  CubxComponent({
    is: 'cubx-root-deps-to-dep-trees',

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'a' has changed ...
     */
    modelRootDependenciesChanged: function (rootDependencies) {
      this._depTreesOf(rootDependencies, function (depTrees) {
        this.setDepTrees(depTrees);
      }.bind(this));
    },

    /**
     * Build the dep trees of a set of rootDependencies
     * @param {object} rootDependencies - Root dependencies
     * @param {function} callback - Function to be called when the depTree is ready
     * @private
     */
    _depTreesOf: function (rootDependencies, callback) {
      var depMgr = window.cubx.CRC.getDependencyMgr();
      // Create list of DepReference items from given rootDependencies
      var deps = depMgr._createDepReferenceListFromArtifactDependencies(rootDependencies, null);

      // Finally build rawDependency tree providing DepReference list and baseUrl
      depMgr._buildRawDependencyTree(deps, this.getBaseUrl() || window.cubx.CRC._baseUrl)
        .then(function (depTree) {
          callback(depTree);
        });
    }
  });
}());
