## dep-tree-viewer
Webpackage containing the necessary artifacts for the visualization of dependency trees.
### Artifacts of the webpackage
| Name | Type | Description | Links |
|---|---|---|---|
| **docs** | Application | Generated webpackage documentation. | [docs](https://cubbles.world/sandbox/dep-tree-viewer@1.1.1/docs/index.html)  |
| **cubx-dep-tree-viewer** | Elementary Component | Component to visualize the dependency tree of a component. | [demo](https://cubbles.world/sandbox/dep-tree-viewer@1.1.1/cubx-dep-tree-viewer/demo/index.html) [docs](https://cubbles.world/sandbox/dep-tree-viewer@1.1.1/cubx-dep-tree-viewer/docs/index.html)  |
| **cubx-root-deps-to-dep-trees** | Elementary Component | Create the dependency trees for a set of root dependencies | [docs](https://cubbles.world/sandbox/dep-tree-viewer@1.1.1/cubx-root-deps-to-dep-trees/docs/index.html)  |
| **cubx-deps-tree-viewer** | Compound Component | Visualize the dep-trees of an array of root dependencies | [demo](https://cubbles.world/sandbox/dep-tree-viewer@1.1.1/cubx-deps-tree-viewer/demo/index.html) [docs](https://cubbles.world/sandbox/dep-tree-viewer@1.1.1/cubx-deps-tree-viewer/docs/index.html)  |
### Use of components
The html file should contain the desire component using its tag, e.g. the `<cubx-deps-tree-viewer>`, as follows:
```html
<cubx-deps-tree-viewer cubx-webpackage-id="dep-tree-viewer@1.1.1"></cubx-deps-tree-viewer>
```
Note that the `webpackageId` should be provided, which in this case is: `dep-tree-viewer@1.1.1`.
Additionally, this component can be initialized using the `<cubx-core-slot-init>` tag (available from _cubx.core.rte@1.9.0_).
For example, lets initialize the `rootDependencies` slot to get the basic package of ckeditor:
```html
<cubx-deps-tree-viewer cubx-webpackage-id="dep-tree-viewer@1.1.1"></cubx-deps-tree-viewer>
	<!--Initilization-->
	<cubx-core-init style="display:none">
		<cubx-core-slot-init slot="rootDependencies">
		[{"artifactId": "cubx-ckeditor", "webpackageId": "ckeditor@1.0.0"}, {"artifactId": "cubx-webpackage-viewer", "webpackageId": "com.incowia.cubx-webpackage-viewer@1.4.2"}]
		</cubx-core-slot-init>
	</cubx-core-init>
</cubx-deps-tree-viewer>
```
Or it can be initialized and later manipulated from Javascript as follows:
```javascript
var component= document.querySelector('cubx-deps-tree-viewer');
// Wait until CIF is ready
document.addEventListener('cifReady', function() {
	// Manipulate slots
	component.setRootDependencies([{"artifactId": "cubx-ckeditor", "webpackageId": "ckeditor@1.0.0"}, {"artifactId": "cubx-webpackage-viewer", "webpackageId": "com.incowia.cubx-webpackage-viewer@1.4.2"}]);
});
```
[Want to get to know the Cubbles Platform?](https://cubbles.github.io)
