const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];

function Blockchain(){
    this.chain = [];
    this.pendingTransactions = [];
    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];
    this.createNewBlock(100,'0','0'); // primer bloque genesis block
}



Blockchain.prototype.createNewBlock = function (nonce, previousBlokcHash, hash)
{
    const newBlock = {
        index: this.chain.length + 1,
        timestamp : Date.now(),
        transactions: this.pendingTransactions,
        nonce : nonce,
        hash   : hash,
        previousBlokcHash : previousBlokcHash,
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;

}

Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length -1];

}

Blockchain.prototype.createNewTransaction = function(amount,sender,recipeint)
{
    const newTransaction = 
    {
        amount : amount,
        sender : sender,
        recipeint : recipeint
    };

    this.pendingTransactions.push(newTransaction);

    return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function(previusBlockHash, currentBlockData, nonce)
{
    const dataasString = previusBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataasString);

    return hash;
}


Blockchain.prototype.profOfWork = function(previusBlockHash,currentBlockData){
    // busca que se genere un has que empiece por 0000

    let nonce = 0;
    let hash = this.hashBlock(previusBlockHash,currentBlockData, nonce);

    while(hash.substring(0,4) !== '0000')
    {
        nonce++;
        hash = this.hashBlock(previusBlockHash,currentBlockData, nonce);

    }
    
    return nonce;
}

module.exports = Blockchain;