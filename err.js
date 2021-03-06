var serialize = require('serialize-error')
var clean = require('clean-stack')

class Err extends Error {

  constructor(msg) {
    super(msg)
    // fix the name property to the type
    this.name = this.constructor.name
    // ensure the stack trace is correct
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } 
    else { 
      this.stack = (new Error(msg)).stack
    }
  }

  toObject() {
    return serialize(this)
  }

  inspect() {
    return clean(this.stack)
  }
}

module.exports = Err
