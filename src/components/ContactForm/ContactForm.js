import css from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';


export class ContactForm extends Component {

    state = {
        name: '',
        number: '',
      };

    handleChange = e => {
        const {name, value} = e.currentTarget;
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.onSubmit(this.state);
        this.handleReset();
    };

    handleReset = () => {
        this.setState( {name: '',number: ''});
    };


    render() {
    return (
        <form className={css.form} onSubmit={this.handleSubmit}>
            <label className={css.label}>
                Name
        <input className={css.input}
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
        />
        </label>
        <label className={css.label}>
            Phone number
        <input className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={this.state.number}
            onChange={this.handleChange}
            required
        />
        </label>
            <button className={css.button} type='submit'>Add contact</button>
        </form>
        )
    };
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  