import React from 'react'


class HouseInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    handleRentEvent(event) {

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
