// =====================================================
// DALUBWIKAAN AUTHENTICATION SYSTEM
// auth.js
// =====================================================


import {

    auth

} from "./firebase.js";



import {

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";







// =====================================================
// LOGIN SYSTEM
// =====================================================


window.loginAdmin = async function(){


    const email = 
    document
    .getElementById("email")
    .value
    .trim();



    const password =
    document
    .getElementById("password")
    .value
    .trim();





    if(!email || !password){


        alert(
            "⚠️ Please enter email and password."
        );


        return;

    }







    try{


        await signInWithEmailAndPassword(

            auth,

            email,

            password

        );





        alert(
            "✅ Welcome Admin!"
        );





        window.location.href =
        "admin.html";



    }



    catch(error){



        console.error(error);



        alert(

            "❌ Login Failed: " 
            + error.message

        );



    }


};










// =====================================================
// AUTH CHECK FOR ADMIN PAGE
// =====================================================


function protectAdminPage(){



    onAuthStateChanged(

        auth,

        (user)=>{



            const page =
            window.location.pathname;



            if(

                page.includes("admin.html")

            ){



                if(!user){



                    alert(

                    "🔒 Please login first."

                    );



                    window.location.href =
                    "login.html";


                }



                else{


                    console.log(

                    "Admin verified:",

                    user.email

                    );


                    const adminName =
                    document.getElementById(
                    "adminName"
                    );



                    if(adminName){


                        adminName.innerHTML =
                        user.email;


                    }



                }


            }



        }


    );


}









// =====================================================
// LOGOUT
// =====================================================


window.logoutAdmin = async function(){



    try{


        await signOut(auth);



        alert(

        "👋 Logged out successfully."

        );



        window.location.href =
        "login.html";



    }



    catch(error){



        console.error(error);



    }


};









// =====================================================
// CONNECT BUTTONS
// =====================================================


document.addEventListener(

"DOMContentLoaded",

()=>{



    protectAdminPage();




    const logoutBtn =
    document.getElementById(
    "logoutBtn"
    );




    if(logoutBtn){



        logoutBtn.onclick =
        logoutAdmin;



    }



});





console.log(
"🔐 Auth System Ready"
);
