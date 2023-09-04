// DISABLE CONTEXT MENU AND COPYING to not interfere with little fun things
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
}, false)

// For Baz to follow your every move, with definitive feline judgement
function makeEyesMove() {
    const body = document.querySelector('body')
    const eyes = document.querySelectorAll('.eye')

    body.addEventListener('mousemove', (e) => {
    eyes.forEach(eye => {
        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
        let radian = Math.atan2(e.pageX - x, e.pageY - y);
        let rotation = (radian * (180 / Math.PI) * -1) + 20;
        eye.style.transform = `rotate(${rotation}deg)`;
        })
    })
}

const localUrl = "http://localhost:3000/newMembers";

window.addEventListener("load", () => {
    console.log("reloaded")
    $("#newest-members-btn").trigger("click")
    clearInputs()
    makeEyesMove()
})

$("#new-member-btn").on("click", e => {
    e.preventDefault()
    console.log('clicked')
    postToDb()
});

$("#newest-members-btn").on("click", e => {
    e.preventDefault()
    getFromDb()
})


function postToDb() {
    let fullName = $('#fullname').val() || "Anonymous";
    let email = $('#email').val() || "weWillFindYou@everywhere.com";
    let address = $('#address').val() || "no address given";
    let phone = $('#phone').val() || "no phone given";
    let username = $('#username').val();
    let password = $('#password').val();
    let plan = $('#plan').val() || "militant";
    let goals = $('#goals').val() || "to learn to code faster than humanly possible";
    console.log(goals)
    
    $.post(localUrl, 
            { 
                    "fullname": fullName,
                    "email": email,
                    "address": address,    
                    "phone": phone,    
                    "username": username,    
                    "password": password,    
                    "plan": plan,    
                    "goals": goals
            }
    );
}
function getFromDb() {
    $.get(localUrl, data => {
        data.forEach(item => {
            console.log(item)
            $("#table-body").append(
                $('<tr>').append(
                    $('<td>').text(item.id),
                    $('<td>').text(item.fullname),
                    $('<td>').text(item.email),
                    $('<td>').text(item.address),
                    $('<td>').text(item.phone),
                    $('<td>').text(item.username),
                    $('<td>').text(item.plan),
                    $('<td>').text(item.goals),
                    $('<td>').append(
                        $('<button>').text('Update').addClass('update-btn').on("click", () => {
                            idFromDb(item.id)
                            $('html, body').animate({
                                scrollTop: $("#sign-up").offset().top
                            }, 1000);
                            $("#sign-up-h2").text("Update your info")
                            $("#sign-up-p").text("...or Else!")
                            $("#new-member-btn").addClass('d-none')
                            $("#change-btn").removeClass('d-none')
                        }),
                        $('<button>').text('Delete').addClass('delete-btn').on("click", () => {
                            deleteFromDb(item.id)
                            // console.log("delete ", item.id)
                        })
                        )                
                )
            )
        }) 
    })
}

function idFromDb(id) {
    $.get(localUrl + `/${id}`, data => {
        $('#fullname').val(data.fullname);
        $('#email').val(data.email);
        $('#address').val(data.address);
        $('#phone').val(data.phone);
        $('#username').val(data.username);
        $('#password').val("*********");
        $('#plan').val(data.plan);
        $('#goals').val(data.goals);
    })

    $("#change-btn").on("click", () => {
        // console.log('changing')
        changeDb(id)
    })

}

function deleteFromDb(id) {
    $.ajax({
        url: localUrl + `/${id}`,
        type: 'DELETE',
        success: (response) => {console.log("deleted " + response)}
    })
}
// deleteFromDb(3)


function changeDb(id) {
    let fullName = $('#fullname').val();
    let email = $('#email').val();
    let address = $('#address').val();
    let phone = $('#phone').val();
    let username = $('#username').val();
    let password = $('#password').val();
    let plan = $('#plan').val();
    let goals = $('#goals').val();

    $.ajax({
        url: localUrl + `/${id}`,
        type: "PUT",
        dataType: 'json',
        contectType: 'application/json',
        data: { 
            "fullname": fullName,
            "email": email,
            "address": address,    
            "phone": phone,    
            "username": username,    
            "password": password,    
            "plan": plan,    
            "goals": goals
        }
    })
}

function clearInputs() {
    console.log('clear')
    $('#fullname').val("");
    $('#email').val("");
    $('#address').val("");
    $('#phone').val("");
    $('#username').val("");
    $('#password').val("");
    $('#plan').val("militant");
    $('#goals').val("");
}

console.log("working")


// $.get(localUrl, data => console.log(data))

