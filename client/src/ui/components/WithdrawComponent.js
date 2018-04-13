import React, { Component } from 'react';

class WithdrawComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            withdrawBalance: 0,
            contractAddress: ''
        }
    }

    handleSubmit(evt) {
        evt.preventDefault();
        console.log("yeah " + this.state.contractAddress)
        try {
            const RentalArtifact = this.props.artifact;
            const RentalContractObject = this.props.web3.eth.contract(RentalArtifact.abi);
            const RentalContract = RentalContractObject.at(this.state.contractAddress);            
            console.log(RentalContract);
            var trans = RentalContract.TransferValue({ _from: this.state.contractAddress });            
            trans.watch((err, result) => {
                if (err) {
                    console.log("loi o watch " + err)
                    return
                }
                if(result) {                    
                    this.setState({ withdrawBalance: result.args._value.c[0] })
                    alert(result.args._msg);
                    fetch('/updateStatus', {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            contractAddress: this.state.contractAddress,
                            apartmentStatus: result.args._msg
                        })
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((result) => {
                        // window.location.href = '/';
                    })
                }
                })
                
                RentalContract.returnHouse({ from: this.props.web3.eth.accounts[0] }, (err, res) => {
                    console.log(err, res)
                })
            } catch (error) {
            console.log(error)
            evt.preventDefault();
        }
    }

    handleChangeAddress(evt) {
        this.setState({ contractAddress: evt.target.value })
    }

    render() {
        return (
            <div>
                <div className="container newhouse">
                    <h2>Return house</h2>
                    <form id="houseform">
                        <div className="form-group">
                            <label>The contract address: </label>
                            <input name="name" type="text" required onChange={this.handleChangeAddress.bind(this)} className="form-control" id="name" placeholder="Enter contract address" />
                        </div>

                        <button onClick={this.handleSubmit.bind(this)} className="btn btn-primary">Return</button>
                        <div className="form-group">
                            <label>Owner get the fucking withdraw: </label>
                            <p>{this.state.withdrawBalance}</p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default WithdrawComponent;