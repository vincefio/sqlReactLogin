import React, { Component } from 'react'
import axios from 'axios'
import Validator from 'validator'
import { Redirect } from 'react-router-dom'


export default class Signup extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            errors: {
                usernameError: '',
                passwordError: '',
                confirmPasswordError: '',
                samePassword: '',
                userNameTaken: ''
            },
            loggedIn: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }



    validate = (bool) => {

        let isError = false
        const errors = {}

        if (this.state.username === '') {
            isError = true
            errors.usernameError = 'Username is required'
        }

        if (this.state.password === '') {
            isError = true
            errors.passwordError = 'Password field is required'
        }

        if (this.state.confirmPassword === '') {
            isError = true
            errors.confirmPasswordError = 'Confirm password field is required'
        }

        if (this.state.password !== this.state.confirmPassword) {
            isError = true
            errors.samePassword = 'Passwords must be the same'
        }

        if (bool) {
            isError = true
            errors.userNameTaken = 'This username is already in use'
        }

        if (isError) {
            this.setState({
                ...this.state,
                errors: { ...errors }
                //...errors
            })
        }

        return isError;
    }

    ifLoggedIn = () => {
        const name = this.state.username
        //alert('you logged in')
        this.props.changeAppState(name)
    }

    handleSubmit(event) {
        event.preventDefault()

        const err = this.validate();

        //console.log('isError ' + err)
        if (err) {
            //clear form
            this.setState({
                username: '',
                password: '',
                confirmPassword: ''
            })
        } else {
            axios.post('/signup', {
                username: this.state.username,
                password: this.state.password
            }).then(response => {

                //console.log('response ' + JSON.stringify(response.data))
                if (response.data === true) {
                    const errTwo = this.validate(response.data)
                } else {
                    console.log('CREATE THAT DAMN USER YO')
                    this.setState({
                        loggedIn: true
                    })
                    this.ifLoggedIn()
                }
            })
        }

    }

    render() {
        let errors = this.state.errors

        const errorOptions = Object.keys(errors).map((key, i) =>
            <div className="errorMessage" value={key} key={i} > {errors[key]}</div>
        )

        if (this.state.loggedIn) {
            return <Redirect to={{ pathname: '/' }} />
        }
        else {
            return (
                <div className="SignupForm container">
                    <h1>Signup form</h1>
                    <form action="">
                        {errorOptions}
                        <div className="input-field">
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                data-error={this.state.usernameError}
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password: </label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="confirmPassword">Confirm Password: </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                            />
                        </div>

                        <button type="submit" onClick={e => this.handleSubmit(e)}>Sign up</button>
                    </form>
                </div>
            )
        }
    }
}
