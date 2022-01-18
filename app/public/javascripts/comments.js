//retrieve HTML elements
const listComments = document.getElementById("comment-list");
const commentBtn = document.getElementById("btn-comment")
const myComment = document.getElementById("comment") 
const myRecipe = document.getElementById("recipe")



//DOM manipulation

function generateList(params){
    params.forEach((comment)=>{
        appendComment(comment)
    })
}

function appendComment(comment){
    const li = document.createElement("li");
    //const i = document.createElement("i")
    li.innerHTML = '<i class="fa fa-trash"></i><span></span>'
    li.querySelector('span').textContent = comment.content
    li.querySelector("i").setAttribute("data-commentId",comment._id)
    //li.textContent = comment.content
    console.log(li)
    listComments.appendChild(li)
}

//AJAX functions

//Retrieve the list of comments
//Payload will allow us to send the parameters : id of the recipe for example

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

commentBtn.onclick = sendComment


//retrieveAndCreateList({recipe:recipe.value})
//const retrieveComments = (payload)=>axios.post("/comments",payload)
/*
const retrieveAndCreateList = async (payload)=>{

    try{ 
        const retrieved = await retrieveComments(payload)
        generateList(retrieved.data)

    }catch(err){
        console.error(err)
    }

}
*/
