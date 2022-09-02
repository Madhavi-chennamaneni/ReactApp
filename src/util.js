import axios from 'axios';
import configdata from './config.json'


const APIServerUrl=configdata.API_SERVER_URL;

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

// const httpCall = async (url, payload) => {
//   return new Promise((resolve, reject) => {
//     axios.post(url, payload)
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


async function apiCall(specs) {
  const payload = {
    method: specs.method,
    headers: {
      "Content-Type": "text/plain",
    },
    url: getAPIurl(specs)
  };
payload.data={body:specs.body}
  return new Promise((resolve, reject) => {
    axios(payload)
      .then((res) => {return res.data })
      .then((result) => {
       resolve(result.body);
      })
      .catch((error) => {
       reject(error.body);
      });
  });


  // if (language === "java") {
  //   //var javacode = buildCodeForJava(code);
  //   payload.body = JSON.stringify({ code: buildCodeForJava(code) });
  //   return new Promise((resolve, reject) => {
  //     httpCall(
  //       "https://pk8eaiaa0h.execute-api.ap-south-1.amazonaws.com/beta",
  //       payload
  //     )
  //       .then((result) => {
  //         console.log("result is    java " + result);
  //         resolve(result.body);
  //       })
  //       .catch((result) => {
  //         console.log("result is    java  " + result);
  //         resolve(result.body);
  //       });
  //   });
  // }

  // if (language === "Javascript") {
  //   payload.body = JSON.stringify({ code: code });
  //   return new Promise((resolve, reject) => {
  //     httpCall("http://localhost:3005/api/javascript", payload)
  //       .then((result) => {
  //         console.log("result is   js  " + result);
  //         resolve(result.body);
  //       })
  //       .catch((result) => {
  //         console.log("result is  js   " + result);
  //         resolve(result.body);
  //       });
  //   });
  // }
}



// function buildCodeForJava(UserCode) {
//   var code = UserCode.split("\n");
//   for (var i = 0; i < code.length; i++) {
//     code[i] = code[i].trim();
//     code[i] = code[i].replace("//write your code below", "");
//   }
//   code = code.join("");
//   return code;
// }


function getAPIurl(specs) {
  if (specs.method == "post") {

    if (specs.language) {
      if (specs.language == "JavaScript" && specs.api == "runcode") {
        return "https://pk7vnfha6d.execute-api.ap-south-1.amazonaws.com/dev/learner/evaluate/run";

      }
       if(specs.language=="JavaScript" && specs.api=="submitcode")
      {
        return APIServerUrl+"submitusercode";

      }
      if (specs.language == "Java" && specs.api == "runcode") {
        return "https://pk7vnfha6d.execute-api.ap-south-1.amazonaws.com/dev/learner/evaluate/run";

      }
      // else(language=="Java" && api=="submitcode")
      // {

      // }
    }

  }




}



export default apiCall;
