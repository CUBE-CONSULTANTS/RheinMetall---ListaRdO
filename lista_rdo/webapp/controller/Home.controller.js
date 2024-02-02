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
      onOpenBom: function(oEvent){
        debugger
        let oDatiMat = this.getModel("richiesteModel").getData().bom[0]
        let oModel = new JSONModel(oDatiMat)
    
        if(oEvent.getParameter("cellControl").getBindingInfo("text").binding.getPath() === 'Materiale'){
          if(oEvent.getParameter("cellControl").getBindingInfo("text").binding.getValue() === oDatiMat.Materiale){
            this.setModel(oModel, "bomDialog");
            this.onOpenDialog("nDialog","listardo.listardo.view.Fragment.bomDialog",this,"bomDialog")
          }
        }
      },
      onCloseDialog: function(oEvent){
        oEvent.getSource().getParent().close()
      },
      onUploadAllegati:function(oEvent){
        debugger
        
         
      },
      onOpenAllegati: function (oEvent){
        debugger
        let oAllegatiMat = this.getModel("richiesteModel").getData().allegati[0]
        let oModel = new JSONModel(oAllegatiMat)
        let order = oEvent.getSource().getBindingContext("richiesteModel").getObject().richiesta
        if(oAllegatiMat.Ordine === order){
        this.setModel(oModel, "allegatiDialog");
        this.onOpenDialog("pDialog","listardo.listardo.view.Fragment.listaAllegati",this,"allegatiDialog")     
        }    
      },
      onSelectAllegato: function (oEvent){
        debugger

      },
      onCloseAllegati: function (oEvent){
        oEvent.getSource().getParent().getParent().close()
      }
    });
  }
);
