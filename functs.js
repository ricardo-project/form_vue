function showAud(name) {
    new Audio(name + ".mp3").play()
}
function newArr(array) {
    let vetor = []
    array.forEach(elem => {
        vetor.push(elem)
    }); return vetor
}
function newMens(newcond, mens, txtFont) {
    let newdiv = document.createElement("div")
    newdiv.className = "mensCanto"
    if(newcond == true) {
        newdiv.className += " right"
        newdiv.innerHTML = "<img src='right.png'>"
    } else if(newcond == false) {
        newdiv.className += " wrong"
        newdiv.innerHTML = "<img src='wrong.png'>"
    } newdiv.innerHTML += "<p style='font-size: " + txtFont + "px'>" + mens + "</p>"
    document.body.insertBefore(newdiv, document.querySelector(".mensExcl"))
    setTimeout(function() {
        newdiv.style.bottom = "10px"
        setTimeout(function() {
            newdiv.style.bottom = "-132px"
            setTimeout(function() {
                document.body.removeChild(newdiv)
            }, 400)
        }, 3400)
    }, 50)
}
function newNatural(valor, max) {
    let newvalor = ""
    let verifCrct = (crct) => {
        if(crct == "0" && newvalor !== "0") {
            newvalor = "0"
        } else {
            let crctFloat = parseFloat(crct)
            if(!isNaN(crctFloat)) {
                if(crctFloat <= max) {
                    newvalor = crct
                    verifCrct = (crct2) =>  {
                        if(!isNaN(parseFloat(crct2))) {
                            if(parseFloat(newvalor + crct2) > max) {
                                return true
                            } newvalor += crct2
                        }
                    }
                } else {
                    return true
                }
            }
        }
    }; for(let i = 0; i < valor.length; i++) {
        if(verifCrct(valor.charAt(i))) {
            break
        }
    } return newvalor
}
function redimensForm() {
    let W = window.innerWidth
    if(W > 1320) {
        if(condForm !== false) {
            condForm = false
            $("#formR").css("margin-left", "0%")
            $(".marcador").css("margin-top", "-200px")
            $(".form").css("width", "50%")
        }
    } else {
        if(condForm !== true) {
            condForm = true
            if(condMarc == 0) {
                $("#formR").css("margin-left", "0%")
            } else {
                $("#formR").css("margin-left", "-100%")
            } $(".marcador").css("margin-top", "0px")
            $(".form").css("width", "100%")
        }
    }
}
function comprMarc(add) {
    numMarc += add
    marc.css("width", (60 + 100*Math.pow(4, numMarc/8 - 1)) + "px")
}
function moveMarc(ind) {
    $("#formR").css("margin-left", (ind - 1)*100 + "%")
    condMarc = 1 - ind
    notMarc = false
    setMarc = setInterval(function() {
        comprMarc(1)
        if(numMarc == 8) {
            if(ind == 0) {
                marc.css("left", "auto")
                marc.css("right", "6px")
            } else {
                marc.css("left", "6px")
                marc.css("right", "auto")
            } clearInterval(setMarc)
            setMarc = setInterval(function() {
                comprMarc(-1)
                if(numMarc == -24) {
                    notMarc = true
                    clearInterval(setMarc)
                }
            }, 10)
        }
    }, 10)
}