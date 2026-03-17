import StellarViews from '/js/views/StellarViews.js';
import ConverterMode from '/js/class/ConverterMode.js';
import StellarStandardMode from '/js/class/StandardMode.js';

export default class History{

    constructor(){

        this.calcList = [];
        this.calcResult = [];
        this.lastListPosition;
        this.historyType = 'standard';
        this.viewsCalculator = new StellarViews();
        this.calculatorStandardMode = StellarStandardMode();
        this.calculatorConverterMode = new ConverterMode();

        this.addEventToClearnHistory();
        
    }

    changeHistoryType(type){

        this.historyType = type;

        this.clearHistory();

    }

    addToHistory(calculation, result, valueToSave = ''){

        this.calcList.push(calculation);
        this.calcResult.push(result);

        this.lastListPosition = this.createNewPosition();

        if(this.historyType == 'standard'){
            calculation = calculation.replace('/','÷');
            calculation = calculation.replace('*','x');
        }

        if(valueToSave != ''){

            this.assemblerHistoric(calculation, result, this.lastListPosition, valueToSave);

        }else{

            this.assemblerHistoric(calculation, result, this.lastListPosition);

        }

    }

    assemblerHistoric(calculation, result, position, valueToSave = ''){

        let spanCalculation = this.viewsCalculator.returnSpan(calculation);

        spanCalculation.classList.add('history-calc', 'bar-basic-efect');

        let spanResult = this.viewsCalculator.returnSpan(result);

        spanResult.classList.add('history-result', 'bar-basic-efect');

        let li = this.viewsCalculator.returnLi([spanCalculation, spanResult], true, 2);

        li.dataset.position = position.toString();

        if(valueToSave != ''){

            li.dataset.value = valueToSave;

        }

        li.addEventListener('click', ()=>{

            this.sentToDisplay(li.dataset.position, li.dataset.value);

        });

        this.viewsCalculator.historyCalcAndResultsList.appendChild(li);

        this.historyAdapt(calculation.length, result.length, li);

    }

    addEventToClearnHistory(){

        document.getElementById('button-trash-history').addEventListener('click', ()=>{

            this.clearHistory();

        });

    }

    clearHistory(){

        this.calcList = [];
        this.calcResult = [];
        this.lastListPosition = '';

        this.viewsCalculator.historyCalcAndResultsList.innerHTML = '';

    }

    sentToDisplay(position, savedValue){

        if(this.historyType == 'standard'){

            this.calculatorStandardMode.historyRequest( this.calcList[parseInt(position)], this.calcResult[parseInt(position)]);

        }
        if(this.historyType == 'converter'){

            this.calculatorConverterMode.historyRequest(savedValue);

        }


    }

    createNewPosition(){

        if(!this.lastListPosition && this.lastListPosition !== 0){

            return 0;

        }else{

            this.lastListPosition = this.lastListPosition + 1;

            return this.lastListPosition;

        }

    }

    historyAdapt(sizeOfCalc, sizeOfResult, historyEl){

        historyEl.id = `id-size-under${historyEl.dataset.position}`;

        if(sizeOfCalc > 23 || sizeOfResult > 23){

            //console.log(sizeOfCalc, sizeOfResult);

            this.viewsCalculator.changeElementSize('increase', 0.20, historyEl, '', 22, '%');

            this.viewsCalculator.changeElementFontSize('decrease', 0.20, '', '2.3', 'rem', historyEl.children[0]);
            this.viewsCalculator.changeElementFontSize('decrease', 0.20, '', '2.3', 'rem', historyEl.children[1]);

        }
        if(sizeOfCalc > 26 || sizeOfResult > 26){

            //console.log(sizeOfCalc, sizeOfResult);

            this.viewsCalculator.changeElementSize('increase', 0.20, historyEl, '', 22, '%');

            this.viewsCalculator.changeElementFontSize('decrease', 0.10, '', '1.84', 'rem', historyEl.children[0]);
            this.viewsCalculator.changeElementFontSize('decrease', 0.10, '', '1.84', 'rem', historyEl.children[1]);

        }
        if(sizeOfCalc > 29 || sizeOfResult > 29){

            //console.log(sizeOfCalc, sizeOfResult);

            this.viewsCalculator.changeElementSize('increase', 0.20, historyEl, '', 22, '%');

            this.viewsCalculator.changeElementFontSize('decrease', 0.10, '', '1.656', 'rem', historyEl.children[0]);
            this.viewsCalculator.changeElementFontSize('decrease', 0.10, '', '1.656', 'rem', historyEl.children[1]);

        }
        if(sizeOfCalc > 32 || sizeOfResult > 32){

            //console.log(sizeOfCalc, sizeOfResult);

            this.viewsCalculator.changeElementSize('increase', 0.20, historyEl, '', 22, '%');

            this.viewsCalculator.changeElementFontSize('decrease', 0.13, '', '1.4904', 'rem', historyEl.children[0]);
            this.viewsCalculator.changeElementFontSize('decrease', 0.13, '', '1.4904', 'rem', historyEl.children[1]);

        }
        if(sizeOfCalc > 42 || sizeOfResult > 42){

            //console.log(sizeOfCalc, sizeOfResult);

            this.viewsCalculator.changeElementSize('increase', 0.20, historyEl, '', 22, '%');

            this.viewsCalculator.changeElementFontSize('decrease', 0.13, '', '1.29665', 'rem', historyEl.children[0]);
            this.viewsCalculator.changeElementFontSize('decrease', 0.13, '', '1.29665', 'rem', historyEl.children[1]);

        }
        if(sizeOfCalc > 47 || sizeOfResult > 47){

            //console.log(sizeOfCalc, sizeOfResult);

            this.viewsCalculator.changeElementSize('increase', 0.20, historyEl, '', 22, '%');

            this.viewsCalculator.changeElementFontSize('decrease', 0.10, '', '1.12809', 'rem', historyEl.children[0]);
            this.viewsCalculator.changeElementFontSize('decrease', 0.10, '', '1.12809', 'rem', historyEl.children[1]);

        }

    }

}