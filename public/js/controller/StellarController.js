import StellarViews from '/js/views/StellarViews.js';
import History from '/js/class/History.js';
import StellarStandardMode from '/js/class/StandardMode.js';
import ConverterMode from '/js/class/ConverterMode.js';
import ProgrammerMode from '/js/class/ProgrammerMode.js';

export default class StellarController {

    constructor(){

        //console.log('Runing Calculator Controller.')

        this.viewsCalculator = new StellarViews();
        this.calculatorHistory = new History();
        this.calculatorStandardMode = new StellarStandardMode();
        this.calculatorConverterMode = new ConverterMode();
        this.calculatorProgrammerMode = new ProgrammerMode();

        this.isStartStandardMode = false;
        this.isStartProgrammerMode = false;

        this._selectedCalculatorMode;
        this._selectedSoundMode = false;
        this.selectedCalculatorModeEl = document.querySelector('#mode-name');
        this._standardEl = document.querySelector('#standard-calculator-wrapper');
        this._programmerEl = document.querySelector('#programmer-calculator-wrapper');
        this._conversorEl = document.querySelector('#conversor-calculator-wrapper');
        this.allCalculators = [this._standardEl, this._programmerEl, this._conversorEl];
        this._menuButtonEl = document.querySelector('#btn-side-menu');
        this._soundButtonEl = document.querySelector('#button-sound');
        this._historyButtonEl = document.querySelector('#button-history');
        this._closeHistoryEl = document.querySelector('.exit-float-history');
        this._clickSound = new Audio('/sound/click.wav');

        this._floatSideMenuEl = document.querySelector('.float-menu');
        this._sideMenuButtonsElList = document.querySelectorAll('.calculator-mode');
        this._historyEl = document.querySelector('.float-history');
        this.exitSideMenuEl = document.querySelector('#exit-side-menu');
        this.floatSideMenuState = 'close';
        this.historyElState = 'close';

        this.checkCalculatorMode();
        this.startCalculatorsButtons();
        this.activeSoundMode();

    }

    checkCalculatorMode(){

        //console.log('pass: checkCalculatorMode');
        //console.log('Selected Mode: ', this._selectedCalculatorMode);
        
        if(this._selectedCalculatorMode === 'standard' || !this._selectedCalculatorMode){

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._standardEl);

            this.calculatorHistory.changeHistoryType('standard');

            if(!this.isStartStandardMode) this.calculatorStandardMode.start();

            this.viewsCalculator.displaySucess('Standard select');

            this._historyButtonEl.disabled = false;

            this.isStartStandardMode = true;
            
        }
        if(this._selectedCalculatorMode === 'programmer'){

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._programmerEl);

            this.calculatorHistory.changeHistoryType('programmer');

            if(!this.isStartProgrammerMode) this.calculatorProgrammerMode.start();

            this.viewsCalculator.displaySucess('Programmer select');

            this._historyButtonEl.disabled = true;
            this._historyButtonEl.classList.add('disabled-btn');

            this.isStartProgrammerMode = true;
            
        }
        if(this._selectedCalculatorMode === 'length'){ 

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._conversorEl);

            this.calculatorHistory.changeHistoryType('converter');

            this.calculatorConverterMode.start('length');

            this.calculatorConverterMode.clearConverter();

            this.viewsCalculator.displaySucess('Length select');

            this._historyButtonEl.disabled = false;
        }
        if(this._selectedCalculatorMode === 'angle'){

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._conversorEl);

            this.calculatorHistory.changeHistoryType('converter');

            this.calculatorConverterMode.start('angle');

            this.calculatorConverterMode.clearConverter();

            this.viewsCalculator.displaySucess('Angle select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'volume'){

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._conversorEl);

            this.calculatorHistory.changeHistoryType('converter');

            this.calculatorConverterMode.start('volume');

            this.calculatorConverterMode.clearConverter();

            this.viewsCalculator.displaySucess('Volume select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'weigth and mass'){

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._conversorEl);

            this.calculatorHistory.changeHistoryType('converter');

            this.calculatorConverterMode.start('weigthAndMass');

            this.calculatorConverterMode.clearConverter();

            this.viewsCalculator.displaySucess('Weigth and mass select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'temperature'){

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._conversorEl);

            this.calculatorHistory.changeHistoryType('converter');

            this.calculatorConverterMode.start('temperature');

            this.calculatorConverterMode.clearConverter();

            this.viewsCalculator.displaySucess('Temperature select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'energy'){

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._conversorEl);

            this.calculatorHistory.changeHistoryType('converter');

            this.calculatorConverterMode.start('energy');

            this.calculatorConverterMode.clearConverter();

            this.viewsCalculator.displaySucess('Energy select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'area'){

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._conversorEl);

            this.calculatorHistory.changeHistoryType('converter');

            this.calculatorConverterMode.start('area');

            this.calculatorConverterMode.clearConverter();

            this.viewsCalculator.displaySucess('Area select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'speed'){

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._conversorEl);

            this.calculatorHistory.changeHistoryType('converter');

            this.calculatorConverterMode.start('speed');

            this.calculatorConverterMode.clearConverter();

            this.viewsCalculator.displaySucess('Speed select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'currency'){ 

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._conversorEl);

            this.calculatorHistory.changeHistoryType('converter');

            this.calculatorConverterMode.start('currency');

            this.calculatorConverterMode.clearConverter();

            this.viewsCalculator.displaySucess('Currency select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'time'){ 

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._conversorEl);

            this.calculatorHistory.changeHistoryType('converter');

            this.calculatorConverterMode.start('time');

            this.calculatorConverterMode.clearConverter();

            this.viewsCalculator.displaySucess('Time select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'power' ){ 

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._conversorEl);

            this.calculatorHistory.changeHistoryType('converter');

            this.calculatorConverterMode.start('power');

            this.calculatorConverterMode.clearConverter();

            this.viewsCalculator.displaySucess('Power select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'pressure'){ 

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._conversorEl);

            this.calculatorHistory.changeHistoryType('converter');

            this.calculatorConverterMode.start('pressure');

            this.calculatorConverterMode.clearConverter();

            this.viewsCalculator.displaySucess('Pressure select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'data'){ 

            this.viewsCalculator.unshowWithInertList(this.allCalculators);

            this.viewsCalculator.showWithInert(this._conversorEl);

            this.calculatorHistory.changeHistoryType('converter');

            this.calculatorConverterMode.start('data');

            this.calculatorConverterMode.clearConverter();

            this.viewsCalculator.displaySucess('Data select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }

    }
    startCalculatorsButtons(){

        this._menuButtonEl.addEventListener('click', ()=>{

            
           this.floatSideMenuState = this.checkToShow(this.floatSideMenuState, this._floatSideMenuEl);
            

        });

        this._historyButtonEl.addEventListener('click', ()=>{

            this.historyElState = this.checkToShow(this.historyElState, this._historyEl);

        });

        this.exitSideMenuEl.addEventListener('click', ()=>{

            this.floatSideMenuState = this.historyElState = 'open';

            this.floatSideMenuState = this.checkToShow(this.floatSideMenuState, this._floatSideMenuEl);
            this.historyElState = this.checkToShow(this.historyElState, this._historyEl);
        });

        this._sideMenuButtonsElList.forEach(element=>{

           element.addEventListener('click', e=>{

            this.newSelectedElement(element);

           });

        });

    }
    checkToShow(varState, varEl){

        if(varState === 'close'){

            this.viewsCalculator.showWithInert(varEl);
            this.viewsCalculator.showWithInert(this.exitSideMenuEl);

            return 'open';

        }else if(varState === 'open'){

            this.viewsCalculator.unshowWithInertList([varEl]);
            this.viewsCalculator.unshowWithInertList([this.exitSideMenuEl]);

            return 'close';

        }

    }
    newSelectedElement(selectedEelement){

        this._sideMenuButtonsElList.forEach(element=>{

            element.classList.forEach(cssClass=>{

                if(cssClass === 'active-calculator-mode'){

                    element.classList.remove(cssClass)

                }

            });

        });

        selectedEelement.classList.add('active-calculator-mode');

        this._selectedCalculatorMode = selectedEelement.children[1].innerText.toLowerCase();

        this.selectedCalculatorModeEl.innerHTML = selectedEelement.children[1].innerText;

        this.checkCalculatorMode();

    }
    activeSoundMode(){

        this._soundButtonEl.addEventListener('click', e=>{

            this._selectedSoundMode = (this._selectedSoundMode) ? false : true;

            this.checkSoundMode();

        });

    }
    checkSoundMode(){

        if(this._selectedSoundMode === true){

            this._soundButtonEl.firstElementChild.src = '/icons/sound.png';

            this.calculatorStandardMode.setSound(this._selectedSoundMode, this._clickSound);
            this.calculatorProgrammerMode.setSound(this._selectedSoundMode, this._clickSound);

            this.calculatorConverterMode.setSound(this._selectedSoundMode, this._clickSound);

        }else if(this._selectedSoundMode === false){

            this._soundButtonEl.firstElementChild.src = '/icons/no_sound.png';

            this.calculatorStandardMode.setSound(this._selectedSoundMode, this._clickSound);
            this.calculatorProgrammerMode.setSound(this._selectedSoundMode, this._clickSound);

            this.calculatorConverterMode.setSound(this._selectedSoundMode, this._clickSound);

        }

    }

}