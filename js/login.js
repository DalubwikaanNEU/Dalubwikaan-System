// =====================================================
// MAGSIKHAY ADMIN LOGIN
// FIREBASE AUTHENTICATION
// =====================================================



import {

auth

}

from "./firebase.js";



import {

signInWithEmailAndPassword

}

from

"https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";







const loginBtn =

document.getElementById("loginBtn");






loginBtn.addEventListener(

"click",

async()=>{



const email =

document.getElementById("email").value;



const password =

document.getElementById("password").value;





const message =

document.getElementById("message");






try{



await signInWithEmailAndPassword(

auth,

email,

password

);





message.innerHTML =

"✅ Login successful";





setTimeout(()=>{


window.location.href="admin.html";


},1000);





}



catch(error){



console.error(error);



message.innerHTML =

"❌ Invalid email or password";



}



}

);
