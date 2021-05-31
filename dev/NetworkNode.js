
const { json } = require('body-parser');
const express = require('express')
const app = express();
const Blockchain = require('./blockchain')
const uuid = require('uuid');


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



app.listen(port,function(){
    console.log(`Listening on port check ${port}.....`);
})