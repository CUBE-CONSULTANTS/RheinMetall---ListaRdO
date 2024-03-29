sap.ui.define(
  ["sap/ui/core/mvc/Controller", 
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment",
   "sap/ui/core/routing/History", 
   "sap/ui/core/UIComponent"
  ],
  function (Controller, JSONModel,Fragment,History, UIComponent) {
    "use strict";

    return Controller.extend(
      "ordiniacquisto.ordiniacquisto.controller.BaseController",
      {
        /**
         * @override
         */
        // Creazione del ruolo dell'utente
        getModel: function (sName) {
          return this.getView().getModel(sName);
        },
        setModel: function (oModel, sName) {
          return this.getView().setModel(oModel, sName);
        },
        _getDbPromised: function (Entity, Property, Filters) {
          debugger;
          let model = this.getOwnerComponent().getModel();
          return new Promise((resolve, reject) => {
            debugger;
            model.read(Entity, {
              //   urlParameters: {
              //     "$expand": $expand
              // },
              filters: Filters,
              success: (odata) => {
                debugger;
                let sProp = Property;
                resolve({
                  [sProp]: odata.results,
                });
              },
              error: (error) => {
                debugger;
                reject(error);
              },
            });
          });
        },
        navTo: function (psTarget, pmParameters, pbReplace) {
          this.getRouter().navTo(psTarget, pmParameters, pbReplace);
      },

      getRouter: function () {
          return UIComponent.getRouterFor(this);
      },
        onOpenDialog: function(dialName, fragmName, self, ...oModel) {
          let oView = this.getView();
          dialName = self.dialName;
          if (!dialName) {
              dialName = Fragment.load({
                  id: oView.getId(),
                  name: fragmName,
                  controller: self,
              }).then((oValueHelpDialog) => {             
                  oView.addDependent(oValueHelpDialog);
                  oValueHelpDialog.setModel(this.getModel(...oModel));
                  return oValueHelpDialog;
              });
              dialName.then(function(oValueHelpDialog) {
                  oValueHelpDialog.open();
              });
          }else{                
              self.dialName.open()
          }        
      },
        navback: function (rotta) {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo(rotta);
        },
        navTo: function (psTarget, pmParameters, pbReplace) {
          this.getRouter().navTo(psTarget, pmParameters, pbReplace);
        },
        getRouter: function () {
          return UIComponent.getRouterFor(this);
        }
      }
    );
  }
);