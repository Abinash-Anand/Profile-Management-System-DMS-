'strict-mode'
console.log("Working");
const form = document.querySelector('form');
const table = document.querySelector('#userTable tbody ')
const url = "http://localhost:5000/user"
async function fetchUserData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        populateTable(data);
        // temp()
    } catch (error) {
        console.error('Error:', error.message);
    }
    
}


function populateTable(userData) {
    const tableBody = document.querySelector('#userTable tbody');

    // Clear existing rows
    tableBody.innerHTML = '';
    let rowNumber = 1;
    // Populate the table with the received data
    userData.forEach(user => {  
        
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        const cell7 = row.insertCell(6)
        //defining classes
        row.id = 'row-'+rowNumber
        
        cell1.textContent = rowNumber
        cell2.textContent = user.username;
        cell3.textContent = user.userProfile;
        cell4.textContent = user.email;
        cell5.textContent = user.phone;
        cell6.innerHTML = "<div><button>Delete</button></div>"
        cell7.innerHTML = "<div><button>Update</button></div>"
        rowNumber=rowNumber+1
    });
}


const temp = ()=>{
    const htmlElementsArray = Array.from(table) 
    console.log(htmlElementsArray);
    const user = document.querySelector("#row-1")
    user.addEventListener('click',function(){
        deleteUser()
    })

}


//DELETING A USER
async function deleteUser(){
    try {
        const response = fetch(url,{
            method:"DELETE"
        });
        if(!response){
            throw new Error("DELETE REQUEST FAILED. STATUS", response.status())
        }
        console.log("DELETE SUCCESSFUL");
    } catch (error) {
        console.log(error);
    }
}

const noLoad  =  function(){
    window.location.href='/'
    return true
}
// $("form").submit(function(event){
//     // event.preventDefault();
//     const username = document.querySelector('#username').value
//     const userProfile =document.querySelector("#userProfile").value
//     const email = document.querySelector("#email").value
//     const password = document.querySelector("#password").value
//     const phone = document.querySelector('#phone').value
//     //creating a POST REQUEST using AJAX
//     $.post('/submitForm', {username,userProfile,email,password,phone}, function(response){
//         populateTable(response);
//     })
    
// })


fetchUserData();
























// const searchUser = document.querySelector(".search-user")
// console.log(searchUser);
// const url = "http://localhost:5000/"
// const xhr = new XMLHttpRequest();
// xhr.open("GET",url)
// xhr.onreadystatechange = async (req,res)=>{
//     try {
//         const id = req.params.id
//         const user = req.body.findById(id)
//     console.log(user);
//     } catch (error) {
//         console.log(error);
//     }

// }
// xhr.send();
// // searchUser.addEventListener('click', function(e){
// //     console.log();
// // })

