$(document).ready(function() {
    /*ALGUMAS FUNÇÕES IMPORTANTES!!!*/
    function showAud(name) { //---> Mostrar áudio
        new Audio(name + ".mp3").play()
    }
    function newArr(array) { //---> Novo vetor baseado em vetor já existente
        let vetor = []
        array.forEach(elem => {
            vetor.push(elem)
        }); return vetor
    }
    function newMens(newcond, mens, txtFont) { //---> Mensagem (positiva ou negativa) que aparece no canto inferior esquerdo
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
    function newNatural(valor, max) { //---> Função que retorna o número natural de um campo de texto (função criada por mim!!!)
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
    let functExcl = () => {}
    $("#exclImg").on("click", () => {
        functExcl()
    }); $("#notExclImg").on("click", () => {
        $(".mensExcl").css("width", "0%")
    })

    /*DADOS DO FORMULÁRIO*/
    let dados = {
        /*Rounds*/
        editR: null,
        idR: JSON.parse(localStorage.getItem("idRounds")),
        idRNotAdd: JSON.parse(localStorage.getItem("idRoundsNotAdd")), //---> Ids de rounds adicionados em nenhuma partida!
        allR: JSON.parse(localStorage.getItem("rounds")),
        newR: ['', '', '', '', '', '', '', []],
        erroR: [false, false, false, false, false, false, false, false],
        /*Partidas*/
        editP: null,
        idP: JSON.parse(localStorage.getItem("idPartidas")),
        allP: JSON.parse(localStorage.getItem("partidas")),
        newP: ['', '', [], ''],
        erroP: [false, false, false, false],
        /*Outros*/
        pessoas: [{ id: 1, nome: 'foxy_lady' }, { id: 2, nome: '1nv1s1bl&man' }, { id: 4, nome: 'rixarlisson' }, { id: 5, nome: 'jhonny8591' }, { id: 7, nome: 'the_t@xm@n666' }],
        objetivos: [{id: 0, objetivo: 'Atacar os inimigos'}, {id: 2, objetivo: 'Invadir a base militar'}, {id: 3, objetivo: 'Pegar as armas dos inimigos'}]
    }; if(dados.idR == null) {
        dados.idR = []
    } if(dados.allR == null) {
        dados.allR = []
    } if(dados.idP == null) {
        dados.idP = []
    } if(dados.allP == null) {
        dados.allP = []
    } if(dados.idRNotAdd == null) {
        dados.idRNotAdd = []
    }
    
    /*CLASSE VUE PARA FORMULÁRIO*/
    new Vue({ 
        el: '#app', 
        data: dados,
        methods: {
            /*FUNÇÕES DIVERSAS!!!*/
            showPerson(id) {
                let namePerson
                $.each(this.pessoas, (index, elem) => {
                    if(elem.id == id) {
                        namePerson = elem.nome
                        return false
                    }
                }); return namePerson
            },
            showObj(id) {
                let obj
                $.each(this.objetivos, (index, elem) => {
                    if(elem.id == id) {
                        obj = elem.objetivo
                        return false
                    }
                });
                return obj
            },
            updateClass(classe, form) {
                $("#" + form + " .form-group").each((index, elem) => {
                    $(elem).find(".pErro").hide()
                    $(elem).attr("class", "form-group" + classe)
                }); showAud("Huawei 2")
            },
            updateStorage() {
                localStorage.setItem("rounds", JSON.stringify(this.allR))
                localStorage.setItem("idRounds", JSON.stringify(this.idR))
                localStorage.setItem("idRoundsNotAdd", JSON.stringify(this.idRNotAdd))
                localStorage.setItem("partidas", JSON.stringify(this.allP))
                localStorage.setItem("idPartidas", JSON.stringify(this.idP))
            },

            /*ROUNDS*/
            editOrAddRound() {
                if(this.editR == null) {
                    this.allR.push(newArr(this.newR))
                    if(this.idR.length == 0) {
                        this.idR = [0]
                        this.idRNotAdd = [0]
                    } else {
                        let newid = this.idR[this.idR.length - 1] + 1
                        this.idR.push(newid)
                        this.idRNotAdd.push(newid)
                    } this.clearRound()
                    newMens(true, "Round adicionado!", 40)
                } else {
                    $.each(this.idR, (ind, elem) => {
                        if(elem == this.editR) {
                            this.allR[ind] = newArr(this.newR)
                            return false
                        }
                    }); this.cancelEditRound()
                    newMens(true, "Round atualizado!", 40)
                } this.updateStorage()
            },
            cancelEditRound() {
                $("#round").html("Adicionar round")
                $("#cancelRound").hide()
                this.editR = null
                this.clearRound()
            },
            clearRound() {
                $("#round").hide()
                $("#cancelRound").hide()
                this.erroR = [false, false, false, false, false, false, false, false]
                this.newR = ['', '', '', '', '', '', '', []]
                this.updateClass('', 'formR')
            },
            editRound(ind) {
                $.each(this.idR, (index, elem) => {
                    if(elem == ind) {
                        this.erroR = [true, true, true, true, true, true, true, true]
                        this.newR = newArr(this.allR[index])
                        this.editR = elem
                        this.updateClass(' has-success', 'formR')
                        $("#round").html("Editar round")
                        $("#round").show()
                        $("#cancelRound").show()
                        return false
                    }
                })
            },
            exclRound(ind) {
                if(this.editP !== null || this.editR !== null) {
                    newMens(false, "Nenhum round será excluído se algum elemento estiver sendo editado!", 25)
                } else {
                    $.each(this.idR, (index, elem) => {
                        if(elem == ind) {
                            $(".mensR").show()
                            $(".mensExcl").css("width", "100%")
                            functExcl = function() {
                                this.allR.splice(index, 1)
                                this.idR.splice(index, 1)
                                /*Deletando o round da lista de rounds não adicionados (se houver!)*/
                                $.each(this.idRNotAdd, (ind2, elem2) => {
                                    if(elem2 == elem) {
                                        this.idRNotAdd.splice(ind2, 1)
                                        return false
                                    }
                                }); if(this.newP[2].length == 1 && this.newP[2][0] == elem) {
                                    this.newP[2] = []
                                    this.erroP[2] = false
                                    $("#eSlct").show()
                                    $("#groupR").attr("class", "form-group has-error")
                                } /*Deletando partidas que tiverem esse round como único elemento*/
                                $.each(this.allP, (ind2, elem2) => {
                                    let ind = elem2[2].indexOf(elem)
                                    if(ind >= 0) {
                                        elem2[2].splice(ind, 1)
                                        if(elem2[2].length == 0) {
                                            this.allP.splice(ind2, 1)
                                            this.idP.splice(ind2, 1)
                                        } return false
                                    }
                                });
                                this.updateStorage()
                                $(".mensExcl").css("width", "0%")
                                showAud("Huawei 2")
                            }.bind(this)
                            return false
                        }
                    })
                }
            },

            /*PARTIDAS*/
            editOrAddPartida() {
                if(this.editP == null) {
                    this.allP.push(newArr(this.newP))
                    this.removeRoundAdd()
                    if(this.idP.length == 0) {
                        this.idP = [0]
                    } else {
                        this.idP.push(this.idP[this.idP.length - 1] + 1)
                    } this.clearPartida()
                    newMens(true, "Partida adicionada!", 40)
                } else {
                    $.each(this.idP, (ind, elem) => {
                        if(elem == this.editP) {
                            this.allP[ind] = newArr(this.newP)
                            this.removeRoundAdd()
                            return false
                        }
                    }); this.cancelEditPartida(false)
                    newMens(true, "Partida atualizada!", 40)
                } this.updateStorage()
            },
            removeRoundAdd() {
                const round = this.newP[2]
                $.each(round, (ind, elem) => {
                    $.each(this.idRNotAdd, (ind2, elem2) => {
                        if(elem == elem2) {
                            this.idRNotAdd.splice(ind2, 1)
                            return false
                        }
                    })
                });
            },
            cancelEditPartida(cond) {
                if(cond) {
                    $.each(this.idP, (index, elem) => {
                        if(elem == this.editP) {
                            $.each(this.allP[index][2], (ind2, elem2) => {
                                this.idRNotAdd.splice(this.idRNotAdd.indexOf(elem2), 1)
                            });
                        }
                    });
                } $("#partida").html("Adicionar partida")
                $("#cancelPartida").hide()
                this.editP = null
                this.clearPartida()
            },
            clearPartida() {
                $("#partida").hide()
                this.erroP = [false, false, false, false]
                this.newP = ['', '', [], '']
                this.updateClass('', 'formP')
            },
            editPartida(ind) {
                $.each(this.idP, (index, elem) => {
                    if(elem == ind) {
                        this.idRNotAdd = this.idRNotAdd.concat(this.allP[index][2]).sort(function(a, b) { return a - b })
                        this.erroP = [true, true, true, true]
                        this.newP = newArr(this.allP[index])
                        this.editP = elem
                        this.updateClass(' has-success', 'formP')
                        $("#partida").html("Editar partida")
                        $("#partida").show()
                        $("#cancelPartida").show()
                        return false
                    }
                })
            },
            exclPartida(ind) {
                if(this.editP !== null || this.editR !== null) {
                    newMens(false, "Nenhum round será excluído se outro estiver sendo editado!", 25)
                } else {
                    $.each(this.idP, (index, elem) => {
                    if(elem == ind) {
                            $(".mensR").hide()
                            $(".mensExcl").css("width", "100%")
                            functExcl = function() {
                                this.idRNotAdd = this.idRNotAdd.concat(newArr(this.allP[index][2])).sort(function(a, b) { return a - b })
                                this.allP.splice(index, 1)
                                this.idP.splice(index, 1)
                                this.updateStorage()
                                $(".mensExcl").css("width", "0%")
                                showAud("Huawei 2")
                            }.bind(this)
                            return false
                        }
                    })
                }
            }
        }
    });

    let condForm = null
    let condMarc = 0
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
    } redimensForm()
    $(window).on("resize", redimensForm)
    setTimeout(function() {
        /*MOSTRAR BARRA ABAIXO DO TÍTULO QUANDO CARREGA A PÁGINA*/
        $(".divid").attr("class", "divid newdivid")
        $(".artcSeta > img").on("click", function() {
            $("header").css("height", "0%")
            $("main").css("height", "100%")
        });

        /*FUNÇÃO DO MARCADOR DOS FORMULÁRIOS (SE O COMPRIMENTO DO BROWSER FOR PEQUENO, SÓ APARECE UM FORMULÁRIO E UM MARCADOR PARA PASSAR DE UM PARA OUTRO!!!)*/
        let marc = $(".marcador > div")
        let numMarc = -24
        let setMarc
        let notMarc = true
        function comprMarc(add) {
            numMarc += add
            marc.css("width", (60 + 100*Math.pow(4, numMarc/8 - 1)) + "px")
        } function moveMarc(ind) {
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
        } marc.on("click", () => {
            if(notMarc) {
                moveMarc(condMarc)
            }
        });

        /*ADICIONANDO FUNÇÕES DE VERIFICAÇÃO DE VALORES NOS CAMPOS DE TEXTO!!!*/
        let allE = [() => {
            return dados.erroR
        }, () => {
            return dados.erroP
        }]; let allA = [() => {
            return dados.newR
        }, () => {
            return dados.newP
        }]; let names = ["round", "partida"]
        
        $(".form").each(function(i, e) {
            $(e).find(".form-group").each(function(index, elem) { //---> Passando por todos os campos de entrada!!!
                let campo = $(elem).find(".entrada")
                let erro = $(elem).find(".pErro")
                let openError = () => { //---> Mostrar mensagem de erro abaixo do campo de entrada
                    allE[i]()[index] = false
                    erro.show()
                    $(elem).removeClass("has-success")
                    $(elem).addClass("has-error")
                    $("#" + names[i]).hide()
                };
                let closeError = () => { //---> Fechar a mensagem de erro acima
                    allE[i]()[index] = true
                    erro.hide()
                    $(elem).removeClass("has-error")
                    $(elem).addClass("has-success")
                    for(let r = 0; r < allE[i]().length; r++) {
                        if(!allE[i]()[r]) {
                            return
                        }
                    } $("#" + names[i]).show()
                };
                let functLimpar = () => {
                    allA[i]()[index] = ''
                };
                let tipo = campo.get()[0].type

                if(tipo == "number") { //---> Número
                    campo.on("input", function() {
                        let newvalor = newNatural(this.value, this.max)
                        if(newvalor == "") {
                            openError()
                        } else {
                            closeError()
                        } campo.val(newvalor)
                        allA[i]()[index] = newvalor
                    })
                } else if(tipo == "date") { //---> Data
                    let functDate
                    if(index == 0) {
                        functDate = (data, valor) => {
                            if(data > new Date(allA[i]()[1]).getTime()) {
                                campo.val(allA[i]()[1])
                                $(e).find(".entrada")[1].value = valor
                                $(e).find(".entrada")[1].focus()
                                allA[i]()[0] = allA[i]()[1]
                                allA[i]()[1] = valor
                            }
                        }
                    } else if(index == 1) {
                        functDate = (data, valor) => {
                            if(data < new Date(allA[i]()[0]).getTime()) {
                                campo.val(allA[i]()[0])
                                $(e).find(".entrada")[0].value = valor
                                $(e).find(".entrada")[0].focus()
                                allA[i]()[1] = allA[i]()[0]
                                allA[i]()[0] = valor
                            }
                        }
                    } campo.on("input", function() {
                        if(this.value == "") {
                            erro.text("O campo é obrigatório, mas está vazio!")
                            openError()
                        } else {
                            let data = new Date(this.value).getTime()
                            if(data >= new Date("2012-08-21").getTime()) {
                                if(allE[i]()[1 - index]) {
                                    functDate(data, this.value)
                                } closeError()
                            } else {
                                erro.text("A data inserida aconteceu antes do lançamento do jogo!")
                                openError()
                            }
                        } allA[i]()[index] = this.value
                    })
                } else { //---> Seleção de itens
                    campo.on("input", function() {
                        closeError()
                        allA[i]()[index] = campo.val()
                    }); if(campo.get()[0].multiple) {
                        functLimpar = () => {
                            allA[i]()[index] = []
                        }
                    }
                }
                /*Função que limpa o campo (adicionada na imagem de limpeza!!)*/
                $(elem).find(".limpar").on("click", () => {
                    campo.val("")
                    campo.focus()
                    functLimpar()
                    openError()
                    showAud("Huawei 2")
                });
            })
        })
    }, 300)
})