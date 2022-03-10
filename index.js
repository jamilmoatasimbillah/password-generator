let settings = {
    length: 4,
    numbers: true,
    symbols: true,
    lowers: true,
    uppers: true,
}


let availablePasswordLengths = ""
for(let i=8; i<40; i++){
    availablePasswordLengths = `${availablePasswordLengths}<option value="${i}">${i}</option>`
} 

function init(){
    document.getElementById("passwordLength").innerHTML = availablePasswordLengths
    document.getElementById("passwordLength").addEventListener("change", onChange)
    document.getElementById("incSymbols").addEventListener("change", onChange)
    document.getElementById("incNumbers").addEventListener("change", onChange)
    document.getElementById("incLowers").addEventListener("change", onChange)
    document.getElementById("incUppers").addEventListener("change", onChange)
    reset()
}

function onChange(event){
    event.preventDefault()
    const {name, value, type, checked} = event.target
    if(type === "checkbox"){
        settings[name] = checked
    }else{
        settings[name] = value
    }
}

function reset(){
    settings = {
        length: 16,
        numbers: true,
        symbols: true,
        lowers: true,
        uppers: true,
    }
    document.getElementById("passwordLength").value = settings.length
    document.getElementById("incSymbols").checked = settings.symbols
    document.getElementById("incNumbers").checked = settings.numbers
    document.getElementById("incLowers").checked = settings.lowers
    document.getElementById("incUppers").checked = settings.uppers
}

function generatePassword(){
    let allowedOptins = []
    const {length, ...options} = settings
    for(let key in options){
        if(options[key]){
            allowedOptins.push(key)
        }
    }
    if(allowedOptins.length < 1) return alert("Please select at least one option.")
    let output = ""
    let type=""
    let char = ""
    while(output.length<length){
        type = allowedOptins[Math.floor(Math.random()*allowedOptins.length)]

        switch(type){
            case "numbers": {
                char = `${Math.floor(Math.random()*10)}`
                break;
            }
            case "symbols": {
                // 33 - 47 | 58 - 64 | 91 - 96 |  123 - 126
                const series = Math.floor(Math.random() * 4)
                let asciiValue = -1
                switch(series){
                    case 0:{
                        asciiValue = 33 + Math.floor(Math.random() * (47-33) )    
                        break;
                    }
                    case 1:{
                        asciiValue = 58 + Math.floor(Math.random() * (64-58) ) 
                        break;
                    }
                    case 2:{
                        asciiValue = 91 + Math.floor(Math.random() * (96-91) ) 
                        break;
                    }
                    case 3:{
                        asciiValue = 123 + Math.floor(Math.random() * (126-123) )
                        break;
                    }
                }
                char = `${String.fromCharCode(asciiValue)}`
                break;
            }
            case "lowers":{
                char = 97 + Math.floor(Math.random() * (122-97) )
                char = String.fromCharCode(char)
                break;
            }
            case "uppers":{
                char = 65 + Math.floor(Math.random() * (90-65) )
                char = String.fromCharCode(char)
                break;
            }
            default:{

            }
        }
        output = `${output}${char}`
        console.log(output)
    }
    document.getElementById("output").innerText = output
    console.log("================================================")
}


init()
