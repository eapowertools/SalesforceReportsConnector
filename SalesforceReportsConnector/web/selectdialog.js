﻿define(['qvangular'
], function (qvangular) {
    return ['serverside', 'standardSelectDialogService', function (serverside, standardSelectDialogService) {
        var eventlogDialogContentProvider = {
            getConnectionInfo: function () {
                return qvangular.promise({
                    dbusage: true,
                    ownerusage: false,
                    dbseparator: '.',
                    ownerseparator: '.',
                    specialchars: '! "$&\'()*+,-/:;<>`{}~[]',
                    quotesuffix: '"',
                    quoteprefix: '"',
                    dbfirst: true,
                    keywords: []
                });
            },
            getDatabases: function () {
                return serverside.sendJsonRequest("getDatabases").then(function (response) {
                    return response.qDatabases;
                });
            },
            getOwners: function ( /*databaseName*/) {
                return serverside.sendJsonRequest("getOwner").then(function (response) {
                    return qvangular.promise([{ qName: response.qMessage }]);
                });
            },
            getTables: function (qDatabaseName, qOwnerName) {
                return serverside.sendJsonRequest("getTables", qDatabaseName).then(function (response) {
                    return response.qTables;
                });
            },
            getFields: function (qDatabaseName, qOwnerName, qTableName) {
                return serverside.sendJsonRequest("getFields", qDatabaseName, qTableName).then(function (response) {
                    return response.qFields;
                });
            },
            getPreview: function ( /*databaseName, ownerName, tableName*/) {
                return qvangular.promise([]);
            }
        };

        standardSelectDialogService.showStandardDialog(eventlogDialogContentProvider, {
            precedingLoadVisible: true,
            fieldsAreSelectable: true,
            allowFieldRename: true
        });
    }];
});



