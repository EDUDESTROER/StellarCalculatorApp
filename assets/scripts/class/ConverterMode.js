class ConverterMode {

    constructor(){

        this.firstConversorListEl;
        this.secondConversorListEl;
        this.btnSelectionFirst;
        this.btnSelectionSecond; 
        this.firstConverterOutput;
        this.converterType;
        this.firstOutputValue = '';
        this.firstSelectedEl;
        this.secondSelectedEl;
        this._audioOnOff;
        this._clickSound
        

    }

    start(type){

        this.firstConversorListEl = document.querySelector('#first-converter-list');
        this.secondConversorListEl = document.querySelector('#second-converter-list');
        this.btnSelectionFirst = document.querySelector('#btn-first-selection');
        this.btnSelectionSecond = document.querySelector('#btn-second-selection');
        this.firstSelectedEl = this.btnSelectionFirst.children[0].children[0];
        this.secondSelectedEl = this.btnSelectionSecond.children[0].children[0];

        this.converterType = type;

        this.addEventsToSelection(this.btnSelectionFirst, this.firstConversorListEl);
        this.addEventsToSelection(this.btnSelectionSecond, this.secondConversorListEl);
        this.addEventsToButtons();

    }

    addEventsToSelection(selectionBtnEl, selectionListEl){

        //console.dir(selectionBtnEl);

        selectionBtnEl.addEventListener('click', ()=>{

            selectionListEl.childNodes.forEach(li => {

                li.addEventListener('click', ()=>{

                    window.viewsCalculator.removeClassFromListOfEl(selectionListEl.childNodes, 'active-converter');

                    li.classList.add('active-converter');

                    selectionBtnEl.children[0].children[0].textContent = li.textContent;

                });
                
            });

            this.checkConverterType();

            if(selectionListEl.dataset.open == 'no' || !selectionListEl.dataset.open){

                window.viewsCalculator.showElement(selectionListEl, 'block');

                selectionListEl.dataset.open = 'yes';

                selectionBtnEl.children[0].children[1].classList.add('caret-rotate');

            }else if(selectionListEl.dataset.open == 'yes'){

                window.viewsCalculator.unShowElement(selectionListEl);

                selectionListEl.dataset.open = 'no';

                selectionBtnEl.children[0].children[1].classList.remove('caret-rotate');

            }

        });

    }

    addEventsToButtons(){

        document.querySelectorAll('.wrapper-buttons-queues').forEach(element=>{

            element.childNodes.forEach(button=>{

                button.addEventListener('click', e=>{

                    let buttonName = button.id.replace('button-', '');

                    this.playSound();

                    switch(buttonName){

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
                            this.addValueToOutputFirst(buttonName);
                        break;
                        case 'dot':
                            this.addValueToOutputFirst('.');
                        break;
                        case 'ce':
                            this.clearConverter();
                        break;
                        case 'backspace':
                            this.backspacePress();
                        break;
                        default:
                            console.error('no functions on: ', buttonName);
                        break;

                    }

                });

            });

        });

    }

    backspacePress(){

        this.firstOutputValue = this.firstOutputValue.slice(0, -1);

        if(!this.firstOutputValue){

            this.addValueToOutputFirst(0);

        }else{

            this.addValueToOutputFirst('');

        }

        

    }

    addValueToOutputFirst(value){

        if(value == '0'){

            this.firstOutputValue = 0;

        }else{

            if(this.firstOutputValue == '0'){

                this.firstOutputValue = `${value}`;

            }else{

                this.firstOutputValue = `${this.firstOutputValue}${value}`;

            }
            
        }

        if(this.firstOutputValue === '.'){

            this.firstOutputValue = '0.';

        }

        window.viewsCalculator.setInnerHtmlToElement(this.firstOutputValue, 'first-converter-output');

        this.verifySizeOutput('first-converter-output');

        if(this.converterType == 'length'){

            window.length.storeFirstValue(this.firstOutputValue);
        
        }else if(this.converterType == 'angle'){

            window.angleConverter.storeFirstValue(this.firstOutputValue);

        }

        this.checkConverterType();

    }

    checkConverterType(){ 

        let result = '';

        if(this.converterType == 'length'){

            result = window.length.calcLengthConverter(this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);
        
        }else if(this.converterType == 'angle'){

            result = window.angleConverter.calcAngleConverter(this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

        }

        if(result === false){

            window.viewsCalculator.displayFail('Is impossible realize the conversion...');
            this.clearConverter();

        }else{

            if(result == ''){

                window.viewsCalculator.setInnerHtmlToElement(0, 'second-converter-output');

            }else{

                window.viewsCalculator.setInnerHtmlToElement(result, 'second-converter-output');

            }

            this.verifySizeOutput('first-converter-output');
            this.verifySizeOutput('second-converter-output');

        }

    }

    clearConverter(){

        if(this.converterType == 'length'){

            window.length.clearLenght();

        }
        if(this.converterType == 'angle'){

            window.angleConverter.clearAngle();

        }

        this.firstOutputValue = '';

        window.viewsCalculator.setInnerHtmlToElement(0, 'second-converter-output');
        window.viewsCalculator.setInnerHtmlToElement(0, 'first-converter-output');

        this.verifySizeOutput('first-converter-output');
        this.verifySizeOutput('second-converter-output');

    }

    verifySizeOutput(outputId){

        let outputLegth = document.getElementById(outputId).textContent.length;

        if(outputLegth < 18){

            window.viewsCalculator.changeElementFontSize('increase', 0.0, outputId, '4', 'rem');

        }

        if(outputLegth > 18){

            window.viewsCalculator.changeElementFontSize('decrease', 0.15, outputId, '4', 'rem');

        }
        if(outputLegth > 21){

            window.viewsCalculator.changeElementFontSize('decrease', 0.15, outputId, '3.4', 'rem');

        }
        if(outputLegth > 25){

            window.viewsCalculator.changeElementFontSize('decrease', 0.20, outputId, '2.89', 'rem');

        }
        if(outputLegth > 31){

            this.clearConverter();

            window.viewsCalculator.displayFail('Use less than: 32 characters!');

        }

    }

    setSound(value, sound){

        this._audioOnOff = value;

        this._clickSound = sound;

    }
    
    playSound(){

        if (this._audioOnOff){

            this._clickSound.currentTime = 0;
            this._clickSound.play();

        }

    }

}