const passString = () => {
    // Checkbox
    let up = document.getElementById("Uppercase");
    let lo = document.getElementById("Lowercase");
    let num = document.getElementById("Numbers");
    let sym = document.getElementById("Symbols");

    const upper_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower_set = "abcdefghijklmnopqrstuvwxyz";
    const number_set = "0123456789";
    const symbol_set = "!@#$%^&*()_+/.{}[]?<>|";

    let pass = upper_set + lower_set + number_set + symbol_set;
    if(!up.checked && !lo.checked && !num.checked && !sym.checked)
    { 
        alert("Please select atleast one")
        up.checked = true;
        lo.checked = true;
        num.checked = true;
        sym.checked = true;
    }
    else if(!up.checked && !lo.checked && num.checked && sym.checked)
    {
        // alert("Reach 1")
        pass = number_set + symbol_set;
    }
    else if(!up.checked && !num.checked && sym.checked && lo.checked)
    {
        // alert("Reach 2")
        pass = lower_set + symbol_set;
    }
    else if(!lo.checked && !num.checked && up.checked && sym.checked)
    {
        // alert("Reach 3")
        pass = upper_set + symbol_set;
    }
    else if(!num.checked && !sym.checked)
    {
       alert("Weak Password Combination...Consider adding Numbers and Symbols")
    }
    else if(!num.checked && !sym.checked && !up.checked)
    {
       alert("Weak Password Combination...Consider adding Uppercase characters, Numbers and Symbols")
    }
    else if(!num.checked && !sym.checked && !lo.checked)
    {
       alert("Weak Password Combination...Consider adding Lowercase characters, Numbers and Symbols")
    }
    else if(!up.checked && !lo.checked && !num.checked)
    {
       alert("Weak Password Combination...Consider adding Lowercase characters, Uppercase characters, and Numbers")
    }
    else if(!up.checked && !lo.checked && !sym.checked)
    {
       alert("Weak Password Combination...Consider adding Lowercase characters, Uppercase characters, and Symbols")
    }
    else if(!up.checked)
    {
        pass = lower_set + number_set + symbol_set;
    }
    else if(!lo.checked)
    {
        pass = upper_set + number_set + symbol_set;
    }
    else if(!num.checked)
    {
        pass = upper_set + lower_set + symbol_set;
    }
    else if(!sym.checked)
    {
        pass = upper_set + lower_set + number_set;
    }
    // console.log(pass)
    return pass
    
}

const generate = (len) => {
    let pass = passString();
    let password = "";
    for(let i=0; i<len; i++)
    {
        password += pass.charAt(Math.floor(Math.random() * pass.length-1))
    }
    return password;
}

const changePassareaColor = (value) => {
    if(value < 12 && value >= 8)
    {
        document.getElementById("strength").src = "./Images/danger.png"
        document.getElementById("pass-type").innerHTML = "Weak Password"
        passarea.style.backgroundColor = '#F26E00';
    }
    else if(value < 8)
    {
        document.getElementById("pass-type").innerHTML = "Very Weak Password"
        passarea.style.backgroundColor = '#BB0404';
    }
    else
    {
        document.getElementById("strength").src = "./Images/verified.png"
        document.getElementById("pass-type").innerHTML = "Strong Password"
        passarea.style.backgroundColor = '#0D830D';
    }
}

const fixFontSize = (val) => {
    if(window.innerWidth > 600)
    {
        passarea.style.fontSize = "1em";
    }
    if(window.innerWidth < 460 && val <= 24)
    {
        passarea.style.fontSize = "1em";
    }
    else if(window.innerWidth < 460 && val > 24 && val <= 28)
    {
        passarea.style.fontSize = "0.75em";
    }
    else if(window.innerWidth < 460 && val > 28 && val <= 36)
    {
        passarea.style.fontSize = "0.6em";
    }
    else if(window.innerWidth < 460 && val > 36)
    {
        passarea.style.fontSize = "0.5em";
    }
    else if(window.innerWidth > 460 && window.innerWidth < 655 && val <= 28)
    {
        passarea.style.fontSize = "1em";
    }
    else if(window.innerWidth > 460 && window.innerWidth < 655 && val > 32 && val <= 40)
    {
        passarea.style.fontSize = "0.75em";
    }
    else if(window.innerWidth > 460 && window.innerWidth < 655 && val > 40)
    {
        passarea.style.fontSize = "0.65em";
    }
}

// Initial Password
let passarea = document.getElementById("passarea");
let value = 14;
passarea.innerText = generate(value);

// Font Size Changes whenever window resizes
window.addEventListener("resize", () => {
    let new_val = value
    fixFontSize(new_val)  
})
    

// Password Will Change With Slider
let slider = document.getElementById("custom-slider").addEventListener("input", function(event) {
    value = event.target.value;
    changePassareaColor(value);
    document.getElementById("pass-len").innerHTML = value;
    passarea.innerText = generate(value);
    fixFontSize(value);
})


// Password will change with Refresh Icon
let refresh = document.getElementsByClassName("fa-arrows-rotate")[0]
refresh.addEventListener("click", () => {
    passarea.innerText = generate(value);
    // alert(window.innerWidth)
})


// Getting Password From Clipboard
let copy = document.getElementsByClassName("fa-copy")[0]
copy.addEventListener("click", () => {
    let password = passarea.innerHTML
    navigator.clipboard.writeText(password);
    // password.setSelectionRange(0, 99999);
    let tooltext = document.getElementsByClassName('icon-copy')[0]
    tooltext.setAttribute('data', 'Copied!')
    tooltext.style.setProperty('--width', '45px')
    setTimeout(() => {
        tooltext.setAttribute('data', 'Copy Password')
        tooltext.style.setProperty('--width', '90px')
    }, 1000)
})
