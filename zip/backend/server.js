const { createServer } = require('http')
const { createAccount } = require('./API')
// const cors = require('cors')


const server = createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    const headers = req.headers;
    const parsedUrl = new URL(url, `http://${headers.host}`);
    const query = parsedUrl.searchParams;
    const path = parsedUrl.pathname.replace(/^\/+|\/+$/g,'')
    console.log("i dey server")


    

    // cors()
    // res.setHeader('Allow-Control-Allow-Origin', '*')
    // res.setHeader('Allow-Control-Allow-Method', 'GET', 'PUT', 'POST', 'DELTE', 'OPTIONS')
    // res.setHeader('Allow-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')


//    switch (method) {
//       case 'POST':
//          switch (path){
//             case 'account':
//                 createAccount(res, req)
//                 break;
//                 default:
//                     res.writeHead(500, {'Content-Type': 'application/json'})
//                     return res.end(JSON.stringify({message : 'Could not write file'}))
//         }
//    }

   if(path === 'account' && method === 'POST'){
    return createAccount(req, res)
   }else {
    res.writeHead(400, {'Content-Type': 'application/json'})
    return res.end(JSON.stringify({message: 'Route not found'}))
   }
  if(req.method ==='OPTIONS'){
    res.writeHead(204);
    res.end();
    return
  }
})


const port = 5000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})