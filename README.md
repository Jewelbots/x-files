X-Files
-------
Archive & Export Xcode Projects With Poise and Grace

### Known Issues
When using this library in conjunction with something like `ios-deploy`, ensure that you have removed any copies of the app that may have been previously installed via iTunes. Any copies left in iTunes will silently overwrite the version generated with x-files and install with any tool like `ios-deploy`, `libimobiledevice`, etc.

Specifying which provisioning profile to use is not yet supported. This will be fixed.