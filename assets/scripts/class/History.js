class History{

    constructor(){

        this.calcList = [];
        this.calcResult = [];
        this.lastListPosition;
        this.historyType = 'standard';

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

        calculation = calculation.replace('/','÷');
        calculation = calculation.replace('*','x');

        if(valueToSave != ''){

            this.assemblerHistoric(calculation, result, this.lastListPosition, valueToSave);

        }else{

            this.assemblerHistoric(calculation, result, this.lastListPosition);

        }

    }

    assemblerHistoric(calculation, result, position, valueToSave = ''){

        let spanCalculation = window.viewsCalculator.returnSpan(calculation);

        spanCalculation.classList.add('history-calc');

        let spanResult = window.viewsCalculator.returnSpan(result);

        spanResult.classList.add('history-result');

        let li = window.viewsCalculator.returnLi([spanCalculation, spanResult], true, 2);

        li.dataset.positon = position.toString();

        if(valueToSave != ''){

            li.dataset.value = valueToSave;

        }

        li.addEventListener('click', ()=>{

            this.sentToDisplay(li.dataset.positon, li.dataset.value);

        });

        window.viewsCalculator.historyCalcAndResultsList.appendChild(li)

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

        window.viewsCalculator.historyCalcAndResultsList.innerHTML = '';

    }

    sentToDisplay(position, savedValue){

        if(this.historyType == 'standard'){

            window.calculatorStandardMode.historyRequest( this.calcList[parseInt(position)], this.calcResult[parseInt(position)]);

        }
        if(this.historyType == 'converter'){

            window.calculatorConverterMode.historyRequest(savedValue);

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

}