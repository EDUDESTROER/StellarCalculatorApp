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

        this.checkCalculatorMode();
        this.startCalculatorsButtons();
        this.activeSoundMode();

    }

    checkCalculatorMode(){

        this._calculatorParentEl.innerHTML = ''

        if(this._selectedCalculatorMode === 'standard'/* || !this._selectedCalculatorMode*/){

            let standardEl = window.viewsCalculator.returnStandard();

            this._calculatorParentEl.innerHTML = standardEl;

            window.calculatorStandardMode.start();

            window.viewsCalculator.displaySucess('Standard select');

            this._historyButtonEl.disabled = false;
            
        }
        if(this._selectedCalculatorMode === 'length'){ 

            let lengthEl = window.viewsCalculator.returnConversor('length');

            this._calculatorParentEl.innerHTML = lengthEl;

            window.calculatorConverterMode.start('length');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Length select');

            this._historyButtonEl.disabled = true; //Make it's Work in the next update!

        }
        if(this._selectedCalculatorMode === 'angle'){

            let angleEl = window.viewsCalculator.returnConversor('angle');

            this._calculatorParentEl.innerHTML = angleEl;

            window.calculatorConverterMode.start('angle');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Angle select');

            this._historyButtonEl.disabled = true; //Make it's Work in the next update!

        }
        if(this._selectedCalculatorMode === 'volume'){ //Change the or option after the developing

            let angleEl = window.viewsCalculator.returnConversor('volume');

            this._calculatorParentEl.innerHTML = angleEl;

            window.calculatorConverterMode.start('volume');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Volume select');

            this._historyButtonEl.disabled = true; //Make it's Work in the next update!

        }
        if(this._selectedCalculatorMode === 'weigth and mass'){ //Change the or option after the developing

            let angleEl = window.viewsCalculator.returnConversor('weigthAndMass');

            this._calculatorParentEl.innerHTML = angleEl;

            window.calculatorConverterMode.start('weigthAndMass');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Weigth And Mass select');

            this._historyButtonEl.disabled = true; //Make it's Work in the next update!

        }
        if(this._selectedCalculatorMode === 'temperature' || !this._selectedCalculatorMode){ //Change the or option after the developing

            let angleEl = window.viewsCalculator.returnConversor('temperature');

            this._calculatorParentEl.innerHTML = angleEl;

            window.calculatorConverterMode.start('temperature');

            window.calculatorConverterMode.clearConverter();

            window.viewsCalculator.displaySucess('Temperature select');

            this._historyButtonEl.disabled = true; //Make it's Work in the next update!

        }


    }
    startCalculatorsButtons(){

        this._openMenuButtonEl.addEventListener('click', ()=>{

            window.viewsCalculator.showElement(this._floatSideMenuEl, 'flex');

        });

        this._closeHistoryEl.addEventListener('click', ()=>{

            window.viewsCalculator.unShowElement(this._historyEl);

            this._historyHidden = true;

        });

        this._historyButtonEl.addEventListener('click', ()=>{

            if(this._historyHidden){

                window.viewsCalculator.showElement(this._historyEl, 'flex');

                this._historyHidden = false;

            }else{

                window.viewsCalculator.unShowElement(this._historyEl);

                this._historyHidden = true;

            }

        });

        this._closeMenuButtonEl.addEventListener('click', ()=>{

            window.viewsCalculator.unShowElement(this._floatSideMenuEl);

        });

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

            window.calculatorConverterMode.setSound(this._selectedSoundMode, this._clickSound);

        }else if(this._selectedSoundMode === false){

            this._soundButtonEl.firstElementChild.src = 'assets/icons/no_sound.png';

            window.calculatorStandardMode.setSound(this._selectedSoundMode, this._clickSound);

            window.calculatorConverterMode.setSound(this._selectedSoundMode, this._clickSound);

        }

    }

}