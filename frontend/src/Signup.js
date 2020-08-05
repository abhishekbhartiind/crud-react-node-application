import React, { Component } from 'react'
import { connect } from "react-redux";
import cogoToast from 'cogo-toast';
import Input from './components/Input'
import { isEmpty, RECORD_OPERATION_MESSAGE } from './utils'
import { register } from './store/actions'
import { Link } from 'react-router-dom'

class Signup extends Component {
    state = {
        users: {
            name: null,
            email: null,
            mobile: null,
            password: null,
        }
    }

    formData = (type, e) => {
        let { users } = this.state
        users[type] = e.target.value

        this.setState({
            users
        })
    }

    submitUserData = e => {
        e.preventDefault();
        let { name, email, password } = this.state.users
        if(isEmpty(name) && isEmpty(email) && isEmpty(password)){
          this.props.register(this.state.users)
          cogoToast.success(RECORD_OPERATION_MESSAGE.ADD_SUCCESS)
        } else alert("Name or Email or Password is Missing")
    }

    render() {
        let { name, email, mobile, password } = this.state.users        

        return (
            <div className="Section">
                <h1>Signup</h1>
                <div className="AccessForm">
                    <Input
                        placeholder="Your Name*"
                        type="text"
                        required={true}
                        name="name"
                        value={isEmpty(name) ? name : ""}
                        changed={(e) => this.formData("name", e)}
                    />
                    <Input
                        placeholder="Your email*"
                        type="text"
                        required={true}
                        name="email"
                        value={isEmpty(email) ? email : ""}
                        changed={(e) => this.formData("email", e)}
                    />
                    <Input
                        placeholder="Your Mobile*"
                        type="text"
                        required={true}
                        name="mobile"
                        value={isEmpty(mobile) ? mobile : ""}
                        changed={(e) => this.formData("mobile", e)}
                    />
                    <Input
                        placeholder="Your Password*"
                        type="password"
                        required={true}
                        name="password"
                        value={isEmpty(password) ? password : ""}
                        changed={(e) => this.formData("password", e)}
                    />
                    <div className="flex_dir" style={{ padding: '8px' }}>
                        <button 
                            type="submit" 
                            className="btn_auth" 
                            onClick={this.submitUserData}
                        >
                            Signup
                        </button>
                        <p>Already has an Account, <Link to="/">Click Here For Login</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        register: userData => dispatch(register(userData))
    }
}
export default connect(null, mapDispatchToProps)(Signup)