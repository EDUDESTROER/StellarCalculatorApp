class StellarStandardMode {

    constructor(){

        this._operation = [];
        this._lastCalc = '';
        this._audioOnOff;
        this._clickSound;
        
    }

    start(){

        document.querySelectorAll('.wrapper-buttons-queues').forEach(element=>{

            element.childNodes.forEach(button=>{

                button.addEventListener('click', e=>{

                    let buttonName = button.id.replace('button-', '');

                    //console.log(buttonName);

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
                            this.addToOperation(buttonName);
                        break;
                        case 'sum':
                            this.addToOperation('+');
                        break;
                        case 'subtraction':
                            this.addToOperation('-');
                        break;
                        case 'multiplication':
                            this.addToOperation('*');
                        break;
                        case 'divide':
                            this.addToOperation('/');
                        break;
                        case 'c':
                            this.clearAll();
                        break;
                        case 'ce':
                            this.clearLastNumber();
                        break;
                        case 'equal':
                            this.calc();
                        break;
                        case 'change-signal':
                            this.changeSignal();
                        break;
                        case 'percent':
                            this.calcPercent();
                        break;
                        case 'squared':
                            this.calcSquared();
                        break;
                        case 'one-divide-per':
                            this.calcOnedivePer();
                        break;
                        case 'backspace':
                            this.backspace();
                        break;
                        case 'square-root':
                            this.calcSquareRoot();
                        break;
                        case 'dot':
                            this.addDot();
                        break;

                        default:
                            this.inError(buttonName);
                        break;
                    }

                })

            });

        });

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

    backspace(){

        if(this._operation.length == 3){

            this._operation[2] = (this._operation[2].slice(0, -1)).toString();

            if(this._operation[2].length >= 1){

                this.setToCurrentDisplay(this._operation[2]);

            }else{

                this._operation[2] = '0';

                this.setToCurrentDisplay('0');

            }


        }else if(this._operation.length == 1){

            this._operation[0] = (this._operation[0].slice(0, -1)).toString();

            if(this._operation[0].length >= 1){

                this.setToCurrentDisplay(this._operation[0]);

            }else{

                this._operation[0] = '0';

                this.setToCurrentDisplay('0');

            }

        }

    }

    addToOperation(value){

        if(isNaN(value)){

            if(this._operation.length >= 1 && this._operation.length <= 3){

                if(!isNaN(this._operation[this._operation.length - 1])){

                    if(this._operation.length < 3){

                        this._operation.push(value);

                    }else{

                        this.calc();

                    }

                }else{

                    this._operation.pop();
                    this._operation.push(value);


                }

            }else if(this._operation.length < 1){

                this._operation.push('0')
                this._operation.push(value);

            }

            this.setToPreviousDisplay(this._operation[0], this._operation[1]);

        }else{

            if(this._operation.length >= 1 && this._operation.length <= 3){

                if(isNaN(this._operation[this._operation.length - 1])){

                    this._operation.push(value);

                }else{
                    let lastNumber = this._operation[this._operation.length - 1];

                    if(lastNumber == 0 && value == 0){

                        this._operation.push(0);

                    }else{

                        if(lastNumber == 0 && value != 0){

                            if(this._operation[this._operation.length - 1] == '0.'){

                                this._operation[this._operation.length - 1] = this._operation[this._operation.length - 1] + value;

                            }else{

                                this._operation.pop();

                                this._operation.push(value);

                            }
                            
                        }else{

                            this._operation.pop();

                            this._operation.push(lastNumber + value);

                        }

                    }

                }

            }else if(this._operation.length < 1){

                this._operation.push(value);

            }

            this.setToCurrentDisplay(this._operation[ this._operation.length - 1 ]);

        }
        
    }
    addDot(){

        if(this._operation.length <= 0){

            this._operation[0] = '0.';

            this.setToCurrentDisplay(this._operation[0]);

        }else if(this._operation.length == 1){

            this._operation[0] = this._operation[0] + '.';
            this.setToCurrentDisplay(this._operation[0]);

        }else if(this._operation.length == 3){

            this._operation[2] = this._operation[2] + '.';
            this.setToCurrentDisplay(this._operation[2]);

        }

    }

    calc(){

        if(this._operation.length > 0){

            let calculation;
            let calculationResult;

            if(this._operation.length == 3){

                if(this._operation[2] == 0 && this._operation[1] == '/'){

                    calculation = ' ';
                    calculationResult = 'Impossible to divide by zero!';

                }else{

                    this._lastCalc = `${this._operation[1]} ${this._operation[2]}`;

                    calculation = this._operation.toString().replaceAll(',', ' ');

                    calculationResult = eval(calculation).toString();

                }

                //console.log(calculationResult);

            }
            if(this._operation.length == 1 && this._lastCalc.length > 0){

                calculation = `${this._operation[0]} ${this._lastCalc}`;
                calculationResult = eval(calculation).toString();

            }
            if(this._operation.length == 2){

                this._lastCalc = `${this._operation[1]} ${this._operation[0]}`;

                calculation = `${this._operation[0]} ${this._operation[1]} ${this._operation[0]} `;
                calculationResult = eval(calculation).toString();

            }

            if(calculation){

                this.clearAll();

                this.setToPreviousDisplay(calculation, ' =');
                this.setToCurrentDisplay(calculationResult);

                this._operation.push(calculationResult);

                window.calculatorHistory.addToHistory(`${calculation} =`, calculationResult);

            }

        }

    }

    calcPercent(){

        if(this._operation.length == 3){

            this._operation[2] = (this._operation[2] / 100).toString();

            this.calc();

        }

    }
    calcSquared(){

        let lastNumber;

        if(this._operation.length == 3){

            lastNumber = this._operation[2];

            this._operation[2] = (this._operation[2] * this._operation[2]).toString();

            this.setToPreviousDisplay(`${this._operation[0]} ${this._operation[1]} sqr(${lastNumber}) `, ' ');
            this.setToCurrentDisplay(this._operation[2]);

            window.calculatorHistory.addToHistory(`sqr(${lastNumber}) =`, this._operation[2]);

        }else if(this._operation.length == 1){

            lastNumber = this._operation[0];

            this._operation[0] = (this._operation[0] * this._operation[0]).toString();

            this.setToCurrentDisplay(this._operation[0]);

            window.calculatorHistory.addToHistory(`sqr(${lastNumber}) =`, this._operation[0]);

        }

    }
    calcOnedivePer(){

        let lastNumber;

        if(this._operation.length == 3){

            lastNumber = this._operation[2];

            this._operation[2] = (1 / this._operation[2]).toString();

            this.setToPreviousDisplay(`${this._operation[0]} ${this._operation[1]} 1/(${lastNumber}) `, ' ');
            this.setToCurrentDisplay(this._operation[2]);

            window.calculatorHistory.addToHistory(`1 ÷ (${lastNumber}) =`, this._operation[2]);

        }else if(this._operation.length == 1){

            if(this._operation[0] !== '0'){

                lastNumber = this._operation[0];

                this._operation[0] = (1 / this._operation[0]).toString();
                this.setToCurrentDisplay(this._operation[0]);

                window.calculatorHistory.addToHistory(`1 ÷ (${lastNumber}) =`, this._operation[0]);

            }else{

                this.setToCurrentDisplay('Impossible to divide by zero!');

            }

            

        }

    }
    calcSquareRoot(){

        let lastNumber;

        if(this._operation.length == 3){

            lastNumber = this._operation[2];

            this._operation[2] = (Math.sqrt(this._operation[2])).toString();

            this.setToPreviousDisplay(`${this._operation[0]} ${this._operation[1]} √(${lastNumber}) `, ' ');
            this.setToCurrentDisplay(this._operation[2]);

            window.calculatorHistory.addToHistory(`√(${lastNumber}) =`, this._operation[2]);


        }else if(this._operation.length == 1){

            lastNumber = this._operation[0];

            this._operation[0] = (Math.sqrt(this._operation[0])).toString();

            this.setToPreviousDisplay(`√(${lastNumber})`, ' ');

            this.setToCurrentDisplay(this._operation[0]);

            window.calculatorHistory.addToHistory(`√(${lastNumber}) =`, this._operation[0]);

        }

    }

    changeSignal(){

        if(this._operation.length == 1){

            if(Math.sign(this._operation[0]) == 1){

                this._operation[0] = `-${this._operation[0]}`;

            }else if(Math.sign(this._operation[0]) == -1){

                 this._operation[0] = `${this._operation[0].replace('-', '')}`;

            }

            this.setToCurrentDisplay(this._operation[0]);

        }else if(this._operation.length == 3){

            if(Math.sign(this._operation[2]) == 1){

                this._operation[2] = `-${this._operation[2]}`

            }else if(Math.sign(this._operation[2]) == -1){

                 this._operation[2] = `${this._operation[2].replace('-', '')}`;

            }

            this.setToCurrentDisplay(this._operation[2]);

        }

    }

    clearAll(){

        this._operation = [];
        this.setToCurrentDisplay('0');
        this.setToPreviousDisplay('', '');

    }

    clearLastNumber(){

        if(this._operation.length == 1){

            this.clearAll();

        }else if(this._operation.length == 3){

            this._operation.pop();
            this.setToCurrentDisplay('0');
            
        }
        

    }

    setToCurrentDisplay(currentNumber){

        let inError = false;

        if(currentNumber !== '0.'){

            if(currentNumber.indexOf('.') > -1){

                let tooRound = currentNumber.split('.');

                if(tooRound[1].length > 9){

                    currentNumber = parseFloat(currentNumber).toFixed(2);

                }

            }
            if(currentNumber.length >= 15){

                window.viewsCalculator.changeElementFontSize('decrease', 0.20, 'current-output', '80');

            }
            if(currentNumber.length >= 19){

                window.viewsCalculator.changeElementFontSize('decrease', 0.20, 'current-output', '64');

            }
            if(currentNumber.length >= 23){

                window.viewsCalculator.changeElementFontSize('decrease', 0.30, 'current-output', '51.2');

            }
            if(currentNumber.length >= 32){

                window.viewsCalculator.displayFail('Use less than: 32 characters!');
                inError = true;

            }
            if(currentNumber.length < 15){

                window.viewsCalculator.changeElementFontSize('decrease', 0.20, 'current-output', '104');

            }
            

        }

        if(inError){

            this.clearAll();

        }else{

            window.viewsCalculator.setInnerHtmlToElement(currentNumber,'current-output');

        }

    }
    setToPreviousDisplay(firstValue, secondValue){

        if((firstValue === '' || secondValue === '') || (!firstValue || !secondValue)){

            window.viewsCalculator.setInnerHtmlToElement('', 'previous-output');

        }else{

            if(secondValue == '/'){

                secondValue = '÷';

            }else if(secondValue == '*'){

                secondValue = 'x';

            }

            firstValue = firstValue.replace('/','÷');
            firstValue = firstValue.replace('*','x');

            let operationFinal = `${firstValue} ${secondValue}`

            //console.log(operationFinal);

            window.viewsCalculator.setInnerHtmlToElement(operationFinal, 'previous-output');

        }

    }

    historyRequest(calculation, result){

        this.clearAll();

        this._operation.push(result);

        this.setToPreviousDisplay(calculation, ' ');
        this.setToCurrentDisplay(result);

        this._lastCalc = `${calculation.split(' ')[1]} ${calculation.split(' ')[2]}`;

    }

    inError(errorName){

        window.viewsCalculator.displayFail(`Error detected! ${errorName}`);

        console.error(`Error detected! ${errorName}`);

        this.clearAll();

    }

}