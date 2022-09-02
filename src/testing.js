var axios=require('axios');

var payload={
url: 'http://localhost:3005/api/gettest',
method: 'get',
headers: {
    "Content-Type": "text/plain",
  },
data: {
    firstName: 'Fred'
  },
}

axios(payload).then(Response=>Response.json()).then(res=>console.log(res)).catch(res1=>console.log(res1));