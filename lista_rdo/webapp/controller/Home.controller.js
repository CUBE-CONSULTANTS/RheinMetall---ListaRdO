sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "./BaseController",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("listardo.listardo.controller.Home", {
      onInit: async function () {
        this.userType = this.getOwnerComponent().getModel("userModel").getProperty("/tipoUtente");
        debugger;
        let objJSon = await fetch("/model/modMock.json");
        let data = await objJSon.json();

				let oModel= new JSONModel(data)
				this.setModel(oModel,"richiesteModel");
      },
    });
  }
);
