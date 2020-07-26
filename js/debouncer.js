(function(){
  let DEBOUNCE_INTERVAL = 500;
  window.debounce = function(cb) {
    let lastTimeout = null;

    return function() {
      args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function() {
        cb.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  }


}
)();
