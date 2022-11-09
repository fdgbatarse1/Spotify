const validator = (value: string, required: boolean) => {
  try {
    const pattern = /^[0-9a-zA-Z\-#.,!':\s]*$/;
    if (value === '' && required) {
      throw new Error('Must not be empty');
    }
    if (!pattern.test(value)) {
      throw new Error(
        "Must contain only alphanumeric characters and/or the following symbols (-, #, ., ,, !, ', :)",
      );
    }
    return '';
  } catch (e) {
    return (e as Error).message;
  }
};

export default validator;
