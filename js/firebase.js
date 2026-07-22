import {

initializeApp

}

from

"https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";



import {

getFirestore

}

from

"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



import {

getAuth

}

from

"https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";





const firebaseConfig = {


apiKey:
"AIzaSyDx5TR1iYZZsK4JqlvCmuR_0U6H1d3Mr80",


authDomain:
"dalubwikaan--26-8e646.firebaseapp.com",


projectId:
"dalubwikaan--26-8e646",


storageBucket:
"dalubwikaan--26-8e646.firebasestorage.app",


messagingSenderId:
"409516392020",


appId:
"1:409516392020:web:87d462a5927449c69eb7c1"


};





const app =
initializeApp(firebaseConfig);



export const db =
getFirestore(app);



export const auth =
getAuth(app);
