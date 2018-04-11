import React from 'react'

class HouseInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rentDays: 0
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
        var aptStt = RentalContract.RentalStatus({ _from: this.props.contractAddress });
        aptStt.watch((err, result) => {
            if (err) {
                alert(err)
                return
            }
            alert(result.args._msg) //Rented

        }) 
        RentalContract.bookHouse(this.state.rentDays, { 
            from: this.props.web3.eth.accounts[0],
            value: this.props.web3.toWei(this.state.rentDays * this.props.house_price, "ether"),
            gas: 200000
        }, (err, res) => {
            console.log(err, res)
        })
    }

    handleChangeRentDays(event) {
        this.setState({ rentDays: event.target.value });
    }

    render() {
        return (
            <div className="house">
                <div className="card" style={{ width: 18 + 'rem' }}>
                    <img className="card-img-top" src={this.props.img_src} />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.house_name}</h5>
                        <p className="card-text">{this.props.house_description}</p>
                        <h6 className="card-title">{this.props.house_price} ETH per day</h6>
                        <h6 className="card-title">{this.props.house_deposit} ETH deposit</h6>
                        Rent Days: <input onChange={this.handleChangeRentDays.bind(this)} className="form-control" type="number" />
                        <h6 style={{ color: 'green' }}>AVAILABLE</h6>
                    </div>
                    <button onClick={this.handleRentEvent.bind(this)} className="bg-primary buttonRent">RENT THIS HOUSE</button>
                </div>
            </div>
        )
    }
}

export default HouseInfo
