// =====================================================
// DALUBWIKAAN COLLECTION MANAGEMENT PRO
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
updateDoc,
getDoc

}

from

"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";





let collectionsData = [];

let editID = null;









// ================= SAVE COLLECTION =================



window.saveCollection = async function(){



const data = {


week:
document.getElementById("week").value,


date:
document.getElementById("collectionDate").value,



firstYear:
Number(document.getElementById("firstYear").value || 0),



secondYear:
Number(document.getElementById("secondYear").value || 0),



thirdYear:
Number(document.getElementById("thirdYear").value || 0),



fourthYear:
Number(document.getElementById("fourthYear").value || 0),



collector:
document.getElementById("collector").value,



updatedAt:
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
"✏️ Collection Updated"
);



editID=null;



}




else{


await addDoc(

collection(

db,

"collections"

),

{

...data,

createdAt:new Date()

}

);



alert(
"✅ Collection Saved"
);



}





clearForm();


loadCollections();



}





catch(error){


console.error(error);


alert(
"❌ Saving failed"
);



}



};










// ================= LOAD =================



async function loadCollections(){



const snapshot = await getDocs(

collection(

db,

"collections"

)

);



collectionsData=[];



snapshot.forEach(item=>{


collectionsData.push({

id:item.id,

...item.data()

});


});





displayCollections(collectionsData);



}











// ================= DISPLAY =================



function displayCollections(data){



const box =

document.getElementById(
"collectionList"
);



const summary =

document.getElementById(
"collectionSummary"
);





box.innerHTML="";



let grandTotal=0;





data.forEach(item=>{



const total =


Number(item.firstYear||0)

+

Number(item.secondYear||0)

+

Number(item.thirdYear||0)

+

Number(item.fourthYear||0);




grandTotal+=total;





box.innerHTML += `



<div class="panel">


<h3>

💰 ${item.week}

</h3>


<p>
📅 ${item.date}
</p>


<p>
👤 ${item.collector}
</p>


<hr>


<p>
1st Year:
₱${Number(item.firstYear).toLocaleString()}
</p>


<p>
2nd Year:
₱${Number(item.secondYear).toLocaleString()}
</p>



<p>
3rd Year:
₱${Number(item.thirdYear).toLocaleString()}
</p>


<p>
4th Year:
₱${Number(item.fourthYear).toLocaleString()}
</p>



<h3>

Total:

₱${total.toLocaleString()}

</h3>




<button onclick="editCollection('${item.id}')">

✏️ Edit

</button>



<button onclick="deleteCollection('${item.id}')">

🗑 Delete

</button>



</div>


`;



});





summary.innerHTML = `



<h3>

💰 Overall Collection:

₱${grandTotal.toLocaleString()}

</h3>


<p>

Records:
${data.length}

</p>


`;



}









// ================= SEARCH =================



document.addEventListener(

"DOMContentLoaded",

()=>{



loadCollections();





document
.getElementById("searchCollection")
.addEventListener(

"input",

filterCollections

);



document
.getElementById("yearFilter")
.addEventListener(

"change",

filterCollections

);



}

);









function filterCollections(){



const keyword =

document
.getElementById("searchCollection")
.value
.toLowerCase();





const year =

document
.getElementById("yearFilter")
.value;







const filtered = collectionsData.filter(item=>{



let match =


item.week
.toLowerCase()
.includes(keyword)

||

item.collector
.toLowerCase()
.includes(keyword);







if(year==="all")

return match;







return (

match

&&

Number(item[year]||0)>0

);



});





displayCollections(filtered);



}











// ================= EDIT =================



window.editCollection = async function(id){



const snap = await getDoc(

doc(

db,

"collections",

id

)

);



const data=snap.data();




document.getElementById("week").value=data.week;

document.getElementById("collectionDate").value=data.date;


document.getElementById("firstYear").value=data.firstYear;


document.getElementById("secondYear").value=data.secondYear;


document.getElementById("thirdYear").value=data.thirdYear;


document.getElementById("fourthYear").value=data.fourthYear;


document.getElementById("collector").value=data.collector;




editID=id;



alert(
"✏️ Editing mode"
);



};









// ================= DELETE =================



window.deleteCollection=async function(id){



if(
!confirm(
"Delete this collection?"
)

)

return;




await deleteDoc(

doc(

db,

"collections",

id

)

);



loadCollections();



};









function clearForm(){



document
.querySelectorAll("input")
.forEach(

e=>e.value=""

);



}
