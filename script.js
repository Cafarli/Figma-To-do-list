const btn = document.querySelector('.add-btn');
const input = document.querySelector('.add_input')
const del = document.querySelector('.delete-item');
const taskList = document.querySelector('#task-list');
const sort_icon = document.querySelector('.sort');
const input_icon = document.querySelector('.icon')
const warning_span = document.querySelector('span');
var dragSrcEl = null;

eventListeners();

function eventListeners(){
    

    //add new item
    // clicking button
    btn.addEventListener("click",addNewItem);
    // clicking 'enter' button
    document.addEventListener('keypress',(e)=>{
        if(e.key==='Enter'){
            btn.click();
        }
    })

    //clear input
    input_icon.addEventListener('click',clearInput);
    //remove warning for empty span
    input.addEventListener('click',()=>{
        warning_span.style.visibility = 'hidden';
    });
    // sort notes
    sort_icon.addEventListener("click",sorting);
}

function addNewItem(e){
    //create new item
    createNewItem(input.value);
    document.querySelector('.notes').style.display = 'block';

    //clear input
    input.value='';
    e.preventDefault();
}

function createNewItem(text){
    
    //create li
    const li = document.createElement('li');
    li.className = "list-item";
    
    // if input is empty, show warning message
    if(text==''){
        warning_span.style.visibility = "visible";
        e.preventDefault();
        // message deleting after 2 seconds
        // const warning_span = document.createElement('span');
        // warning_span.innerText = 'Write something in note!';
        // warning_span.style.color = 'red';
        // warning_span.style.fontWeight = 'bold';
        // const content = document.getElementById('con');
        // const notes = document.querySelector('.notes');
        // content.insertBefore(warning_span,notes);
        // // setTimeout(() => {
        //     warning_span.style.display = 'none';
        // }, 2000);
    }
    li.appendChild(document.createTextNode(text));

    const a = document.createElement('a');
    a.setAttribute('href','#');
    a.innerHTML = "<i class='fa fa-times delete-item'></i>";
    
    //append i to li
    li.appendChild(a);
    li.setAttribute("draggable", "true");
    li.addEventListener('click',deleteItem);
    li.addEventListener('dragstart', handleDragStart, false);
    li.addEventListener('dragenter', handleDragEnter, false);
    li.addEventListener('dragover', handleDragOver, false);
    li.addEventListener('dragleave', handleDragLeave, false);
    li.addEventListener('drop', handleDrop, false);
    li.addEventListener('dragend', handleDragEnd, false);
    

    //append li to ul list
    taskList.appendChild(li);
}

function handleDragStart(e) {
    this.style.opacity = '0.4';
    
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
    
    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    
    return false;
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    
    this.classList.remove('over');;
}

function deleteItem(e){
    // delete item
    console.log(e.target);
    if(e.target.className === "fa fa-times delete-item"){
        if(confirm('Are you sure?')){
            let item=document.querySelector('.list-item')
            item.remove();
        }
    }


    e.preventDefault();
}

function sorting(e){
    if(sort_icon.style.transform === ""){
        sort_icon.style.transform = "scaleY(-1)";
        Array.from(taskList.getElementsByTagName("li"))
        .sort((a, b) => a.textContent.localeCompare(b.textContent))
        .forEach(li => taskList.appendChild(li));
    }
    else if(sort_icon.style.transform === "scaleY(-1)"){
        sort_icon.style.transform = "";
        Array.from(taskList.getElementsByTagName("li"))
        .sort((b, a) => a.textContent.localeCompare(b.textContent))
        .forEach(li => taskList.appendChild(li));
    }
}

function clearInput(e){
    input.value = '';
    // console.log(e.target)
}