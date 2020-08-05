import React, { Component, Fragment } from 'react'

const Backdrop = props => (
    props.show ? <div className="Backdrop" onClick={props.clicked}></div> : null
);

class CustomModal extends Component {
    render() {
        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className="CustomModal"
                    style={{ transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh', opacity: this.props.show ? '1' : '0' }}>
                    <h2>{this.props.title}</h2>
                    {this.props.children}
                </div>
            </Fragment>
        )
    }
}

export default CustomModal;
