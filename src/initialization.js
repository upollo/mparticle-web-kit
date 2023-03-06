var initialization = {
  name: "upollo",
  initForwarder: function (
    forwarderSettings,
    testMode,
    userAttributes,
    userIdentities,
    processEvent,
    eventQueue,
    isInitialized,
    common,
    appVersion,
    appName,
    customFlags,
    clientId
  ) {
    if (!testMode) {
      // load the upollo client as a script tag.
      var clientScript = document.createElement("script");
      clientScript.type = "text/javascript";
      clientScript.async = true;
      clientScript.src = "https://cdn.upollo.ai/web/0.2/bundle.min.js";
      (
        document.getElementsByTagName("head")[0] ||
        document.getElementsByTagName("body")[0]
      ).appendChild(clientScript);
      clientScript.onload = function () {
        if (upollo && eventQueue.length > 0) {
          // Process any events that may have been queued up while forwarder was being initialized.
          for (var i = 0; i < eventQueue.length; i++) {
            processEvent(eventQueue[i]);
          }
          // now that each queued event is processed, we empty the eventQueue
          eventQueue = [];
        }

        // Add the upollo client to `common` which is accessible in the identity handlers.
        common.__proto__.upClient = new upollo.UpolloClient(
          forwarderSettings.apiKey
        );
      };
    } else {
      // Dont do anything in test.
    }
  },
};

module.exports = initialization;
