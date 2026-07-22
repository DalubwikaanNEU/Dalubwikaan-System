// =====================================================
// DALUBWIKAAN COLLECTION MANAGEMENT
// =====================================================


import {

db

} from "./firebase.js";



import {

collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc

}

from

"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";





let editID = null;









// ================= SAVE =================


window.saveCollection = async function(){



const data = {


week:

document.getElementById("week").value,



date:

document.getElementById("collectionDate").value,



firstYear:

Number(

document.getElementById("firstYear").value || 0

),



secondYear:

Number(

document.getElementById("secondYear").value || 0

),



thirdYear:

Number(

document.getElementById("thirdYear").value || 0

),



fourthYear:

Number(

document.getElementById("fourthYear").value || 0

),



collector:

document.getElementById("collector").value,



createdAt:

new Date()

};








try{



if(editID){


await updateDoc(

doc(

db,

"collections",

editID

),

data

);



alert(
"✅ Updated"
);



editID=null;



}



else{



await addDoc(

collection(

db,

"collections"

),

data

);



alert(
"✅ Saved"
);



}





clearForm();


loadCollections();



}





catch(error){


console.error(error);


alert(
"❌ Error saving data"
);



}



};









// ================= LOAD =================



async function loadCollections(){


const box =

document.getElementById(
"collectionList"
);



const snapshot = await getDocs(

collection(

db,

"collections"

)

);



box.innerHTML="";





snapshot.forEach(item=>{


const d=item.data();




const total =


Number(d.firstYear)

+

Number(d.secondYear)

+

Number(d.thirdYear)

+

Number(d.fourthYear);






box.innerHTML += `



<div class="panel">


<h3>

💰 ${d.week}

</h3>



<p>

Collector:

${d.collector}

</p>



<p>

Total:

<strong>

₱${total.toLocaleString()}

</strong>

</p>



<button onclick="deleteCollection('${item.id}')">

🗑 Delete

</button>



</div>


`;




});



}











// ================= DELETE =================



window.deleteCollection = async function(id){



await deleteDoc(

doc(

db,

"collections",

id

)

);



alert(
"Deleted"
);



loadCollections();



};









function clearForm(){


document
.querySelectorAll("input")
.forEach(

input=>input.value=""

);



}








document.addEventListener(

"DOMContentLoaded",

loadCollections

);
