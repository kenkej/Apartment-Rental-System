import React from 'react'

class HouseInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rentDays: 1,
            totalFee: this.props.house_price
        }
    }

    handleRentEvent(event) {
        if (this.state.rentDays < 1) {
            alert('Must rent from 1 days!')
            return;
        }
        const RentalArtifact = this.props.artifact;
        const RentalContractObject = this.props.web3.eth.contract(RentalArtifact.abi);
        const RentalContract = RentalContractObject.at(this.props.contractAddress)
        var aptStt = RentalContract.RentalStatus({ _from : this.props.contractAddress });
        aptStt.watch((err, result) => {
            if (err) {
                alert(err)
                return
            }
            if (result) {
                console.log(result);
                fetch('/updateStatus', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        contractAddress: this.props.contractAddress,
                        apartmentStatus: result.args._msg
                    })
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((result) => {
                        window.location.href = '/';
                    })
            }

            //Rented
        })
        RentalContract.bookHouse(this.state.rentDays, {
            from: this.props.web3.eth.accounts[0],
            value: this.props.web3.toWei(this.state.totalFee, "ether"),
            gas: 200000
        }, (err, res) => {
            console.log(err, res)
        })
    }

    handleChangeRentDays(event) {
        this.setState({
            rentDays: event.target.value,
            totalFee: event.target.value * this.props.house_price
        });
    }

    render() {
        return (
            <div className="house">
                <div className="card" style={{ width: 18 + 'rem' }}>
                    <img className="card-img-top" alt="" src={this.props.img_src} />
                    <div className="card-body">
                        <h5 className="card-title">House Contract Address: </h5>
                        <h5 className="card-title">{this.props.contractAddress}</h5>
                        <h5 className="card-title">{this.props.house_name}</h5>
                        <p className="card-text">{this.props.house_description}</p>
                        <h6 className="card-title">{this.props.house_price} ETH per day</h6>
                        Rent Days: <input min="1" value={this.state.rentDays} onChange={this.handleChangeRentDays.bind(this)} className="form-control" type="number" /><br />
                        Total fee in ETH(included extra fee): <input className="form-control" disabled value={this.state.totalFee} /><br />
                        {this.props.house_available ?
                            <h6 style={{ color: 'green' }}>AVAILABLE</h6> :
                            <h6 style={{ color: 'red' }}>RENTED</h6>}
                    </div>
                    {this.props.house_available ?
                        <button onClick={this.handleRentEvent.bind(this)} className="bg-primary buttonRent">RENT THIS HOUSE</button> :
                        <div></div>
                    }
                </div>
            </div>
        )
    }
}

export default HouseInfo
