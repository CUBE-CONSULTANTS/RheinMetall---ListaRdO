sap.ui.define([
	"sap/ui/core/mvc/Controller",
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment",
], function(
	Controller,
  BaseController,
  JSONModel,Fragment
) {
	"use strict";

	return BaseController.extend("listardo.listardo.controller.Detail", {
    onInit: async function () {
      debugger
      this.userType = this.getOwnerComponent().getModel("userModel").getProperty("/tipoUtente");
      debugger;
      let objJSon = await fetch("/model/modMock.json");
      let data = await objJSon.json();
      let datiRichiesta = data.dati[1].posizioni
      let oModel= new JSONModel(datiRichiesta)
      this.setModel(oModel,"detailModel");          
    },
    onNav: function(oEvent){
      this.getRouter().navTo("RouteHome")
    },
    onOpenTestiBom: function (oEvent){
      debugger
      this.setModel(new JSONModel(), "testiBom");
      let oButton = oEvent.getSource()
      let oView = this.getView()
    
      let objSel = oEvent.getSource().getBindingContext("detailModel").getObject().Testi
      this.getModel("testiBom").setProperty("/", objSel);

      if (!this._qPopover) {
        this._pPopover = Fragment.load({
          id: oView.getId(),
          name: "listardo.listardo.view.Fragment.testoEsteso",
          controller: this,
        }).then(function (oPopover) {
          oView.addDependent(oPopover);
          let ogg = oView.getModel("testiBom").getData();
          const oJsonModel = new JSONModel();
          oPopover.setModel(oJsonModel, "testiPopover");
          oPopover.getModel("testiPopover").setProperty("/testi", ogg);
          return oPopover;
        });
      }
      this._pPopover.then(function (oPopover) {
        oPopover.openBy(oButton);
      });        
    },
    onOpenAllegatoBom:function (oEvent){
      debugger
      let objSel = oEvent.getSource().getBindingContext("detailModel").getObject().All
      let oModel = new JSONModel(objSel)
      this.setModel(oModel,"oImmAll")
      let pdfModel = new JSONModel()
      
      this.setModel(pdfModel,"pdfModel")
      this.getModel("pdfModel").setProperty("/source",objSel)
      this.onOpenDialog("pDialog","listardo.listardo.view.Fragment.imageAll",this,"pdfModel")
    },
    onCloseAllegati: function(oEvent){
      oEvent.getSource().getParent().getParent().close()
    }
	});
});