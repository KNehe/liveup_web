const modifyResponseMessage = (error) => {
  console.log(error?.response?.data);
  const dobError = error?.response?.data?.date_of_birth;
  if (dobError) {
    const message = dobError.join(" ").replace("this value", "date of birth");
    return message;
  }
  if (error?.response?.data?.description) {
    const message = error?.response?.data?.description
      .join(" ")
      .replace("this value", "description");
    return message;
  }
  if (error?.response?.data?.start_datetime) {
    // const message = error?.response?.data?.start_datetime.join(' ').replace('this value', 'start date and time')
    return "Start date can not be in the past";
  }
  if (error?.response?.data?.end_datetime) {
    // const message = error?.response?.data?.end_datetime.join(' ').replace('this value', 'end date and time')
    return "End date can not be in the past";
  }
  const message =
    (error.response &&
      error.response.data &&
      error.response.data?.non_field_errors.join(" ")) ||
    error.response?.data?.message ||
    error?.message ||
    error.toString();
  return message;
};

export { modifyResponseMessage };
