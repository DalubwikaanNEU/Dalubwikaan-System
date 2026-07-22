// =====================================================
// MAGSIKHAY AUTH GUARD
// ADMIN PAGE PROTECTION
// =====================================================


import { auth }

from "./firebase.js";



import {

onAuthStateChanged,
signOut

}

from

"https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";





// ===============================
// CHECK LOGIN
// ===============================


onAuthStateChanged(auth,(user)=>{



if(!user){



alert(
"🔒 Admin access only."
);



window.location.href="login.html";



}

else{


console.log(

"✅ Admin verified:",
user.email

);


}



});








// ===============================
// LOGOUT
// ===============================


document.addEventListener(

"DOMContentLoaded",

()=>{


const logoutBtn =

document.getElementById(
"logoutBtn"
);




if(logoutBtn){


logoutBtn.onclick=async()=>{



await signOut(auth);



window.location.href="login.html";



};



}



}

);
