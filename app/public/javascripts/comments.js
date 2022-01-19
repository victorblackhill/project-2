
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
    li.innerHTML = '<i class="fa fa-trash"></i><span></span>'
    li.setAttribute("id",comment._id)
    li.querySelector('span').textContent = comment.content
    li.querySelector("i").setAttribute("data-commentId",comment._id)
    li.querySelector("i").onclick = deleteComment
        // ajouter dans le payload le id qui se trouve dans le comment
        // vérifier que .delete accepte un payload
    
    //li.textContent = comment.content
    console.log(li)
    listComments.appendChild(li)
}

// AJAX functions -------------------------------------------------
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

        console.log(addedComment.data.myFetch)
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

// Set listeners ---------------------------------------------------
commentBtn.onclick = sendComment

for (let comment of listComments.children){
    console.log("comment is ", comment)
    comment.onclick = deleteComment}

