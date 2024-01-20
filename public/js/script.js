$("document").ready(function(){
    $("#submitBtn").on("click",function(event){
      event.preventDefault()
      const userObject = {
         username:  $("#username").val(),
         userProfile: $("#userProfile").val(),
         email: $("#email").val(),
         password : $('#password').val(),
         phone: $("#phone").val()
      }
       
     console.log(userObject);
     $.ajax({
        type:"POST",
        url:"/submitForm",
        data:userObject,
        success:function(){
            populateTable(userObject)
        },
        error:function(){
            console.log("error: ",error);
        }
     })

     function populateTable(user) {
        const tableBody = $('#userTable tbody');
    
        // Create a new row
        const row = $('<tr>').attr('id', 'row-' + rowNumber);
    
        // Create cells and append to the row
        const cell1 = $('<td>').text(rowNumber);
        const cell2 = $('<td>').text(user.username);
        const cell3 = $('<td>').text(user.userProfile);
        const cell4 = $('<td>').text(user.email);
        const cell5 = $('<td>').text(user.phone);
        const cell6 = $('<td>').html('<div><button>Delete</button></div>');
        const cell7 = $('<td>').html('<div><button>Update</button></div>');
    
        // Append cells to the row
        row.append(cell1, cell2, cell3, cell4, cell5, cell6, cell7);
    
        // Append the row to the table body
        tableBody.append(row);
    
        rowNumber++;
    }
    
    


    })
})