function executeJavascriptCode(UserCode) {
  var tempcomsole = console.log;
  var output = [];
  console.log = function (args) {
    output.push(args);
  };
  new Function(UserCode)();
  console.log = tempcomsole;
  return output;
}

const httpCall = async (url, payload) => {
  return new Promise((resolve, reject) => {
    fetch(url, payload)
      .then((res) => {
        // console.log(typeof res);
        console.log(res);
        return res.json();
      })
      .then((result) => {
        return resolve(result);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

// const httpCallSubmit = async (submiturl, payload) => {
//   return new Promise((resolve, reject) => {
//     fetch(submiturl, payload)
//       .then((res) => {
//         console.log(typeof res);
//         return res.json();
//       })
//       .then((result) => {
//         return resolve(result);
//       })
//       .catch((error) => {
//         return reject(error);
//       });
//   });
// };

module.exports = {
  httpCall: httpCall,
  // httpCallSubmit: httpCallSubmit,
};
