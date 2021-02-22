/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  * SRC: https://github.com/ded/domready/blob/master/ready.js
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = typeof document === 'object' && document
    , hack = doc && doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = doc && (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded && doc)
    doc.addEventListener(domContentLoaded, listener = function () {
      doc.removeEventListener(domContentLoaded, listener)
      loaded = 1
      while (listener = fns.shift()) listener()
    })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});

// Polyfilling
HTMLDocument.prototype.getAll || (HTMLDocument.prototype.getAll = function (s) {
  return Array.prototype.slice.call(this.querySelectorAll(s), 0);
});

function setBurgerListeners(burgers) {
  burgers.forEach(function (burger) {
    burger.addEventListener('click', function () {
      this.classList.toggle('is-active');
      var target = document.getElementById(this.dataset.target);
      target.classList.toggle('is-active');
    });
  });
}

domready(function () {
  // Burgers
  let burgers = document.getAll('.burger');
  if (burgers.length > 0) setBurgerListeners(burgers);

});
