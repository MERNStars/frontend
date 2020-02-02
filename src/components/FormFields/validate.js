const validate = values => {
  const errors = {};
  if (!values.event_name) {
    errors.event_name = "Required";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  if (!values.event_date) {
    errors.event_date = "Required";
  }

  if (!values.event_date) {
    errors.event_date = "Required";
  }
  if (!values.event_start_time) {
    errors.event_start_time = "Required";
  }
  if (!values.event_end_time) {
    errors.event_end_time = "Required";
  }
  if (!values.registration_closed_date) {
    errors.registration_closed_date = "Required";
  }
  if (!values.minimum_age) {
    errors.minimum_age = "Required";
  }
  if (!values.event_capacity) {
    errors.event_capacity = "Required";
  }

  if (!values.first_name) {
    errors.first_name = "Required";
  }

  if (!values.last_name) {
    errors.last_name = "Required";
  }

  if (!values["username"]) {
    errors.username = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
  ) {
    errors.username = "Invalid email address";
  }

  if (
    !/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/i.test(
      values.password
    )
  ) {
    errors.password =
      "Password must be 8 characters or longer, including at a number, a symbol and a capital letter";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password doesn't match";
  }

  if (!values.age) {
    errors.age = "Required";
  }

  if (!values.sex) {
    errors.sex = "Required";
  }

  return errors;
};

export default validate;
