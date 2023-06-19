class CalcController {

    constructor(){

        this._displayCalc = '0';
        this._currentDate;
        this.initialize();

    }

    initialize(){

        let displayCalcEl = document.querySelector("#display");
        let dateEl = document.querySelector("#date");
        let hourEl = document.querySelector("#hour");

        displayCalcEl.value = 7654;
        dateEl.innerHTML = "18/06/2023"
        hourEl.innerHTML = "22:01";

    }

    get displayCalc(){
        return this._displayCalc;
    }
    
    set displayCalc(value){
        this._displayCalc = value;
    }

    get currentDate(){
        return this._currentDate;
    }

    set currentDate(value){
        this._currentDate = value;
    }

}