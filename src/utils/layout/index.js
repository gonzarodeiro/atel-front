import React from 'react';

const Layout = (props) => {
  return (
    <div style={{ marginTop: '35px' }}>
      <div style={{ maxWidth: '1800px' }}>{props.children}</div>
    </div>
  );
};

export default Layout;
