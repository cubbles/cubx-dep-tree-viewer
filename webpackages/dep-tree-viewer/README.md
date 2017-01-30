## dep-tree-viewer
Webpackage containing the necessary artifacts for the `cubx-dep-tree-viewer`.
### Artifacts of the webpackage
| Name | Type | Description | Links |
|---|---|---|---|
| **docs** | Application | Generated webpackage documentation for this webpackage. | [docs](https://cubbles.world/sandbox/dep-tree-viewer@1.0.0/docs/index.html) |
| **cubx-dep-tree-viewer** | Elementary Component | Component to visualize the dependency tree of a component. | [demo](https://cubbles.world/sandbox/dep-tree-viewer@1.0.0/cubx-dep-tree-viewer/demo/index.html) [docs](https://cubbles.world/sandbox/dep-tree-viewer@1.0.0/cubx-dep-tree-viewer/docs/index.html) |
### Use of components
The html file should contain the desire component using its tag, e.g. the `<cubx-dep-tree-viewer>`, as follows:
```html
<cubx-dep-tree-viewer cubx-webpackage-id="dep-tree-viewer@1.0.0"></cubx-dep-tree-viewer>
```
Note that the `webpackageId` should be provided, which in this case is: `dep-tree-viewer@1.0.0`.
Additionally, this component can be initialized using the `<cubx-core-slot-init>` tag (available from _cubx.core.rte@1.9.0_).
For example, lets initialize the `height` slot to get the basic package of ckeditor:
```html
<cubx-dep-tree-viewer cubx-webpackage-id="dep-tree-viewer@1.0.0"></cubx-dep-tree-viewer>
	<!--Initilization-->
	<cubx-core-init>
		<cubx-core-slot-init slot="height">800px</cubx-core-slot-init>
	</cubx-core-init>
</cubx-dep-tree-viewer>
```
Or it can be initialized and later manipulated from Javascript as follows:
```javascript
var component= document.querySelector('cubx-dep-tree-viewer');
// Wait until CIF is ready
document.addEventListener('cifReady', function() {
	// Manipulate slots
	component.setHeight('800px');
});
```
[Want to get to know the Cubbles Platform?](https://cubbles.github.io)
