import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getApi } from '../services/api';
import { LOGIN_INFO } from '../redux/actions/typeNames';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  emailValidation = () => {
    const { email, name } = this.state;
    const check = /\S+@\S+\.\S+/;
    if (check.test(email) && name.length !== 0) return false;
    return true;
  }

  fetchToken = async () => {
    await getApi();
    const { history, dispatch } = this.props;
    history.push('/game');
    dispatch({ type: LOGIN_INFO, payload: this.state });
  }

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <form autoComplete="off">
        <label htmlFor="name">
          <input
            value={ name }
            placeholder="Nome..."
            type="text"
            id="name"
            onChange={ (e) => this.setState({ name: e.currentTarget.value }) }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          <input
            value={ email }
            placeholder="Email..."
            type="email"
            id="email"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.setState({ email: e.currentTarget.value }) }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.fetchToken }
          disabled={ this.emailValidation() }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/config') }
        >
          Configurações

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: propTypes.objectOf(propTypes.any),
  dispatch: propTypes.func,
}.isRequired;

export default connect()(Login);
