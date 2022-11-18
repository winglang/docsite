const axios = require('axios');
const ManagementClient = require('auth0').ManagementClient;

const INTERNAL_MONADA = 'rol_OcFCwJSr66yn4ypb';
const WING_ALPHA = 'rol_11Yl2F0IzsPqrKap';
const management = new ManagementClient({
  domain: 'dev-9zrd68w6.us.auth0.com',
  clientId: 'knS4VZ6cYmn4zYksQx6IbLMXvxU01LT6',
  clientSecret: '<generate from auth0 ui>',
  scope: 'read:users update:users create:role_members read:role_members',
});

const serviceCredentials = {
  username: "social@monada.co",
  password: "<get from auth0 ui>",
};
const IS_AUTHORIZED_FLAG = 'IsAuthorized';
const baseApi = `https://0ed4s65ntl.execute-api.us-east-1.amazonaws.com`;

exports.onExecutePostLogin = async (event, api) => {
  if (!event.user.user_metadata[IS_AUTHORIZED_FLAG]) {
    console.log("getting oauth client");
    const tokenResults = await axios.post('https://dev-9zrd68w6.us.auth0.com/oauth/token', {
      ...serviceCredentials,
      grant_type: "client_credentials",
      client_id: "VM5b43had3mDliqXzlua3lTAVA2OXa2v",
      client_secret: "<get from auth0 ui>",
      audience: "https://api.contribute.monada.co"
    });
    const {access_token: token} = tokenResults.data;

    console.log("Checking if authorized");

    const results = await axios.get(`${baseApi}/isAuthorized`, {
      params: {
        username: event.user.nickname
      },
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    console.log("got auth info");

    if (results.data.isAuthorized) {
      await management.assignRolestoUser({id: event.user.user_id}, {roles: [WING_ALPHA]});
      await api.user.setUserMetadata('WingAlpha', 'true');
      await api.user.setUserMetadata(IS_AUTHORIZED_FLAG, 'true');
    }
  }

  // is this a monada user?
  if (event.user.email?.endsWith('@monada.co')) {
    await management.assignRolestoUser({id: event.user.user_id}, {roles: [INTERNAL_MONADA]});
  }
};
