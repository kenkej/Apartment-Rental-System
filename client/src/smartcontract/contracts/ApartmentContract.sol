pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract ApartmentContract {

   address public main;
   address public customer;
   address public owner;
   uint256 public price;
   uint256 public rentedTime;
   uint32 public rentDays;
   uint256 private lastWithdrawTime;
   
   mapping (address => uint256) public balanceOf;

   event RentalStatus(string _msg);
   event TransferValue(string _msg, uint256 _value);
  
   function ApartmentContract(uint32 _price) public{
      price = _price;
      owner = msg.sender;
      main = this;
    }
   
      function setlastWithdrawTime() public {
        lastWithdrawTime = now;
    }

     function getlastWithdrawTime() public returns(uint256){
       return lastWithdrawTime;
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
    uint256 amountInEther = msg.value / 1 ether; //convert to ether    
    require (amountInEther  == (_days * price) + (price/2));
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
        //  emit TransferValue("Return on time", value);
      }
   }

   function withdraw(uint256 rentalFee) public {
        // require(now > getlastWithdrawTime() + 30 days);
              
        balanceOf[main] -= rentalFee;
        balanceOf[owner] += rentalFee;
        // setlastWithdrawTime();
        
        owner.transfer(rentalFee * 1 ether); // convert to wei
   }

}