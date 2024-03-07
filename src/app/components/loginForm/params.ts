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
    content: 'Name:',
    attributes: {
      for: 'name',
    },
  },
  INPUT_NAME: {
    classes: ['login__input-text'],
    attributes: {
      placeholder: 'Your Name',
      type: 'text',
      name: 'name',
      id: 'name',
      required: 'required',
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
      placeholder: 'Your Surname',
      type: 'text',
      name: 'surname',
      id: 'surname',
      required: 'required',
    },
  },
  BUTTON_LOGIN: {
    classes: ['button-primary', 'disabled'],
    content: 'Login Now',
    attributes: {
      type: 'submit',
    },
  },
};

export default params;
