class CalcController {

    constructor(){

        this._audio = new Audio('assets/sound/click.wav');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';
        this._maxNumberLast = '';
        this._operation = [];
        this._allOperation = [];
        this._allResults = [];
        this._locale = navigator.language;
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#date");
        this._hourEl = document.querySelector("#hour");
        this._historyEl = document.querySelector(".wrapper-history");
        this._historyList = document.querySelector(".history-list");
        this._historyId = 0;
        this._resultId = 0;
        this._currentDate;
        this.initialize();
        this.initButtonsevents();
        this.initKeyboard();
    }

    copyToClipboard(){

        let input = this.displayCalc;

        input.select();

        document.execCommand("Copy"); // Problema, comando desatualizado!

    }

    pasteFromClipboard(){

        document.addEventListener('paste', e=>{//não insere o valor!

            let text = e.clipboardData.getData('Text');

            this.displayCalc = parseFloat(text);

        })

    }

    initialize(){

        this.setDisplayDateTime();

       setInterval(()=>{

        this.setDisplayDateTime();

       }, 1000);

       this.setLastNumberToDisplay();
       this.pasteFromClipboard();

    }

    addEventListenerALL(element, events, fn){

        events.split(' ').forEach(action=>{
            element.addEventListener(action, fn);
        });

    }

    clearALL(){

        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();

    }

    clearEntry(){

        this._operation.pop();

        this.setLastNumberToDisplay();

    }
    clearHistoryF(){

        this._allOperation = [];
        this._allResults = [];
        this._historyId = 0;
        this._resultId = 0;

        while(this._historyList.firstChild){
            this._historyList.removeChild(this._historyList.firstChild);

        }
        console.log(this._allResults);
        console.log(this._allOperation);

    }

    getLastOperation(){
        
         return this._operation[this._operation.length-1];

    }

    setError(){

        this.displayCalc = "ERROR!";

    }
    setLastOperation(value){

        this._operation[this._operation.length-1] = value;

    }

    getLastItem(isOperator = true){

        let lastItem;

        for (let i = this._operation.length-1; i >=0; i--){

            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }

        }

        if(!lastItem && lastItem != 0){

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }
        return lastItem;

    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        if (!lastNumber || lastNumber == 0) lastNumber = 0;
    
        this.displayCalc = lastNumber;

        if(this._operation.length == 2){

            this.displayCalc = 0;

        }

    }

    showHistory(){

        if (this._historyEl.style.display ==  "none" || !this._historyEl.style.display){

            this._historyEl.style.display = "flex";

        }else if (this._historyEl.style.display ==  "flex"){

            this._historyEl.style.display = "none";

        }

    }

    isOperator(value){
        
        return (['%', '*','-','+','/'].indexOf(value) > -1);

    }

    pushOperation(value){

        this._operation.push(value);

        if(this._operation.length > 3){

            this.calc();

        }

    }
    keepResult(result){

        this._allResults.push(result)
        console.log(this._allResults)
        let newSpan = document.createElement("span");
        let newContent = document.createTextNode(`= ${this._allResults[this._resultId]}`);
        newSpan.appendChild(newContent)
        newSpan.id = `r${this._resultId}`;
        newSpan.className = 'history-result';
        this._historyList.appendChild(newSpan);
        this._resultId = this._resultId + 1;

    }

    getResult(){
        let result =''
        try{
            result = eval(this._operation.join(""));
            if(Number.isInteger(result)){
                this.keepResult(result)
                return result;
            }else if (result <= 0.01){
                this.keepResult(result)
                return result;

            }else{
                result = result.toFixed(2);
                this.keepResult(result)
                return result;
            }
            
        }catch(e){
            setTimeout(()=>{

                this.clearALL();
                this.setError();
                this.clearHistoryF();

            }, 1);
        }

    }

    calc(){

        let last = "";

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3){

            let fristItem = this._operation[0].toString();
            this._operation = [fristItem, this._lastOperator,this._lastNumber];

        }
        if(this._operation.length > 3){
            last = this._operation.pop();
            this._lastNumber = this.getResult();

        }
        if(this._operation.length == 3){

            this._allOperation.push(this._operation);
            console.log(this._allOperation);
            let newSpan = document.createElement("span");
            let newContent = document.createTextNode(this._allOperation[this._historyId]);
            newSpan.appendChild(newContent)
            newSpan.textContent = newSpan.textContent.replaceAll(',', ' ')
            newSpan.id = `c${this._historyId}`;
            newSpan.className = 'history-calc';
            this._historyList.appendChild(newSpan);
            this._historyId = this._historyId + 1;
            console.log(this._historyId)
            

            this._lastNumber = this.getLastItem(false);


        }

        let result = this.getResult();

        if (last == "%"){

            result /= 100;

            this._operation = [result];

        }else{

            this._operation = [result];

            if(last) this._operation.push(last);

        }

        this.setLastNumberToDisplay();
        this.initHistoryDivEvents();

    }

    addOperation(value){

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)){
                
                this.setLastOperation(value);

            }else {

                if(value != 0){
                    this.pushOperation(value);
                }
                this.setLastNumberToDisplay();

            }

        }else {

            if(this.isOperator(value)){

                this.pushOperation(value);

            }else{

                let newValue = this.getLastOperation().toString() + value.toString();
                if(newValue == 0){

                    newValue = ""

                }
                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();

            }

        }

    }

    addDot(){

        let lastOperation = this.getLastOperation();

        if ( lastOperation.toString().split('').indexOf('.') > -1) return;
        
        if(this.isOperator(lastOperation) || !lastOperation && lastOperation != 0){ 

            this.pushOperation('0.');

        }else{

            this.setLastOperation(lastOperation.toString() + '.');

        }

        this.setLastNumberToDisplay();

    }

    initKeyboard(){

        document.addEventListener('keyup', e=>{

            this.playAudio();

            switch (e.key){
                case 'Backspace':
                    this.clearEntry();
                    break;
                case 'Escape':
                    this.clearALL();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                    break;
                case 'change-signal':
                    this.addChangeSignal();
                    break;
                case '.':
                case ',':
                    this.addDot();
                    break;
                case 'Enter':
                case '=':
                    this.calc();
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(e.key));
                    break;
                case'c':
                    if (e.ctrlKey) this.copyToclipboard();
                    break;
                
            }

        });

    }

    initHistoryDivEvents(){

        let divR = document.querySelectorAll('.history-result');
        let divC = document.querySelectorAll('.history-calc');

        console.log(divR);
        console.log(divC);

        divR.forEach((div, index)=>{

            div.addEventListener('click', e=>{

                console.dir(div);
                this.clearALL();
                let newDiv = div.textContent.replace("= ", "")
                this.pushOperation(newDiv)

                this.setLastNumberToDisplay();
            })

        })

        divC.forEach((div, index)=>{

            div.addEventListener('click', e=>{

                console.dir(div);
                this.clearALL();
                this.pushOperation(div.textContent)
                this.calc();

                this.setLastNumberToDisplay();
            })

        })

    }

    InitAudio(){

        this.toggleAudio();

    }

    playAudio(){

        if (this._audioOnOff){

            this._audio.currentTime = 0;
            this._audio.play();

        }

    }
    changeSignal(){

        let value;
        
        if(this._operation.length < 1){
            if(!this._operation[0] == true){
                this._operation[0] = 0;
            }
            value = this._operation[0] * -1;
            console.log(value);
            this.pushOperation(value);
            let a = this._operation.pop();
            this.setLastNumberToDisplay();
        }else if(this._operation.length > 1){
            if(this._operation[1] == "+"){

                value = this._operation[1] = "-";
                this._operation.splice(1, 1, value);

            }else if(this._operation[1] == "-"){

                value = this._operation[1] = "+";
                this._operation.splice(1, 1, value);
            }
        }

    }
    eraseDigit(){

        if(this._operation.length <= 0){


            this.setLastNumberToDisplay();
            return;
        }else if(this._operation.length == 1){

            let number = this._operation[0];
            number = number.toString();
            number = number.substring(0, number.length - 1);

            this._operation.pop();
            this.pushOperation(number);

            this.setLastNumberToDisplay();
            //console.log(number);

        }else if(this._operation.length == 3){

            let number = this._operation[2];
            number = number.toString();
            number = number.substring(0, number.length - 1);

            this._operation.pop();

            if (number != ''){

                this.pushOperation(number);

            }
            this.setLastNumberToDisplay();
           //console.log(number);

        }
    }

    toggleAudio(){

        if(this._audioOnOff){
            
            this._audioOnOff = false;
            document.querySelector('#btn-sond > img').src = "assets/img/no_sound.png";

        }else{

            this._audioOnOff = true;
            document.querySelector('#btn-sond > img').src = "assets/img/sound.png";

        }

    }

    execBtn(value){

        this.playAudio();

        switch (value){
            case 'sond':
                this.InitAudio();
                break;
            case 'history':
                this.showHistory();
                break;
            case 'converter':
                console.log("NO FUNCTIONS IN BUTTON: ", value);
                break;
            case 'backspace':
                this.eraseDigit();
                break;
            case 'percent':
                this.addOperation('%');
                break;
            case 'division':
                this.addOperation('/');
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'c':
                this.clearALL();
                break;
            case 'multiplication':
                this.addOperation('*');
                break;
            case 'subtraction':
                this.addOperation('-');
                break;
            case 'sum':
                this.addOperation('+');
                break;
            case 'change-signal':
                this.changeSignal();
                break;
            case 'dot':
                this.addDot();
                break;
            case 'equal':
                this.calc();
                break;
            case 'clearHistory':
                this.clearHistoryF();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            
            default:
                this.setError();  
                break;
            
        }

    }

    initButtonsevents(){

        let buttons = document.querySelectorAll('button');
        buttons.forEach((btn, index)=>{
            
            this.addEventListenerALL(btn,'click drag', e=>{

                let textBtn = btn.id.replace("btn-", "");

                this.execBtn(textBtn);
    
            });
        });

    }

    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayHour = this.currentDate.toLocaleTimeString(this._locale,{
            hour: "2-digit",
            minute: "2-digit"
        });

    }

    get displayHour(){
        return this._hourEl.innerHTML;
    }

    set displayHour(value){
        return this._hourEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        return this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl;
    }
    
    set displayCalc(value){ //Error here
        value = value.toString();
        if(value.length <= 13){
            this._displayCalcEl.style.fontSize = "5em";
        }
        if(value.length > 13){
            this._displayCalcEl.style.fontSize = "3.5em";
        }
        if(value.length <= 15){
            this._maxNumberLast = value;
        }
        if(value.length > 15){
            if(this._operation[0] > 0.1){
                console.log(this._operation[0]);
                alert("You cannot enter more than 15 characters!");
                this._operation = [this._maxNumberLast];
                return false;
            }
        }
        
        this._displayCalcEl.value = value;

    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }
    get operation(){
        return this._operation;
    }

    set operation(value){
        this._operation = value;
    }

}