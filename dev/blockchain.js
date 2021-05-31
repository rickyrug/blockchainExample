function Blockchain(){
    this.chain = [];
    this.pendingTransactions = [];
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

Blockchain.prototype.hashBlock = function(blockData)
{
    

}

module.exports = Blockchain;