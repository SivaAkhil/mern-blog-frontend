// import React from 'react';
// import { Link } from 'react-router-dom';
// import './styles/SignUp.css'

// export default function SignUp() {
//   return (
//     <div className='sign-up-container'>
//       <div className='sign-up-content'>
//         <div className='brand-container'>
//           <Link to='/' className='brand'>
//             <span className='brand-highlight'>Ankita's</span> Blog
//           </Link>
//         </div>
//         {/* <p className='text-sm mt-5'>
//           This is a demo project. You can sign up with your email and password
//           or with Google.
//         </p> */}
//         <div className='form-container'>
//           <form className='sign-up-form'>
//             <div className='form-group'>
//               <label className='label' htmlFor='username'>Your username</label>
//               <input
//                 type='text'
//                 className='input-field'
//                 placeholder='Username'
//                 id='username'
//                 onChange={handleChange}
//               />
//             </div>
//             <div className='form-group'>
//               <label className='label' htmlFor='email'>Your email</label>
//               <input
//                 type='email'
//                 className='input-field'
//                 placeholder='name@company.com'
//                 id='email'

//   onChange={handleChange}/>
//             </div>
//             <div className='form-group'>
//               <label className='label' htmlFor='password'>Your password</label>
//               <input
//                 type='password'
//                 className='input-field'
//                 placeholder='Password'
//                 id='password'
//                 onChange={handleChange}
//               />

//             </div>
//             <button className='btn' type='submit'>Sign Up</button>
//           </form>
//           <div className='text-sm mt-5'>
//             <span>Have an account?</span>
//             <Link to='/sign-in' className='text-link'>Sign In</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ===working

// import React, { Component } from "react";
// import { Alert } from "flowbite-react";

// import { Link ,withRouter} from "react-router-dom";
// import "./styles/SignUp.css";

// class SignUp extends Component {
//   state = {
//     username: "",
//     email: "",
//     password: "",
//     loading: false,
//     errorMessage: null,
//   };

//   handleChange = (event) => {
//     const { id, value } = event.target;
//     this.setState({
//       [id]: value.trim(),
//     });
//   };

//   handleSubmit = async (event) => {
//     event.preventDefault();
//     this.setState({ loading: true });
//     const { username, email, password } = this.state;

//     // Log the form data
//     console.log("Form Data:", { username, email, password });

//     if (!username || !email || !password) {
//       return this.setState({ errorMessage: "Please fill out all fields." });
//     }

//     try {
//       this.setState({ loading: true });
//       this.setState({errorMessage:null})
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email, password }), // Send form data
//       });
//       const data = await res.json();

//       if (data.success === false) {
//         this.setState({ errorMessage: data.message, loading: false });
//       } 

//       this.setState({ loading: false });

//       if (res.ok) {
//         this.props.history.push('/sign-in');
//       }

//     } catch (error) {
//       this.setState({ errorMessage: error.message, loading: false });
//     }
//   };

//   render() {
//     const { username, email, password, errorMessage,loading } = this.state;

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
//                 <label className="label" htmlFor="username">
//                   Your username
//                 </label>
//                 <input
//                   type="text"
//                   className="input-field"
//                   placeholder="Username"
//                   id="username"
//                   value={username}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="label" htmlFor="email">
//                   Your email
//                 </label>
//                 <input
//                   type="email"
//                   className="input-field"
//                   placeholder="name@company.com"
//                   id="email"
//                   value={email}
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
//                   placeholder="Password"
//                   id="password"
//                   value={password}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <button className='btn' type='submit' disabled={loading}>
//                 {loading ? (
//                   <>
//                     <div className="spinner" />
//                     <span className='pl-3'>Loading...</span>
//                   </>
//                 ) : (
//                   'Sign Up'
//                 )}
//               </button>
//             </form>
//             <div className="text-sm mt-5">
//               <span>Have an account?</span>
//               <Link to="/sign-in" className="text-link">
//                 Sign In
//               </Link>
//             </div>
//             {errorMessage && (
//               <Alert className="error-msg">
//                 {errorMessage}
//               </Alert>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default withRouter(SignUp);

// ====


import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'flowbite-react';
import './styles/SignUp.css';
import OAuth from '../components/OAuth';

class SignUp extends Component {
  state = {
    formData: {},
    errorMessage: null,
    loading: false,
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

    if (!formData.username || !formData.email || !formData.password) {
      this.setState({ errorMessage: 'Please fill out all fields.' });
      return;
    }

    try {
      this.setState({ loading: true, errorMessage: null });

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        this.setState({ errorMessage: data.message, loading: false });
        return;
      }

      this.setState({ loading: false });
      if (res.ok) {
        this.props.navigate('/sign-in');
      }
    } catch (error) {
      this.setState({ errorMessage: error.message, loading: false });
    }
  };

  render() {
    const { formData, errorMessage, loading } = this.state;

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
                <label className="label" htmlFor="username">
                  Your username
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Username"
                  id="username"
                  value={formData.username || ''}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="email">
                  Your email
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="name@company.com"
                  id="email"
                  value={formData.email || ''}
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
                  placeholder="Password"
                  id="password"
                  value={formData.password || ''}
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
                  'Sign Up'
                )}
              </button>
              <OAuth />
            </form>
            <div className="text-sm mt-5">
              <span>Have an account?</span>
              <Link to="/sign-in" className="text-link">
                Sign In
              </Link>
            </div>
            {errorMessage && <Alert className="error-msg">{errorMessage}</Alert>}
          </div>
        </div>
      </div>
    );
  }
}

// Create a wrapper component
function SignUpWrapper(props) {
  const navigate = useNavigate();
  return <SignUp {...props} navigate={navigate} />;
}

export default SignUpWrapper;

