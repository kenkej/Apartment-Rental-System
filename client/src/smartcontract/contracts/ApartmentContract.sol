pragma solidity ^0.4.17;

contract ApartmentContract {

   address public main;
   address public customer;
   address public owner;
   uint256 public price;
   uint256 public rentedTime;
   uint32 public rentDays;
   bool public valid;
   
   mapping (address => uint256) public balanceOf;

   event RentalStatus(string _msg);
   event TransferValue(string _msg, uint256 _value);
  
   function ApartmentContract(uint32 _price) public{
      price = _price;
      owner = msg.sender;
      main = this;
      valid = true;
    }
    
   modifier onlyCustomer() {
       require(msg.sender == customer);
       _;
    }

    modifier onlyOwner() {
       require(msg.sender == owner);
       _;
    }

         
    function bookHouse(uint32 _days) public payable{    
      require(msg.sender != owner);
      uint256 amountInEther = msg.value / 1 ether; //convert to ether        
      balanceOf[main] = amountInEther;
      rentDays = _days;
      rentedTime = now;
      customer = msg.sender;
      emit RentalStatus("Rented");    
   }

   function returnHouse() public onlyCustomer {       
     uint256 rentalFee = price * rentDays;
     if(now > rentedTime + rentDays * 1 days) {
        uint256 latetime = now / 1 days - (rentedTime / 1 days + rentDays);
        rentalFee += latetime * price;
        withdraw(rentalFee);
        emit TransferValue("Return late", rentalFee);
      } else {
         withdraw(rentalFee);
         emit TransferValue("Return on time", rentalFee);
      }
   }

   function withdraw(uint256 rentalFee) private {    
       require(valid == true);
        balanceOf[main] -= rentalFee;
        balanceOf[owner] += rentalFee;
        owner.transfer(rentalFee * 1 ether); // convert to wei
        valid = false;
   }

}