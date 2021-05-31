const express = require('express')
const app = express();
const Blockchain = require('./blockchain')
const uuid = require('uuid');
const rp   = require('request-promise');


const port = process.argv[2];
const nodeAdress = uuid.v1().split('-').join('');
const bitcoin = new Blockchain();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
//app.use(bodyParser.urlencoded = false);
 
app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get('/blockchain',function(req,res){
    res.send(bitcoin);
});
 

app.post('/transaction',function(req,res){
   const blockindex =  bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.receipient);
   return res.json({note:`Transaction added to the block as index # ${blockindex}`});
});

app.get('/mine',function(req,res){
    const lastBlock = bitcoin.getLastBlock();
    const prevBlockHash = lastBlock.hash;//lastBlock['hash'];


    const currentBlockdata = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock.index + 1
    };

    const nonce = bitcoin.profOfWork(prevBlockHash,currentBlockdata);
    const newHash = bitcoin.hashBlock(prevBlockHash,currentBlockdata,nonce);

    bitcoin.createNewTransaction(12.5,"00",nodeAdress);

    const newBlock = bitcoin.createNewBlock(nonce,prevBlockHash,newHash);

    res.json(
            {note:"New Block mined succesfully",
            block: newBlock
             
        })

});

app.post('/register-broadcast-node',function(req,res){

    const newNodeUrl = req.body.newUrl;
    const registerPromeses = [];


    if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1)
      {
        bitcoin.networkNodes.push(newNodeUrl);
      }  

        bitcoin.networkNodes.forEach(networkNodes => {
            const requestOptions = {
                uri: networkNodes + "/registerNode",
                method:"POST",
                body:{ newNodeUrl:newNodeUrl} ,
                json:true

            };
            registerPromeses.push( rp(requestOptions) );

        });

        Promise.all(registerPromeses).then(data=> {

            const bulkRegisterOptions = {
                uri: newNodeUrl +"/registerNodesBulk",
                method:"POST",
                body : {allNetworkNode : [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
                json :true

            }
            return  rp(bulkRegisterOptions)
        })
        .then(data => {

            res.json({note:"New node register OK!"});
        });
});

app.post('/registerNode',function(req,res){
    const newnetworkNodes = req.body.newNodeUrl;
    
    if(bitcoin.networkNodes.indexOf(newnetworkNodes) == -1 && bitcoin.currentNodeUrl !== newnetworkNodes)
      {
        bitcoin.networkNodes.push(newnetworkNodes);
      }  
    

    res.json({note:"New node register successfully"});

});

app.post('/registerNodesBulk',function(req,res){
    const newnallNetworkNodes = req.body.allNetworkNode;

    newnallNetworkNodes.forEach(networkNodesUrl => {

        if(bitcoin.networkNodes.indexOf(networkNodesUrl) == -1 && bitcoin.currentNodeUrl !== networkNodesUrl)
        {
            bitcoin.networkNodes.push(networkNodesUrl);
        }
       
    })

    res.json({note:'Bulk registration OK!'});

});


app.listen(port,function(){
    console.log(`Listening on port check ${port}....`);
})