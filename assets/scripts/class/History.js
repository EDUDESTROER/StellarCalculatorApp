class History{

    constructor(){

        this.calcList = [];
        this.calcResult = [];
        this.lastListPosition;

        this.addEventToClearnHistory();
        
    }

    addToHistory(calculation, result){

        this.calcList.push(calculation);
        this.calcResult.push(result);

        this.lastListPosition = this.createNewPosition();

        calculation = calculation.replace('/','÷');
        calculation = calculation.replace('*','x');

        this.assemblerHistoric(calculation, result, this.lastListPosition)

    }

    assemblerHistoric(calculation, result, position){

        let spanCalculation = window.viewsCalculator.returnSpan(calculation);

        spanCalculation.classList.add('history-calc');

        let spanResult = window.viewsCalculator.returnSpan(result);

        spanResult.classList.add('history-result');

        let li = window.viewsCalculator.returnLi([spanCalculation, spanResult], true, 2);

        li.dataset.positon = position.toString();

        li.addEventListener('click', ()=>{

            this.sentToDisplay(li.dataset.positon);

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

    sentToDisplay(position){

        window.calculatorStandardMode.historyRequest( this.calcList[parseInt(position)], this.calcResult[parseInt(position)])

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