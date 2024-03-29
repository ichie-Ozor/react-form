const { createServer } = require('http')
const { createAccount } = require('./API')
const cors = require('cors');




const server = createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    const headers = req.headers;
    const parsedUrl = new URL(url, `http://${headers.host}`);
    const query = parsedUrl.searchParams;
    const path = parsedUrl.pathname.replace(/^\/+|\/+$/g,'')
    console.log("i dey server")


    
    const corsOptions = {
      origin: '*', // Change this to a specific origin or list of allowed origins
      methods: 'GET, POST, PUT, DELETE, OPTIONS',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    };

    cors(corsOptions)(req, res, () => {
      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }
    });


   switch (method) {
      case 'POST':
         switch (path){
            case 'account':
                createAccount(req, res)
                break;
// <<<<<<< HEAD
                default:
                    res.writeHead(500, {'Content-Type': 'application/json'})
                    return res.end(JSON.stringify({message : 'route not found'}))
        }
           break
   }

  //  if(path === 'account' && method === 'POST'){
  //   return createAccount(req, res)
  //  }else {
  //   res.writeHead(400, {'Content-Type': 'application/json'})
  //   return res.end(JSON.stringify({message: 'Route not found'}))
  //  }
//   if(req.method ==='OPTIONS'){
//     res.writeHead(204);
//     res.end();
//     return
//   }

  //  if(path === 'account' && method === 'POST'){
  //   createAccount(req, res)
  //  } else {
  //   res.writeHead(404, {'Content-Type': 'application/json'})
  //   res.end(JSON.stringify({message: 'Route not found'}))
  //  }
})
// >>>>>>> e02d442bad9e3b3f158505d968730a5bf88db3e0


const port = 5000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
 })