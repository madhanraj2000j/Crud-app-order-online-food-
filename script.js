// CRUD
// C-CREATE
// R-READ
// U-UPDATE
// D-DELETE

const nameEl = document.getElementById('name');
const quantityEl = document.getElementById('quantity');
const formEl = document.getElementById('form-submit');
const btnEl = document.querySelector('.btn-submit');
const contEl = document.querySelector('.todo-list-container');


let tasks = [];
let isEditing = false;
let editId = null;



// function 
const updateUI = function(){
contEl.innerHTML = null;
  tasks.forEach((task)=>{
    const listEl = document.createElement('li');
    listEl.innerHTML = `${task.name} - ${task.count}  <i class="fa-solid fa-pen  icon-update" onclick=updateItem(${task.id})></i>
    <i class="fa-solid fa-xmark icon-delete" onclick=deleteItem(${task.id})></i> `
    contEl.appendChild(listEl);
  })
   
};

const deleteItem = function(id){
 tasks = tasks.filter((task)=>{
   return task.id !== id;
})
updateUI();
}

const updateItem = function(id){
  isEditing = true;
  btnEl.innerText = 'Update';

  // finding the element to update
itemToEdit = tasks.find((task)=>{
  return task.id === id;
});
// update the value from li to nameEL and quantityEl
nameEl.value = itemToEdit.name;
quantityEl.value = itemToEdit.count;
editId = itemToEdit.id;
}


formEl.addEventListener('submit',function(event){
  event.preventDefault();
const itemName = nameEl.value;
const quantity = quantityEl.value;

if(itemName.trim() === '' || quantity.trim() === '') {
    alert('Please add item name');
  }else{
    
if(isEditing){
  tasks = tasks.map((task)=>{
if (task.id === editId){
  return{
    id : editId,
    name :  itemName,
    count : quantity,
  };
}else{
  return task;
}
  })

  // keep initial setting back
  isEditing = false;
  editId = null;
  btnEl.innerText = 'Submit';

}else{

// create the object task

const task = {
  // unique id from net
   id : Date.now(),
   name : itemName,
   count: quantity,
 };
 
 // add task object to the tasks array
  
 tasks.push(task);
  
}
// display items on the screen
updateUI();
 
// clean task input
nameEl.value = null;
quantityEl.value = null;

  }

})

