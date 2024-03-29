


//SELECTOR
const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"));

var heads = JSON.parse(localStorage.getItem("heads"));

const helpBtn = document.getElementById("help");


// document.addEventListener("mouseup", (e) => {
// 	console.log(e.target)
// });

//EVENT LISTENER

addBtn.addEventListener("click", (e) => {
	addNewNote();
});

//FUNCTION

if (notes) {
	
	notes.forEach((note,index) => {
		addNewNote(note,index);
	});

}


function addNewNote(text = "",index) {
	const note = document.createElement("div");
	note.classList.add("note");
	note.innerHTML = `
        <div class="notes">
			<div class="head-container">
				<div class="head">
					<a class="heading">${(heads !== null && index<heads.length)?heads[index]:"Note"}</a>
				</div>
				<div class="tools">
					<button class="copy" title="Copy to Clipboard"><i class="fas fa-copy"></i></button>
					<button class="download" title="Download"><i class="fas fa-download"></i></button>
					<button class="edit" title="Edit"><i class="fas fa-edit"></i></button>
					<button class="delete" title="Delete"><i class="fas fa-trash-alt"></i></button>
				</div>
			</div>
			<div class="text ${text ? "" : "hidden"}"></div>
			<textarea class="area ${text ? "hidden" : ""}"></textarea>
		</div>
        `;
	const downloadBtn = note.querySelector(".download");
	const copyBtn = note.querySelector(".copy");
	const editBtn = note.querySelector(".edit");
	const deleteBtn = note.querySelector(".delete");
	const heading=note.querySelector(".heading");

	const main = note.querySelector(".text");
	const textArea = note.querySelector("textarea");

	textArea.value = text;
	main.innerHTML = marked.parse(text);


	//EVENT LISTENER

	heading.addEventListener("dblclick", (e) =>{
		var head= prompt("Enter name here");
		if(head!=null){
			note.querySelector(".heading").innerHTML=head;
			updateLS();
		}
	});

	copyBtn.addEventListener("click", (e) => {
		const content = textArea.value;
		navigator.clipboard.writeText(content);
	});

	downloadBtn.addEventListener("click", (e) => {
		const content = textArea.value;
		var currNote=note;
		if(content){
		downloadNote(content,currNote);
		}
	});

	deleteBtn.addEventListener("click", (e) => {
		var con = confirm("Are you sure want to delete the note?");
		if(con){
			const head=note.querySelector('.text').innerText;
			// console.log(JSON.parse(localStorage.getItem("notes")).indexOf(head),JSON.parse(localStorage.getItem("notes")),head.replace(/\r?\n|\r/g, " "));
			const index=JSON.parse(localStorage.getItem("notes")).indexOf(head);
			var arr=JSON.parse(localStorage.getItem("heads"))
			arr.splice(index,1);
			localStorage.setItem("heads", JSON.stringify(arr));
			// console.log(arr,JSON.parse(localStorage.getItem("heads")));
			note.remove();
			updateLS();
		}
	});

	editBtn.addEventListener("click", () => {
		main.classList.toggle("hidden");
		textArea.classList.toggle("hidden");
	});

	textArea.addEventListener("input", (e) => {
		const { value } = e.target;
		main.innerHTML = marked.parse(value);
		updateLS();
	});

	document.body.appendChild(note);
}

function downloadNote(content,currNote) {
	const ele = document.createElement('a');
	const blob = new Blob([content],{type : 'plain/text'});
	const fileUrl=URL.createObjectURL(blob);
	const head=currNote.querySelector(".heading");
	ele.setAttribute('href',fileUrl);
	ele.setAttribute('download',head.innerText+".txt");
	ele.style.display='none';
	document.body.appendChild(ele);
	ele.click();

	document.body.removeChild(ele);
};

function updateLS() {

	const headText = document.querySelectorAll(".heading");
	const heads=[]

	headText.forEach(head => {
		heads.push(head.innerText);
	});
	localStorage.setItem("heads", JSON.stringify(heads));
	
	const notesText = document.querySelectorAll(".area");
	const notes=[]
	
	notesText.forEach((note) => {
		notes.push(note.value);
	});
	localStorage.setItem("notes", JSON.stringify(notes));

}

// function updateLS(currNote){
// 	if(localStorage.getItem('heads')){
// 		console.log(JSON.parse(localStorage.getItem('heads')));
// 		heads=JSON.parse(localStorage.getItem('heads'));
		
// 	}
// 	const head = currNote.querySelector('.heading');
	
// 	console.log(head.innerText);
// 	heads.push(head.innerText);
// 	localStorage.setItem("heads",JSON.stringify(heads));
// }

const hel = document.querySelector('.help-btn');
document.addEventListener('mouseup', function (e) {
	var container = document.querySelector('.h');

	if (!container.classList.contains("hide") && !(container.contains(e.target))) {
		container.classList.add("hide");
	}
	else if (e.target == hel) {
		container.classList.remove("hide");
	}
});

// keyboard commands
document.addEventListener("keydown", (e) => {
  var container = document.querySelector(".h");

  // help
  if (e.key === "?") {
    if (e.target.className == "" && container.classList.contains("hide"))
      container.classList.remove("hide");
    else if (!container.classList.contains("hide")) {
      container.classList.add("hide");
    }
  } else if (e.key === "Escape") {
    if (!container.classList.contains("hide")) {
      container.classList.add("hide");
    }
  }

  // Add new note
  if (e.ctrlKey && e.key == "i") {
    if (!container.classList.contains("hide")) container.classList.add("hide");
    addNewNote();
  }
});


function headingAlert(){
	
}
