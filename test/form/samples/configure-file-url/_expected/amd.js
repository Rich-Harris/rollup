define(['require'], (function (require) { 'use strict';

	var asset1 = 'chunkId=amd.js:moduleId=solved:fileName=assets/asset-solved-230ecafdb.txt:format=amd:relativePath=assets/asset-solved-230ecafdb.txt:referenceId=6296c678';

	var asset2 = 'resolved';

	var asset3 = new URL(require.toUrl('./assets/asset-unresolved-f4c1e86cd.txt'), document.baseURI).href;

	console.log(asset1, asset2, asset3);

}));
