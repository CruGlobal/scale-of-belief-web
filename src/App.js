import React from 'react';
import { Admin, Resource } from 'admin-on-rest';
import authClient from './authClient';
import loginPage from './loginPage';

require('dotenv').config();

const App = () => (
  <Admin authClient={authClient}
         loginPage={loginPage}>
  </Admin>
);

export default App