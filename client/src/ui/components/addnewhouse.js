import React, { Component } from 'react';

class NewHouseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            description: '',
            price: 0,
            deposit: 0,
        }
    }

    submitForm(evt) {
        evt.preventDefault();
        const RentalArtifact = this.props.artifact;
        var data = new FormData(evt.target);
        const RentalContract = this.props.web3.eth.contract(RentalArtifact.abi)
        var houseOwner = this.props.web3.eth.accounts[0]
        RentalContract.new(this.state.price, { data: RentalArtifact.bytecode, from: houseOwner }, (error, contract) => {
            if (error) {
                alert('Contract making failed!');
                return;
            }
            else {
                if (contract.address) {
                    console.log('Fire lan thu 2');                    
                    data.append('contractAddress', contract.address)
                    fetch('/postnewhouse', {
                        method: 'POST',
                        body: data
                    })
                        .then((response) => { return response.json() })
                        .then((result) => {
                            if (result.status) {
                                alert('Your house contract was created! Wait for it to be on page!');
                                window.location.href = '/';                                   
                            }
                            else {
                                alert('Database error!')
                            }

                        })
                }
                else {
                    console.log('Fire lan thu 1 (for checking tx hash)')
                }
            }
        })
    }

    handleChangeName(evt) {
        this.setState({ name: evt.target.value });
    }

    handleChangeAddress(evt) {
        this.setState({ address: evt.target.value });
    }

    handleChangeDescription(evt) {
        this.setState({ description: evt.target.value });
    }

    handleChangePrice(evt) {
        this.setState({ price: evt.target.value });
    }

    handleChangeDeposit(evt) {
        this.setState({ deposit: evt.target.value });
    }

    render() {
        return (
            <div>
                <div className="container newhouse">
                    <h2>Post your new house</h2>
                    <form id="houseform" onSubmit={this.submitForm.bind(this)} encType="multipart/formdata">
                        <div className="form-group">
                            <label>House Name: </label>
                            <input name="name" type="text" required onChange={this.handleChangeName.bind(this)} className="form-control" id="name" placeholder="Enter house name" />
                        </div>
                        <div className="form-group">
                            <label>House Address: </label>
                            <input name="address" type="text" required onChange={this.handleChangeAddress.bind(this)} className="form-control" id="name" placeholder="Enter house name" />
                        </div>
                        <div className="form-group">
                            <label>House Description: </label>
                            <input name="description" type="text" required onChange={this.handleChangeDescription.bind(this)} className="form-control" id="description" placeholder="Enter house description" />
                        </div>
                        <div className="form-group">
                            <label >House price per day: </label>
                            <input name="price" type="number" required onChange={this.handleChangePrice.bind(this)} className="form-control" id="price_per_day" placeholder="Enter house price per day" />
                        </div>
                        <div className="form-group">
                            <label>House price deposit: </label>
                            <input name="deposit" type="number" required onChange={this.handleChangeDeposit.bind(this)} className="form-control" id="price_deposit" placeholder="Enter house price deposit" />
                        </div>
                        <div className="form-group">
                            <label>House image: </label>
                            <input name="house" type="file" required className="form-control" id="img_link" />
                        </div>
                        <button className="btn btn-primary">Post</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewHouseComponent;