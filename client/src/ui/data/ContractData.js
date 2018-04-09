import Web3 from 'getWeb3'
import ApartmentContract from '.../../../smartcontract/build/contracts'

class ContractData {

   constructor() {
      Web3
         .then((result) => {
            this.web3 = result
         })
      this.aptContract = null
      this.contractInstance = null
      this.accounts = null
   }

   initContract() {
      const contract = require('truffle-contract')
      this.aptContract = contract(ApartmentContract)
      this.aptContract.setProvider(this.web3.currentProvider)

      this.web3.eth.getAccounts((error, accounts) => {
         this.accounts = accounts
         this.aptContract.deployed().then((instance) => {
            this.contractInstance = instance
         })
      })
   }

   newHouse(houseOwner, houseId) {
      this.contractInstance.newHouse(houseId, { from: houseOwner })
   }

   getAvailableApartment() {
      this.contractInstance.getAllApartments.call({ from: this.accounts[0] })
   }
}

export default ContractData;
