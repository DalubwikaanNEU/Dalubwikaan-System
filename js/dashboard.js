// =====================================================
// DALUBWIKAAN ADMIN DASHBOARD SYSTEM
// dashboard.js
// FIRESTORE ANALYTICS CONNECTION
// =====================================================



import {

    db

} from "./firebase.js";



import {

    collection,
    getDocs

} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";







// =====================================================
// FORMAT MONEY
// =====================================================


function money(value){

    return "₱" + Number(value || 0)
    .toLocaleString();

}








// =====================================================
// LOAD DASHBOARD DATA
// =====================================================



async function loadDashboard(){


try{



console.log(
"📊 Loading dashboard data..."
);





// ================= COLLECTIONS =================



const collectionSnap = await getDocs(

    collection(
        db,
        "collections"
    )

);



let totalCollection = 0;



collectionSnap.forEach(doc=>{


    const data = doc.data();



    totalCollection +=

    Number(data.firstYear || 0)

    +

    Number(data.secondYear || 0)

    +

    Number(data.thirdYear || 0)

    +

    Number(data.fourthYear || 0);



});









// ================= EXPENSE =================



const expenseSnap = await getDocs(

    collection(
        db,
        "expenses"
    )

);



let totalExpenses = 0;



expenseSnap.forEach(doc=>{


    const data = doc.data();



    totalExpenses +=

    Number(data.amount || 0);



});









// ================= PROJECT =================



const projectSnap = await getDocs(

    collection(
        db,
        "projects"
    )

);



let projectCount =

projectSnap.size;









// ================= ANNOUNCEMENT =================



const announcementSnap = await getDocs(

    collection(
        db,
        "announcements"
    )

);



let announcementCount =

announcementSnap.size;









// =====================================================
// DISPLAY TO DASHBOARD
// =====================================================



const collectionElement =

document.getElementById(
"totalCollection"
);



const expenseElement =

document.getElementById(
"totalExpenses"
);



const projectElement =

document.getElementById(
"totalProjects"
);



const announcementElement =

document.getElementById(
"totalAnnouncements"
);







if(collectionElement){

collectionElement.innerHTML =

money(totalCollection);

}





if(expenseElement){

expenseElement.innerHTML =

money(totalExpenses);

}





if(projectElement){

projectElement.innerHTML =

projectCount;

}





if(announcementElement){

announcementElement.innerHTML =

announcementCount;

}








// =====================================================
// ACTIVITY LOG
// =====================================================



const activity =

document.getElementById(
"activityLogs"
);



if(activity){


activity.innerHTML = `


<div>

✅ Collections Loaded:

<strong>
${collectionSnap.size}
</strong>

records

</div>


<br>


<div>

💸 Expenses:

<strong>
${expenseSnap.size}
</strong>

records

</div>


<br>


<div>

📂 Projects:

<strong>
${projectCount}
</strong>

records

</div>


<br>


<div>

📢 Announcements:

<strong>
${announcementCount}
</strong>

posts

</div>


`;



}







console.log(

"🔥 Dashboard connected successfully"

);



}





catch(error){


console.error(

"Dashboard Error:",

error

);



alert(

"❌ Failed loading dashboard data"

);



}



}









// =====================================================
// START
// =====================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


loadDashboard();


}

);






console.log(

"🚀 Dashboard System Ready"

);
// =====================================================
// DALUBWIKAAN PREMIUM DASHBOARD SYSTEM
// DASHBOARD.JS
// FIREBASE STATISTICS + CHART
// =====================================================



import {

db

}

from "./firebase.js";



import {

collection,
getDocs

}

from

"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";





// ===============================
// LOAD DASHBOARD DATA
// ===============================


async function loadDashboard(){



try{



let totalCollection = 0;

let totalExpenses = 0;

let projectCount = 0;

let announcementCount = 0;







// ===============================
// COLLECTIONS
// ===============================



const collectionsSnapshot =

await getDocs(

collection(

db,

"collections"

)

);







collectionsSnapshot.forEach(doc=>{


const data = doc.data();



totalCollection +=


Number(data.firstYear || 0)

+

Number(data.secondYear || 0)

+

Number(data.thirdYear || 0)

+

Number(data.fourthYear || 0);



});









// ===============================
// EXPENSES
// ===============================



const expensesSnapshot =

await getDocs(

collection(

db,

"expenses"

)

);







expensesSnapshot.forEach(doc=>{


const data = doc.data();



totalExpenses +=

Number(data.amount || 0);



});









// ===============================
// PROJECTS
// ===============================



const projectsSnapshot =

await getDocs(

collection(

db,

"projects"

)

);



projectCount =

projectsSnapshot.size;









// ===============================
// ANNOUNCEMENTS
// ===============================



const announcementsSnapshot =

await getDocs(

collection(

db,

"announcements"

)

);



announcementCount =

announcementsSnapshot.size;









// ===============================
// DISPLAY
// ===============================




document.getElementById(
"totalCollection"
).innerHTML =


"₱" +

totalCollection.toLocaleString();






document.getElementById(
"totalExpenses"
).innerHTML =


"₱" +

totalExpenses.toLocaleString();







document.getElementById(
"totalProjects"
).innerHTML =

projectCount;







document.getElementById(
"totalAnnouncements"
).innerHTML =

announcementCount;









// CREATE CHART


createChart(

totalCollection,

totalExpenses

);







console.log(
"📊 Dashboard Connected"
);




}



catch(error){


console.error(

"Dashboard Error:",

error

);



}



}









// ===============================
// CHART SYSTEM
// ===============================



function createChart(collections,expenses){



const canvas =

document.getElementById(
"financeChart"
);





if(!canvas)

return;







new Chart(

canvas,

{


type:"doughnut",



data:{



labels:[

"Collections",

"Expenses"

],




datasets:[{


data:[

collections,

expenses

]



}]




},





options:{


responsive:true,


plugins:{



legend:{


position:"bottom"



}



}



}



}

);





}









// ===============================
// START
// ===============================


document.addEventListener(

"DOMContentLoaded",

()=>{


loadDashboard();


}

);
