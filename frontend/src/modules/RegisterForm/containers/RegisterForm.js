import { withFormik } from 'formik';
import get from 'lodash/get';

import RegisterForm from '../components/RegisterForm';

import { userActions } from 'redux/actions';
import validateForm from 'utils/validate';
import { openNotification } from 'utils/helpers';

import store from 'redux/store';

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: '',
    fullname: '',
    password: '',
    password_2: ''
  }),
  validate: values => {
    let errors = {};
    validateForm({ isAuth: false, values, errors });
    return errors;
  },
  handleSubmit: (values, { setSubmitting, props }) => {
    store
      .dispatch(userActions.fetchUserRegister(values))
      .then(() => {
        props.history.push('/signup/verify');
        setSubmitting(false);
      })
      .catch(err => {
        if (get(err, 'response.data.message.errmsg', '').indexOf('dup') >= 0) {
          openNotification({
            title: 'Error',
            text: 'Account with this email already exists.',
            type: 'error',
            duration: 5000
          });
        } else {
          openNotification({
            title: 'Error',
            text: 'Server error during sign up. Try later.',
            type: 'error',
            duration: 5000
          });
        }
        setSubmitting(false);
      });
  },
  displayName: 'RegisterForm'
})(RegisterForm);
