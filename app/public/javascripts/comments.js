
//Retrieve HTML elements --------------------------------------
const listComments = document.getElementById("comment-list");
const commentBtn = document.getElementById("btn-comment")
const myComment = document.getElementById("comment") 
const myRecipe = document.getElementById("recipe")



// DOM manipulation ---------------------------------------------

function generateList(params){
    params.forEach((comment)=>{
        appendComment(comment)
    })
}

function appendComment(comment){
    const li = document.createElement("li");
    //const i = document.createElement("i")
    
    li.innerHTML = '<span></span> <i class="fa fa-trash"></i> <i class="fa fa-pen"></i>'

    li.setAttribute("id",comment._id)
    li.querySelector('span').textContent = comment.content
    li.querySelector('span').setAttribute("data-commentId",comment._id)
    
    li.querySelector("i.fa-trash").setAttribute("data-commentId",comment._id)
    li.querySelector("i.fa-trash").classList.toggle("delete")
    li.querySelector("i.fa-trash").onclick = deleteComment

    li.querySelector("i.fa-pen").setAttribute("data-commentId",comment._id)
    li.querySelector("i.fa-pen").classList.toggle("update")


    setCommentListeners(li)
    listComments.appendChild(li)
}

const openComment = (evt) => {
    evt.target.toggleAttribute('contentEditable')
}

const closeComment = (evt) => {
    evt.target.toggleAttribute('contentEditable')
}

// AJAX functions ------------------------------------------------- -----
// Payload will allow us to send the parameters as mongoDB requests
//  - the id of the recipe for example
//  - the id of the recioes

const sendComment = async ()=>{
    try{
        const newComment = {
            content:myComment.value,
            recipe:myRecipe.value
        }
        
        const addedComment = await axios.post("/comment/"+myRecipe.value, newComment)

        appendComment(addedComment.data.myFetch)

    }catch(err){console.error(err)}
       
}

const deleteComment = async (evt) => {

    try{
        //Create mongo request to be passed as argument
        const mongoRequest = {
            _id:evt.target.getAttribute("data-commentid")
        }
        
        //Delete the element in the DB
        const deleted = await axios.post("/comment/delete",mongoRequest)
        
        //Verify that the comment has been indeed deleted from the DB
        //if true, delete it from DOM
        if (deleted.data.myFetch._id === mongoRequest._id){
            
            document
                .getElementById(mongoRequest._id)
                .remove()
        }

    }catch(err){
        console.error(err)
    }
}

const updateComment = async (evt) => {

    try{
        //Create mongo request to be passed as argument
        const mongoRequest = {
            _id:evt.target.getAttribute("data-commentid")
        }
        mongoRequest.content=document.getElementById(mongoRequest._id).querySelector("span").textContent
        
        //Delete the element in the DB
        console.log(mongoRequest)
        const updated = await axios.post("/comment/update",mongoRequest)
        
        //Verify that the comment has been indeed deleted from the DB
        //if true, update it from DOM
        if (updated.data.myFetch._id === mongoRequest._id){
            
            document
                .getElementById(mongoRequest._id)
                .querySelector("span")
                .textContent = mongoRequest.content
        }

    }catch(err){
        console.error(err)
    }
}

// Set listeners ---------------------------------------------------
commentBtn.onclick = sendComment


//set listeners on each comment line during the render

const setCommentListeners = (comment)=>{
    comment.querySelector("i.delete").onclick = deleteComment
    comment.querySelector("i.update").onclick = updateComment
    comment.querySelector("span").ondblclick = openComment
    comment.querySelector("span").onblur = closeComment
    comment.querySelector("span").onblur = updateComment
}

for (let comment of listComments.children){
    setCommentListeners(comment)}
