pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract RentalContract {

   struct house{
      address owner;
      string houseID;
   }

   house[] houses;
   address[] public customer;
   uint32 public price;
   uint256 public rentedTime;
   uint256 public rentDays;
   uint256 public lateCharge;
   bool public houseStatus;

   mapping(address => string)apartmentContracts;

   event RentalStatus(string _msg, address user, uint amount, uint256 time);

   modifier onlyCustomer() {
      if(isCustomer(msg.sender)) {
         _;
      } else revert();
   }

   function newHouse(string _houseID) public {
      houses.push(house(msg.sender, _houseID));
   }

   function getAllApartments() public view returns(house[]) {
      return houses;
   }

   function isCustomer(address _Customer) private returns(bool) {
      for (uint i=0; i<customer.length; i++) {
         if(customer[i] == msg.sender) {
           return true; 
         } 
      }
      return false;
   }

   function bookHouse(uint256 _days) public payable{
      if((msg.value == (price * _days)) && isCustomer(msg.sender)) {
         rentedTime = block.timestamp;
         rentDays = _days;
         emit RentalStatus("Rented", msg.sender, msg.value, rentedTime);
      } else {
         revert();
      } 
   }

   function returnHouse() public onlyCustomer {
      if(block.timestamp > (rentedTime + rentDays)) {
         emit RentalStatus("Return late", msg.sender, lateCharge, block.timestamp);
      }
   }
}
