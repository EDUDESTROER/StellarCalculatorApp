class CalcController {

    constructor(){

        this._operation = [];
        this._locale = navigator.language;
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#date");
        this._hourEl = document.querySelector("#hour");
        this._currentDate;
        this.initialize();
        this.initButtonsevents();

    }

    initialize(){

        this.setDisplayDateTime();

       setInterval(()=>{

        this.setDisplayDateTime();

       }, 1000);

    }

    addEventListenerALL(element, events, fn){

        events.split(' ').forEach(action=>{
            element.addEventListener(action, fn);
        });

    }

    clearALL(){

        this._operation = [];

    }

    clearEntry(){

        this._operation.pop();

    }

    getLastOperation(){

         return this._operation[this._operation.length-1];

    }

    setError(){

        this.displayCalc.value = "ERROR!"

    }
    setLastOperation(value){

        this._operation[this._operation.length-1] = value;

    }

    setLastNumberToDisplay(){

        

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

    calc(){

        let last = this._operation.pop();

        let result = eval(this._operation.join(""));

        this._operation = [result, last];

    }

    addOperation(value){

        console.log('Coisa ',value, isNaN(this.getLastOperation()));

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)){

                this.setLastOperation(value);

            }else if(isNaN(value)){

                console.log('Outra Coisa ',value);

            }else {

                this.pushOperation(value);
                console.log(value);

            }

        }else {

            if(this.isOperator(value)){

                this.pushOperation(value);

            }else{

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();

            }

        }

    }

    execBtn(value){

        switch (value){
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
            case 'change-sing':
                this.addOperation('+/-');
                break;
            case 'point':
                this.addOperation('.');
                break;
            case 'equal':
                
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

        let buttons = document.querySelectorAll('.wrapper-buttons-queues > button');
        buttons.forEach((btn, index)=>{
            
            this.addEventListenerALL(btn,'click drag', e=>{

                let textBtn = btn.id.replace("btn-", "");

                this.execBtn(textBtn);
    
            });
        });

    }

    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
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
        this._displayCalcEl = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

}