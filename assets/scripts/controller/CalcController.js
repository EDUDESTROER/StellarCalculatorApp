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
        this._converterOperationFirst = [];
        this._convertedValue = 0;
        this._firstSelectedMeasure;
        this._secondSelectedMeasure;
        this._locale = navigator.language;
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#date");
        this._hourEl = document.querySelector("#hour");
        this._historyEl = document.querySelector(".wrapper-history");
        this._historyList = document.querySelector(".history-list");
        this._converterEl = document.querySelector(".wrapper-converter");
        this._converterFirstEl = document.querySelector("#converter-first");
        this._converterSecondEl = document.querySelector("#converter-second");
        this._selectMeasuresFirst = document.querySelector("#measures-first");
        this._selectMeasuresSecond = document.querySelector("#measures-second");
        this._historyId = 0;
        this._resultId = 0;
        this._currentDate;
        this.initialize();
        this.initButtonsevents();
        this.initKeyboard();
        this.checkSelectChange();
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
    showElement(elementHtml){

        if (elementHtml.style.display ==  "none" || !elementHtml.style.display){

            elementHtml.style.display = "flex";

        }else if (elementHtml.style.display ==  "flex"){

            elementHtml.style.display = "none";

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

        if(!this._allResults.includes(result)){
            this._allResults.push(result)
            //console.log(this._allResults)
            let newSpan = document.createElement("span");
            let newContent = document.createTextNode(`= ${this._allResults[this._resultId]}`);
            newSpan.appendChild(newContent)
            newSpan.id = `r${this._resultId}`;
            newSpan.className = 'history-result';
            this._historyList.appendChild(newSpan);
            this._resultId = this._resultId + 1;
        }

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

            this.createHistoryElement();
            

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
    createHistoryElement(){

        let newCalc = this._operation.toString().replaceAll(',', '')

        if (newCalc.length === 1){
            newCalc = '';
        }

        if(!this._allOperation.includes(newCalc)){
            this._allOperation.push(newCalc);
            //console.log(this._allOperation);
            let newSpan = document.createElement("span");
            let newContent = document.createTextNode(this._allOperation[this._historyId]);
            newSpan.appendChild(newContent)
            newSpan.textContent = newSpan.textContent.replaceAll(',', '')
            newSpan.id = `c${this._historyId}`;
            newSpan.className = 'history-calc';
            this._historyList.appendChild(newSpan);
            this._historyId = this._historyId + 1;
            //console.log(this._historyId)
        }

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
    addConverterOp(value){
        
        let lastConverter = this._converterOperationFirst[0];

            
        if(!this._converterOperationFirst[0]){

            this._converterOperationFirst.push(value.replace("converter-", ""));
        
        }else if(this._converterOperationFirst && this._converterOperationFirst[0].length < 15){
        
            this._converterOperationFirst.pop();
            this._converterOperationFirst.push(lastConverter + value.replace("converter-", ""));
        
        }

        console.log(this._converterOperationFirst);

        this.setConverterTodisplay(this._converterOperationFirst[0], this._converterFirstEl);
        this.calcMeasures();

    }
    checkSelectChange(){

        this._selectMeasuresSecond.addEventListener('change', e=>{
            
            this._secondSelectedMeasure = this._selectMeasuresSecond[this._selectMeasuresSecond.selectedIndex].value;
            //console.log(this._secondSelectedMeasure);
            this.calcMeasures();

        });

        this._selectMeasuresFirst.addEventListener('change', e=>{

            this._firstSelectedMeasure =  this._selectMeasuresFirst[this._selectMeasuresFirst.selectedIndex].value;
            //console.log(this._firstSelectedMeasure);
            this.calcMeasures();

        });

    }

    setConverterTodisplay(value, element){

        element.value = value;

    }

    calcMeasures(){

        this._firstSelectedMeasure =  this._selectMeasuresFirst[this._selectMeasuresFirst.selectedIndex].value;
        this._secondSelectedMeasure = this._selectMeasuresSecond[this._selectMeasuresSecond.selectedIndex].value;

        console.log(this._firstSelectedMeasure);
        console.log(this._secondSelectedMeasure);

        if(this._firstSelectedMeasure == 'nm'){
            switch(this._secondSelectedMeasure){

                case 'nm':
                    this._convertedValue = this._converterOperationFirst[0] * 1;
                    break;
                case 'μm':
                    this._convertedValue = this._converterOperationFirst[0] * 0.001;
                    break;
                case 'mm':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000001;
                    break;
                case 'cm':
                    this._convertedValue = this._converterOperationFirst[0] * 0.0000001;
                    break;
                case 'm':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000000001;
                    break;
                case 'km':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000000000001;
                    break;
                case 'in':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000000039370079;
                    break;
                case 'ft':
                    this._convertedValue = this._converterOperationFirst[0] * 0.00000000328084;
                    break;
                case 'yd':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000000001093613;
                    break;
                case 'mi':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000000000000621;
                    break;
                case 'mn':
                    this._convertedValue = this._converterOperationFirst[0] * 0.00000000000054;
                    break;
                default:
                    this.clearnMeasures();
                    break;

            }
        }

        if(this._firstSelectedMeasure == 'μm'){
            switch(this._secondSelectedMeasure){

                case 'nm':
                    this._convertedValue = this._converterOperationFirst[0] * 1000;
                    break;
                case 'μm':
                    this._convertedValue = this._converterOperationFirst[0] * 1;
                    break;
                case 'mm':
                    this._convertedValue = this._converterOperationFirst[0] * 0.001;
                    break;
                case 'cm':
                    this._convertedValue = this._converterOperationFirst[0] * 0.0001;
                    break;
                case 'm':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000001;
                    break;
                case 'km':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000000001;
                    break;
                case 'in':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000039;
                    break;
                case 'ft':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000003;
                    break;
                case 'yd':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000001;
                    break;
                case 'mi':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000000000621371;
                    break;
                case 'mn':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000000000539957;
                    break;
                default:
                    this.clearnMeasures();
                    break;

            }
        }

        if(this._firstSelectedMeasure == 'mm'){
            switch(this._secondSelectedMeasure){

                case 'nm':
                    this._convertedValue = this._converterOperationFirst[0] * 1000000;
                    break;
                case 'μm':
                    this._convertedValue = this._converterOperationFirst[0] * 1000;
                    break;
                case 'mm':
                    this._convertedValue = this._converterOperationFirst[0] * 1;
                    break;
                case 'cm':
                    this._convertedValue = this._converterOperationFirst[0] * 0.1;
                    break;
                case 'm':
                    this._convertedValue = this._converterOperationFirst[0] * 0.001;
                    break;
                case 'km':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000001;
                    break;
                case 'in':
                    this._convertedValue = this._converterOperationFirst[0] * 0.03937;
                    break;
                case 'ft':
                    this._convertedValue = this._converterOperationFirst[0] * 0.003281;
                    break;
                case 'yd':
                    this._convertedValue = this._converterOperationFirst[0] * 0.001094;
                    break;
                case 'mi':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000000621371192;
                    break;
                case 'mn':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000000539956803;
                    break;
                default:
                    this.clearnMeasures();
                    break;

            }
        }

        if(this._firstSelectedMeasure == 'cm'){
            switch(this._secondSelectedMeasure){

                case 'nm':
                    this._convertedValue = this._converterOperationFirst[0] * 10000000;
                    break;
                case 'μm':
                    this._convertedValue = this._converterOperationFirst[0] * 10000;
                    break;
                case 'mm':
                    this._convertedValue = this._converterOperationFirst[0] * 10;
                    break;
                case 'cm':
                    this._convertedValue = this._converterOperationFirst[0] * 1;
                    break;
                case 'm':
                    this._convertedValue = this._converterOperationFirst[0] * 0.01;
                    break;
                case 'km':
                    this._convertedValue = this._converterOperationFirst[0] * 0.00001;
                    break;
                case 'in':
                    this._convertedValue = this._converterOperationFirst[0] * 0.393701;
                    break;
                case 'ft':
                    this._convertedValue = this._converterOperationFirst[0] * 0.032808;
                    break;
                case 'yd':
                    this._convertedValue = this._converterOperationFirst[0] * 0.010936;
                    break;
                case 'mi':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000006;
                    break;
                case 'mn':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000005;
                    break;
                default:
                    this.clearnMeasures();
                    break;

            }
        }
        if(this._firstSelectedMeasure == 'm'){
            switch(this._secondSelectedMeasure){

                case 'nm':
                    this._convertedValue = this._converterOperationFirst[0] * 1000000000;
                    break;
                case 'μm':
                    this._convertedValue = this._converterOperationFirst[0] * 1000000;
                    break;
                case 'mm':
                    this._convertedValue = this._converterOperationFirst[0] * 1000;
                    break;
                case 'cm':
                    this._convertedValue = this._converterOperationFirst[0] * 100;
                    break;
                case 'm':
                    this._convertedValue = this._converterOperationFirst[0] * 1;
                    break;
                case 'km':
                    this._convertedValue = this._converterOperationFirst[0] * 0.001;
                    break;
                case 'in':
                    this._convertedValue = this._converterOperationFirst[0] * 39.37008;
                    break;
                case 'ft':
                    this._convertedValue = this._converterOperationFirst[0] * 3.28084;
                    break;
                case 'yd':
                    this._convertedValue = this._converterOperationFirst[0] * 1.093613;
                    break;
                case 'mi':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000621;
                    break;
                case 'mn':
                    this._convertedValue = this._converterOperationFirst[0] * 0.00054;
                    break;
                default:
                    this.clearnMeasures();
                    break;

            }
        }

        if(this._firstSelectedMeasure == 'km'){
            switch(this._secondSelectedMeasure){

                case 'nm':
                    this._convertedValue = this._converterOperationFirst[0] * 1000000000000;
                    break;
                case 'μm':
                    this._convertedValue = this._converterOperationFirst[0] * 1000000000;
                    break;
                case 'mm':
                    this._convertedValue = this._converterOperationFirst[0] * 1000000;
                    break;
                case 'cm':
                    this._convertedValue = this._converterOperationFirst[0] * 100000;
                    break;
                case 'm':
                    this._convertedValue = this._converterOperationFirst[0] * 1000;
                    break;
                case 'km':
                    this._convertedValue = this._converterOperationFirst[0] * 1;
                    break;
                case 'in':
                    this._convertedValue = this._converterOperationFirst[0] * 39370.08;
                    break;
                case 'ft':
                    this._convertedValue = this._converterOperationFirst[0] * 3280.84;
                    break;
                case 'yd':
                    this._convertedValue = this._converterOperationFirst[0] * 1093.61;
                    break;
                case 'mi':
                    this._convertedValue = this._converterOperationFirst[0] * 0.621371;
                    break;
                case 'mn':
                    this._convertedValue = this._converterOperationFirst[0] * 0.539957;
                    break;
                default:
                    this.clearnMeasures();
                    break;

            }
        }

        if(this._firstSelectedMeasure == 'in'){
            switch(this._secondSelectedMeasure){

                case 'nm':
                    this._convertedValue = this._converterOperationFirst[0] * 25400000;
                    break;
                case 'μm':
                    this._convertedValue = this._converterOperationFirst[0] * 25400;
                    break;
                case 'mm':
                    this._convertedValue = this._converterOperationFirst[0] * 25.4;
                    break;
                case 'cm':
                    this._convertedValue = this._converterOperationFirst[0] * 2.54;
                    break;
                case 'm':
                    this._convertedValue = this._converterOperationFirst[0] * 0.0254;
                    break;
                case 'km':
                    this._convertedValue = this._converterOperationFirst[0] * 0.0000254;
                    break;
                case 'in':
                    this._convertedValue = this._converterOperationFirst[0] * 1;
                    break;
                case 'ft':
                    this._convertedValue = this._converterOperationFirst[0] * 0.0833333;
                    break;
                case 'yd':
                    this._convertedValue = this._converterOperationFirst[0] * 0.0277778;
                    break;
                case 'mi':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000016;
                    break;
                case 'mn':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000014;
                    break;
                default:
                    this.clearnMeasures();
                    break;

            }
        }

        if(this._firstSelectedMeasure == 'ft'){
            switch(this._secondSelectedMeasure){

                case 'nm':
                    this._convertedValue = this._converterOperationFirst[0] * 304800000;
                    break;
                case 'μm':
                    this._convertedValue = this._converterOperationFirst[0] * 304.800;
                    break;
                case 'mm':
                    this._convertedValue = this._converterOperationFirst[0] * 304.8;
                    break;
                case 'cm':
                    this._convertedValue = this._converterOperationFirst[0] * 30.48;
                    break;
                case 'm':
                    this._convertedValue = this._converterOperationFirst[0] * 0.3048;
                    break;
                case 'km':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000305;
                    break;
                case 'in':
                    this._convertedValue = this._converterOperationFirst[0] * 12;
                    break;
                case 'ft':
                    this._convertedValue = this._converterOperationFirst[0] * 1;
                    break;
                case 'yd':
                    this._convertedValue = this._converterOperationFirst[0] * 0.333333;
                    break;
                case 'mi':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000189;
                    break;
                case 'mn':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000165;
                    break;
                default:
                    this.clearnMeasures();
                    break;

            }
        }

        if(this._firstSelectedMeasure == 'yd'){
            switch(this._secondSelectedMeasure){

                case 'nm':
                    this._convertedValue = this._converterOperationFirst[0] * 914400000;
                    break;
                case 'μm':
                    this._convertedValue = this._converterOperationFirst[0] * 914400;
                    break;
                case 'mm':
                    this._convertedValue = this._converterOperationFirst[0] * 914.4;
                    break;
                case 'cm':
                    this._convertedValue = this._converterOperationFirst[0] * 91.44;
                    break;
                case 'm':
                    this._convertedValue = this._converterOperationFirst[0] * 0.9144;
                    break;
                case 'km':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000914;
                    break;
                case 'in':
                    this._convertedValue = this._converterOperationFirst[0] * 36;
                    break;
                case 'ft':
                    this._convertedValue = this._converterOperationFirst[0] * 3;
                    break;
                case 'yd':
                    this._convertedValue = this._converterOperationFirst[0] * 1;
                    break;
                case 'mi':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000568;
                    break;
                case 'mn':
                    this._convertedValue = this._converterOperationFirst[0] * 0.000494;
                    break;
                default:
                    this.clearnMeasures();
                    break;

            }
        }

        if(this._firstSelectedMeasure == 'mi'){
            switch(this._secondSelectedMeasure){

                case 'nm':
                    this._convertedValue = this._converterOperationFirst[0] * 1609344000000;
                    break;
                case 'μm':
                    this._convertedValue = this._converterOperationFirst[0] * 1609344000;
                    break;
                case 'mm':
                    this._convertedValue = this._converterOperationFirst[0] * 1609344;
                    break;
                case 'cm':
                    this._convertedValue = this._converterOperationFirst[0] * 160934.4;
                    break;
                case 'm':
                    this._convertedValue = this._converterOperationFirst[0] * 1609.344;
                    break;
                case 'km':
                    this._convertedValue = this._converterOperationFirst[0] * 1.609344;
                    break;
                case 'in':
                    this._convertedValue = this._converterOperationFirst[0] * 63360;
                    break;
                case 'ft':
                    this._convertedValue = this._converterOperationFirst[0] * 5280;
                    break;
                case 'yd':
                    this._convertedValue = this._converterOperationFirst[0] * 1760;
                    break;
                case 'mi':
                    this._convertedValue = this._converterOperationFirst[0] * 1;
                    break;
                case 'mn':
                    this._convertedValue = this._converterOperationFirst[0] * 0.868976;
                    break;
                default:
                    this.clearnMeasures();
                    break;

            }
        }

        if(this._firstSelectedMeasure == 'mn'){
            switch(this._secondSelectedMeasure){

                case 'nm':
                    this._convertedValue = this._converterOperationFirst[0] * 1852000000000;
                    break;
                case 'μm':
                    this._convertedValue = this._converterOperationFirst[0] * 1852000000;
                    break;
                case 'mm':
                    this._convertedValue = this._converterOperationFirst[0] * 1852000;
                    break;
                case 'cm':
                    this._convertedValue = this._converterOperationFirst[0] * 185200;
                    break;
                case 'm':
                    this._convertedValue = this._converterOperationFirst[0] * 1852;
                    break;
                case 'km':
                    this._convertedValue = this._converterOperationFirst[0] * 1.852;
                    break;
                case 'in':
                    this._convertedValue = this._converterOperationFirst[0] * 72913.39;
                    break;
                case 'ft':
                    this._convertedValue = this._converterOperationFirst[0] * 6076.115;
                    break;
                case 'yd':
                    this._convertedValue = this._converterOperationFirst[0] * 2025.372;
                    break;
                case 'mi':
                    this._convertedValue = this._converterOperationFirst[0] * 1.150779;
                    break;
                case 'mn':
                    this._convertedValue = this._converterOperationFirst[0] * 1;
                    break;
                default:
                    this.clearnMeasures();
                    break;

            }
        }
        

        if(this._convertedValue){
            this.setConverterTodisplay(this._convertedValue, this._converterSecondEl);
        }

    }
    clearnMeasures(){

        this._converterOperationFirst = [];
        this._convertedValue = 0;
        this.setConverterTodisplay(0, this._converterFirstEl);
        this.setConverterTodisplay(this._convertedValue, this._converterSecondEl);

    }
    addDot(){

        let lastOperation = this.getLastOperation();

        if (lastOperation && lastOperation.toString().split('').indexOf('.') > -1) return;
        
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

        //console.log(divR);
        //console.log(divC);

        divR.forEach((div, index)=>{

            div.addEventListener('click', e=>{

                //console.dir(div);
                this.clearALL();
                let newDiv = div.textContent.replace("= ", "")
                this.pushOperation(newDiv)

                this.setLastNumberToDisplay();
            })

        })

        divC.forEach((div, index)=>{

            div.addEventListener('click', e=>{

                //console.dir(div);
                this.clearALL();
                this.pushOperation(div.textContent)
                this.calc();

                this.setLastNumberToDisplay();
            })

        })

    }

    initAudio(){

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
                this.initAudio();
                break;
            case 'history':
                this.showElement(this._historyEl);
                break;
            case 'converter':
                this.showElement(this._converterEl);
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
            case 'converter-0':
            case 'converter-1':
            case 'converter-2':
            case 'converter-3':
            case 'converter-4':
            case 'converter-5':
            case 'converter-6':
            case 'converter-7':
            case 'converter-8':
            case 'converter-9':
                this.addConverterOp(value);
                break;
            case 'converter-dot':
                console.log('No functions in button: ',value);
                break;
            case 'converter-ce':
                this.clearnMeasures();
                break;
            case 'converter-backspace':
                console.log('No functions in button: ',value);
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