//generate function called when user clicks on button
var generateButton = document.getElementById('generate-button');
var copyButton = document.querySelector('#clipboard')
var inputs = document.getElementById('form-criteria');
var lengthPass = 0;

generateButton.addEventListener('click', generate)
copyButton.addEventListener('click', copyToClipboard)


function showRequirement() {

    document.getElementById('h2').innerHTML = "Please let me know your password requirements.";
    document.getElementById('randomPasswordDisplay').setAttribute("style", "display: none;")


    inputs.setAttribute("style", "display: block;")

    document.getElementById('clipboard').setAttribute("style", "display: none;");
    document.getElementById('main-button').setAttribute("style", "display: none;");
    document.getElementById('generate-button').setAttribute("style", "display: block;");

};





function generate() {
    event.preventDefault();
    lengthPass = document.getElementById('pass-length').value;


    if (isNaN(parseInt(lengthPass))) {
        document.getElementById('randomPasswordDisplay').setAttribute("style", "display: block;")
        inputs.setAttribute("style", "display: none;")
        document.getElementById('main-button').setAttribute("style", "display: block;");
        document.getElementById('generate-button').setAttribute("style", "display: none ;");
        document.getElementById('randomPasswordDisplay').innerHTML = "Length input invalid!";
        return;

    } else if (parseInt(lengthPass) > 128 || parseInt(lengthPass) < 8) {
        document.getElementById('randomPasswordDisplay').setAttribute("style", "display: block;")
        inputs.setAttribute("style", "display: none;")
        document.getElementById('main-button').setAttribute("style", "display: block;");
        document.getElementById('generate-button').setAttribute("style", "display: none ;");
        document.getElementById('randomPasswordDisplay').innerHTML = "Length input invalid!";
        return;
    } else {
        proceed()
    }
};


function proceed() {

    var specialChar = document.getElementById('form-criteria').children[0].children[2];
    var numChar = document.getElementById('form-criteria').children[0].children[4];
    var upperChar = document.getElementById('form-criteria').children[0].children[6];
    var lowerChar = document.getElementById('form-criteria').children[0].children[8];


    //Store the answers in an array for access in for loop

    var answers = [lengthPass, specialChar, numChar, upperChar, lowerChar];

    //Arrays of characters

    var speciaList = ['!', '#', '$', '%', '&', '(', ')', '*', '+', '-', '?', '@', '~'];
    var lowerList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var upperList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    //Store the arrays into another array for for loop index access (can refactor to multidimensional array???)

    var fullCharArrays = [speciaList, numList, upperList, lowerList];


    //Total char concatonates the selected arrays into one array

    var totalChar = [];

    for (var i = 1; i < answers.length; i++) {
        if (answers[i].checked) {
            //-1 to correct zero indexing for fullCharArrays because started i = 1 to exclude lengthPass in answers array
            totalChar = totalChar.concat(fullCharArrays[i - 1]);

        } else {
            continue;
        }
    }


    //randomPassword stores the random generated password as an array of characters

    var randomPassword = [];

    //iterate through the for loop lengthPass(user defined length of password) times, each time selecting a random char from totalChar

    for (var i = 0; i < lengthPass; i++) {
        randomPassword = randomPassword.concat(totalChar[Math.floor(Math.random() * totalChar.length)])
    }


    //finalPassword joins randomPassword into a string

    var finalPassword = randomPassword.join("");

   
    document.getElementById('randomPasswordDisplay').setAttribute("style", "display: block;")
    inputs.setAttribute("style", "display: none;")
    document.getElementById('main-button').setAttribute("style", "display: block;");
    document.getElementById('clipboard').setAttribute("style", "display: block;");
    document.getElementById('generate-button').setAttribute("style", "display: none;");

    document.getElementById("randomPasswordDisplay").innerHTML = finalPassword;




};




///////////////// Need to figure out scoping to set var finalPassword as global so I can reuse in copyToClipboard????  ///////////



function copyToClipboard() {
    document.getElementById("randomPasswordDisplay").removeAttribute("disabled");
    var copyText = document.getElementById("randomPasswordDisplay");

    //example from w3 schools

    copyText.select(); //jQuery?

    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy")

    alert("Copied the password: " + copyText.value);
    document.getElementById("randomPasswordDisplay").setAttribute("disabled", "");
};


