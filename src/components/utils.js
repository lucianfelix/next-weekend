import AEMHeadless from '@adobe/aem-headless-client-js';
//import getLocalStaticData from './data';
//import fetch from 'node-fetch';


const tryFetch = async (
  AEMHeadless,
  host,
  endpoint,
  variation,
  setState,
  isAuthor,
) => {
  try {
    AEMHeadless.serviceURL = host;

    // get data from AEM graphql call at endpoint, causes error if fetch fails
    const response = await AEMHeadless.runPersistedQuery(
      endpoint,
      { variation: variation, timestamp: Date.now() },
      { credentials: 'include' },
    );

    setState(response.data.pageByPath.item);
    return isAuthor ? 'author' : true;
  } catch (error) {
    // returns false if the fetch fails, will try next host
    return false;
  }
};
