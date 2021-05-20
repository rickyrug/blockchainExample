function Blockchain(){
    this.chain = [];
    this.newTransactions = [];
}

Blockchain.prototype.createNewBlock = function (nonce, previousHash, hash)
{
    const newBlock = {
        index: this.chain.length + 1,
        timestamp : Date.now(),
        transactions: this.newTransactions,
        nonce = nonce,
        previousHash = previousHash,
        hash    = hash
    }

}