import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookSignIn = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Définir la fonction responseFacebook ici
  const responseFacebook = async (response) => {
    if (response.status !== 'unknown') {
      console.log('Facebook Login Success:', response);

      const { accessToken } = response;

      try {
        const res = await fetch('http://localhost:3000/facebook-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: accessToken }),
        });

        const data = await res.json();
        console.log('Backend Response:', data);

        if (res.ok) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          console.error('Backend Error:', data.message);
        }
      } catch (error) {
        console.error('Error connecting to backend:', error);
      }
    } else {
      console.log('Facebook Login Failed:', response);
    }
  };

  const logoutFacebook = () => {
    window.FB.logout((response) => {
      console.log('Logged out from Facebook:', response);
      setUser(null);
      setIsAuthenticated(false);
    });
  };

  return (
    <div>
      {!isAuthenticated ? (
        <FacebookLogin
          appId="1330449101724899" // Remplacez par votre Facebook App ID
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook} // Utilisez la fonction ici
          textButton="Login with Facebook"
          render={(renderProps) => (
            <button
              className="btn btn-primary d-flex align-items-center justify-content-center rounded-pill"
              style={{ padding: '10px', fontSize: '1.1rem' }}
              onClick={renderProps.onClick}
            >
              <i className="bi bi-facebook me-2"></i>
              Login with Facebook
            </button>
          )}
        />
      ) : (
        <div className="d-flex align-items-center">
          <img
            src={user?.picture?.data?.url}
            alt="Profile"
            style={{ width: '40px', borderRadius: '50%', marginRight: '10px' }}
          />
          <span className="text-light me-3">{user?.name}</span>
          <button onClick={logoutFacebook} className="btn btn-danger">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default FacebookSignIn;
