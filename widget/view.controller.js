/* Copyright start
    MIT License
    Copyright (c) 2024 Fortinet Inc
Copyright end */
'use strict';
(function () {
    angular
      .module('cybersponse')
      .controller('gridSummary100Ctrl', gridSummary100Ctrl);

    gridSummary100Ctrl.$inject = ['$scope', 'widgetUtilityService', '$state', 'appModulesService'];

    function gridSummary100Ctrl($scope, widgetUtilityService, $state, appModulesService) {

      $scope.onView = onView;
      $scope.gridOptions = {};
      $scope.itemCount = 0;

      function _setGridApi(gridApi) {
        $scope.gridApi = gridApi;
        //Added to handle Grid does not take 100% width on page load
        $scope.gridApi.core.handleWindowResize();
      }

      function onView(row, col, event) {
        var state = appModulesService.getState($scope.module);
        var viewParams = {
          indicator: row.entity.indicator
        };
        var params = {
          module:  $scope.module,
          id: row.entity.indicator,
          viewParams: JSON.stringify(viewParams),
          previousState: $state.current.name,
          previousParams: JSON.stringify($state.params)
        };
        var leavingViewPanel = state.indexOf('viewPanel') === -1 && $state.current.name.indexOf('viewPanel') !== -1;
        if (event.ctrlKey || event.metaKey || leavingViewPanel) {
          var url = $state.href(state, params);
          $window.open(url, '_blank');
        } else {
          $state.go(state, params);
        }
      }

      function _handleTranslations() {
        widgetUtilityService.checkTranslationMode($scope.$parent.model.type).then(function () {
          $scope.viewWidgetVars = {
            // Create your translating static string variables here
          };
        });
      }

      function init() {
        // To handle backward compatibility for widget
        _handleTranslations();
        let _gridDefinition = $scope.config.embedded ? $scope.config.gridDefinition :  $scope.config.gridDefinitionJson;
        let _gridData = $scope.config.embedded ? $scope.config.gridData :  $scope.config.gridDataJson;
        $scope.module = _gridDefinition.module;
        $scope.gridOptions = _gridDefinition.gridOptions; //set grid definition
        $scope.gridOptions.data = _gridData.data; //set grid data 
        $scope.gridOptions.onRegisterApi = _setGridApi;
        $scope.itemCount = $scope.gridOptions.data ? $scope.gridOptions.data.length : 0;
      }

      init();
    }
})();
