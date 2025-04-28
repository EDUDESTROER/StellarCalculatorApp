class ProgrammerMode {

    constructor(){

        this._audioOnOff;
        this._clickSound;
        this.numericBase = 'DEC';
        this.numericWordSize = 'QWORD';
        this.bitShiftType = 'arithmetic';
        this.bitByBitNorNand = false;
        this._operationList = [];
        this.tempResult;
        this.lastCalc;
        this.openParenthesesNum = 0;
        this.closeParenthesesNum = 0;
        this.shiftMenu = false;
        this.firstCallBitToggle = false;

    }

    cangeCalculatorType(type){

        this.numericBase = type;

        let newNumberToDisplay = document.querySelector(`#${type}-result`).innerHTML === '0' ? '': document.querySelector('#BIN-result').innerHTML;

        this.clearnAll();

        this._operationList.push(newNumberToDisplay);

        window.viewsCalculator.baseMenuControll(this.numericBase);

        this.convertToAllNumericBases(this._operationList[this._operationList.length - 1]);

        this.updateDisplay();

        this.checkBaseAndDisabled();

    }
    checkBaseAndDisabled(){

        window.viewsCalculator.disabledBtn('button-dot');
        window.viewsCalculator.removeClass('button-dot', 'buttons-base-effects');

        if(this.numericBase === 'HEX'){

            let hexEnabled = ['A', 'B', 'C', 'D', 'E', 'F','7','8','9','4','5','6','2','3'];

            hexEnabled.forEach(buttonName=>{

                //console.log(buttonName);

                window.viewsCalculator.enableBtn(`button-${buttonName}`);
                window.viewsCalculator.addClass(`button-${buttonName}`, 'buttons-base-effects');

            });

        }else if(this.numericBase === 'DEC'){

            let decDisabled = ['A', 'B', 'C', 'D', 'E', 'F'];
            let decEnabled = ['7','8','9','4','5','6','2','3'];

            decDisabled.forEach(buttonName=>{

                window.viewsCalculator.disabledBtn(`button-${buttonName}`);
                window.viewsCalculator.removeClass(`button-${buttonName}`, 'buttons-base-effects');

            });

            decEnabled.forEach(buttonName=>{

                //console.log(buttonName);

                window.viewsCalculator.enableBtn(`button-${buttonName}`);
                window.viewsCalculator.addClass(`button-${buttonName}`, 'buttons-base-effects');

            });

        }else if(this.numericBase === 'OCT'){

            let octDisabled = ['A', 'B', 'C', 'D', 'E', 'F','8','9'];
            let octEnabled = ['7','4','5','6','2','3'];

            octDisabled.forEach(buttonName=>{

                window.viewsCalculator.disabledBtn(`button-${buttonName}`);
                window.viewsCalculator.removeClass(`button-${buttonName}`, 'buttons-base-effects');

            });

            octEnabled.forEach(buttonName=>{

                //console.log(buttonName);

                window.viewsCalculator.enableBtn(`button-${buttonName}`);
                window.viewsCalculator.addClass(`button-${buttonName}`, 'buttons-base-effects');

            });

        }else if(this.numericBase === 'BIN'){

            let binDisabled = ['A', 'B', 'C', 'D', 'E', 'F','7','8','9','4','5','6','2','3'];

            binDisabled.forEach(buttonName=>{

                window.viewsCalculator.disabledBtn(`button-${buttonName}`);
                window.viewsCalculator.removeClass(`button-${buttonName}`, 'buttons-base-effects');

            });

        }

    }
    checkNumericBase(){

        if(this.numericBase === 'DEC'){

            this.cangeCalculatorType('DEC'); 

        }else if(this.numericBase === 'BIN'){

            this.cangeCalculatorType('BIN');

        }else if(this.numericBase === 'OCT'){

            this.cangeCalculatorType('OCT');

        }
        else if(this.numericBase === 'HEX'){

            this.cangeCalculatorType('HEX');

        }

    }
    checkBinaryNumber(){

        let startFromList = {

            'QWORD': 63,
            'DWORD': 31,
            'WORD': 15,
            'BYTE':  7,

        };

        let start = startFromList[this.numericWordSize];

        let numResult = [];

        for(let i = start; i >= 0; i--){

            let button = document.getElementById(`btn-bit-${i}`);

            numResult.push(button.innerHTML);

        }

        //console.log('Binary Number = ', numResult.join(''));

        let numBase;

        if(this.numericBase === 'HEX'){

            numBase = this.getBinToOtherBase(numResult.join(''), 16);

        }else if(this.numericBase === 'DEC'){

            numBase = this.getBinToOtherBase(numResult.join(''), 10);

        }else if(this.numericBase === 'OCT'){

            numBase = this.getBinToOtherBase(numResult.join(''), 8);

        }else if(this.numericBase === 'BIN'){

            numBase = this.getBinToOtherBase(numResult.join(''), 2);

        }


        //console.log('Decimal Number = ', decNum);

        if(this._operationList[this._operationList.length - 1]){

            if(!this.isOperator(this._operationList[this._operationList.length - 1])){

                this._operationList[this._operationList.length - 1] = numBase;
    
                this.updateDisplay();
    
            }else if(this.isOperator(this._operationList[this._operationList.length - 1])){

                this._operationList.push(numBase);

                this.updateDisplay();

            }

        }else{

            this._operationList[this._operationList.length - 1] = numBase;
    
            this.updateDisplay();

        }

        this.convertToAllNumericBases(numBase);

    }
    start(){

        this.checkNumericBase();

        window.viewsCalculator.bitToggleMenu();
        window.viewsCalculator.showKeyboardMenu();

        document.querySelectorAll('.bit-shift-menu, .bit-by-bit-menu, .wrapper-buttons-queues, .wrapper-number-system, .wrapper-programmer-functions').forEach(queues=>{

            queues.childNodes.forEach(button=>{

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
                        case 'A':
                        case 'B':
                        case 'C':
                        case 'D':
                        case 'E':
                        case 'F':
                            this.checkCalcType(buttonName);
                        break;
                        case 'multiplication':
                            this.checkCalcType('*');
                        break;
                        case 'divide':
                            this.checkCalcType('/');
                        break;
                        case 'subtraction':
                            this.checkCalcType('-');
                        break;
                        case 'sum':
                            this.checkCalcType('+');
                        break;
                        case 'percent':
                            this.checkCalcType('%');
                        break;
                        case 'bit-by-bit-and':
                            this.checkCalcType('&');
                        break;
                        case 'bit-by-bit-nand':
                            this.checkCalcType('NAND');
                            this.bitByBitNorNand = true;
                        break;
                        case 'bit-by-bit-nor':
                            this.checkCalcType('NOR');
                            this.bitByBitNorNand = true;
                        break;
                        case 'bit-by-bit-or':
                            this.checkCalcType('|');
                        break;
                        case 'bit-by-bit-xor':
                            this.checkCalcType('^');
                        break;
                        case 'bit-by-bit-not':
                            this.denialOperation();
                        break;
                        case 'arithmetic-shift-right':
                            this.checkCalcType('>>');
                        break;
                        case 'arithmetic-shift-left':
                            this.checkCalcType('<<');
                        break;
                        case 'equal':
                            this.checkEqualType();
                        break;
                        case 'c':
                            this.clearnAll();
                        break;
                        case 'backspace':
                            this.eraseLastCaractere();
                        break;
                        case 'change-signal':
                            this.changeSignal();
                        break;
                        case 'open-parentheses':
                            this.checkCalcType('(');
                        break;
                        case 'close-parentheses':
                            this.checkCalcType(')');
                        break;
                        case 'change-word-size':
                            this.changeWordSize();
                        break;
                        case 'bit-shift':
                            this.showMenu('bit-shift-menu');
                        break;
                        case 'bit-by-bit':
                            this.showMenu('bit-by-bit-menu');
                        break;
                        case 'bit-toggle':
                            window.viewsCalculator.bitToggleMenu();
                            this.activeBitToggleEvents();
                        break;
                        case 'keyboard':
                            window.viewsCalculator.showKeyboardMenu();
                        break;
                        case 'bit-shift-arithmetic':
                            this.changeBitShiftType('arithmetic');
                        break;
                        case 'bit-shift-logical':
                            this.changeBitShiftType('logical');
                        break;
                        case 'bit-shift-rotate-circular':
                            this.changeBitShiftType('rotateCircular');
                        break;
                        case 'bit-shift-through-carry':
                            this.changeBitShiftType('throughCarry');
                        break;
                        case 'BIN-select':
                            this.cangeCalculatorType('BIN');
                        break;
                        case 'DEC-select':
                            this.cangeCalculatorType('DEC');
                        break;
                        case 'OCT-select':
                            this.cangeCalculatorType('OCT');
                        break;
                        case 'HEX-select':
                            this.cangeCalculatorType('HEX');
                        break;
                        default:
                            console.error('In devoloping... ' + buttonName);
                    }

                })

            });

        });

    }
    changeBitShiftType(type){
           
        window.viewsCalculator.removeClassFromListOfEl(document.querySelector('.bit-shift-menu').childNodes, 'shift-select');
        window.viewsCalculator.removeClassFromListOfEl(document.querySelectorAll('.shift-radio-input'), 'shift-radio-select');

        if(type === 'arithmetic'){

            let newSelect = document.querySelector('#bit-shift-arithmetic');

            newSelect.classList.add('shift-select');

            newSelect.firstChild.classList.add('shift-radio-select');

        }
        if(type === 'logical'){

            let newSelect = document.querySelector('#bit-shift-logical');

            newSelect.classList.add('shift-select');

            newSelect.firstChild.classList.add('shift-radio-select');

        }
        if(type === 'rotateCircular'){

            let newSelect = document.querySelector('#bit-shift-rotate-circular');

            newSelect.classList.add('shift-select');

            newSelect.firstChild.classList.add('shift-radio-select');

        }
        if(type === 'throughCarry'){

            let newSelect = document.querySelector('#bit-shift-through-carry');

            newSelect.classList.add('shift-select');

            newSelect.firstChild.classList.add('shift-radio-select');

        }

        this.bitShiftType = type;

        
    }
    denialOperation(){

        if(this._operationList.length >= 1){

            let lastItem = this._operationList[this._operationList.length - 1];

            if(!this.isOperator(lastItem) || this.isCloseParentheses(lastItem)){

                this.calcDec();

                let expresion = ['~', this.tempResult]

                let result = this.returnCalc(expresion);

                this.displayExpresion(expresion.join(' ') + ' =')

                this.displayResult(result);

                this.convertToAllNumericBases(result);

                this._operationList = [result];

            }

        }

    }
    showMenu(menuClass){

        let menu = document.querySelector(`.${menuClass}`);

        menu.parentElement.children[2].classList.toggle('caret-rotate')

        if(this.shiftMenu){

            window.viewsCalculator.unShowElement(menu);

            this.shiftMenu = false;

        }else{

            window.viewsCalculator.showElement(menu, 'flex');

            this.shiftMenu = true;

        }

    }
    changeWordSize(){

        if(this.numericWordSize === 'QWORD'){

            this.numericWordSize = 'DWORD';
            this.disabledBitToggle('DWORD');

        }else if(this.numericWordSize === 'DWORD'){

            this.numericWordSize = 'WORD';
            this.disabledBitToggle('WORD');

        }else if(this.numericWordSize === 'WORD'){

            this.numericWordSize = 'BYTE';
            this.disabledBitToggle('BYTE');

        }else if(this.numericWordSize === 'BYTE'){

            this.numericWordSize = 'QWORD';
            this.disabledBitToggle('QWORD');

        }

        window.viewsCalculator.setInnerHtmlToElement(this.numericWordSize, 'button-change-word-size');
        this.clearnAll();

    }
    disabledBitToggle(bitWord){

        let bitWordToDisabledList = {

            'QWORD': false,
            'DWORD': 32,
            'WORD': 16,
            'BYTE':  8,

        };

        let numberToStart = bitWordToDisabledList[bitWord];

        if(numberToStart){

            for(let i = numberToStart; i < 64; i++){

                window.viewsCalculator.disabledBtn(`btn-bit-${i}`, `-bit-toggle`);

                this.bitToggleBtnReset(`btn-bit-${i}`);
    
            }
            for(let i = numberToStart - 1; i >= 0; i--){

                window.viewsCalculator.removeClass(`btn-bit-${i}`, 'disabled-btn-bit-toggle');
    
            }

        }else{

            for(let i = 0; i < 64; i++){

                window.viewsCalculator.removeClass(`btn-bit-${i}`, 'disabled-btn-bit-toggle');

                window.viewsCalculator.enableBtn(`btn-bit-${i}`);
    
            }

        }

    }
    activeBitToggleEvents(){

       if(this.firstCallBitToggle === false){

            document.querySelectorAll('.btn-bit-toggle').forEach(button=>{

                button.addEventListener('click', e=>{

                    button.innerHTML === '0'? button.innerHTML = '1' : button.innerHTML = '0';

                    button.classList.toggle('color-pink');

                    this.checkBinaryNumber();

                });

            });

            this.firstCallBitToggle = true;

       }

    }
    bitToggleBtnReset(id, all = false){

        let button = document.getElementById(id);

        button.innerHTML = '0';

        if(all){

            for(let i = 0; i < 64; i++){

                document.getElementById(`btn-bit-${i}`).innerHTML = '0';
                window.viewsCalculator.removeClass(`btn-bit-${i}`, 'color-pink');
                window.viewsCalculator.enableBtn(`btn-bit-${i}`);
    
            }

        }

    }
    changeSignal(){

        if(this._operationList.length >=1){

            if(this._operationList.length === 1){

                if(Math.sign(this._operationList[0]) === 1){
    
                    this._operationList[0] = `-${this._operationList[0]}`;
    
                }else if(Math.sign(this._operationList[0]) === -1){
    
                    this._operationList[0] = `${this._operationList[0].replace('-', '')}`;
    
                }
    
            }else{
    
                if(!this.isOperator(this._operationList[this._operationList.length - 1])){
    
                    if(Math.sign(this._operationList[this._operationList.length - 1]) === 1){
    
                        this._operationList[this._operationList.length - 1] = `-${this._operationList[this._operationList.length - 1]}`;
        
                    }else if(Math.sign(this._operationList[this._operationList.length - 1]) === -1){
        
                        this._operationList[this._operationList.length - 1] = `${this._operationList[this._operationList.length - 1].replace('-', '')}`;
        
                    }
    
                }
    
            }

            this.convertToAllNumericBases(this._operationList[this._operationList.length - 1]);

            this.updateDisplay();

        }


    }
    eraseLastCaractere(){

        if(this._operationList[this._operationList.length - 1]){

            

            if(!this.isOperator(this._operationList[this._operationList.length - 1])){
    
                this._operationList[this._operationList.length - 1] = this._operationList[this._operationList.length - 1].slice(0, -1).toString();
    
                if(!this._operationList[this._operationList.length - 1]) {

                    this._operationList.pop();
                        
                    this.displayResult('0');

                }

                this.updateDisplay();
                this.displayExpresion(`${this._operationList.join(' ')} `);

                this.convertBinaryFromBtn();
    
            }else if(this.isOperator(this._operationList[this._operationList.length - 1])){

                if(this.isCloseParentheses(this._operationList[this._operationList.length - 1])) this.closeParenthesesNum = this.closeParenthesesNum - 1;
                if(this.isOpenParentheses(this._operationList[this._operationList.length - 1])) this.openParenthesesNum = this.openParenthesesNum - 1;

                window.viewsCalculator.setInnerHtmlToElement(this.parenthesesToClose(), 'open-parentheses-sub');
    
                this._operationList.pop();
    
                this.updateDisplay();
                this.displayExpresion(`${this._operationList.join(' ')} `);

                this.convertBinaryFromBtn();
    
            }

            if(this._operationList[this._operationList.length - 1]){

                this.convertToAllNumericBases(this._operationList[this._operationList.length - 1]);

            }else{

                this.convertToAllNumericBases('0');

            }

    
            

        }

    }
    checkCalcType(value){

        if(this.numericBase === 'HEX'){

            let listOfAllowedValue = ['A', 'B', 'C', 'D', 'E', 'F','0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '/', '-', '+', '%', '(', ')', '>>', '<<', '&', '|', '^', 'NAND', 'NOR'];

            if(listOfAllowedValue.indexOf(value) < 0){

                this.errorDetect('Not allowed caractere! In hexadecimal.');

            }else{

                this.addDigits(value);

            }

        }else if(this.numericBase === 'DEC'){

            let listOfAllowedValue = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '/', '-', '+', '%', '(', ')', '>>', '<<', '&', '|', '^', 'NAND', 'NOR'];

            if(listOfAllowedValue.indexOf(value) < 0){

                this.errorDetect('Not allowed caractere! In decimal.');

            }else{

                this.addDigits(value);

            }

        }else if(this.numericBase === 'BIN'){

            let listOfAllowedValue = ['0', '1', '*', '/', '-', '+', '%', '(', ')', '>>', '<<', '&', '|', '^', 'NAND', 'NOR'];

            if(listOfAllowedValue.indexOf(value) < 0){

                this.errorDetect('Not allowed caractere! In binary.');

            }else{

                this.addDigits(value);

            }

        }else if(this.numericBase === 'OCT'){

            let listOfAllowedValue = ['0', '1', '2', '3', '4', '5', '6', '7', '*', '/', '-', '+', '%', '(', ')', '>>', '<<', '&', '|', '^', 'NAND', 'NOR'];

            if(listOfAllowedValue.indexOf(value) < 0){

                this.errorDetect('Not allowed caractere! In octal.');

            }else{

                this.addDigits(value);

            }

        }

    }
    checkEqualType(){

        if(this._operationList.length >= 3){

            if(this.isOperator(this._operationList[this._operationList.length - 1]) && (this._operationList[this._operationList.length - 1] !== '(' && this._operationList[this._operationList.length - 1] !== ')')){
        
                if(this.parenthesesToClose() = 0){

                    this._operationList.push(this.tempResult);

                }
        
            }

            if(this.numericBase === 'HEX'){

                this.calcOtherBases(16);  
    
            }else if(this.numericBase === 'DEC'){

                this.calcDec();  
    
            }else if(this.numericBase === 'OCT'){

                this.calcOtherBases(8);

            }else if(this.numericBase === 'BIN'){

                this.calcOtherBases(2);

            }

            let expresion =  `${this._operationList.join(' ')} =`;
            let result = this.tempResult;
    
            this.clearnAll();
    
            this._operationList.push(result);

            this.convertToAllNumericBases(result);
    
            this.displayResult(result);
            this.displayExpresion(expresion);

        }else if(this.lastCalc && this._operationList.length === 1){

            let calcList = this.lastCalc.split(' ');

            this._operationList.push(calcList[0]);
            this._operationList.push(calcList[1]);

            if(calcList[0] === 'NAND' || calcList[0] === 'NOR') this.bitByBitNorNand = true;

            if(this.numericBase === 'HEX'){

                this.calcOtherBases(16);  
    
            }else if(this.numericBase === 'DEC'){

                this.calcDec();

            }else if(this.numericBase === 'OCT'){

                this.calcOtherBases(8);

            }else if(this.numericBase === 'BIN'){

                this.calcOtherBases(2);

            }

            let expresion =  `${this._operationList.join(' ')} =`;
            let result = this.tempResult;
    
            this.clearnAll();
    
            this._operationList.push(result);
    
            this.convertToAllNumericBases(result);

            this.displayResult(result);
            this.displayExpresion(expresion);

        }

    }
    convertToAllNumericBases(numberToConvert){

        let hexNumber;
        let decNumber;
        let octNumber;
        let binNumber;

        if(this.numericBase === 'DEC'){
            
            hexNumber = this.getDecToOtherBase(numberToConvert, 16);
            decNumber = numberToConvert;
            octNumber = this.getDecToOtherBase(numberToConvert, 8);
            binNumber = this.getDecToOtherBase(numberToConvert, 2);

        }else if(this.numericBase === 'BIN'){

            hexNumber = this.getBinToOtherBase(numberToConvert, 16);
            decNumber = this.getBinToOtherBase(numberToConvert, 10);
            octNumber = this.getBinToOtherBase(numberToConvert, 8);
            binNumber = numberToConvert;

        }else if(this.numericBase === 'OCT'){

            hexNumber = this.getOctToOtherBase(numberToConvert, 16);
            decNumber = this.getOctToOtherBase(numberToConvert, 10);
            octNumber = numberToConvert;
            binNumber = this.getOctToOtherBase(numberToConvert, 2);

        }else if(this.numericBase === 'HEX'){

            hexNumber = numberToConvert;
            decNumber = this.getHexToOtherBase(numberToConvert, 10);
            octNumber = this.getHexToOtherBase(numberToConvert, 8);
            binNumber = this.getHexToOtherBase(numberToConvert, 2);

        }

        window.viewsCalculator.setInnerHtmlToElement(hexNumber, 'HEX-result');
        window.viewsCalculator.setInnerHtmlToElement(decNumber, 'DEC-result');
        window.viewsCalculator.setInnerHtmlToElement(octNumber, 'OCT-result');
        window.viewsCalculator.setInnerHtmlToElement(binNumber, 'BIN-result');


    }
    convertBinaryFromBtn(){

        this.bitToggleBtnReset(`btn-bit-1`, true);

        if(this._operationList[this._operationList.length - 1] && !this.isOperator(this._operationList[this._operationList.length - 1])){

            let binNum; 

            if(this.numericBase === 'HEX'){

                binNum = this.getHexToOtherBase(this._operationList[this._operationList.length - 1], 2);

            }else if(this.numericBase === 'DEC'){

                binNum = this.getDecToOtherBase(this._operationList[this._operationList.length - 1], 2);

            }else if(this.numericBase === 'OCT'){

                binNum = this.getOctToOtherBase(this._operationList[this._operationList.length - 1], 2);

            }else if(this.numericBase === 'BIN'){

                binNum = this._operationList[this._operationList.length - 1];

            }

            let binNumList

            if(binNum && binNum.length > 1){

                binNumList = binNum.split('');

            }else{

                binNumList = binNum.toString();

            }

            //console.log('Binary Num Split: ', binNumList);

            let index = 0;

            if(binNumList.length < 64){

                for(let i = binNumList.length - 1; i >= 0; i--){

                    let button = document.getElementById(`btn-bit-${i}`);
    
                    //console.log('Button Target: ', button);
    
                    button.innerHTML = binNumList[index];
    
                    if(binNumList[index] == '1') {
    
                        button.classList.add('color-pink')
    
                        //console.log('Button Class: ', button.classList);
    
                    };
    
                    if(index < binNumList.length) index ++;
    
                }

            }else{

                this.errorDetect('Fuction warning | convertBinaryFromBtn() | : The binary number has more them 64 bits! ');

            }

        }else{

            this.bitToggleBtnReset('btn-bit-0', true)

        }

    }
    convertOperationFromAnyBaseToDecimal(copyArray, baseNumber){

        let index = 0;

        copyArray.forEach(content=>{


            if(!this.isOperator(content)){

                let decNum;

                if(baseNumber === 2){

                   decNum = this.getBinToOtherBase(content, 10);

                }else if(baseNumber === 8){

                    decNum = this.getOctToOtherBase(content, 10);

                }else if(baseNumber === 16){

                    decNum = this.getHexToOtherBase(content, 10);

                }

                copyArray[index] = decNum;

            }

            index++;

        });

        //console.log('Array Result: ', copyArray);

        return copyArray;

    }
    getDecToOtherBase(numberToConvert, baseNumber){

        if(numberToConvert && numberToConvert != 0){

            let numberToConvertString = numberToConvert.toString() //Treats BigInt

            let integerPart = Math.floor(numberToConvertString);
            let fractionalPart = numberToConvertString - integerPart;        

            let numberConverted = integerPart.toString(baseNumber);

            if (fractionalPart > 0){

                numberConverted = numberConverted + '.';

                for(let i = 0; i < 10; i++){

                    fractionalPart *= baseNumber;
                    
                    let digit = Math.floor(fractionalPart);

                    numberConverted += digit.toString(baseNumber);

                    fractionalPart -= digit;

                    if(fractionalPart == 0) break;

                }

            }

            return numberConverted.toLocaleUpperCase();

        }else if(numberToConvert == 0){

            return 0;

        }

    }
    getBinToOtherBase(numberToConvert, baseNumber){

        try{

            let signal = numberToConvert[0] === "1" ? -1n : 1n;

            let usignedNumber = numberToConvert.slice(1);
            let [integerPart, fractionalPart] = usignedNumber.split(".");
            
            //integer part using BigInt

            let integerDecimal = BigInt('0b' + integerPart);

            let fractionDecimal = 0;

            if(fractionDecimal){

                let fractionValue = 0;

                for(let i = 0; i < fractionalPart.length; i++){

                    if(fractionalPart[i] === '1'){

                        fractionValue +=1 / Math.pow(2, i + 1);

                    }

                }

                fractionDecimal = fractionValue; //Here stay a number

            }

            let totalDecimal = (Number(signal * integerDecimal) + (Number(signal) * fractionDecimal));

            let integerResult = (signal * integerDecimal).toString(baseNumber).toUpperCase();

            let fractionalResult = "";

            if(fractionDecimal > 0){

                let fraction = Math.abs(fractionDecimal);

                fractionalResult = ".";

                let count = 0;

                while (fraction !== 0 && count < 20){

                    fraction *= baseNumber;

                    let digit = Math.floor(fraction);

                    fractionalResult += digit.toString(baseNumber).toUpperCase();

                    fraction -=digit;

                    count++;

                }

            }

            console.log('Binary number: ', numberToConvert);
            console.log('Signal: ', signal.toString());
            console.log('Integer part decimal: ', integerDecimal.toString());
            console.log('Fractional part decimal: ', fractionDecimal);
            console.log('Result: ', integerResult + fractionalResult);

            return integerResult + fractionalResult;

        }catch(error){

            this.errorDetect(error);

        }
        
    }
    getHexToOtherBase(numberToConvert, baseNumber){

        try{
            
            let [integerPart, fractionalPart] = numberToConvert.toString().toUpperCase().split(".");
            let decimalValue = parseInt(integerPart, 16);

            if(fractionalPart){

                let fractionDecimal = 0;

                for (let i = 0; i< fractionalPart.length; i ++){

                    fractionDecimal += parseInt(fractionalPart[i], 16) * Math.pow(16, -(i + 1));

                }

                decimalValue += fractionDecimal;

            }
            let intPart = Math.floor(decimalValue);
            let fracPart = decimalValue - intPart;

            let result = intPart.toString(baseNumber).toUpperCase();

            if (fracPart > 0) {
                result += '.';
                for (let i = 0; i < 10; i++) { // até 10 dígitos de precisão
                    fracPart *= baseNumber;
                    let digit = Math.floor(fracPart);
                    result += digit.toString(baseNumber).toUpperCase();
                    fracPart -= digit;
                    if (fracPart === 0) break;
                }
            }

            return result;

        }catch(error){

            this.errorDetect(error);

        }
        
    }
    getOctToOtherBase(numberToConvert, baseNumber){

        try {

            let [integerPart, fractionalPart] = numberToConvert.toString().toLocaleUpperCase().split('.');
            let decimalValue = parseInt(integerPart, 8);

            if(fractionalPart){

                let fractionDecimal = 0;

                for (let i = 0; i< fractionalPart.length; i ++){

                    fractionDecimal += parseInt(fractionalPart[i], 8) * Math.pow(8, -(i + 1));

                }

                decimalValue += fractionDecimal;

            }

            let intPart = Math.floor(decimalValue);
            let fracPart = decimalValue - intPart;

            let result = intPart.toString(baseNumber).toUpperCase();

            if(fracPart > 0){

                result += '.';

                for(let i = 0; i < 10; i++){

                    fracPart *= baseNumber;

                    let digit = Math.floor(fracPart);
                result += digit.toString(baseTarget).toUpperCase();
                fracPart -= digit;
                if (fracPart === 0) break;
            }
        }

        return result; // stop here!!

        }catch(error){

            this.errorDetect(error);

        }

    }
    isOperator(valueTocheck){

        let operatorList = ['*', '+', '-', '/', '%', '<<', '>>', '&', '|', '^', 'NAND', 'NOR'];

        if(this.numericBase === 'HEX'){

            if(operatorList.indexOf(valueTocheck) >= 0 || valueTocheck === '(' || valueTocheck === ')'){


                
            }else{

                valueTocheck = this.getHexToOtherBase(valueTocheck, 10);

            }

        }

        if(operatorList.indexOf(valueTocheck) >= 0 || valueTocheck === '(' || valueTocheck === ')'){

            //console.log('Is not a number');

            return true;

        }else if((!isNaN(parseFloat(valueTocheck) && isFinite(valueTocheck)))){

            //console.log('Is a number');

            return false;       

        }else{

            this.errorDetect('This number is not a operator or a number!');

        }

        

        

    }
    isOpenParentheses(valueTocheck){

        if(valueTocheck === '(') return true;

        return false;
        
    }
    isCloseParentheses(valueTocheck){

        if(valueTocheck === ')') return true;

        return false

    }
    parenthesesToClose(){

        let result = this.openParenthesesNum - this.closeParenthesesNum;

        if(result > 0){

            return result

        }else{

            return '';

        }

         

    }
    addDigits(value){

        this.tempResult = '';

        if(this._operationList.length <= 0){

            if(this.isOperator(value) === false || this.isOpenParentheses(value)){

                this._operationList.push(value);

                if(!this.isOpenParentheses(value)){

                    this.convertToAllNumericBases(value);

                }

                if(this.isOpenParentheses(value)){

                    this.displayExpresion(`${this._operationList.join(' ')} `);

                    this.openParenthesesNum = this.openParenthesesNum + 1;

                    window.viewsCalculator.setInnerHtmlToElement(this.parenthesesToClose(), 'open-parentheses-sub');

                }
            }

        }else if(this._operationList.length > 0){

            //console.log('_operation has more then 1 lenght!');

            if(this.isOperator(this._operationList[this._operationList.length - 1]) === true){

                if(this.isOperator(value) === false){

                    if(this.isCloseParentheses(this._operationList[this._operationList.length - 1])){

                        this._operationList.push('*');
                        this._operationList.push(value);

                    }else {

                        this._operationList.push(value);

                    }

                    this.convertToAllNumericBases(value);


                }else if(this.isOperator(value) === true && !(this.isOpenParentheses(value) || this.isCloseParentheses(value)) && (this._operationList[this._operationList.length - 1] !== '(' && this._operationList[this._operationList.length - 1] !== ')')){

                    this._operationList.pop();

                    this._operationList.push(value);

                    this.displayExpresion(`${this._operationList.join(' ')} `);

                }else if(this.isOperator(value) === true && !(this.isOpenParentheses(value) || this.isCloseParentheses(value)) && (this._operationList[this._operationList.length - 1] !== '(' && this._operationList[this._operationList.length - 1] === ')')){

                    this._operationList.push(value);

                }else if(this.isOpenParentheses(value)){

                    if(this._operationList[this._operationList.length - 1] === ')'){

                        this._operationList.push('*');

                        this._operationList.push(value);

                    }else{

                        this._operationList.push(value);

                    }

                    this.openParenthesesNum = this.openParenthesesNum + 1;

                    window.viewsCalculator.setInnerHtmlToElement(this.parenthesesToClose(), 'open-parentheses-sub');

                    this.displayExpresion(`${this._operationList.join(' ')} `);

                }else if(this.isCloseParentheses(value)){

                    if(this._operationList[this._operationList.length - 1] === '('){

                        this._operationList.push('0');

                        this._operationList.push(value);

                    }else{

                        if(this.parenthesesToClose() > 0){

                            this._operationList.push(value);

                        }

                    }

                    this.closeParenthesesNum = this.closeParenthesesNum + 1;

                    window.viewsCalculator.setInnerHtmlToElement(this.parenthesesToClose(), 'open-parentheses-sub');

                    this.displayExpresion(`${this._operationList.join(' ')} `);

                }


            }else if(this.isOperator(this._operationList[this._operationList.length - 1]) === false){

                //console.log('The last in _operation is a number! ');

                if(this.isOperator(value) === false){

                    //console.log('The next value is a number! ');

                    //console.log('Word size pass? ', this.verifyWordRange(`${this._operationList[this._operationList.length - 1]}${value}`));

                    let rengeVerify;

                    if(this.numericBase === 'DEC'){

                        rengeVerify = `${this._operationList[this._operationList.length - 1]}${value}`;
            
                    }else if(this.numericBase === 'BIN'){
            
                        rengeVerify = `${this.getBinToOtherBase(this._operationList[this._operationList.length - 1], 10)}${this.getBinToOtherBase(value, 10)}`;
            
                    }else if(this.numericBase === 'OCT'){
            
                        rengeVerify = `${this.getOctToOtherBase(this._operationList[this._operationList.length - 1], 10)}${this.getOctToOtherBase(value, 10)}`;
            
                    }
                    else if(this.numericBase === 'HEX'){
            
                        rengeVerify = `${this.getHexToOtherBase(this._operationList[this._operationList.length - 1], 10)}${this.getHexToOtherBase(value, 10)}`;
            
                    }

                    if(this.verifyWordRange(rengeVerify)){

                        let content = this._operationList[this._operationList.length - 1];

                        this._operationList.pop();

                        content = content + value;

                        this._operationList.push(content);

                        this.convertToAllNumericBases(content);

                    }


                }else if(this.isOperator(value) === true && !(this.isOpenParentheses(value) || this.isCloseParentheses(value))){

                    this._operationList.push(value);

                    this.displayExpresion(`${this._operationList.join(' ')} `);


                }else if(this.isOpenParentheses(value)){

                    this._operationList.push('*');

                    this._operationList.push(value);

                    this.displayExpresion(`${this._operationList.join(' ')} `);

                    this.openParenthesesNum = this.openParenthesesNum + 1;

                    window.viewsCalculator.setInnerHtmlToElement(this.parenthesesToClose(), 'open-parentheses-sub');

                }else if(this.isCloseParentheses(value)){

                    if(this._operationList[this._operationList.length - 1] === '('){

                        this._operationList.push('0');

                        this._operationList.push(value);

                    }else{

                        if(this.parenthesesToClose() > 0){

                            this._operationList.push(value);

                        }

                    }

                    this.closeParenthesesNum = this.closeParenthesesNum + 1;

                    window.viewsCalculator.setInnerHtmlToElement(this.parenthesesToClose(), 'open-parentheses-sub');

                    this.displayExpresion(`${this._operationList.join(' ')} `);

                }

            }

        }

        this.convertBinaryFromBtn();
        
        //console.log('Can have a preview calc? ', this._operationList.length > 3 && this.isOperator(this._operationList[this._operationList.length - 1]) && (this.parenthesesToClose() == 0));

        if(this._operationList.length > 3 && this.isOperator(this._operationList[this._operationList.length - 1]) && (this.parenthesesToClose() == 0)){

            if(this.numericBase === 'HEX'){

                this.calcOtherBases(16);  
    
            }else if(this.numericBase === 'DEC'){

                this.calcDec();  
    
            }else if(this.numericBase === 'OCT'){

                this.calcOtherBases(8);

            }else if(this.numericBase === 'BIN'){

                this.calcOtherBases(2);

            }
        }

        this.updateDisplay();

    }
    calcDec(){

        let storeOperator;

        if(this.isOperator(this._operationList[this._operationList.length - 1]) && !(this.isOpenParentheses(this._operationList[this._operationList.length - 1]) || this.isCloseParentheses(this._operationList[this._operationList.length - 1]))){
            
            storeOperator = this._operationList[this._operationList.length - 1];

            this._operationList.pop();
    
        }

        

        if((this._operationList[this._operationList.length - 2] && this._operationList[this._operationList.length - 1])){

            if(this.isOpenParentheses(this._operationList[this._operationList.length - 2])){

                this.lastCalc = `+ ${this._operationList[this._operationList.length - 1]}`;

            }else if(this.isCloseParentheses(this._operationList[this._operationList.length - 1])){

                if(this.isOpenParentheses(this._operationList[this._operationList.length - 3])){

                    this.lastCalc = `+ ${this._operationList[this._operationList.length - 2]}`;
    
                }else{

                    this.lastCalc = `${this._operationList[this._operationList.length - 3]} ${this._operationList[this._operationList.length - 2]}`;
    
                }

            }else{

                this.lastCalc = `${this._operationList[this._operationList.length - 2]} ${this._operationList[this._operationList.length - 1]}`

            }

        }

        if(this.parenthesesToClose() > 0 ){

            let remain = this.parenthesesToClose();

            for (remain ; remain > 0; remain--){

                if(this.isOperator(this._operationList[this._operationList.length - 1]) && !(this.isOpenParentheses(this._operationList[this._operationList.length - 1]) || this.isCloseParentheses(this._operationList[this._operationList.length - 1]))){

                    this._operationList.push('0');
                    this._operationList.push(')');

                }else{

                    this._operationList.push(')');

                }

            }

        }

        let result;

        if((this.bitShiftType === 'logical' || this.bitShiftType == 'rotateCircular' || this.bitShiftType === 'throughCarry') && (this._operationList.includes('>>') || this._operationList.includes('<<'))){

            let filtered = this.returnFilteredAndCalcByFunction(operation => operation === '<<' || operation === '>>');

            if(this.bitShiftType === 'logical'){

                let decUnsigned = this.convertToUnsigned(filtered[0], this.numericWordSize);

                if(this._operationList.includes('<<')){

                    result  = this.returnCalc(this._operationList);

                }else{

                    result = this.getLogicalShiftRight(decUnsigned, filtered[2]);

                }

            }else if(this.bitShiftType === 'rotateCircular'){

                let decUnsigned = this.convertToUnsigned(filtered[0], this.numericWordSize);
                let rotateSide;

                if(filtered.includes('>>')){

                    rotateSide = 'right';

                }else if(filtered.includes('<<')){

                    rotateSide = 'left';

                }

                result = this.getRotateCircularShift(decUnsigned, filtered[2], rotateSide, this.numericWordSize);

            }else if(this.bitShiftType === 'throughCarry'){

                let decUnsigned = this.convertToUnsigned(filtered[0], this.numericWordSize)
                let rotateSide;

                if(filtered.includes('>>')){

                    rotateSide = 'right';

                }else if(filtered.includes('<<')){

                    rotateSide = 'left';

                }

                result = this.getThroughCarry(decUnsigned, filtered[2], rotateSide, this.numericWordSize)

            }

        }else if(this.bitByBitNorNand){
            
            result = this.calcNandNor(this._operationList);

        }else{

            result  = this.returnCalc(this._operationList);

        }

        this.displayResult(result);
        
        this.tempResult = result;

        this.convertToAllNumericBases(result);

        if(storeOperator){

            this._operationList.push(storeOperator);

        }
    
    }
    calcOtherBases(baseNumber){

        let storeOperator;
        let result;

        if(this.isOperator(this._operationList[this._operationList.length - 1]) && !(this.isOpenParentheses(this._operationList[this._operationList.length - 1]) || this.isCloseParentheses(this._operationList[this._operationList.length - 1]))){
            
            storeOperator = this._operationList[this._operationList.length - 1];

            this._operationList.pop();
    
        }

        if((this._operationList[this._operationList.length - 2] && this._operationList[this._operationList.length - 1])){

            if(this.isOpenParentheses(this._operationList[this._operationList.length - 2])){

                this.lastCalc = `+ ${this._operationList[this._operationList.length - 1]}`;

            }else if(this.isCloseParentheses(this._operationList[this._operationList.length - 1])){

                if(this.isOpenParentheses(this._operationList[this._operationList.length - 3])){

                    this.lastCalc = `+ ${this._operationList[this._operationList.length - 2]}`;
    
                }else{

                    this.lastCalc = `${this._operationList[this._operationList.length - 3]} ${this._operationList[this._operationList.length - 2]}`;
    
                }

            }else{

                this.lastCalc = `${this._operationList[this._operationList.length - 2]} ${this._operationList[this._operationList.length - 1]}`

            }

        }

        if(this.parenthesesToClose() > 0 ){

            let remain = this.parenthesesToClose();

            for (remain ; remain > 0; remain--){

                if(this.isOperator(this._operationList[this._operationList.length - 1]) && !(this.isOpenParentheses(this._operationList[this._operationList.length - 1]) || this.isCloseParentheses(this._operationList[this._operationList.length - 1]))){

                    this._operationList.push('0');
                    this._operationList.push(')');

                }else{

                    this._operationList.push(')');

                }

            }

        }

        let convertedArray = this.convertOperationFromAnyBaseToDecimal([...this._operationList], baseNumber);


        if((this.bitShiftType === 'logical' || this.bitShiftType == 'rotateCircular' || this.bitShiftType === 'throughCarry') && (convertedArray .includes('>>') || convertedArray .includes('<<'))){

            let filtered = this.returnFilteredAndCalcByFunction(operation => operation === '<<' || operation === '>>', convertedArray);

            if(this.bitShiftType === 'logical'){

                let decUnsigned = this.convertToUnsigned(filtered[0], this.numericWordSize);

                if(convertedArray .includes('<<')){

                    result  = this.returnCalc(convertedArray);

                }else{

                    result = this.getLogicalShiftRight(decUnsigned, filtered[2]);

                }

            }else if(this.bitShiftType === 'rotateCircular'){

                let decUnsigned = this.convertToUnsigned(filtered[0], this.numericWordSize);
                let rotateSide;

                if(filtered.includes('>>')){

                    rotateSide = 'right';

                }else if(filtered.includes('<<')){

                    rotateSide = 'left';

                }

                result = this.getRotateCircularShift(decUnsigned, filtered[2], rotateSide, this.numericWordSize);

            }else if(this.bitShiftType === 'throughCarry'){

                let decUnsigned = this.convertToUnsigned(filtered[0], this.numericWordSize)
                let rotateSide;

                if(filtered.includes('>>')){

                    rotateSide = 'right';

                }else if(filtered.includes('<<')){

                    rotateSide = 'left';

                }

                result = this.getThroughCarry(decUnsigned, filtered[2], rotateSide, this.numericWordSize)

            }

        }else if(this.bitByBitNorNand){
            
            result = this.calcNandNor(convertedArray);

        }else{

            result  = this.returnCalc(convertedArray );

        }

        result = this.getDecToOtherBase(result, baseNumber);

        this.displayResult(result);
        
        this.tempResult = result;

        this.convertToAllNumericBases(result);

        if(storeOperator){

            this._operationList.push(storeOperator);

        }

    }
    calcNandNor(expresionArray){

        if(this.openParenthesesNum <= 0){

            console.log('No parenteses');

            let result = this.calcAndFilterBasicNand(expresionArray);

            return result;

        }else{

            let result = this.calcAndFilterComplexNand([...expresionArray]);

            return result;

        }

    }
    calcAndFilterComplexNand(expresionArray){

        //console.log('Initial', expresionArray);

        while(expresionArray.length > 1){

            let firstExecute = [...this.findOrder(expresionArray)];

            //console.log(firstExecute);

            let tempArray = [];

            if(firstExecute.length > 1){

                for(let i = firstExecute[0] + 1; i < firstExecute[1]; i++){

                    tempArray.push(expresionArray[i]);
    
                }

            }

            //console.log('Temp result Before', tempArray);

            let tempResult

            if(tempArray.length > 1){

                tempResult = this.calcAndFilterBasicNand(tempArray);

            }

            //console.log('Temp Result', tempResult);

            if(firstExecute.length >= 2){

                expresionArray.splice(firstExecute[0], (firstExecute[1] - firstExecute[0])+1, tempResult);

            }else{

                //console.log('To basic: ', expresionArray);

                expresionArray = [this.calcAndFilterBasicNand(expresionArray)]; 

            }

            //console.log('Processing: ', expresionArray);

        }

        //console.log('End', expresionArray);

        return expresionArray[0];

    }
    findOrder(expresionArray){

        let openParenthesesPositions = this.returnAllIndex(expresionArray, operation => operation === '(');

        let closeParenthesesPositions = this.returnAllIndex(expresionArray, operation => operation === ')');

        let execOrder = [];

        //console.log('Open ', openParenthesesPositions);

        //console.log('Close ', closeParenthesesPositions);

        let i = 0;

        while(openParenthesesPositions.length > 0){

            let nextToOrder = this.verifyOrder(openParenthesesPositions, closeParenthesesPositions, i);

            if(nextToOrder || nextToOrder === 0){

                //console.log('Before push ',nextToOrder);

                execOrder.push(openParenthesesPositions[nextToOrder]);

                let greaterThanArray = []
                
                closeParenthesesPositions.forEach(element=>{

                    if(element > openParenthesesPositions[nextToOrder]){

                        greaterThanArray.push(element);

                    }

                });

                execOrder.push(greaterThanArray[0]);

                //console.log('Ordem de execução: ',execOrder);

                openParenthesesPositions.splice(nextToOrder, 1);
                closeParenthesesPositions.splice(closeParenthesesPositions.indexOf(greaterThanArray[0]), 1);

                //console.log('Open: ',openParenthesesPositions);

                i = 0;

            }else{

                i++;

            }

            if(i > openParenthesesPositions.length) break;

            //console.log('I: ', i);

            //console.log('proximo execução: ',nextToOrder);

        }

        return execOrder;

    }
    verifyOrder(arrayOpen, arrayClose, position){

        if(arrayOpen[position + 1]){

            if((arrayOpen[position + 1] > arrayOpen[position])&&( arrayOpen[position + 1] > arrayClose[position])){

                return position
    
            }else{
    
                return false;
    
            }

        }else{

            return position;

        }

    }
    verifyWordRange(numberEntry){

        let number = numberEntry;

        number = parseInt(number);

        //console.log('number Entry: ', number);

        if(this.numericWordSize === "QWORD"){

            //console.log('Stay in QWORD Range?: ', number < '18446744073709552000' && number > '-18446744073709552000');

            if(number < '18446744073709552001' && number > '-18446744073709552001') return true;

        }
        if(this.numericWordSize === "DWORD") {

            //console.log('Stay in DWORD Range?: ', number < '4294967295' && number > '-4294967295');
            if(number < '4294967296' && number > '-4294967296') return true;

        }
        if(this.numericWordSize === "WORD"){

            //console.log('Stay in WORD Range?: ', number < '65535' && number > '-65535');
            if(number < '65536' && number > '-65536') return true;

        }
        if(this.numericWordSize === "BYTE") {

            //console.log('Stay in BYTE Range?: ', number < '255' && number > '-255');

            if(number < '256' && number > '-256') return true;

        }

        return false;

    }
    calcAndFilterBasicNand(expresionArray){

        let tempArray = [...expresionArray];

        let nandNorPositions = this.returnAllIndex(tempArray, operation => operation === 'NAND' || operation === 'NOR');

        //console.log("NAND Positions: ", nandNorPositions);

        if(nandNorPositions.length > 0){

            //console.log('Initial Temp: ', tempArray);

            let index = 0;

            let endArrayCalc = [];

            let lastInFor = 0

            nandNorPositions.forEach(element=>{

                let arrayToCalc = [];

                index++;

                for( let i = lastInFor; i < element; i++){

                    //console.log('element = ', element);

                    //console.log('i < element? ', i < element);

                    arrayToCalc.push(tempArray[i]);

                }

                //console.log('Array to Calc loanding... ', arrayToCalc);

                endArrayCalc.push(this.returnCalc(arrayToCalc));

                endArrayCalc.push(tempArray[element]);

                //console.log('end array loanding... ', endArrayCalc);

                //console.log('Is the Last?  ', index + 1 > nandNorPositions.length);

                let lastPartArray = [];

                if(index + 1 > nandNorPositions.length){

                    //console.log('In last for');

                    for(let loop = element + 1; loop < tempArray.length; loop++){

                        lastPartArray.push(tempArray[loop]);

                        //console.log('Last part of temp array: ', lastPartArray);
        
                    }


                    endArrayCalc.push(this.returnCalc(lastPartArray));

                }

                lastInFor = element + 1;

            });

            tempArray = [...endArrayCalc];

            let nandPositions = this.returnAllIndex(tempArray, operation => operation === 'NAND' || operation === 'NOR');

            //console.log("NAND Positions: ", nandPositions);

            //console.log('Array to calc Result: ', endArrayCalc);

            while(nandPositions && nandPositions.length > 0){

                let firstOperandIndex = nandPositions[0] - 1;
                let secondOperandIndex = nandPositions[0] + 1;

                if (firstOperandIndex < 0 || secondOperandIndex >= tempArray.length) {

                    this.errorDetect(`Erro: Índices fora dos limites ${ firstOperandIndex, secondOperandIndex, tempArray }`);

                }

                let newValue;

                //console.log('First Operand: ', firstOperandIndex);
                //console.log('Second Operand: ', firstOperandIndex);

                //console.log('ISSO é Um NAD? ', tempArray[nandPositions[0]], ' ', tempArray[nandPositions[0]] === 'NAND');

                if(tempArray[nandPositions[0]] === 'NAND'){

                    newValue = this.returnCalc(this.returnNandNorExpressionArray(tempArray[firstOperandIndex], tempArray[secondOperandIndex], 'nand'));

                }else{

                    newValue = this.returnCalc(this.returnNandNorExpressionArray(tempArray[firstOperandIndex], tempArray[secondOperandIndex], 'nor'));

                }

                //console.log('Novo Valor NAND: ', newValue);

                tempArray.splice(firstOperandIndex, 3, newValue);

                nandPositions = this.returnAllIndex(tempArray, operation => operation === 'NAND' || operation === 'NOR');

                //console.log('Pós processamento Temp: ', tempArray);
            };

        }

        this.bitByBitNorNand = false;

        let calc = this.returnCalc(tempArray);

        tempArray = [calc];

        //console.log('Array final: ', tempArray);

        return tempArray[0];

    }
    returnNandNorExpressionArray(firstValue, secondValue, operation){

        if(operation === 'nand'){

            return ['~', '(', firstValue, '&', secondValue, ')'];

        }else if(operation === 'nor'){

            return ['~', '(', firstValue, '|', secondValue, ')'];

        }

    }
    returnCalc(expresionArray){

        console.log('Return Calc | expression recive: ', expresionArray);

        try{

            return new Function(`return ${expresionArray.join(' ')} `)();

        }catch(err){

            this.errorDetect( `Error In this Calc: ${expresionArray.join(' ')}
            ${err}`);

        }

    }
    returnFilteredAndCalcByFunction(filterFunction, arrayFilter = [...this._operationList]){

        let filtered = [];
        let arraySize = arrayFilter.length;

        if(arraySize === 3){

            for(let i = 0; i < arraySize; i ++){

                filtered.push(arrayFilter[i]);

            }

            console.log(filtered);

        }else if(arraySize > 3){

            let shiftPosition = this.returnAllIndex(arrayFilter, filterFunction);

            let lastPosition = 0;

            shiftPosition.forEach(position=>{

                let tempCalc = []

                for(let i = lastPosition; i < position; i ++){

                    tempCalc.push(arrayFilter);

                }

                lastPosition = position + 1;

                if(this.bitByBitNorNand){

                    filtered.push(this.calcAndFilterComplexNand(tempCalc), arrayFilter[position]);

                }else{

                    filtered.push(this.returnCalc(tempCalc), arrayFilter[position]);

                }

            });

            if(lastPosition < arraySize){

                let tempCalc = []

                for(let i = lastPosition; i < arraySize; i++){

                    tempCalc.push(arrayFilter[i]);

                }

                if(this.bitByBitNorNand){

                    filtered.push(this.calcAndFilterComplexNand(tempCalc));

                }else{

                    filtered.push(this.returnCalc(tempCalc));

                }

            }

        }

        console.log(filtered);

        return filtered;

    }
    returnAllIndex(array, condition){

        return array.map((item, index) => condition(item, index, array) ? index : -1).filter(index => index !== -1);

    }
    getThroughCarry(decNumber, shiftNumber, rotateSide, wordSize){

        let wordToBitSize = {
            'QWORD':64,
            'DWORD':32,
            'WORD':16,
            'BYTE':8,
        }

        let bits = wordToBitSize[wordSize];

        let carry = window.prompt('Enter initial Carry');

        carry === 1 ? carry = 1 : carry = 0;

        if(bits <= 32){

            if(rotateSide === 'left'){

                return rotateLeftCarry(decNumber, shiftNumber, bits, carry);

            }
            if(rotateSide === 'right'){

                return rotateRightCarry(decNumber, shiftNumber, bits, carry);

            }

        }else if(bits === 64){

            let bigValue = BigInt(decNumber) & ((BigInt(1) << BigInt(64)) - BigInt(1));

            if(rotateSide === 'left'){

                return rotateLeftCarry64(bigValue, shiftNumber, carry);

            }
            if(rotateSide === 'right'){

                return rotateRightCarry64(bigValue, shiftNumber, carry);

            }

        }

        function rotateLeftCarry(value, bits, totalBits, carryFlag){

            let mask = (1 << totalBits) - 1;

            for (let i = 0; i < bits; i++) {

                let newCarry = value & 1;

                value = ((carryFlag << (totalBits - 1)) | (value >>> 1)) & mask;

                carryFlag = newCarry;

            }

            return value;

        }

        function rotateRightCarry(value, bits, totalBits, carryFlag){

            let mask = (1 << totalBits) - 1;

            for (let i = 0; i < bits; i++) {

                let newCarry = (value >>> (totalBits - 1)) & 1;

                value = ((value << 1) | carryFlag) & mask;

                carryFlag = newCarry;

            }

            return value;

        }

        function rotateLeftCarry64(value, bits, carryFlag){

            let mask = (BigInt(1) << BigInt(64)) - BigInt(1);

            let bigValue = BigInt(value) & mask;

            for (let i = 0; i < bits; i++) {

                let newCarry = (bigValue >> BigInt(63)) & BigInt(1);

                bigValue = ((bigValue << BigInt(1)) | BigInt(carryFlag)) & mask;

                carryFlag = Number(newCarry);

            }

            return bigValue;

        }
        function rotateRightCarry64(value, bits, carryFlag){

            let mask = (BigInt(1) << BigInt(64)) - BigInt(1);

            let bigValue = BigInt(value) & mask;

            for (let i = 0; i < bits; i++) {

                let newCarry = bigValue & BigInt(1);

                bigValue = ((BigInt(carryFlag) << BigInt(63)) | (bigValue >> BigInt(1))) & mask;

                carryFlag = Number(newCarry);

            }

            return bigValue;

        }


    }
    getRotateCircularShift(decNumber, shiftNumber, rotateSide, wordSize) {

        let wordToBitSize = {
            'QWORD': 64,
            'DWORD': 32,
            'WORD': 16,
            'BYTE': 8,
        };
    
        let bits = wordToBitSize[wordSize];
        let shift = shiftNumber % bits;
    
        if (bits <= 32) {
            if (rotateSide === 'left') {
                return rotateLeft(decNumber, shift, bits);
            }
            if (rotateSide === 'right') {
                return rotateRight(decNumber, shift, bits);
            }
        } else if (bits === 64) {
            const bigValue = BigInt(decNumber);
            const maxValue64 = (BigInt(1) << BigInt(64)) - BigInt(1);
    
            if (rotateSide === 'left') {
                return Number(((bigValue << BigInt(shift)) | (bigValue >> (BigInt(64) - BigInt(shift)))) & maxValue64);
            }
            if (rotateSide === 'right') {
                return Number(((bigValue >> BigInt(shift)) | (bigValue << (BigInt(64) - BigInt(shift)))) & maxValue64);
            }
        }
    
        function rotateLeft(value, shift, totalBits) {
            return ((value << shift) | (value >>> (totalBits - shift))) & ((1 << totalBits) - 1);
        }
    
        function rotateRight(value, shift, totalBits) {
            return ((value >>> shift) | (value << (totalBits - shift))) & ((1 << totalBits) - 1);
        }
    }
    getLogicalShiftRight(decNumber, shiftNumber){

        let divisor = 2 ** shiftNumber;

        let result = decNumber/divisor;

        if(result % 1 != 0 && !isNaN(result % 1)){

          result = result.toString();

          let resultArray = result.split('');

          result = ''

          let dotIndex;
          
          dotIndex = resultArray.indexOf('.');

          for(let i = 0; i < 2; i++){

            result = result + resultArray[i];

          }

        }

        return result;

    }
    convertToUnsigned(decValue, wordSize){

        let wordToBitSize = {
            'QWORD':64,
            'DWORD':32,
            'WORD':16,
            'BYTE':8,
        }

        let bits = wordToBitSize[wordSize];

        if(bits <= 32){

            let maxValue = Math.pow(2, bits);

            return (decValue >>> 0) & (maxValue - 1);

        }else if( bits === 64){

            let bigValue = BigInt(decValue);

            let maxValue64 = BigInt(2) ** BigInt(64);

            let usignedValue64 = bigValue < 0 ? maxValue64 + bigValue : bigValue;

            return usignedValue64.toString();

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
    updateDisplay(){

        if(this._operationList[this._operationList.length - 1]){

            if(!this.isOperator(this._operationList[this._operationList.length - 1])){

                window.viewsCalculator.setInnerHtmlToElement(this._operationList[this._operationList.length - 1], 'current-output');
    
            }
            
            if((this._operationList.length % 2) === 0){
                
                window.viewsCalculator.setInnerHtmlToElement(this._operationList.join(' '), 'previous-output');
    
            }

        }else{

            this.clearnAll();

        }

    }
    displayResult(result){

        window.viewsCalculator.setInnerHtmlToElement(result, 'current-output');

       setTimeout(()=>
        {

            //console.log('_operationList Before: ', this._operationList) //Check convertBinaryFromBtn

            this.convertBinaryFromBtn();

        },500)

    }
    displayExpresion(expresion){

        window.viewsCalculator.setInnerHtmlToElement(expresion, 'previous-output');

    }
    errorDetect(info){

        console.error(info);
        
        setTimeout(()=>{

            this.clearnAll();

        }, "100");

    }

    clearnAll(){

        this._operationList = [];
        this.tempResult = '';

        this.displayResult('0');
        this.displayExpresion('');
        this.closeParenthesesNum = 0;
        this.openParenthesesNum = 0;
        window.viewsCalculator.setInnerHtmlToElement(' ', 'open-parentheses-sub');

        window.viewsCalculator.setInnerHtmlToElement(0, 'HEX-result');
        window.viewsCalculator.setInnerHtmlToElement(0, 'DEC-result');
        window.viewsCalculator.setInnerHtmlToElement(0, 'OCT-result');
        window.viewsCalculator.setInnerHtmlToElement(0, 'BIN-result');

        if(this.firstCallBitToggle){

            this.bitToggleBtnReset(`btn-bit-1`, true);

        }

    }
}