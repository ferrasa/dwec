import http from 'http';

function handleRequest(req, res){
    if (req.method === 'GET' && req.url === '/teste'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Funcionou</h1>');
        res.end();
    }
}

const server = http.createServer(handleRequest);
server.listen(3000);
console.log('Server  running');