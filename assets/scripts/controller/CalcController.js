class CalcController {

    constructor(){

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
            element.addEventListener(action, fn, false);
        });

    }

    initButtonsevents(){

        let buttons = document.querySelectorAll('.wrapper-buttons-queues > button');
        buttons.forEach((btn, index)=>{
            
            this.addEventListenerALL(btn,'click drag', e=>{

                console.log(btn.id.replace("btn-", ""));
    
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