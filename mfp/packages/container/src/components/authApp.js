import React, { useRef, useEffect } from 'react';
import { mount } from 'auth/AuthApp';
import { useHistory } from 'react-router-dom';

/**
 * This component creates a ref for its element and passes it on mount to load the marketing app.
 */
const AuthApp = ({onSignIn}) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (!ref.current) return;

    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn
    });

    const unlisten = history.listen(onParentNavigate);
    return () => unlisten(); // Clean up listener on unmount
  }, []);

  return <div ref={ref} />;
};

export default AuthApp;
