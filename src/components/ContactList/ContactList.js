import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export function ContactList({ contacts, onClick }) {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
          <p className={css.contact}> 
            {name}: {number}
          </p>
          <button 
          type='button'
          onClick={() => onClick(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array,
};