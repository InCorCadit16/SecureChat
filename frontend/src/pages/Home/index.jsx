import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Sidebar } from 'containers';
import { connect } from 'react-redux';

import './Home.scss';

const Home = props => {
  const { user } = props;
  useEffect(() => {
    
  }, [props.location.pathname]);

  return (
    <section className="home">
      <div className="chat">
        <Sidebar />
      </div>
    </section>
  );
};

export default withRouter(
  connect(
    ({ user }) => ({ user: user.data }),
  )(Home),
);
