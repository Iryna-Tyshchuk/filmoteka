// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import localstorage from './localstorage';
import jwt_decode from 'jwt-decode';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { toggleModal } from './templates/loginForm';

import { toggleModal } from './templates/loginForm';

const googleBtnEl = document.querySelector('#google-btn');
const loginBtnEl = document.querySelector('#login-btn');
const userInfoContainer = document.querySelector('.user-info');


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBPZbkO_SJHPj74kRyWcf-tF7reNGSDFKk',
  authDomain: 'team-project-6c3f1.firebaseapp.com',
  projectId: 'team-project-6c3f1',
  storageBucket: 'team-project-6c3f1.appspot.com',
  messagingSenderId: '1037356834985',
  appId: '1:1037356834985:web:5cb9583d4b35d5d56409b8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

googleBtnEl.addEventListener('click', getUserData);

async function getUserData(event) {
  const login = await signInWithPopup(auth, provider)
    .then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = jwt_decode(result.user.accessToken);
      localstorage.save('user', user);

      //location.reload();
      // ...
      toggleModal();
      loginBtnEl.textContent = "LOGOUT";
      renderUserData();

    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}


export function renderUserData() {
  const { name, picture } = localstorage.load('user');
  const markup = `<img class="user-info__photo" src="${picture}"><p class="user-info__name">${name}</p>`;
  userInfoContainer.insertAdjacentHTML('afterbegin', markup);
}
export function clearUserData() {
  userInfoContainer.innerHTML = '';
 }


