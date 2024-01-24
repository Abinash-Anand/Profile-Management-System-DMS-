
document.addEventListener("DOMContentLoaded", function () {
    'use strict';
    console.log("Script is running");
    const url = "http://localhost:5000";
    const form = document.querySelector("#form")
    const submitButton = document.querySelector("#submitBtn")
    const displayTable = document.querySelector("#user-table")
    const updateForm =  document.querySelector("#updateForm")
    const table = document.querySelector("tbody")
    const modalForm = document.querySelector(".modal_component_update")
    // const updateUser = document.querySelectorAll(".update")
    const img = document.querySelector('img')
    const infinityLoopAnimation =  "/animation/Infinity-loop.svg"
    // console.log(infinityLoopAnimation);
    // console.log(`${url}/submitForm`);
    let totalPages 
    let currentPage
    const successAlert = document.querySelector("#success_Alert")
    const loadingAnimation = document.querySelector(".loading-animation")
    const deleteUserAlert = document.querySelector("#danger_Alert")
    const blurBackground = document.querySelector(".background-blur")
    const updateAlert = document.querySelector("#update_Alert")
    // img.src = infinityLoopAnimation
    // img.backgroundColor = "none"
    


    
    //==============================================  All Event Listeners  =========================================
    //FORM eventlistener
    form.addEventListener("submit", formSubmitEvent);
    
    //reusable functions
    function formSubmitEvent(event){
        event.preventDefault();
        // console.log("Submit button clicked");
        createUser()
        
        
    }
    
    //2nd event listener {DISPLAYING THE TABLE}
    displayTable.addEventListener('click',function(){
        img.src = infinityLoopAnimation
        loadingAnimation.style.display ='block'
        fetchUsers();
  
        

    })

    //Update users
    updateForm.addEventListener("submit", function (event) {
        event.preventDefault();
        blurBackground.style.display = 'none'
       
        const u_name = document.querySelector('#Username').value
        const u_profile =document.querySelector("#UserProfile").value
        const e_mail = document.querySelector("#Email").value
        const pass_word = document.querySelector("#Password").value
        const phone_no = document.querySelector("#Phone").value
      
        const updateJsonObject = {
            username:u_name,
            userProfile: u_profile,
            email:e_mail,
            password:pass_word,
            phone:phone_no
        }
        const userId = document.getElementById("userId").value;
        // console.log(userId);
        updateData(updateJsonObject,userId);
    });

//===============MODAL WINDOW EVENT============
// updateForm.addEventListener('onkeypress',function(e){
//     console.log(e);
// })
//creating dynamic html element and populating the table

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
        const cell7 = row.insertCell(6);

        //defining classes
        row.id = 'row-'+rowNumber
        
        cell1.textContent = rowNumber
        cell2.textContent = user.username;
        cell3.textContent = user.userProfile;
        cell4.textContent = user.email;
        cell5.textContent = user.phone;
        cell6.innerHTML = "Delete"
        cell6.className = "btn btn-danger m-2 delete"
        cell6.id = "del" + rowNumber;
        cell6.setAttribute('user-id', user._id);
        
        // console.log(cell6);
        cell7.innerHTML = "Update"
        cell7.className = "btn btn-success m-2 update"
        cell7.id = "update"+rowNumber
        cell7.setAttribute("data-user-id", user._id)
        // console.log("user id: ",cell7.getAttribute("data-user-id"));
        // console.log(cell7);
        rowNumber=rowNumber+1
        
        
    });

    deleteElementsNodeList(tableBody)
    updateUserData(tableBody, userData)
  
}
//========================================================CREATING A USER============================================================
async function createUser(){
    const xhr = new XMLHttpRequest();
    //opening the object and defining the properties
    xhr.open('POST', `${url}/submitForm`, true);
    // Set the Content-Type header if you are sending JSON data
    xhr.setRequestHeader('Content-Type', 'application/json');
    //on load state
    xhr.onload = async function (){
        try {
            const response = JSON.parse(this.responseText)
            console.log(response);
            successAlert.style.display ='block'
            fetchUsers();
            setTimeout(()=>{
                successAlert.animate = "0.3s ease-out"
                successAlert.style.display ='none'
                console.log(response);
            },3000)
        } catch (error) {
            console.error(error)
            
        }
        
    }
    // Send the form data as JSON
    const formData = new FormData(form);
    console.log(formData);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
        

    });
    xhr.send(JSON.stringify(jsonData));
    
}
// function loadAnimate(){
//     setTimeout(() => {
//         loadingAnimation.style.display= "none"
//         populateTable(response.users)

//     }, 2000);
// }

//======================================THIS FUNCTION FETCHES THE USER DATA FROM THE SERVER===============================
function fetchUsers(){
    const xhr = new XMLHttpRequest();
    //opening the object and defining the properties
    xhr.open('GET', `${url}/user`, true);
    // Set the Content-Type header if you are sending JSON data
    xhr.setRequestHeader('Content-Type', 'application/json');
    //on load state
    xhr.onload = function (){
        try {
          
            const response = JSON.parse(this.responseText)
            console.log(response.user);
            pageCount(response);
            setTimeout(() => {
                 
                loadingAnimation.style.display= "none"
                populateTable(response.users)
              
               
            }, 500);
           
            console.log("Before changePage - totalPages:", totalPages, "newPage:", newPage);
            // changePage(newPage);
            console.log("After changePage - totalPages:", totalPages, "newPage:", newPage);

            

           
            
        } catch (error) {
            console.log(this.status)
        }
        
    }
    xhr.send();
   
}

//=============================DELETE FUNCTION TO DELETE THE USER FROM THE DATABASE==================================================


function deleteElementsNodeList(){
    // const nodeListElements = Array.from(response)
const deleteButton = document.querySelectorAll("tbody .delete") 

    // const tRow = document.querySelectorAll("tbody .delete")
    console.log(deleteButton);
    deleteButton.forEach((user)=>{
        user.addEventListener("click", function (e) {
            
            // console.log("clicked", e.target.id);
            const user_id = e.target.getAttribute('user-id')
            console.log("user id of Delete button:",e.target.id,user_id);
            deleteUserData(user_id)
        })
    })
}

// THIS FUNCTION DELETES INDIVIDUAL USER FROM THE DATABASE
function deleteUserData(id){
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE",`${url}/user/${id}`,true);
    xhr.onload= function(){
        try {
            console.log("successfully deleted the User", );
            deleteUserAlert.style.display="block"
            deleteUserAlert.style.backgroundColor = "#e74a4a"
            setTimeout(() => {
                deleteUserAlert.style.display="none"

            }, 2000);

            fetchUsers()

        } catch (error) {
            console.error(error);
        }
    }
    xhr.send()

}

//=======================================UPDATING AN INDIVIDUAL USER===================================================
    function updateUserData(tableBody, response) {
    
    const updateButton = document.querySelectorAll("tbody .update");
    const userIdInput = document.getElementById("userId");
    // console.log("USER DATA: ",response);
    const userDataArray = response
    updateButton.forEach((user) => {
        user.addEventListener("click", function (e) {
            blurBackground.style.display='block'
            modalForm.style.display = 'block';
            const indexValue = e.target.id.replace("update",'') -1
            // console.log(indexValue);
            // console.log(userDataArray[indexValue]._id);
            
            // Get the user_id from data-user-id attribute
            const userId = e.target.getAttribute("data-user-id");
            userIdInput.value = userId;
            const userData = userDataArray.find(user => user._id === response[indexValue]._id);
            if (userData) {
                document.getElementById("Username").value = userData.username;
                document.getElementById("UserProfile").value = userData.userProfile;
                document.getElementById("Email").value = userData.email;
                document.getElementById("Phone").value = userData.phone;
                // Password field should not be pre-filled for security reasons
            }
         
        });
    });
    
    
}


function updateData(updateJsonObject,id) {
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", `${url}/user/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        try {
            fetchUsers()
            
            setTimeout(() => {
                updateAlert.style.display = 'block'
            }, 1000);
            setTimeout(() => {
              updateAlert.style.display = 'none'

            }, 4000);
            
            modalForm.style.display="none"
        } catch (error) {
         
            console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
        }
      
    };
    xhr.onerror = function () {
        console.error("Network error occurred.");
    };


    xhr.send(JSON.stringify(updateJsonObject));
}
})
//-----------------------------------DOM-CONTENT-LOADER-END--------------------------------------------------------------------
//DROPDOWN MENU GENERATOR
function modalFormGenerator(){
const div = document.createElement('div');
div.className = "dropdown";
document.body.appendChild(div);
}






//IMPLEMENTING PAGINATION
function pageCount(object){
    totalPages = object.totalPages;
    currentPage = object.currentPage;
    console.log("total pages: ",totalPages,currentPage);
    generatePagination(totalPages,currentPage)
}


function generatePagination(totalPages,currentPage) {

    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear existing pagination links
   
    if (totalPages > 1) {
        // Add "Previous" link
        paginationContainer.innerHTML += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                                            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
                                        </li>`;

        // Add page links
        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.innerHTML += `<li class="page-item ${currentPage === i ? 'active' : ''}">
                                                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                                            </li>`;
        }

        // Add "Next" link
        paginationContainer.innerHTML += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                                            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
                                        </li>`;
    }
    
}

function changePage(newPage) {

    // Handle page change logic here
    console.log(newPage);
    // Call the server to fetch data for the new page, e.g., fetchUsers(newPage);
 
    // Update the currentPage and regenerate pagination
    currentPage = newPage;
    generatePagination(totalPages,currentPage);
   
}
//=================================Modal Window===============================
// document.addEventListener("DOMContentLoaded", function () {
//     const openModalBtn = document.getElementById("openModalBtn");
//     const closeModalBtn = document.getElementById("closeModalBtn");
//     const modal = document.getElementById("modal");
//     const overlay = document.getElementById("overlay");
  
//     openModalBtn.addEventListener("click", function () {
//       modal.style.display = "block";
//       overlay.style.display = "block";
//     });
  
//     closeModalBtn.addEventListener("click", function () {
//       modal.style.display = "none";
//       overlay.style.display = "none";
//     });
//   });
  