const modifyResponseMessage = (error) => {
  const dobError = error?.response?.data?.date_of_birth
  if (dobError) {
        const message = dobError.join(" ").replace('this value', 'date of birth')
        return message
  }
  const message =
    (error.response &&
      error.response.data &&
      error.response.data?.non_field_errors.join(" ")) ||
    error.response.data.message ||
    error.message ||
    error.toString();
  return message;
};

export { modifyResponseMessage };
