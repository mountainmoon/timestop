(function(global) {
  var _setTimeout = global.setTimeout
    , _clearTimeout = global.clearTimeout
    , uid = 0
    , timerHash = {}
    , pending = []
    , isPause = false

  global.setTimeout = function(cb, after) {
    if (isPause) {
      pending.push({cb: cb, after: after})
      return
    }

    var fn = function() {
      cb()
      delete timerHash[timer.$id || timer]
    }
    var timer = _setTimeout(fn, after)
    timerHash[nextUid(timer)] = {
      cb: fn,
      after: + new Date + after,
      timer: timer
    }
    return timer
  }

  global.clearTimeout = function(timer) {
    var id = timer.$id || timer
    timer = timerHash[id].timer
    delete timerHash[id]
    _clearTimeout(timer)
  }

  function nextUid(id) {
    if (typeof id == 'number') return id
    return id.$id = ++uid
  }

  var timestop = {
    pause: function() {
      if (isPause) return
      isPause = true
      for (var id in timerHash) {
        var t = timerHash[id]
        _clearTimeout(t.timer)
        t.after -= new Date
      }
    },

    resume: function() {
      if (!isPause) return
      isPause = false
      for (var id in timerHash) {
        var t = timerHash[id]
        t.timer = _setTimeout(t.cb, t.after)
        t.after = + new Date + t.after
      }
      for (var i = 0; i < pending.length; i++)
        global.setTimeout(pending[i].cb, pending[i].after)
      pending.length = 0
    },

    _setTimeout: _setTimeout,
    _clearTimeout: _clearTimeout
  }

  if (global.document) {
    global.timestop = timestop
  } else {
    module.exports = timestop
  }
})(typeof window != 'undefined' ? window : global)