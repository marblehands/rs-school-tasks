const params = {
  FORM: {
    tag: 'form',
    classes: ['login__form'],
    attributes: {
      action: '#',
      method: 'POST',
    },
  },
  LABEL_NAME: {
    classes: ['login__label'],
    content: 'First Name:',
    attributes: {
      for: 'name',
    },
  },
  INPUT_NAME: {
    classes: ['login__input-text'],
    attributes: {
      placeholder: 'Type your name',
      type: 'text',
      name: 'name',
      id: 'name',
      required: 'required',
      minlength: '3',
      pattern: '^[A-Z][a-z]*$',
    },
  },
  LABEL_SURNAME: {
    classes: ['login__label'],
    content: 'Surname:',
    attributes: {
      for: 'surname',
    },
  },
  INPUT_SURNAME: {
    classes: ['login__input-text'],
    attributes: {
      placeholder: 'Type your surname',
      type: 'text',
      name: 'surname',
      id: 'surname',
      required: 'required',
      minlength: '4',
      pattern: '^[A-Z][a-z]*$',
    },
  },
  BUTTON_LOGIN: {
    classes: ['button-primary', 'disabled'],
    content: 'Login Now',
    attributes: {
      type: 'submit',
      disabled: 'disabled',
    },
  },
};

export default params;
