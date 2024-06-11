// import React, { Component } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Alert } from 'flowbite-react';
// import './styles/SignUp.css';

// import { useDispatch } from 'react-redux';
// import { signInSuccess, signInStart, signInFailure } from '../redux/user/userSlice';

// class SignIn extends Component {
//   state = {
//     formData: {},
//     errorMessage: null,
//     loading: false,
//   };

//   handleChange = (e) => {
//     this.setState((prevState) => ({
//       formData: {
//         ...prevState.formData,
//         [e.target.id]: e.target.value.trim(),
//       },
//     }));
//   };

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     const { formData } = this.state;

//     if (!formData.email || !formData.password) {
//       this.setState({ errorMessage: 'Please fill out all fields.' });
//       return;
//     }

//     try {
//       this.setState({ loading: true, errorMessage: null });

//       const res = await fetch('/api/auth/signin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (data.success === false) {
//         this.setState({ errorMessage: data.message, loading: false });
//         return;
//       }

//       this.setState({ loading: false });
//       if (res.ok) {
//         this.props.navigate('/');
//       }
//     } catch (error) {
//       this.setState({ errorMessage: error.message, loading: false });
//     }
//   };

//   render() {
//     const { formData, errorMessage, loading } = this.state;

//     return (
//       <div className="sign-up-container">
//         <div className="sign-up-content">
//           <div className="brand-container">
//             <Link to="/" className="brand">
//               <span className="brand-highlight">Ankita's</span> Blog
//             </Link>
//           </div>
//           <div className="form-container">
//             <form className="sign-up-form" onSubmit={this.handleSubmit}>
            
//               <div className="form-group">
//                 <label className="label" htmlFor="email">
//                   Your email
//                 </label>
//                 <input
//                   type="email"
//                   className="input-field"
//                   placeholder="name@company.com"
//                   id="email"
//                   value={formData.email || ''}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="label" htmlFor="password">
//                   Your password
//                 </label>
//                 <input
//                   type="password"
//                   className="input-field"
//                   placeholder="********"
//                   id="password"
//                   value={formData.password || ''}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <button className="btn" type="submit" disabled={loading}>
//                 {loading ? (
//                   <>
//                     <div className="spinner" />
//                     <span className="pl-3">Loading...</span>
//                   </>
//                 ) : (
//                   'Sign In'
//                 )}
//               </button>
//             </form>
//             <div className="text-sm mt-5">
//               <span>Don't have an account?  </span>
//               <Link to="/sign-up" className="text-link">
//                 Sign Up
//               </Link>
//             </div>
//             {errorMessage && <Alert className="error-msg">{errorMessage}</Alert>}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// // Create a wrapper component
// function SignInWrapper(props) {
//   const navigate = useNavigate();
//   return <SignIn {...props} navigate={navigate} />;
// }

// export default SignInWrapper;

// // export default SignIn

import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'flowbite-react';
import './styles/SignUp.css';

import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, signInStart, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

class SignIn extends Component {
  state = {
    formData: {
      email: '',
      password: ''
    }
  };

  handleChange = (e) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [e.target.id]: e.target.value.trim(),
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { formData } = this.state;
    const { onSignInStart, onSignInSuccess, onSignInFailure, navigate } = this.props;

    if (!formData.email || !formData.password) {
      onSignInFailure('Please fill out all fields.');
      return;
    }

    onSignInStart();

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // console.log(data,'ddd')

      if (!res.ok) {
        onSignInFailure(data.message);
        return;
      }

      onSignInSuccess(data);
      navigate('/');
    } catch (error) {
      onSignInFailure(error.message);
    }
  };

  render() {
    const { formData } = this.state;
    const { loading, errorMessage } = this.props;

    return (
      <div className="sign-up-container">
        <div className="sign-up-content">
          <div className="brand-container">
            <Link to="/" className="brand">
              <span className="brand-highlight">Ankita's</span> Blog
            </Link>
          </div>
          <div className="form-container">
            <form className="sign-up-form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="label" htmlFor="email">
                  Your email
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="name@company.com"
                  id="email"
                  value={formData.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="password">
                  Your password
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="********"
                  id="password"
                  value={formData.password}
                  onChange={this.handleChange}
                />
              </div>
              <button className="btn" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <div className="spinner" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
              <OAuth />
            </form>
            <div className="text-sm mt-5">
              <span>Don't have an account? </span>
              <Link to="/sign-up" className="text-link">
                Sign Up
              </Link>
            </div>
            {errorMessage && <Alert className="error-msg">{errorMessage}</Alert>}
          </div>
        </div>
      </div>
    );
  }
}

// Create a wrapper component to use navigate and dispatch
function SignInWrapper(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading);
  const errorMessage = useSelector((state) => state.user.error);

  const handleSignInStart = () => dispatch(signInStart());
  const handleSignInSuccess = (user) => dispatch(signInSuccess(user));
  const handleSignInFailure = (error) => dispatch(signInFailure(error));

  return (
    <SignIn
      {...props}
      navigate={navigate}
      onSignInStart={handleSignInStart}
      onSignInSuccess={handleSignInSuccess}
      onSignInFailure={handleSignInFailure}
      loading={loading}
      errorMessage={errorMessage}
    />
  );
}

export default SignInWrapper;
