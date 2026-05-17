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
        this.calculatorStandardMode = new StellarStandardMode(this.calculatorHistory);
        this.calculatorConverterMode = new ConverterMode(this.calculatorHistory);
        this.calculatorProgrammerMode = new ProgrammerMode();

        this.isStartStandardMode = false;
        this.isStartProgrammerMode = false;

        this._selectedCalculatorMode = 'standard';
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

    startMode(isStart = true, classToStart = this.calculatorConverterMode, history = false, showEl = this._conversorEl){

        let selectedMode = this._selectedCalculatorMode;

        this.viewsCalculator.unshowWithInertList(this.allCalculators);
        this.viewsCalculator.showWithInert(showEl);
        this.calculatorHistory.changeHistoryType(selectedMode);

        if(!isStart) classToStart.start();

        if(!selectedMode === 'standard' || selectedMode === 'programmer'){

            classToStart.clearConverter();
            classToStart.start(selectedMode);

        }

        this.viewsCalculator.displaySucess(`${selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)} select!`);

        this._historyButtonEl.disabled = history;

        isStart = true;

    }

    checkCalculatorMode(){

        //console.log('pass: checkCalculatorMode');
        //console.log('Selected Mode: ', this._selectedCalculatorMode);

        const redirectTo = {

            'standard': this.startMode(this.isStartStandardMode, this.calculatorStandardMode, false, this._standardEl),
            'programmer': this.startMode(this.isStartProgrammerMode, this.calculatorProgrammerMode, true, this._programmerEl),
            'length': this.startMode(),
            'angle': this.startMode(),
            'weigth and mass': this.startMode(),
            'volume': this.startMode(),
            'temperature': this.startMode(),
            'energy': this.startMode(),
            'area': this.startMode(),
            'speed': this.startMode(),
            'currency': this.startMode(),
            'time': this.startMode(),
            'power': this.startMode(),
            'pressure': this.startMode(),
            'data': this.startMode(),
            'time': this.startMode(),

        };
        redirectTo[this._selectedCalculatorMode];

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