import css from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';


export function ContactForm ({ onSubmit }) {
    const [usenData, setUsenData] = useState({ name: '', number: '' })

    const handleChange = e => {
        const {name, value} = e.currentTarget;
        setUsenData((prevUserData) => ({ ...prevUserData, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        onSubmit(usenData);
        handleReset();
    };

    const handleReset = () => {
        setUsenData( {name: '',number: ''});
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <label className={css.label}>
                Name
        <input className={css.input}
            value={usenData.name}
            onChange={handleChange}
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
            value={usenData.number}
            onChange={handleChange}
            required
        />
        </label>
            <button className={css.button} type='submit'>Add contact</button>
        </form>
        )
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  