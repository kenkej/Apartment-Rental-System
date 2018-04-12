pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract ApartmentContract {

   address public customer;
   address public owner;
   uint256 public price;
   uint256 public rentedTime;
   uint256 public rentDays;
   uint256 private customerValue;
   
   event RentalStatus(string _msg);

   function ApartmentContract(uint32 _price) public{
      price = _price;
      owner = msg.sender;
   }
   
   function setCustomerValue(uint256 _value) private{
       customerValue = _value;
   }

    function getCustomerValue() public returns(uint256) {
        return customerValue;
    }
    
   modifier onlyCustomer() {
      if(msg.sender == customer) {
         _;
      } else revert();
   }

    function bookHouse(uint256 _days) public payable{
       setCustomerValue(msg.value);
        if ((msg.value - tx.gasprice)  == (_days * price) + (price/2)){
         rentDays = _days * 1 days;
         rentedTime = now;
         customer = msg.sender;
         emit RentalStatus("Rented");
        }
        else {
         revert();
      } 
   }

   function returnHouse() public onlyCustomer {
      if(now > rentedTime + rentDays) {
          uint256 latetime = (now - (rentedTime + rentDays)) / 1 days;
          emit RentalStatus("Return late");
      } else {
         emit RentalStatus("Return on time");
      }
   }
}