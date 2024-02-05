sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, BaseController, JSONModel,Fragment) {
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
      formatCellColor: function(material) {
        debugger
        return (material === "RU403051AE") ? "textColor" : "";
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
      let src = oEvent.getSource().getBindingContext("allegatiDialog").getObject().src
      let pdfModel = new JSONModel()
      pdfModel.setProperty("/source",src)
      this.setModel(pdfModel,"pdfModel")
      this.onOpenDialog("lDialog","listardo.listardo.view.Fragment.imageAll",this,"pdfModel")       
      },
      onCloseAllegati: function (oEvent){
        oEvent.getSource().getParent().getParent().close()
      },
      onOpenTesti: function (oEvent){
        debugger
        this.setModel(new JSONModel(), "testiModel");
        let oButton = oEvent.getSource()
        let oView = this.getView()
        // let objSel = oEvent.getSource().getBindingContext("ordineModel").getObject().testiPop
        // this.getModel("testiModel").setProperty("/", objSel);

        if (!this._qPopover) {
          this._pPopover = Fragment.load({
            id: oView.getId(),
            name: "listardo.listardo.view.Fragment.testoEsteso",
            controller: this,
          }).then(function (oPopover) {
            oView.addDependent(oPopover);
            // let ogg = oView.getModel("testiModel").getData();
            const oJsonModel = new JSONModel();
            oPopover.setModel(oJsonModel, "testiPopover");
            // oPopover.getModel("testiPopover").setProperty("/", ogg);
            return oPopover;
          });
        }
        this._pPopover.then(function (oPopover) {
          oPopover.openBy(oButton);
        });        
      },
    });
  }
);
