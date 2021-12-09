// json com os items da lista
let tasklistjson = JSON.parse(localStorage.getItem("tasklistjson")) ?? [] 
const setBanco = () => {
    localStorage.setItem("tasklistjson", JSON.stringify(tasklistjson))}
    // adiciona nova tarefa no html
const addtask = (taskname, status, indice) => {
    const tasklisthtml = document.querySelector("#tasklist")
    tasklisthtml.innerHTML += `
    <li>
        <label for="" class="list_item" draggable="true"> 
            <input type="checkbox" name="lorem" id="lorem" ${status} data-indice=${indice} >
             <p>${taskname}</p>
            <input type="button" value="X" data-indice=${indice}>
        </label>
    </li> 
    `
}
// pega o json e aciona o addtask()
const render  = () => {
    // limpa tela
    document.querySelector("#tasklist").innerHTML = ""
    tasklistjson.forEach( (item, indice) => addtask(item.taskname, item.status, indice))
    setBanco()
}
// atualiza o json com as tarefas
document.querySelector("#taskinput").addEventListener("keypress", inseriritemjson => { 
    if(inseriritemjson.key === "Enter"){
        tasklistjson.push({"taskname": `${inseriritemjson.target.value}`, "status":""})
        inseriritemjson.target.value = ""
}
    // atualiza tela
    render()
})
document.querySelector("#tasklist").addEventListener("click", (clickitem) => {
    // remove tarefa do json
    if(clickitem.target.type == 'button' ){
        tasklistjson.splice(clickitem.target.dataset.indice, 1)
        render()
        // atualiza status
    }else if(clickitem.target.type == 'checkbox'){
        // colocar o operador ?? aqui 
        tasklistjson[clickitem.target.dataset.indice].status = tasklistjson[clickitem.target.dataset.indice].status === "" ? "checked" : ""
        render()
    }
})


// atualiza tela
render()
  