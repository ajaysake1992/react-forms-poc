import React, { Component } from "react";
import Input from "./common/input";
import Joi from 'joi-browser';

class LoginForm extends Component {

  state = {
    account: {
      username: '',
      password: ''
    },
    errors: {

    }
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  }

  validate = () => {

    const options = {abortEarly: false};

    const {error} = Joi.validate(this.state.account, this.schema, options);

    if(!error) return null;

    let errors = {};

    error.details.map((item) => {

      return errors[item.path[0]] = item.message;

    });

    return errors;

    // const {account} = this.state;

    // if(!account.username)
    //   errors.username = 'Username is required';
    // if(!account.password)
    //   errors.password = 'Password is required'

    // return Object.keys(errors).length === 0 ? null : errors;
  }

  handleSubmit = (e) => {

    e.preventDefault();

    const errors = this.validate();

    this.setState({errors: errors || {}});

    if(errors) return;

  }

  validateProperty = ({name, value}) => {

    const obj = {[name]: value};

    const schema = {[name]: this.schema[name]};

    const {error} = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;

    // if(name === 'username') {

    //   if(!value) return "Username is required.";

    // }

    // if(name === 'password') {

    //   if(!value) return "Password is required.";

    // }


  }

  handleChange = ({currentTarget: input}) => {

    const errors = {...this.state.errors};

    const errorMessage = this.validateProperty(input);

    if(errorMessage) errors[input.name] = errorMessage;

    else delete errors[input.name];

    const account = {...this.state.account};

    account[input.name] = input.value;

    this.setState({account, errors});

  }

  render() { 
    const {account, errors} = this.state;
    return (
      <div>
        <h1>Login form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onHandle={this.handleChange}
            error={errors.username}
          />
         <Input
            name="password"
            value={account.password}
            label="Password"
            onHandle={this.handleChange}
            error={errors.password}
          />
          <button disabled={this.validate()}
            className="btn btn-primary m-2">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
