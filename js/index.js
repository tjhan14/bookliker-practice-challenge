
const showPanel = document.querySelector(“#show-panel”)
const allBooks = 'http://localhost:3000/books'
const bookUl = document.querySelector(`#list`)

fetchBooks()
function fetchBooks() {
fetch(allBooks)
.then(resp => resp.json())
 
.then(data => slapBookOnDom(data))
}
 
function slapBookOnDom(data) {
 
data.forEach((singleBook) => {
 
let bookLi = document.createElement(“LI”);
 
bookLi.innerHTML += `
${singleBook.title}
`
 
bookUl.append(bookLi)
 
bookLi.addEventListener(“click”, () => handleClick(singleBook))
 
})
}
 
handleClick = (e) => {
 
showPanel.innerHTML += `
<img src=${e.img_url}/>
<p>${e.description}</p>
`
let likeButton = document.createElement(“BUTTON”)
likeButton.innerHTML += `
${e.users.length}
`
 
showPanel.append(likeButton)
likeButton.addEventListener(“click”, () => handleLike(e))
 
}
handleLike = (e) => {
 
let newLikedUsers = […e.users, {“id”:1, “username”:”pouros”}]
fetch(`http://localhost:3000/books/${e.id}`,{
method: ‘PATCH’,
headers: {
‘Content-Type’: ‘application/json’,
‘Accept’: ‘application/json’
},
body: JSON.stringify({
“users”: newLikedUsers})
})
.then(res => res.json())
.then(response => console.log(response))
}
 