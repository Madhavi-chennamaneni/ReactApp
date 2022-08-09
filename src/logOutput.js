
var log_file = require('fs').createWriteStream(__dirname + '/log.txt', {flags : 'w'})

function hook_stream(stream, callback) {
   var old_write = stream.write
    
  stream.write = (function(write) {
    return function(string, encoding, fd) {
      write.apply(stream, arguments)  // comments this line if you don't want output in the console
      //console.log("encoding.."+encoding)
      callback(string, encoding, fd)
    }
  })
   (stream.write)

  return function() {
    stream.write = old_write
  }
}

// console.log('a')
// console.error('b')

var unhook_stdout = hook_stream(process.stdout, function(string, encoding, fd) {
    //console.log("encoding.."+encoding)
  log_file.write(string, encoding)
})

var unhook_stderr = hook_stream(process.stderr, function(string, encoding, fd) {
   // console.log("encoding.."+encoding)
  log_file.write(string, encoding)
})

// console.log('c')
// console.error('d')

module.exports = { unhook_stdout:unhook_stdout,unhook_stderr:unhook_stderr }

// console.log('e')
// console.error('f')