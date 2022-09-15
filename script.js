const generate = (pass, len) => {
    let password = "";
    for(let i=0; i<len; i++)
    {
        password += pass.charAt(Math.floor(Math.random() * pass.length-1))
    }
    return password;
}

const upper_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower_set = "abcdefghijklmnopqrstuvwxyz";
const number_set = "0123456789";
const symbol_set = "!@#$%^&*()_+/.{}[]?<>|";

// Initial Password
let pass = upper_set + lower_set + number_set + symbol_set;
let passarea = document.getElementById("passarea");
let value = 14;
passarea.innerText = generate(pass, value);

// Checkbox
let cb1 = document.getElementById("Uppercase");
let cb2 = document.getElementById("Lowercase");
let cb3 = document.getElementById("Numbers");
let cb4 = document.getElementById("Symbols");


// Password Will Change With Slider
let slider = document.getElementById("custom-slider").addEventListener("input", function(event) {
    value = event.target.value;
    pass = upper_set + lower_set + number_set + symbol_set;
    if(!cb1.checked)
    {
        pass = lower_set + number_set + symbol_set;
    }
    if(!cb2.checked)
    {
        pass = upper_set + number_set + symbol_set;
    }
    if(!cb3.checked)
    {
        pass = upper_set + lower_set + symbol_set;
    }
    if(!cb4.checked)
    {
        pass = upper_set + lower_set + number_set;
    }
    console.log("cb1", cb1.checked);
    console.log("cb2", cb2.checked);
    console.log("cb3", cb3.checked);
    console.log("cb4", cb4.checked);

    document.getElementById("pass-len").innerHTML = value;
    passarea.innerText = generate(pass, value);
    if(window.innerWidth < 460 && value > 32)
    {
        // alert('Reach')
        passarea.style.fontSize = '0.6em'
    }
})


// Password will change with Refresh Icon
let refresh = document.getElementsByClassName("fa-arrows-rotate")[0]
refresh.addEventListener("click", () => {
    passarea.innerText = generate(pass, value);
})


// Getting Password From Clipboard
let copy = document.getElementsByClassName("fa-copy")[0]
copy.addEventListener("click", () => {
    let password = passarea.innerHTML
    navigator.clipboard.writeText(password);


    let tooltext = document.getElementsByClassName('icon-copy')[0]
    tooltext.setAttribute('data', 'Copied!')
    tooltext.style.setProperty('--width', '45px')
    setTimeout(() => {
        tooltext.setAttribute('data', 'Copy Password')
        tooltext.style.setProperty('--width', '90px')
    }, 3000)
})
