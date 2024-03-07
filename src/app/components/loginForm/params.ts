const params = {
  FORM: {
    tag: 'form',
    classes: ['login__form'],
    attributes: {
      action: '#',
      method: 'POST',
    },
  },
  INPUT_NAME: {
    classes: ['login__input-text'],
    attributes: {
      placeholder: 'Your Name',
      type: 'text',
      name: 'name',
    },
  },
  INPUT_SURNAME: {
    classes: ['login__input-text'],
    attributes: {
      placeholder: 'Your Surname',
      type: 'text',
      name: 'surname',
    },
  },
};

export default params;
