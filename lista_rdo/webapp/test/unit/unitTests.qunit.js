/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"lista_rdo/lista_rdo/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
