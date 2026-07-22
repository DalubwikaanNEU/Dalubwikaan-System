// =====================================================
// MAGSIKHAY ADMIN SYSTEM
// RESEARCH MANAGEMENT
// =====================================================



import {

db

}

from "./firebase.js";



import {

collection,
addDoc,
getDocs

}

from

"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";






const saveBtn =

document.getElementById(
"saveResearch"
);







saveBtn.addEventListener(

"click",

async()=>{



const title =

document.getElementById(
"title"
).value;




const content =

document.getElementById(
"content"
).value;





await addDoc(

collection(
db,
"researches"
),

{


title:title,


content:content,


createdAt:new Date()


}


);





alert(
"✅ Research Saved"
);



loadResearch();


}

);








async function loadResearch(){



const list =

document.getElementById(
"researchList"
);



const snapshot =

await getDocs(

collection(
db,
"researches"
)

);





list.innerHTML="";





snapshot.forEach(doc=>{



const data=doc.data();




list.innerHTML += `

<div class="card">

<h3>

${data.title}

</h3>


<p>

${data.content}

</p>


</div>


`;



});



}






loadResearch();
