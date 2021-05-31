const BlockChain = require('./blockchain');

const bitcoin = new BlockChain();



bitcoin.createNewBlock(2565,'JSJAISAI85','67HSGSA77882')
bitcoin.createNewTransaction(15.25,'ALEX9787878asdhjas','JENN9898kjaksjdkaslas')


bitcoin.createNewBlock(2566,'JSJAISAI86','67HSGSA77883')

bitcoin.createNewTransaction(15.25,'ALEX9787878asdhjas','JENN9898kjaksjdkaslas')
bitcoin.createNewTransaction(1525,'ALEX9787878asdhjas','JENN9898kjaksjdkaslas')
bitcoin.createNewTransaction(2525,'ALEX9787878asdhjas','JENN9898kjaksjdkaslas')

bitcoin.createNewBlock(2567,'JSJAISAI87','67HSGSA77884')

console.log(bitcoin.chain[2]);