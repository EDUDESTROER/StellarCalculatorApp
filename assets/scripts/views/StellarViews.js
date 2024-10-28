class StellarViews{

    constructor(){

        this._statusEl = document.querySelector('.wrapper-status-output');
        this.historyCalcAndResultsList = document.querySelector('.wrapper-calc-and-results');  
        this._errorSound = new Audio('assets/sound/calcError.mp3');
        this._sucessSound = new Audio('assets/sound/calcSucess.mp3');

    }

    returnStandard(){

        let standard = `
        
                <div class="wrapper-calculator-output">

                    <div class="outputs previous-output" id="previous-output"></div>
                    <div class="outputs current-output" id="current-output">0</div>

                </div>
                <div class="wrapper-buttons">

                    <div class="wrapper-buttons-queues">

                        <button id="button-percent" class="buttons-base-effects buttons-color-darker">%</button>
                        <button id="button-ce" class="buttons-base-effects buttons-color-darker">CE</button>
                        <button id="button-c" class="buttons-base-effects buttons-color-darker">C</button>
                        <button id="button-backspace" class="buttons-base-effects buttons-color-darker"><img width="64px" src="assets/icons/backspace.png" alt="backspace button icon"></button>

                    </div>
                    <div class="wrapper-buttons-queues">

                        <button id="button-one-divide-per" class="buttons-base-effects buttons-color-darker"><img width="64px" src="assets/icons/1 divide by.png" alt="mathematical symbol of one divided by X"></button>
                        <button id="button-squared" class="buttons-base-effects buttons-color-darker"><img width="64px" src="assets/icons/X squared.png" alt="mathematical symbol of X squared"></button>
                        <button id="button-square-root" class="buttons-base-effects buttons-color-darker"><img width="64px" src="assets/icons/square-root.png" alt="mathematical symbol of square root"></button>
                        <button id="button-divide" class="buttons-base-effects buttons-color-darker">÷</button>

                    </div>
                    <div class="wrapper-buttons-queues">

                        <button id="button-7" class="buttons-base-effects buttons-color-main">7</button>
                        <button id="button-8" class="buttons-base-effects buttons-color-main">8</button>
                        <button id="button-9" class="buttons-base-effects buttons-color-main">9</button>
                        <button id="button-multiplication" class="buttons-base-effects buttons-color-darker">x</button>

                    </div>
                    <div class="wrapper-buttons-queues">

                        <button id="button-4" class="buttons-base-effects buttons-color-main">4</button>
                        <button id="button-5" class="buttons-base-effects buttons-color-main">5</button>
                        <button id="button-6" class="buttons-base-effects buttons-color-main">6</button>
                        <button id="button-subtraction" class="buttons-base-effects buttons-color-darker">-</button>

                    </div>
                    <div class="wrapper-buttons-queues">

                        <button id="button-1" class="buttons-base-effects buttons-color-main">1</button>
                        <button id="button-2" class="buttons-base-effects buttons-color-main">2</button>
                        <button id="button-3" class="buttons-base-effects buttons-color-main">3</button>
                        <button id="button-sum" class="buttons-base-effects buttons-color-darker">+</button>

                    </div>
                    <div class="wrapper-buttons-queues">

                        <button id="button-change-signal" class="buttons-base-effects buttons-color-main">+/-</button>
                        <button id="button-0" class="buttons-base-effects buttons-color-main">0</button>
                        <button id="button-dot" class="buttons-base-effects buttons-color-main">,</button>
                        <button id="button-equal" class="buttons-base-effects buttons-color-bright">=</button>

                    </div>

                </div>

        `;

        return standard;

    }

    returnConversor(typeOfConversor){

        let outputOne = this.returnOutputConversor('first', typeOfConversor);
        let outputTwo = this.returnOutputConversor('second', typeOfConversor);

        let conversor = `

            <div class="wrapper-length-calculator">

                <div class="wrapper-converter-output-and-select">

                    ${outputOne.innerHTML}

                </div>

                <div class="wrapper-converter-output-and-select">

                    ${outputTwo.innerHTML}

                </div>

                <div class="wrapper-length-buttons">

                    <div class="wrapper-buttons-queues">

                        <button id="button-ce" class="buttons-base-effects buttons-color-darker">CE</button>
                        <button id="button-backspace" class="buttons-base-effects buttons-color-darker"><img width="64px" src="assets/icons/backspace.png" alt="backspace button icon"></button>

                    </div>
                    <div class="wrapper-buttons-queues">

                        <button id="button-7" class="buttons-base-effects buttons-color-main">7</button>
                        <button id="button-8" class="buttons-base-effects buttons-color-main">8</button>
                        <button id="button-9" class="buttons-base-effects buttons-color-main">9</button>

                    </div>
                    <div class="wrapper-buttons-queues">

                        <button id="button-4" class="buttons-base-effects buttons-color-main">4</button>
                        <button id="button-5" class="buttons-base-effects buttons-color-main">5</button>
                        <button id="button-6" class="buttons-base-effects buttons-color-main">6</button>

                    </div>
                    <div class="wrapper-buttons-queues">

                        <button id="button-1" class="buttons-base-effects buttons-color-main">1</button>
                        <button id="button-2" class="buttons-base-effects buttons-color-main">2</button>
                        <button id="button-3" class="buttons-base-effects buttons-color-main">3</button>

                    </div>
                    <div class="wrapper-buttons-queues">

                        <button id="button-0" class="buttons-base-effects buttons-color-main">0</button>
                        <button id="button-dot" class="buttons-base-effects buttons-color-main">,</button>

                    </div>

                </div>

            </div>
            
        `;

        return conversor;

    }

    returnOutputConversor(position, type){

        let liNumber;
        let nameList;

        if(type === 'length'){

            liNumber = 11;
            nameList = [
                'nanometers', 
                'microns', 
                'millimeters',
                'centimeter', 
                'meters', 
                'kilometers', 
                'inches', 
                'Feet', 
                'Yards', 
                'miles', 
                'nautical miles'
            ];

        }

        if(type === 'angle'){

            liNumber = 3;
            nameList = [
                'Grados', 
                'Degree', 
                'Radians'
            ];

        }

        if(type === 'volume'){

            liNumber = 20;
            nameList = [
                'Milliliters', 
                'Cubic centimeters', 
                'Liters', 
                'Cubic meters', 
                'Teaspoon(USA)', 
                'Tablespoons(USA)', 
                'Fluid ounces(USA)', 
                'Cups(USA)', 
                'Pint(USA)', 
                'Quart(USA)', 
                'Gallons(USA)', 
                'Cubic inches', 
                'Cubic feet', 
                'Cubic yards', 
                'Teaspoon(UK)', 
                'Tablespoons(UK)', 
                'Fluid ounces(UK)', 
                'Pint(UK)', 
                'Quart(UK)', 
                'Gallons(UK)'
            ];

        }

        if(type === 'weigthAndMass'){

            liNumber = 14;
            nameList = [
                'Carats', 
                'Miligrams', 
                'Centigrams', 
                'Decigrams', 
                'Gram', 
                'Decagrams', 
                'Hectograms', 
                'Kilograms', 
                'Metric Tons', 
                'Ounce', 
                'Pounds', 
                'Stone', 
                'Short Tons(USA)', 
                'Long Tons(UK)'
            ];

        }

        if(type === 'temperature'){

            liNumber = 3;
            nameList = [
                'Celsius', 
                'Fahrenheit', 
                'Kelvin'
            ];

        }

        let outAndSelect = `

                <span id="${position}-converter-output">0</span>

                <div class="conversor-selects" id="btn-${position}-selection">

                    <div class="select-converter">

                        <span class="selected"></span>
                        <div class="caret"></div>

                    </div>

                    <ul class="menu-converter" id="${position}-converter-list">
                        
                    </ul>

                </div>
        `;

        outAndSelect = new DOMParser().parseFromString(outAndSelect, "text/html");

        outAndSelect = outAndSelect.firstChild.children[1]

        let ulListEl = outAndSelect.children[1].children[1]

        for (let index = 0; index < liNumber; index++) {

            ulListEl.appendChild(this.returnLi(`${nameList[index]}`));
            
        }

        outAndSelect.children[1].children[0].children[0].textContent = ulListEl.children[0].textContent;

        ulListEl.children[0].classList.add('active-converter');

        return outAndSelect;

    }

    returnLi(innerValue = '', element = false, amount = 0){

        let li = document.createElement('li');

        if(innerValue){

            if(element){

                if(amount > 0){

                    for (let i = 0; i < amount; i ++){

                        li.appendChild(innerValue[i]);

                    }

                }else{

                    li.appendChild(innerValue);

                }

            }else{

                li.innerHTML = innerValue;

            }

        }

        return li;

    }

    returnSpan(innerValue = '', element = false, amount = 0){

        let span = document.createElement('span');

        if(innerValue){

            if(element){

                if(amount > 0){

                    for (let i = 0; i < amount; i ++){

                        span.appendChild(innerValue[i]);

                    }

                }else{

                    span.appendChild(innerValue);

                }

            }else{

                span.innerHTML = innerValue;

            }

        }

        return span;

    }

    returnChildNodeWithThisText(text, childNodes){

        let promise = new Promise((resolve, reject) => {
            
            if(childNodes){

                childNodes.forEach(child=>{

                    if(child.textContent == text){
        
                        resolve(child);
        
                    }
        
                });

            }else{

                reject('Nothing was found')

            }

        });

        return promise;

    }

    changeElementFontSize(typeOfChange, percent, elementId, standardSize = '', unit = 'px'){

            let refElement = document.getElementById(elementId)
            let fontSize = window.getComputedStyle(refElement).getPropertyValue('font-size').replace(unit, '');

        if(!standardSize){

            refElement.style.fontSize = `0${unit}`

            if(typeOfChange === 'increase'){

                refElement.style.fontSize = `${((parseFloat(fontSize) * parseFloat(percent)) + parseFloat(fontSize))}${unit}`;

            }else if(typeOfChange === 'decrease'){

                refElement.style.fontSize = `${(parseFloat(fontSize) - (parseFloat(fontSize) * parseFloat(percent)))}${unit}`;

            }

        }else if(standardSize){

            refElement.style.fontSize = `0${unit}`

            if(typeOfChange === 'increase'){

                refElement.style.fontSize = `${((parseFloat(standardSize) * parseFloat(percent)) + parseFloat(standardSize))}${unit}`;

            }else if(typeOfChange === 'decrease'){

                refElement.style.fontSize = `${(parseFloat(standardSize) - (parseFloat(standardSize) * parseFloat(percent)))}${unit}`;

            }

        }

    }

    displaySucess(textInfo){


        setTimeout(() =>{

            this._statusEl.innerHTML = `

                <img src="assets/icons/check.png" draggable="false" alt="Sucess icon">
                <span class="sucess">${textInfo}</span>

        `;

        this._statusEl.children[1].className = 'sucess';

        this.showElement(this._statusEl, 'flex');

        this._statusEl.style.animation = 'appear 1s';

        this._sucessSound.currentTime = 0;
        this._sucessSound.volume = 0.4;
        this._sucessSound.play();
        
        }, 1000);

        
        setTimeout(() => {

            this._statusEl.style.animation = 'disappear 2s';

            setTimeout(()=>{
                this.unShowElement(this._statusEl);
            }, 1000);
        }, 4000);

    }

    displayFail(textInfo){

        setTimeout(() =>{

            this._statusEl.innerHTML = `

                <img src="assets/icons/error.png" draggable="false" alt="Error icon">
                <span class="sucess">${textInfo}</span>

        `;

        this._statusEl.children[1].className = 'error';

        this.showElement(this._statusEl, 'flex');

        this._statusEl.style.animation = 'appear 1s';

        this._errorSound.currentTime = 0;
        this._errorSound.volume = 0.7;
        this._errorSound.play();

        }, 1000);

        
        setTimeout(() => {

            this._statusEl.style.animation = 'disappear 2s';

            setTimeout(()=>{
                this.unShowElement(this._statusEl);
            }, 1000);
        }, 4000);

    }

    unShowElement(element){

        element.style.display = 'none';

    }
    
    showElement(element, displayType){

        element.style.display = displayType;

    }

    setInnerHtmlToElement(innerValue, elementId){

        let element = document.querySelector(`#${elementId}`);

        element.innerHTML = innerValue;

    }

    removeClassFromListOfEl(listOfEl, classToRemove){

        listOfEl.forEach(element => {

            if(element.classList){

                element.classList.remove(classToRemove);

            }
            
        });

    }

}