import React from 'react'

class HouseInfo extends React.Component {
    render() {
        return(
            <div className="house">
                <div class="card" style={{width: 18+'rem'}}>
                    <img class="card-img-top" src={this.props.img_src}/>
                    <div class="card-body">
                        <h5 class="card-title">{this.props.house_name}</h5>
                        <p class="card-text">{this.props.house_description}</p>
                        <h6 class="card-title">{this.props.house_price} ETH per day</h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default HouseInfo