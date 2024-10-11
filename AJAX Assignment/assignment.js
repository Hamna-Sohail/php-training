$(document).ready(function () {

    function fetchUser(){
        $.ajax({
            url: 'https://dummyjson.com/users',
            type: 'GET',
            dataType: 'Json',
            success: function (data) {    
                displayData(data.users);
            },
            Error: function () {
                $('#message').text('Error fetching user data');
            }
        });
    }
    fetchUser();
    
});

function displayData(users) {
    
    $('#user-data').empty();
    $('#user-data').data('user', users);
    
    if (users.length > 0) {
        users.forEach(user => {
            $('#user-data').append(`
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName} ${user.lastName}</td>
                    <td>${user.email}</td>
                </tr>
            `)
        });
        
    }
    else {
        $('#message').text('No user found');
    }
}

$('#search').on('click', function(){
    let userInput = $('#search-field').val();
    filter(userInput);
})
function filter(userInput) {
    let userData = $('#user-data').data('user');
    userInput = userInput.toLowerCase();
    console.log(userInput);
    let filterData = userData.filter(user => user.firstName.toLowerCase().includes(userInput)); 
    console.log(filterData);
    displayData(filterData);
   //  return users.filter(user => user.name.includes(query));
}

