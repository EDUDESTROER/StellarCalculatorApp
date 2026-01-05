class StellarControler {

    constructor(){

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

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._standardEl);

            window.calculatorHistory.changeHistoryType('standard');

            if(!this.isStartStandardMode) window.calculatorStandardMode.start();

            window.viewsCalculator.displaySucess('Standard select');

            this._historyButtonEl.disabled = false;

            this.isStartStandardMode = true;
            
        }
        if(this._selectedCalculatorMode === 'programmer'){

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._programmerEl);

            window.calculatorHistory.changeHistoryType('programmer');

            if(!this.isStartProgrammerMode) window.calculatorProgrammerMode.start();

            window.viewsCalculator.displaySucess('Programmer select');

            this._historyButtonEl.disabled = true;
            this._historyButtonEl.classList.add('disabled-btn');

            this.isStartProgrammerMode = true;
            
        }
        if(this._selectedCalculatorMode === 'length'){ 

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._conversorEl);

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('length');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Length select');

            this._historyButtonEl.disabled = false;
        }
        if(this._selectedCalculatorMode === 'angle'){

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._conversorEl);

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('angle');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Angle select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'volume'){

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._conversorEl);

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('volume');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Volume select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'weigth and mass'){

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._conversorEl);

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('weigthAndMass');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Weigth and mass select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'temperature'){

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._conversorEl);

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('temperature');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Temperature select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'energy'){

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._conversorEl);

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('energy');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Energy select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'area'){

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._conversorEl);

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('area');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Area select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'speed'){

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._conversorEl);

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('speed');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Speed select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'currency'){ 

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._conversorEl);

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('currency');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Currency select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'time'){ 

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._conversorEl);

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('time');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Time select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'power' ){ 

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._conversorEl);

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('power');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Power select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'pressure'){ 

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._conversorEl);

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('pressure');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Pressure select');

            this._historyButtonEl.disabled = false;

            this.isStartConverterMode = true;

        }
        if(this._selectedCalculatorMode === 'data'){ 

            window.viewsCalculator.unshowWithInertList(this.allCalculators);

            window.viewsCalculator.showWithInert(this._conversorEl);

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('data');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Data select');

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

            window.viewsCalculator.showWithInert(varEl);
            window.viewsCalculator.showWithInert(this.exitSideMenuEl);

            return 'open';

        }else if(varState === 'open'){

            window.viewsCalculator.unshowWithInertList([varEl]);
            window.viewsCalculator.unshowWithInertList([this.exitSideMenuEl]);

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

            window.calculatorStandardMode.setSound(this._selectedSoundMode, this._clickSound);
            window.calculatorProgrammerMode.setSound(this._selectedSoundMode, this._clickSound);

            window.calculatorConverterMode.setSound(this._selectedSoundMode, this._clickSound);

        }else if(this._selectedSoundMode === false){

            this._soundButtonEl.firstElementChild.src = '/icons/no_sound.png';

            window.calculatorStandardMode.setSound(this._selectedSoundMode, this._clickSound);
            window.calculatorProgrammerMode.setSound(this._selectedSoundMode, this._clickSound);

            window.calculatorConverterMode.setSound(this._selectedSoundMode, this._clickSound);

        }

    }

}