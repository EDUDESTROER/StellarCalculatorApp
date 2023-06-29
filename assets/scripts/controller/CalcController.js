class CalcController {

    constructor(){

        this._audio = new Audio('assets/sound/click.wav');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._locale = navigator.language;
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#date");
        this._hourEl = document.querySelector("#hour");
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

        if(!lastItem){

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;

    }

    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;
    
        this.displayCalc = lastNumber;

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

    getResult(){
        let r =''
        try{
            r = eval(this._operation.join(""));
            console.log(r);

            r = r.toFixed(2); //Stop here...

            return r;
        }catch(e){
            setTimeout(()=>{

                this.clearALL();
                this.setError();

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

        }else if(this._operation.length == 3){

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

    }

    addOperation(value){

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)){

                this.setLastOperation(value);

            }else {

                this.pushOperation(value);
                this.setLastNumberToDisplay();

            }

        }else {

            if(this.isOperator(value)){

                this.pushOperation(value);

            }else{

                let newValue = this.getLastOperation().toString() + value.toString();
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

            console.log();

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

    InitAudio(){

        this.toggleAudio();

    }

    playAudio(){

        if (this._audioOnOff){

            this._audio.currentTime = 0;
            this._audio.play();

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
                console.log("NO FUNCTIONS IN BUTTON: ", value);
                break;
            case 'converter':
                console.log("NO FUNCTIONS IN BUTTON: ", value);
                break;
            case 'backspace':
                console.log("NO FUNCTIONS IN BUTTON: ", value);
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
                this.addChangeSignal();
                break;
            case 'dot':
                this.addDot();
                break;
            case 'equal':
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
    
    set displayCalc(value){

        this._displayCalcEl.value = value;

    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

}