import auth from './auth';

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const authCheck = async (props, delay) => {
  let isLoggedIn;
  if (delay) {
    await sleep(delay);
  }
  await auth().then((res) => { isLoggedIn = res; });
  if (isLoggedIn) {
    props.navigation.navigate('Home');
  } else {
    props.navigation.navigate('Login');
  }
};

export default text => console.log(text);
