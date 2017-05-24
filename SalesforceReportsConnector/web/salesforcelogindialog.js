﻿define([
	"general.services/show-service/show-service",
	"text!SalesforceReportsConnector.webroot/salesforcelogindialog.ng.html",
    'css!SalesforceReportsConnector.webroot/salesforcelogindialog.css',
	"assets/client/dialogs/directives/dialog-directives"
], function (
	showService,
	template,
    css,
    dialogDirective
) {
    var aboutDialogIsOpened = false;

    /** COMPONENT **/
    var component = {
        template: template,
        scope: {
            url: ""
        },
        controller: ['$scope', '$document', '$window', function ($scope, $document, $window) {
            $scope.sfURL = "";
            $scope.name = "salesforce";
            $scope.host = "salesforce.com";
            $scope.username = "userNameforSF";
            $scope.password = "somePass";

            $scope.finish = function () {
                // do something here to process the URL
                console.log($scope.sfURL);
                var returnVal = {
                    name: $scope.name,
                    host: $scope.host,
                    username: $scope.username,
                    password: $scope.password
                };

                $scope.destroyComponent();
                aboutDialogIsOpened = false;
                $scope.deferredResult.resolve(returnVal);
            };

            $scope.cancel = function () {
                $scope.destroyComponent();
                aboutDialogIsOpened = false;
                $scope.deferredResult.reject();
            };

            $window.open($scope.url);
        }]
    };

    template.urlLoaded = function () {
    }

    function getAboutDialogIsOpenedParam() {
        return aboutDialogIsOpened;
    }

    function show($sce, url) {
        aboutDialogIsOpened = true;

        var trustedURL = {
            url: $sce.trustAsResourceUrl(url)
        };
        return showService.show(component, trustedURL).resultPromise;
    }

    return {
        show: show,
        getAboutDialogIsOpenedParam: getAboutDialogIsOpenedParam
    };

});