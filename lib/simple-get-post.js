module.exports = (function () {

  function Arithmetic () {

  }

  Arithmetic.prototype.sum  = function (a, b) {
    return a + b;
  };

  return {
    Arithmetic: Arithmetic
  };

})();

