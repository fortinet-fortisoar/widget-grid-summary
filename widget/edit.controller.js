/* Copyright start
    MIT License
    Copyright (c) 2024 Fortinet Inc
Copyright end */
'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('editGridSummary100Ctrl', editGridSummary100Ctrl);

    editGridSummary100Ctrl.$inject = ['$scope', '$uibModalInstance', 'config', 'widgetUtilityService', '$timeout'];

    function editGridSummary100Ctrl($scope, $uibModalInstance, config, widgetUtilityService, $timeout) {
        $scope.cancel = cancel;
        $scope.save = save;
        $scope.config = config;
        $scope.header = $scope.config.title ? 'Edit Grid Summary' : 'Add Grid Summary';
        $scope.setGridDefinition = setGridDefinition; //set grid options
        $scope.setGridDataJson = setGridDataJson; //set grid data
        $scope.config.gridDefinitionJson = !angular.isArray($scope.config.gridDefinitionJson) ? $scope.config.gridDefinitionJson : {};
        $scope.jsoneditorOptions = {
          name: 'Fields',
          mode: 'code',
          onEditable: function () {
            return {
              field: true,
              value: true
            };
          }
        };
        $scope.config.gridDataJson = !angular.isArray($scope.config.gridDataJson) ? $scope.config.gridDataJson : {};
        $scope.jsonDataEditorOptions = {
          name: 'Fields',
          mode: 'code',
          onEditable: function () {
            return {
              field: true,
              value: true
            };
          }
        };

        function _handleTranslations() {
          let widgetNameVersion = widgetUtilityService.getWidgetNameVersion($scope.$resolve.widget, $scope.$resolve.widgetBasePath);
          
          if (widgetNameVersion) {
            widgetUtilityService.checkTranslationMode(widgetNameVersion).then(function () {
              $scope.viewWidgetVars = {
                // Create your translating static string variables here
              };
            });
          } else {
            $timeout(function() {
              $scope.cancel();
            });
          }
        }

        function setGridDefinition(json) {
          if (angular.isString(json)) {
            try {
              $scope.config.gridDefinitionJson = JSON.parse(json);
            } catch (e) {
              // invalid JSON. skip the rest
              return;
            }
          }
        }

        function setGridDataJson(json) {
          if (angular.isString(json)) {
            try {
              $scope.config.gridDataJson = JSON.parse(json);
            } catch (e) {
              // invalid JSON. skip the rest
              return;
            }
          }
        }

        function init() {
            // To handle backward compatibility for widget
            _handleTranslations();
        }

        init();

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            $uibModalInstance.close($scope.config);
        }

    }
})();
