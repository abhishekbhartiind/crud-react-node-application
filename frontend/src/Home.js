import React, { Component } from 'react'
import { connect } from "react-redux";
import Input from './components/Input'
import cogoToast from 'cogo-toast';
import { isEmpty, RECORD_OPERATION_MESSAGE } from './utils'
import { loginUser } from './store/actions'
import { Link } from 'react-router-dom'

class Home extends Component {
    state = {
        users: {
            email: null,
            password: null,
        },
        isAuth: false
    }
    componentDidUpdate(){
        if(this.props.isAuthenticated && !this.state.isAuth){
            this.setState({
                isAuth: true
            })
            this.props.history.push("/todo")
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
        e.preventDefault()
        let { email, password } = this.state.users
        if(isEmpty(email) && isEmpty(password)){
            this.props.loginUser(this.state.users)
            cogoToast.success(RECORD_OPERATION_MESSAGE.ADD_SUCCESS)
        } else alert("Email or Password is Missing")
    }

    render() {
        let { email, password } = this.state.users        
        return (
            <div className="Section">
                <h1>Sample Application</h1>
                <div className="AccessForm">
                    <Input
                        placeholder="Your Email*"
                        type="text"
                        required={true}
                        name="email"
                        value={isEmpty(email) ? email : ""}
                        changed={(e) => this.formData("email", e)}
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
                        <button type="submit" className="btn_auth" onClick={this.submitUserData}>
                            Login
                        </button>
                        <p>New Account, <Link to="/signup">Click Here For Sign Up</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loginUser: (userData) => dispatch(loginUser(userData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)