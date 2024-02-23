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
        debugger
        this.userType = this.getOwnerComponent().getModel("userModel").getProperty("/tipoUtente");
        debugger;
        let objJSon = await fetch("/model/modMock.json");
        let data = await objJSon.json();

				let oModel= new JSONModel(data)
				this.setModel(oModel,"richiesteModel");      
        let oTable = this.byId("TreeTableBasic");
        oTable.attachRowsUpdated(this.onTableRowsUpdated, this);
      }, 
      onTableRowsUpdated: function(oEvent) {
        debugger
        this.handleExpandedRow(oEvent)
      },    
      handleExpandedRow: function(oEvent) {
       debugger
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
      onOpenDetail: function(oEvent){
        debugger
        this.getRouter().navTo("OrderDetail")
        // let oDatiMat = this.getModel("richiesteModel").getData().bom[0]
        // let oModel = new JSONModel(oDatiMat)
    
        // if(oEvent.getParameter("cellControl").getBindingInfo("text").binding.getPath() === 'Materiale'){
        //   if(oEvent.getParameter("cellControl").getBindingInfo("text").binding.getValue() === oDatiMat.Materiale){
        //     this.setModel(oModel, "bomDialog");
        //     this.onOpenDialog("nDialog","listardo.listardo.view.Fragment.bomDialog",this,"bomDialog")
        //   }
        // }
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
        this.onOpenDialog("pDialog","listardo.listardo.view.Fragment.Detail.listaAllegati",this,"allegatiDialog")     
        }    
      },
      onOpenAllegatoBom:function (oEvent){
        debugger
        let objSel = oEvent.getSource().getBindingContext("bomDialog").getObject().All
        let oModel = new JSONModel(objSel)
        this.setModel(oModel,"oImmAll")
        let pdfModel = new JSONModel()
        
        this.setModel(pdfModel,"pdfModel")
        this.getModel("pdfModel").setProperty("/source",objSel)
        this.onOpenDialog("pDialog","listardo.listardo.view.Fragment.Detail.imageAll",this,"pdfModel")
      },
      onSelectAllegato: function (oEvent){
      debugger
      let src = oEvent.getSource().getBindingContext("allegatiDialog").getObject().src
      let pdfModel = new JSONModel()
      pdfModel.setProperty("/source",src)
      this.setModel(pdfModel,"pdfModel")
      this.onOpenDialog("lDialog","listardo.listardo.view.Fragment.Detail.imageAll",this,"pdfModel")       
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
            name: "listardo.listardo.view.Fragment.Detail.testoEsteso",
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
      onOpenTestiBom: function (oEvent){
        debugger
        this.setModel(new JSONModel(), "testiBom");
        let oButton = oEvent.getSource()
        let oView = this.getView()
      
        let objSel = oEvent.getSource().getBindingContext("bomDialog").getObject().Testi
        this.getModel("testiBom").setProperty("/", objSel);

        if (!this._qPopover) {
          this._pPopover = Fragment.load({
            id: oView.getId(),
            name: "listardo.listardo.view.Fragment.Detail.testoEsteso",
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
    });
  }
);
