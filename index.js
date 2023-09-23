console.log("hello world");
// why we are using an object
// bcoz may you need to add new features to the tasks or you can also need to add methods which work on the taks so ...
// task={
//     imgurl:"",
//     title="",
//     type="",
//     description=""
// }
//state refers to the state of the current application
const state = {
  tasks: [],
};

let taskContents = document.querySelector(".task-contents");
let taskPopUp = document.querySelector(".task_modal_body");

const htmlTaskContent = ({ id, url,title,type,desc }) =>
{console.log(id,url,title,type,desc);
  return `
    <div class="col-md-6 col-lg-4 mt-3 " id=${id} key=${id}>
        <div class="card shadow-sm task__card h-100">
            <div class="card-header d-flex justify-content-end task_card_header">
                <button class="btn btn-outline-info mx-2" name=${id} id=${id} onclick="editTask()">
                    <i class="fa fa-pencil" name=${id}></i>
                </button>

                <button class="btn btn-outline-danger mr-2" name=${id} id="${id}" onclick="deleteTask.apply(this,arguments)"><!--also we can do as deleteTask() apply is to pass the element that is this-->
                    <i class="fa-solid fa-trash" id=${id}></i>
                </button>
            </div> 
            <!--// if only user entered url then show this ele we dont show any image-->
            ${
              url
                ? `<img src=${url} width="100%" height="300px" class="card-img-top md-3 rounded-lg" alt="card image">`
                : `<img src="https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png" width="100%" height="300px" class="card-img-top md-3 rounded-lg" alt="card image">`
            }
            <div class="card-body">
                <h4 class="card-title task_card_title border">${title}</h4>
                <p class="decription trim-3-lines text-muted" data-gram_editor="false">${desc}</p>
                <div class="tags text-white d-flex flex-wrap">
                    <span class="badge bg-primary m-1">${type}</span>
                </div>
            </div>
            <div class="class-footer">
                <button type="button" class="btn btn-primary float-right m-2" data-bs-toggle="modal" data-bs-target="#show-tasks" id="${id}" onclick="openTask()">Open Task</button>
            </div>
        </div>
    </div>
`;
};
const htmlModalContent = ({ id, title, desc, url }) => {
    // id using new Date() will be in string formate fo use it further we need to convert to integer formate
    //convert this id into integer formate and find the date from that integer formate
  const date = new Date(parseInt(id));
  return `
    <div id=${id}>
    ${
      url
        ? `
        <img width='100%' height="200px" src=${url} alt='card image cap' class=' place__holder__image mb-3' height="200px" />
      `
        : `
      <img width='100%' src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png" alt='card image cap' class='img-fluid place__holder__image mb-3' height="150px"/>
      `
    }
    <strong class='text-sm text-muted'>Created on ${date.toDateString()}</strong>
    <h2 class='my-3'>${title}</h2>
    <p class='lead'>
      ${desc}
    </p>
    </div>
  `;
};

const updateLocalStorage=()=>
{
    localStorage.setItem("tasks",JSON.stringify({
      tasks:state.tasks
    }));
    console.log(localStorage.tasks);
}
const loadInitialData=()=>
{
  const data=JSON.parse(localStorage.tasks);
  if(data)state.tasks=data.tasks;
  state.tasks.map((cardData)=>{
    taskContents.insertAdjacentHTML("beforeend",htmlTaskContent(cardData))
  })
}

const handleSubmit=()=>{
    let id=`${Date.now()}`;
    console.log("ok")
    let input={
      url:document.querySelector("#image-url").value,
      title:document.querySelector("#task-title").value,
      type:document.querySelector("#task-type").value,
      desc:document.querySelector("#task-desc").value
    }
    if(input.title=="" || input.type=="" ||input.desc=="")
    alert("please fill all the columns")
    else
    {
    state.tasks.push({...input,id});
    updateLocalStorage();
    
    console.log({...input,id})
    taskContents.insertAdjacentHTML(
      "beforeend",
      htmlTaskContent({
        id,
        ...input,
        
      })
    
    );
    }
    // taskContents.insertAdjacentHTML("beforeend",htmlTaskContent({id,url,title,type,desc}));

}

// const elem=document.querySelector(".savechanges-button")
// elem.addEventListener("click",handleSubmit);

const openTask=(e)=>{
  if(!e) e=window.event
  console.log(window.event)
  console.log(state.tasks)
  console.log(e.target,e.target.parent)
  const getTask = state.tasks.find(({id})=>id===e.target.id)
  console.log(`get task: ${getTask.id}`)
  taskPopUp.innerHTML=htmlModalContent(getTask)
}

// const deleteTask=(e)=>{
//     if(!e)e=window.event
//     console.log(e.target)
//     console.log(e.target.id)
//     const getTask=state.tasks.findIndex(({id})=>id==e.target.id)
//     //const value=e.target.getAttribute("name")
//     //const typeOfElem=e.target.tagName
//     state.tasks.splice(getTask,1);
//     console.log("index : ",getTask);
//     updateLocalStorage();
//     location.reload()
//     // loadInitialData();
// }

const deleteTask = (e) => {
  if (!e) e = window.event;
  const targetID = e.target.getAttribute("name");
  const type = e.target.tagName;
  const removeTask = state.tasks.filter(({ id }) => id !== targetID);
  state.tasks = removeTask;

  updateLocalStorage();
  if (type === "BUTTON") {
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  }

  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode.parentNode.parentNode
  );
};

const editTask=(e)=>{
  if(!e)e=window.event;
  let targetId=e.target.id;
  let name=e.target.tagName;
  let parentNod,taskTitle,taskType,taskDes,submitButton;
  let getTask=state.tasks.filter(({id})=>id==targetId)
  if(name=="BUTTON")
  parentNod=e.target.parentNode.parentNode;
  else
  parentNod=e.target.parentNode.parentNode.parentNode;
  console.log(parentNod.childNodes[7].childNodes)
  taskTitle = parentNod.childNodes[7].childNodes[1];
  taskType = parentNod.childNodes[7].childNodes[5].childNodes[1];
  taskDesc = parentNod.childNodes[7].childNodes[3];
  submitButton=parentNod.childNodes[9].childNodes[1];
  console.log(taskTitle,taskDesc,taskType,submitButton)
  submitButton.textContent="save changes"
  taskTitle.setAttribute("contenteditable","true")
  taskType.setAttribute("contenteditable", "true");
  taskDesc.setAttribute("contenteditable", "true");
  submitButton.setAttribute("onclick","saveChanges()");
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target")
}

const saveChanges=(e)=>{
  if(!e)e=window.event;
  let targetId=e.target.id;
  let parentNod=e.target.parentNode.parentNode;
  let taskTitle,taskType,taskDesc,submitButton;
  taskTitle = parentNod.childNodes[7].childNodes[1].textContent;
  taskType = parentNod.childNodes[7].childNodes[5].childNodes[1].textContent;
  taskDesc = parentNod.childNodes[7].childNodes[3].textContent;
  submitButton = parentNod.childNodes[9].childNodes[1];
  let Index=state.tasks.findIndex(({id})=>targetId==id)
  state.tasks[Index]['title']=taskTitle;
  state.tasks[Index]['type']=taskType;
  state.tasks[Index]['desc']=taskDesc;
  parentNod.childNodes[7].childNodes[1].textContent=taskTitle
  submitButton.setAttribute("data-bs-toggle","modal")
  submitButton.setAttribute("data-bs-target","#show-tasks")
  parentNod.childNodes[7].childNodes[1].setAttribute("contenteditable","false")
  parentNod.childNodes[7].childNodes[5].childNodes[1].setAttribute(
    "contenteditable",
    "false"
  );
  parentNod.childNodes[7].childNodes[3].setAttribute("contenteditable","false")
  parentNod.childNodes[7].childNodes[5].childNodes[1]=taskType;
  parentNod.childNodes[7].childNodes[3]=taskDesc;
  updateLocalStorage();
  submitButton.setAttribute("onclick","openTask()")
  submitButton.textContent="Open Task"
  alert(`Do you need to change the details
          Type : ${taskType}
          Title:${taskTitle}
          Description:${taskDesc}`)
  // location.reload();
}

const searchTask=(e)=>{
  if(!e)e=window.event;
  while(taskContents.firstChild)
  {
    taskContents.removeChild(taskContents.firstChild)
  }
  let task=state.tasks.filter(({title})=>
      title.toLowerCase().includes(e.target.value))
  task.map((cards)=>{
    taskContents.insertAdjacentHTML("beforeend",htmlTaskContent(cards))
  })
  // console.log(e.target.value);
  // console.log(task)

}