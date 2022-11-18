import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';

export const GITHUB_PAT_SECRET_KEY = 'GITHUB_PAT_SECRET';

let authToken: string;

// @ts-ignore
async function getToken(): Promise<string> {
  if (authToken) {
    return authToken;
  }
  const client = new SecretsManagerClient({});
  const { SecretString: token } = await client.send(new GetSecretValueCommand({
    SecretId: process.env[GITHUB_PAT_SECRET_KEY],
  }));
  authToken = token!;
  return authToken;
}


async function getGroupMembership(username: string, token: string, groupName: string) {
  try {
    const response = await axios.get(
      `https://api.github.com/orgs/winglang/teams/${groupName}/memberships/${username}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          accept: 'application/vnd.github+json',
        },
      },
    );
    console.log('response: ', JSON.stringify(response.data, null, 2));
    const { state } = response.data;

    return state === 'active';
  } catch (err) {
    console.warn(`Ths user ${username} wasn't in the ${groupName}`);
    return false;
  }

}

export const checkIfAuthorized = async (token: string, username: string): Promise<boolean> => {
  let isContributor = await getGroupMembership(username, token, 'contributors');
  if (isContributor) {
    return true;
  }
  return getGroupMembership(username, token, 'maintainers');
};


export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('event:', JSON.stringify(event, null, 2));

  const username = event.queryStringParameters?.username!;
  if (!username) {
    console.warn('No username was provided...');
    return {
      statusCode: 400,
      body: 'Please provide a GitHub username',
    };
  }


  try {
    const token = await getToken();
    const isAuthorized = await checkIfAuthorized(token, username);
    if (isAuthorized) {
      return {
        body: JSON.stringify({ isAuthorized: true }),
        statusCode: 200,
      };
    }
  } catch (err) {
    console.error('an error occurred while fetching the user\'s authorization:', err);
    return {
      body: JSON.stringify({ isAuthorized: false }),
      statusCode: 200,
    };
  }
  return {
    body: JSON.stringify({ isAuthorized: false }),
    statusCode: 200,
  };
};
