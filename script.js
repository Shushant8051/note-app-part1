
let addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", function (e) {

  let addTitle = document.getElementById("note-title");
  let addTxt = document.getElementById("note-text");



  if (addTitle.value == "" || addTxt.value == "") {
    return alert("Please add Note Title and Details")
  }

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }


  var today = new Date();
  var mm = today.toLocaleString('default', { month: 'short' });
  var dd = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = dd + '' + mm + ' ' + yyyy;

  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
    date: today

  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  today;





  showNotes();
});







function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {

    notesObj = JSON.parse(notes);

  }
  let html = "";
  notesObj.forEach(function (x, y) {
    html += `
        <div class="note">
        <p class="note-counter">Note ${y + 1}</p>
            <h3 class="note-title"> ${x.title} </h3>
            <p class="note-text"> ${x.text}</p>
            
            <button id="note-btn" onclick="deleteNote(this.id)" class="note-btn"> Delete Note</button>
           <button id=" edit-btn" onclick="editNote(this.id)" class="note-btn edit-btn">Edit Note </button>

           <div  class ="notes__small-updated">${x.date}</div>


           
        </div>
            `;
  });





  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `No Notes Yet! Add a note using the form above.`;
  }
}

function deleteNote(index) {

  let confirmDel = confirm("Delete this note?");
  if (confirmDel == true) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));


    showNotes();
  }

}

// Function to Edit the Note
function editNote(index) {
  let notes = localStorage.getItem("notes");
  let addTitle = document.getElementById("note-title");
  let addTxt = document.getElementById("note-text");




  if (addTitle.value !== "" || addTxt.value !== "") {
    return alert("Please clear the form before editing a note")
  }

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  console.log(notesObj);

  notesObj.findIndex((element, index) => {
    addTitle.value = element.title;
    addTxt.value = element.text;
  })
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

showNotes();
