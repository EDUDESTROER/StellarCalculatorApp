class StellarControler {

    constructor(){

        this._selectedCalculatorMode;
        this.selectedCalculatorModeEl = document.querySelector('#mode-name');
        this._selectedSoundMode = false;
        this._calculatorParentEl = document.querySelector('.wrapper-calculator');
        this._openMenuButtonEl = document.querySelector('#btn-open-side-menu');
        this._closeMenuButtonEl  = document.querySelector('#btn-close-side-menu');
        this._floatSideMenuEl = document.querySelector('.float-menu');
        this._sideMenuButtonsElList = document.querySelectorAll('.calculator-mode');
        this._soundButtonEl = document.querySelector('#button-sound');
        this._historyButtonEl = document.querySelector('#button-history');
        this._historyHidden = true;
        this._closeHistoryEl = document.querySelector('.exit-float-history');
        this._historyEl = document.querySelector('.float-history');
        this._clickSound = new Audio('assets/sound/click.wav');

        //this.checkCalculatorMode();
        this.startCalculatorsButtons();
        this.activeSoundMode();

    }

    checkCalculatorMode(){

        this._calculatorParentEl.innerHTML = ''

        if(this._selectedCalculatorMode === 'standard' || !this._selectedCalculatorMode){

            let standardEl = window.viewsCalculator.returnCalculator('standard');

            this._calculatorParentEl.innerHTML = standardEl;

            window.calculatorHistory.changeHistoryType('standard');

            window.calculatorStandardMode.start();

            window.viewsCalculator.displaySucess('Standard select');

            this._historyButtonEl.disabled = false;
            
        }
        if(this._selectedCalculatorMode === 'programmer' ){

            let standardEl = window.viewsCalculator.returnCalculator('programmer');

            this._calculatorParentEl.innerHTML = standardEl;

            window.calculatorHistory.changeHistoryType('programmer');

            window.calculatorProgrammerMode.start();

            window.viewsCalculator.displaySucess('Programmer select');

            this._historyButtonEl.disabled = true;
            this._historyButtonEl.classList.add('disabled-btn')
            
        }
        if(this._selectedCalculatorMode === 'length'){ 

            let lengthEl = window.viewsCalculator.returnConversor('length');

            this._calculatorParentEl.innerHTML = lengthEl;

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('length');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Length select');

            this._historyButtonEl.disabled = false;

        }
        if(this._selectedCalculatorMode === 'angle'){

            let angleEl = window.viewsCalculator.returnConversor('angle');

            this._calculatorParentEl.innerHTML = angleEl;

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('angle');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Angle select');

            this._historyButtonEl.disabled = false;

        }
        if(this._selectedCalculatorMode === 'volume'){

            let volumeEl = window.viewsCalculator.returnConversor('volume');

            this._calculatorParentEl.innerHTML = volumeEl;

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('volume');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Volume select');

            this._historyButtonEl.disabled = false;

        }
        if(this._selectedCalculatorMode === 'weigth and mass'){

            let weigthAndMassEl = window.viewsCalculator.returnConversor('weigthAndMass');

            this._calculatorParentEl.innerHTML = weigthAndMassEl;

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('weigthAndMass');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Weigth And Mass select');

            this._historyButtonEl.disabled = false;

        }
        if(this._selectedCalculatorMode === 'temperature'){

            let temperatureEl = window.viewsCalculator.returnConversor('temperature');

            this._calculatorParentEl.innerHTML = temperatureEl;

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('temperature');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Temperature select');

            this._historyButtonEl.disabled = false;

        }
        if(this._selectedCalculatorMode === 'energy'){

            let energyEl = window.viewsCalculator.returnConversor('energy');

            this._calculatorParentEl.innerHTML = energyEl;

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('energy');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Energy select');

            this._historyButtonEl.disabled = false;

        }
        if(this._selectedCalculatorMode === 'area'){

            let areaEl = window.viewsCalculator.returnConversor('area');

            this._calculatorParentEl.innerHTML = areaEl;

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('area');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Area select');

            this._historyButtonEl.disabled = false;

        }
        if(this._selectedCalculatorMode === 'speed'){

            let speedEl = window.viewsCalculator.returnConversor('speed');

            this._calculatorParentEl.innerHTML = speedEl;

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('speed');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Speed select');

            this._historyButtonEl.disabled = false;

        }
        if(this._selectedCalculatorMode === 'currency'){ 

            let currencyEl = window.viewsCalculator.returnConversor('currency');

            this._calculatorParentEl.innerHTML = currencyEl;

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('currency');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Currency select');

            this._historyButtonEl.disabled = false;

        }
        if(this._selectedCalculatorMode === 'time'){ 

            let timeEl = window.viewsCalculator.returnConversor('time');

            this._calculatorParentEl.innerHTML = timeEl;

            window.calculatorHistory.changeHistoryType('converter');

            window.calculatorConverterMode.start('time');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Time select');

            this._historyButtonEl.disabled = false;

        }


    }
    startCalculatorsButtons(){

        this._openMenuButtonEl.addEventListener('click', ()=>{

            window.viewsCalculator.showElement(this._floatSideMenuEl, 'flex');

        });

        /*this._closeHistoryEl.addEventListener('click', ()=>{

            window.viewsCalculator.unShowElement(this._historyEl);

            this._historyHidden = true;

        });*/

        this._historyButtonEl.addEventListener('click', ()=>{

            if(this._historyHidden){

                window.viewsCalculator.showElement(this._historyEl, 'flex');

                this._historyHidden = false;

            }else{

                window.viewsCalculator.unShowElement(this._historyEl);

                this._historyHidden = true;

            }

        });

        /*this._closeMenuButtonEl.addEventListener('click', ()=>{

            window.viewsCalculator.unShowElement(this._floatSideMenuEl);

        });*/

        this._sideMenuButtonsElList.forEach(element=>{

           element.addEventListener('click', e=>{

            this.newSelectedElement(element);

           });

        });

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

            this._soundButtonEl.firstElementChild.src = 'assets/icons/sound.png';

            window.calculatorStandardMode.setSound(this._selectedSoundMode, this._clickSound);
            window.calculatorProgrammerMode.setSound(this._selectedSoundMode, this._clickSound);

            window.calculatorConverterMode.setSound(this._selectedSoundMode, this._clickSound);

        }else if(this._selectedSoundMode === false){

            this._soundButtonEl.firstElementChild.src = 'assets/icons/no_sound.png';

            window.calculatorStandardMode.setSound(this._selectedSoundMode, this._clickSound);
            window.calculatorProgrammerMode.setSound(this._selectedSoundMode, this._clickSound);

            window.calculatorConverterMode.setSound(this._selectedSoundMode, this._clickSound);

        }

    }

}