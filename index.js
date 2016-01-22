'use strict';

let fs = require('fs');
let osenv = require('osenv');
let spawn = require('child_process').spawn;

const TMPDIR = osenv.tmpdir();
const EXEC = 'xcodebuild'; // TODO: provide way to specify executable?

// TODO: use osenv.path() to check for presence of `xcode`

class xFiles {
	// TODO: use xcode module to try and detect defaults from directory
	constructor(scheme, project) {
		if (!scheme) { throw new Error('Must provide scheme'); }
		if (!project) { throw new Error('Must provide project'); }
		if (project.indexOf('.xcodeproj') === -1) {
			throw new Error('Project must be an .xcodeproj file');
		}
		this.scheme = scheme || app;
		this.project = project;
	}

	createArchive(destination) {
		return new Promise((resolve, reject) => {
			if (destination.indexOf('.xcarchive') === -1) {
				destination = destination + '.xcarchive';
			}
			let args = [
				'-scheme', this.scheme,
				'-project', this.project,
				'-archivePath', destination,
				'archive',
			];
			let child = spawn(EXEC, args);
			child.stdout.on('data', (data) => {
				// TODO: Collect information such as:
				// Signing Identity
				// Provisioning Profile
			});
			child.stderr.on('data', (data) => {
				// TODO: parse error data?
			});
			child.on('close', (code) => {
				if(code === 0) {
					resolve(destination);
				}
				else {

					// TODO: Parse stdout/stderr for clues to failure.
					// Missing provisioning profile, wrong scheme name, etc.
					reject(new Error(`Archive failed with error code ${code}`));
				}
			})
		});
	}

	exportArchive(archive, destination) {
		return new Promise((resolve, reject) => {
			let args = [
				'-exportArchive',
				'-exportFormat', 'ipa',
				'-archivePath', archive,
				'-exportPath', destination,
			];
			let child = spawn(EXEC, args);
			child.stdout.on('data', (data) => {
				// TODO: same as createArchive on data event.
			});
			child.stderr.on('data', (data) => {
				// TODO: parse error data?
			});
			child.on('close', (code) => {
				if(code === 0) {
					resolve(destination);
				}
				else {
					reject(new Error(`Export failed with error code ${code}`));
				}
			});
		});
	}
};

module.exports = xFiles;