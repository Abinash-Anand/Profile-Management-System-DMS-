document.addEventListener("DOMContentLoaded", function () {
    'use strict';
    console.log("Script is running");
    const url = "http://localhost:5000";
    const form = document.querySelector("#form")
    const submitButton = document.querySelector("#submitBtn")
    const displayTable = document.querySelector("#user-table")
    const updateForm = document.querySelector("#updateForm")
    const table = document.querySelector("tbody")
    const modalForm = document.querySelector(".modal_component_update")
    // const updateUser = document.querySelectorAll(".update")
    const img = document.querySelector('img')
    const infinityLoopAnimation = "/animation/Infinity-loop.svg"
    // console.log(infinityLoopAnimation);
    // console.log(`${url}/submitForm`);
    let currentPage = 1;
    const successAlert = document.querySelector("#success_Alert")
    const loadingAnimation = document.querySelector(".loading-animation")
    const deleteUserAlert = document.querySelector("#danger_Alert")
    const blurBackground = document.querySelector(".background-blur")
    const updateAlert = document.querySelector("#update_Alert")
    const errorAlert = document.querySelector("#Error_Alert")
    const searchElement = document.querySelector("#search")
    const customSelect = document.querySelector('.custom-select')
    //------------------UserProfile and search---------------------------------------
    let customProperty = '';
    const card = document.querySelector('.card')
    const cardUserProfile = document.querySelector(".card-title")
    const cardUsername = document.querySelector('#cardUserName')
    const cardEmail = document.querySelector('#cardEmail')
    const cardPhone = document.querySelector("#cardPhone")
    const cardBio = document.querySelector(".card-text")
    const cardHashtags = document.querySelector(".hashtag")

    // img.src = infinityLoopAnimation
    // img.backgroundColor = "none"
// console.log(customSelect[1].value);

    
    //==============================================  All Event Listeners  =========================================
    //FORM eventlistener
    form.addEventListener("submit", formSubmitEvent);
    
    //reusable functions
    function formSubmitEvent(event) {
        event.preventDefault();
        // console.log("Submit button clicked");
        createUser()
        
        
    }
    
    //2nd event listener {DISPLAYING THE TABLE}
    displayTable.addEventListener('click', function () {
        img.src = infinityLoopAnimation
        loadingAnimation.style.display = 'block'
        card.style.display = 'none'

        
        fetchUsers();
  
        

    })
 
    //Update users
    updateForm.addEventListener("submit", function (event) {
        event.preventDefault();
        blurBackground.style.display = 'none'
      
        const u_name = document.querySelector('#Username').value
        const u_profile = document.querySelector("#UserProfile").value
        const e_mail = document.querySelector("#Email").value
        const pass_word = document.querySelector("#Password").value
        const phone_no = document.querySelector("#Phone").value
      
        const updateJsonObject = {
            username: u_name,
            userProfile: u_profile,
            email: e_mail,
            password: pass_word,
            phone: phone_no
        }
        const userId = document.getElementById("userId").value;
        // console.log(userId);
        updateData(updateJsonObject, userId);
    });


   
    //===============Search Bar EVENT LISTENER======================================

customSelect.addEventListener('change', customSelectData)
    
function customSelectData(e) {
        console.log(e.target.value);
        customProperty = e.target.value;
        console.log(customProperty);
}

    searchElement.addEventListener('submit', searchData )

    function searchData(e) {
          e.preventDefault();
        const searchUserValue = document.querySelector("#search-user").value
        searchElement.setAttribute("searchBy", customProperty)

        const jsonData = {
            [ searchElement.getAttribute("searchBy")] :searchUserValue
        }
        console.log(jsonData);
        loadingAnimation.style.display='block'
        table.style.display='none'
        searchUser(jsonData)
        
    }
    //----------------------------------creating dynamic html element and populating the table-------------------------------------

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
            row.id = 'row-' + rowNumber
        
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
            cell7.id = "update" + rowNumber
            cell7.setAttribute("data-user-id", user._id)
            // console.log("user id: ",cell7.getAttribute("data-user-id"));
            // console.log(cell7);
            rowNumber = rowNumber + 1
        
        
        });

        deleteElementsNodeList(tableBody)
        updateUserData(tableBody, userData)
  
    }
    //========================================================CREATING A USER============================================================
    async function createUser() {
        const xhr = new XMLHttpRequest();
        //opening the object and defining the properties
        xhr.open('POST', `${url}/submitForm`, true);
        // Set the Content-Type header if you are sending JSON data
        xhr.setRequestHeader('Content-Type', 'application/json');
        //on load state
        xhr.onload = async function () {
            try {
                const response = JSON.parse(this.responseText)
                console.log(response);
                successAlert.style.display = 'block'
                fetchUsers();
                setTimeout(() => {
                    successAlert.animate = "0.3s ease-out"
                    successAlert.style.display = 'none'
                    console.log(response);
                }, 3000)
            } catch (error) {

                console.error(error.status())
                
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
    //================================================Pagiantion==========================================
     let newPage =1
    //===========page next==================

    function totalPages(response) {
       Pagination(totalPageCount)
    }
    const nextPage = document.querySelector("#next-page")

    nextPage.addEventListener('click',Pagination)
    function Pagination(e) {
        loadingAnimation.style.display = "block"
        table.style.display = 'none'
        newPage++
        
        fetchUsers(newPage)
    }
//==============================page previous=========================
    const previousPage = document.querySelector('#previous')
    previousPage.addEventListener('click',PaginationPrev)
    function PaginationPrev(e) {
    
        loadingAnimation.style.display = "block"
        table.style.display = 'none'
        if (newPage != 1) {
            console.log(newPage);
            newPage--
        } else {
            console.log(newPage);
            previousPage.disabled = true;
            
        }
        
        fetchUsers(newPage)
    }
   
    //======================================THIS FUNCTION FETCHES THE USER DATA FROM THE SERVER===============================
    function fetchUsers(currentPage) {

        const xhr = new XMLHttpRequest();
        //opening the object and defining the properties
        xhr.open('GET', `${url}/user?page=${currentPage}`, true);
        // Set the Content-Type header if you are sending JSON data
        xhr.setRequestHeader('Content-Type', 'application/json');
        //on load state
        xhr.onload = function () {
            try {
           
                const response = JSON.parse(this.responseText)
                console.log(response);
                console.log("total",response.totalPages,"current",currentPage, newPage);
                if (response.totalPages === currentPage) {
                    nextPage.disabled=true
                }
                if (newPage === previousPage) {
                    nextPage.disabled=true
                }
                setTimeout(() => {
                    loadingAnimation.style.display = "none"
                    table.style.display=''
                    populateTable(response.users)
                }, 500);
            
            } catch (error) {
                console.log(this.status)
            }
        
        }
        xhr.send();
   
    }

    //=============================DELETE FUNCTION TO DELETE THE USER FROM THE DATABASE==================================================


    function deleteElementsNodeList(data) {
        // const nodeListElements = Array.from(response)
        const deleteButton = document.querySelectorAll("tbody .delete")

        // const tRow = document.querySelectorAll("tbody .delete")
        // console.log(deleteButton);
        deleteButton.forEach((user) => {
            user.addEventListener("click", function (e) {
            
                // console.log("clicked", e.target.id);
                const user_id = e.target.getAttribute('user-id')
                // console.log("user id of Delete button:", e.target.id, user_id);

                deleteUserData(user_id)
            })
        })
    }

    // THIS FUNCTION DELETES INDIVIDUAL USER FROM THE DATABASE
    function deleteUserData(id) {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `${url}/user/${id}`, true);
        xhr.onload = function () {
            try {
                console.log("successfully deleted the User",);
                deleteUserAlert.style.display = "block"
                deleteUserAlert.style.backgroundColor = "#e74a4a"
                setTimeout(() => {
                    deleteUserAlert.style.display = "none"

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
            document.addEventListener('keydown', function (e) {
              
                if (e.key === "Escape") {
                    modalForm.style.display = "none"
                    blurBackground.style.display='none'
                }
            })
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

//===================================================== Search Users==========================================================
   
//     {cardUserProfile,
//         cardUsername,
//         cardEmail,
//         cardPhone,
//         cardBio,
//         cardHashtags
// }
    
     function CreateUserProfile(userData) {
         if (userData === undefined) {
            throw new Error("undefined Parameter value")
         }
             cardUserProfile.innerHTML ="👤"+ userData.userProfile
             cardUsername.innerHTML = "🆔 "+userData.username
             cardEmail.innerHTML = "📧 "+userData.email
             cardPhone.innerHTML = "📞 "+userData.phone
             cardBio.innerHTML = "🌟 Exploring life's adventures one post at a time."
             cardHashtags.innerHTML = "<strong>#</strong>Traveler <strong>#</strong>Photographer <strong>#</strong>Adventurer"
             card.style.display='block'
             
    }
    
    
    
    
    function searchUser(jsonData) {
        const xhr =new XMLHttpRequest();
        xhr.open("POST", `${url}/user/search`, true);
        xhr.setRequestHeader('Content-Type', "application/json");
        xhr.onload = async function () {
                try {
                    const response = JSON.parse(this.responseText);
                     setTimeout(() => {
                         loadingAnimation.style.display = "none"
                         CreateUserProfile(response)
                         
                     }, 500);
           
                } catch (error) {
                    console.error(error);
                }
        }
        
        xhr.send(JSON.stringify(jsonData))
}
    




})
//-----------------------------------DOM-CONTENT-LOADER-END--------------------------------------------------------------------