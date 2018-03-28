import React from 'react'
import HouseInfo from './house_info'

class Search extends React.Component {
    //constructor
    constructor(props) {
        super(props);
        //set state 
        this.state = {
            houses: [],
            search_value: ''
        }
    }

    componentDidMount() {
        fetch('/getallhouse')
            .then(res => {
                return res.json();
            })
            .then(houses => {
                this.setState({ houses })
            });
    }

    //set event handler for the input
    searchHandler(event) {
        this.setState({ search_value: event.target.value })
    }

    render() {
        const { search_value, houses } = this.state;
        return (
            <div className="container searchForm">
                <input class="form-control mr-sm-2"
                    name="search"
                    type="text"
                    placeholder="Search house..."
                    onChange={this.searchHandler.bind(this)} />
                <div class="row">
                    {
                        houses.filter(function (house) {
                            return (
                                //filter out names that are not matching with the search_value
                                house.name.toLowerCase().includes(search_value)
                            )
                        }).map(h =>
                            <HouseInfo key={h._id}
                                img_src={h.image}
                                house_name={h.name}
                                house_address={h.description}
                                house_price={h.price} />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Search