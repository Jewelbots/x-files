X-Files
-------
Archive & Export Xcode Projects With Poise and Grace

### Known Issues
When using this library in conjunction with something like `ios-deploy`, ensure that you have removed any copies of the app that may have been previously installed via iTunes. Any copies left in iTunes will silently overwrite the version generated with x-files and installed with any tool such `ios-deploy`, `libimobiledevice`, or similar.

Specifying which provisioning profile to use is not yet supported. This will be fixed.

### Requirements
This module requires a modern version of Node.js (>=4.x)

### Examples

#### Create IPA from Xcode Project
The following example creates an `.ipa` file from an existing Xcode project (`.xcodeproj` file).
This `.ipa` file can then be deployed to a device or distributed however you like.

```js
let xFiles = require('./index');
let app = new xFiles(
	'FancyApp', // Xcode Scheme
	'/Users/FancyPerson/FancyApp.xcodeproj' // Xcode Project
);

console.log('> Creating archive...');
app.createArchive('./test').then((file) => {
	console.log(`> Archive created. Exporting...`);
	app.exportArchive(file, './test.ipa').then((ipa) => {
			console.log(`Done. We created ${ipa}!`);
		});
	});
}, (error) => {
	console.log(`- Archive failed: ${error}`);
});

```
