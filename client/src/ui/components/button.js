import React from 'react'


class Button extends React.Component {
    render() {
        return (
            <button class="btn btn-primary">{this.props.buttonName}
            </button>
        )
      }
}

export default Button