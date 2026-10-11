// script.js

const form = document.querySelector('form');
const fieldset = document.querySelector('fieldset');
const email = document.querySelector('#email');
const country = document.querySelector('[name=country]');
const postalCode = document.querySelector('[name=postal-code]');
const password = document.querySelector('[name=password]');

country.addEventListener('click', (event) => {
  if (country.value) {
    postalCode.removeAttribute('disabled');
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (form.checkValidity()) {
    alert('Good Job! 👌');
  }
  // RETURN error message to be displayed at the appropriate controller.
  else
    for (const elem of fieldset.elements) {
      const handleValidation = () => {
        const message = validateField(elem);
        if (message) {
          elem.setCustomValidity(message);
          elem.parentElement.nextElementSibling.textContent = message;
        } else {
          elem.setCustomValidity('');
          elem.parentElement.nextElementSibling.textContent = '';
        }
      };

      const message = validateField(elem);
      if (message) {
        elem.setCustomValidity(message);
        elem.parentElement.nextElementSibling.textContent = message;
      } else {
        elem.setCustomValidity('');
        elem.parentElement.nextElementSibling.textContent = '';
      }

      elem.removeEventListener('input', handleValidation);
      elem.addEventListener('input', handleValidation);
    }
});

function validateField(element) {
  if (!(element.tagName === 'INPUT')) {
    if (!['EG', 'US', 'GB', 'CA'].includes(element.value)) {
      return '* please choose your country!';
    }
  } else
    switch (element.name) {
      case 'email':
        return validateEmail(element);
        break;
      case 'postal-code':
        return validatePostalCode(element);
        break;
      case 'password':
        return validatePassword(element);
        break;
      case 'password-confirmation':
        return validatePasswordConfirmation(element);
        break;
    }
}

function validateEmail(elem) {
  if (elem.value === '') {
    return "* can't be empty!";
  } else if (!elem.value.endsWith('@gmail.com')) {
    return 'email should ends with `@gmail.com`';
  }
}

function validatePostalCode(elem) {
  if (!elem.value && country.value) {
    return "* can't be empty!";
  } else if (elem.value && country.value) {
    if (!postalCodePatterns[country.value].regex.test(elem.value))
      return postalCodePatterns[country.value].message;
  }
}

function validatePassword(elem) {
  const passwordConfirmation = document.querySelector(
    '[name=password-confirmation]',
  );

  if (passwordConfirmation.value) {
    if (elem.value === passwordConfirmation.value) {
      passwordConfirmation.parentElement.nextElementSibling.textContent = '';
    }
  }

  if (elem.validity.valid) {
    return '';
  } else if (elem.validity.valueMissing) {
    return "* can't be empty!";
  } else if (!/^\S{8,}$/.test(elem.value)) {
    return "* can't be less than 8 characters!";
  }
}

function validatePasswordConfirmation(elem) {
  const password = document.querySelector('[name=password]');

  if (password) {
    if (elem.value !== password.value) {
      return '* must match the password! ';
    }
  }
}

const postalCodePatterns = {
  EG: {
    regex: /^\d{5}$/,
    message: '5 digits required',
  },
  US: {
    regex: /^\d{5}(-\d{4})?$/,
    message: '5 digits or 5+4 (e.g. 12345-6789)',
  },
  GB: {
    regex: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
    message: 'Invalid UK format (e.g. SW1A 1AA)',
  },
  CA: {
    regex: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
    message: 'Invalid Canadian format (e.g. K1A 0B1)',
  },
};
