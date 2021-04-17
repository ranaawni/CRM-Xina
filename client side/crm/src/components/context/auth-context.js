import React from 'react';

export default React.createContext({
    token: null,
    adminId: null,
    login: (token, adminId, tokenExperation) => {},
    logout: () => {}
})