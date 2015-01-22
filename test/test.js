var timestop, _setTimeout

if (typeof module == 'object') {
  timestop = require('./../timestop.js')
}

_setTimeout = timestop._setTimeout

var start = new Date

setTimeout(function() {
  assertElapsedTime(new Date - start, 1500)
}, 1500)

setTimeout(function() {
  assertElapsedTime(new Date - start, 4000)
}, 3000)

setTimeout(function() {
  assertElapsedTime(new Date - start, 4500)
}, 3500)

_setTimeout(function() {
  timestop.pause()

  // call setTimeout in the pause phase.
  setTimeout(function() {
    assertElapsedTime(new Date - start, 4000)
  }, 1000)

  _setTimeout(function() {
    timestop.resume()
  }, 1000)

}, 2000)

function equal(elapse, target) {
  return elapse > target - 50 && elapse < target + 50
}

var passed = 0, failed = 0
function assertElapsedTime(elapse, target) {
  var ok = true
  try {
    console.assert(equal(elapse, target), 'elapsed time should be about ' + target)
  } catch (e) {
    ok = false
    throw e  //todo: should exit with -1
  } finally {
    console.log(ok
        ? ++passed + ' test(s) passed'
        : ++failed + ' test(s) failed'
    )
  }
}