class StellarViews{

    constructor(){

        this._statusEl = document.querySelector('.wrapper-status-output');
        this.historyCalcAndResultsList = document.querySelector('.wrapper-calc-and-results');  
        this._errorSound = new Audio('assets/sound/calcError.mp3');
        this._sucessSound = new Audio('assets/sound/calcSucess.mp3');

    }

    returnCalculator(type){

        let calculator;
        let programmerClass = '';

        if(type === 'programmer'){

            programmerClass = 'wrapper-calculator-output-programmer';

        }

        let outputs = this.returnCalculatorOutputs(type);
        let buttons = this.returnCalculatorQueues(type);

        calculator = `

            <div class="wrapper-calculator-output ${programmerClass}">

                ${outputs.innerHTML}
                
            </div>
            <div class="wrapper-buttons">

                ${buttons.innerHTML}

            </div>

        `;

        return calculator;

    }

    returnCalculatorOutputs(type){

        let outputs;
        let programmerClass = '';

        let complexOutputs = `
        
            <ul class="wrapper-number-system">

                <li id="HEX-select"><span>HEX</span><span id="HEX-result">55</span></li>
                <li id="DEC-select"><span>DEC</span><span id="DEC-result">85</span></li>
                <li id="OCT-select"><span>OCT</span><span id="OCT-result">125</span></li>
                <li id="BIN-select"><span>BIN</span><span id="BIN-result">0101 0101</span></li>

            </ul>

        `;

        if(type === 'programmer'){
            
            programmerClass = 'output-programmer';

        }

        let basicsOutputs = `
        
            <div class="outputs previous-output ${programmerClass}" id="previous-output"></div>
            <div class="outputs current-output ${programmerClass}-second" id="current-output">0</div>

        `;

        outputs = new DOMParser().parseFromString(basicsOutputs, "text/html");

        outputs = outputs.firstChild.lastChild;

        if(type === 'programmer'){

            complexOutputs = new DOMParser().parseFromString(complexOutputs, "text/html");

            complexOutputs = complexOutputs.firstChild.lastChild.children[0];

            outputs.appendChild(complexOutputs);

        }

        return outputs;

    }

    returnCalculatorQueues(type){

        let standardButtonsList = [
            'percent',
            'ce', 
            'c', 
            'backspace', 
            'one-divide-per', 
            'squared', 
            'square-root', 
            'divide',
            '7',
            '8',
            '9',
            'multiplication',
            '4',
            '5',
            '6',
            'subtraction',
            '1',
            '2',
            '3',
            'sum',
            'change-signal',
            '0',
            'dot',
            'equal'
            
        ];
        let programmerButtonsList = [
            'A',
            'logical-shift-left',
            'arithmetic-shift-right', 
            'c', 
            'backspace',
            'B',
            'open-parentheses', 
            'close-parentheses', 
            'percent', 
            'divide',
            'C',
            '7',
            '8',
            '9',
            'multiplication',
            'D',
            '4',
            '5',
            '6',
            'subtraction',
            'E',
            '1',
            '2',
            '3',
            'sum',
            'F',
            'change-signal',
            '0',
            'dot',
            'equal'
            
        ];

        let buttons = [];
        let oneQueue;
        let twoQueue;
        let threeQueue;
        let fourQueue;
        let fiveQueue;
        let sixQueue;

        if(type === 'standard'){

            standardButtonsList.forEach(buttonName=>{

                buttons.push(this.returnCalculatorButtons(buttonName));

            });

            oneQueue = `${buttons[0]} ${buttons[1]} ${buttons[2]} ${buttons[3]}`;
            twoQueue = `${buttons[4]} ${buttons[5]} ${buttons[6]} ${buttons[7]}`;
            threeQueue = `${buttons[8]} ${buttons[9]} ${buttons[10]} ${buttons[11]}`;
            fourQueue = `${buttons[12]} ${buttons[13]} ${buttons[14]} ${buttons[15]}`;
            fiveQueue = `${buttons[16]} ${buttons[17]} ${buttons[18]} ${buttons[19]}`;
            sixQueue = `${buttons[20]} ${buttons[21]} ${buttons[22]} ${buttons[23]}`;

        }
        if(type === 'programmer'){

            programmerButtonsList.forEach(buttonName=>{

                buttons.push(this.returnCalculatorButtons(buttonName));

            });

            oneQueue = `${buttons[0]} ${buttons[1]} ${buttons[2]} ${buttons[3]} ${buttons[4]}`;
            twoQueue = `${buttons[5]} ${buttons[6]} ${buttons[7]} ${buttons[8]} ${buttons[9]}`;
            threeQueue = `${buttons[10]} ${buttons[11]} ${buttons[12]} ${buttons[13]} ${buttons[14]}`;
            fourQueue = `${buttons[15]} ${buttons[16]} ${buttons[17]} ${buttons[18]} ${buttons[19]}`;
            fiveQueue = `${buttons[20]} ${buttons[21]} ${buttons[22]} ${buttons[23]} ${buttons[24]}`;
            sixQueue = `${buttons[25]} ${buttons[26]} ${buttons[27]} ${buttons[28]} ${buttons[29]}`;

        }

        let wrapperQueuesBasic = `
        
            <div class="wrapper-buttons-queues">
                ${oneQueue}   
            </div>

            <div class="wrapper-buttons-queues">
                ${twoQueue} 
            </div>

            <div class="wrapper-buttons-queues">
                ${threeQueue}        
            </div>

            <div class="wrapper-buttons-queues">
                ${fourQueue} 
            </div>

            <div class="wrapper-buttons-queues">
                ${fiveQueue} 
            </div>

            <div class="wrapper-buttons-queues">
                ${sixQueue} 
            </div>

        `;

        let queues = new DOMParser().parseFromString(wrapperQueuesBasic, "text/html");

        queues = queues.firstChild.lastChild;

        if(type === 'standard'){

            return queues;

        }

        let programmerFunctionsBtn = `
            <div class="wrapper-programmer-functions">

                <button id="button-keyboard" class=""><img width="24px" src="assets/icons/keyboard-icon.png" alt=""></button>
                <button id="button-word-size" class=""><img width="24px" src="assets/icons/word-size-icon.png" alt="word-size-icon"></button>
                <button id="button-word" class="">BYTE</button>
                <div id="button-bit-by-bit"><img width="34px" src="assets/icons/logic-gates.png" alt="logic gates icon"> <span>Bit by bit</span> <div class="caret"></div></div>
                <div id="button-bit-shift"><img width="24px" src="assets/icons/bit-shift.png" alt="bit shift icon"><span>Bit shift </span><div class="caret"></div></div>

            </div>
        `;

        programmerFunctionsBtn = new DOMParser().parseFromString(programmerFunctionsBtn, "text/html");

        programmerFunctionsBtn = programmerFunctionsBtn.firstChild.lastChild;

        queues.insertBefore(programmerFunctionsBtn.firstChild, queues.firstChild);

        return queues;

    }

    returnCalculatorButtons(name){

        let buttonsList ={
            'percent': '<button id="button-percent" class="buttons-base-effects buttons-color-darker">%</button>',
            'ce': '<button id="button-ce" class="buttons-base-effects buttons-color-darker">CE</button>', 
            'c': '<button id="button-c" class="buttons-base-effects buttons-color-darker">C</button>', 
            'backspace': '<button id="button-backspace" class="buttons-base-effects buttons-color-darker"><img width="64px" src="assets/icons/backspace.png" alt="backspace button icon"></img></button>', 
            'one-divide-per': '<button id="button-one-divide-per" class="buttons-base-effects buttons-color-darker"><img width="64px" src="assets/icons/1 divide by.png" alt="mathematical symbol of one divided by X"></img></button>', 
            'squared': '<button id="button-squared" class="buttons-base-effects buttons-color-darker"><img width="64px" src="assets/icons/X squared.png" alt="mathematical symbol of X squared"></img></button>', 
            'square-root': '<button id="button-square-root" class="buttons-base-effects buttons-color-darker"><img width="64px" src="assets/icons/square-root.png" alt="mathematical symbol of square root"></img></button>', 
            'divide': '<button id="button-divide" class="buttons-base-effects buttons-color-darker">÷</button>',
            '7': '<button id="button-7" class="buttons-base-effects buttons-color-main">7</button>',
            '8': '<button id="button-8" class="buttons-base-effects buttons-color-main">8</button>',
            '9': '<button id="button-9" class="buttons-base-effects buttons-color-main">9</button>',
            'multiplication': '<button id="button-multiplication" class="buttons-base-effects buttons-color-darker">x</button>',
            '4': '<button id="button-4" class="buttons-base-effects buttons-color-main">4</button>',
            '5': '<button id="button-5" class="buttons-base-effects buttons-color-main">5</button>',
            '6': '<button id="button-6" class="buttons-base-effects buttons-color-main">6</button>',
            'subtraction': '<button id="button-subtraction" class="buttons-base-effects buttons-color-darker">-</button>',
            '1': '<button id="button-1" class="buttons-base-effects buttons-color-main">1</button>',
            '2': '<button id="button-2" class="buttons-base-effects buttons-color-main">2</button>',
            '3': '<button id="button-3" class="buttons-base-effects buttons-color-main">3</button>',
            'sum': '<button id="button-sum" class="buttons-base-effects buttons-color-darker">+</button>',
            'change-signal': '<button id="button-change-signal" class="buttons-base-effects buttons-color-main">+/-</button>',
            '0': '<button id="button-0" class="buttons-base-effects buttons-color-main">0</button>',
            'dot': '<button id="button-dot" class="buttons-base-effects buttons-color-main">,</button>',
            'equal': '<button id="button-equal" class="buttons-base-effects buttons-color-bright">=</button>',
            'A': '<button id="button-A" class="buttons-base-effects buttons-color-main">A</button>',
            'logical-shift-left': '<button id="button-logical-shift-left" class="buttons-base-effects buttons-color-darker"><<</button>',
            'arithmetic-shift-right': '<button id="button-arithmetic-shift-right" class="buttons-base-effects buttons-color-darker">>></button>',
            'B': '<button id="button-B" class="buttons-base-effects buttons-color-main">B</button>',
            'open-parentheses': '<button id="button-open-parentheses" class="buttons-base-effects buttons-color-darker">(</button>',
            'close-parentheses': '<button id="button-close-parentheses" class="buttons-base-effects buttons-color-darker">)</button>',
            'C': '<button id="button-C" class="buttons-base-effects buttons-color-main">C</button>',
            'D': '<button id="button-D" class="buttons-base-effects buttons-color-main">D</button>',
            'E': '<button id="button-E" class="buttons-base-effects buttons-color-main">E</button>',
            'F': '<button id="button-F" class="buttons-base-effects buttons-color-main">F</button>',
        };

        return buttonsList[name];

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
        if(type === 'energy'){

            liNumber = 8;
            nameList = [
                'Electron volts', 
                'Joules', 
                'Kilojoules',
                'Thermic calories', 
                'Food calories', 
                'Pound-feet',
                'British thermal units', 
                'Kilowatt-hour'
            ];

        }
        if(type === 'area'){

            liNumber = 10;
            nameList = [
                'Square Millimeters', 
                'Square Centimeters',
                'Square Meters', 
                'Hectares',
                'Square Kilometers', 
                'Square Inches', 
                'Square Feet',
                'Square Yards', 
                'Acres',
                'Square Miles'
            ];

        }
        if(type === 'speed'){

            liNumber = 7;
            nameList = [
                'Centimeters per second', 
                'Meters per second',
                'Kilometers per hour', 
                'Feet per second',
                'Miles per hour', 
                'Knots', 
                'Mach'
            ];

        }
        if(type === 'currency'){

            liNumber = 155;
            nameList = [
                'Afghan Afghani',
                'Albanian Lek',
                'Algerian Dinar',
                'Angolan Kwanza',
                'Argentine Peso',
                'Armenian Dram',
                'Aruban Florin',
                'Australian Dollar',
                'Azerbaijani Manat',
                'Bahamian Dollar',
                'Bahraini Dinar',
                'Bangladeshi Taka',
                'Barbadian Dollar',
                'Belarusian Ruble',
                'Belize Dollar',
                'Bermudian Dollar',
                'Bhutanese Ngultrum',
                'Bolivian Boliviano',
                'Bosnia-Herzegovina Convertible Mark',
                'Botswana Pula',
                'Brazilian Real',
                'British Pound',
                'Brunei Dollar',
                'Bulgarian Lev',
                'Burundian Franc',
                'Cambodian Riel',
                'Canadian Dollar',
                'Cape Verdean Escudo',
                'Cayman Islands Dollar',
                'CFA Franc BEAC',
                'CFA Franc BCEAO',
                'CFP Franc',
                'Chilean Peso',
                'Chinese Yuan',
                'Colombian Peso',
                'Comorian Franc',
                'Congolese Franc',
                'Costa Rican Colón',
                'Croatian Kuna',
                'Cuban Convertible Peso',
                'Czech Koruna',
                'Danish Krone',
                'Djiboutian Franc',
                'Dominican Peso',
                'East Caribbean Dollar',
                'Egyptian Pound',
                'Emirati Dirham',
                'Eritrean Nakfa',
                'Ethiopian Birr',
                'Euro',
                'Falkland Islands Pound',
                'Fijian Dollar',
                'Gambian Dalasi',
                'Georgian Lari',
                'Ghanaian Cedi',
                'Gibraltar Pound',
                'Guatemalan Quetzal',
                'Guinean Franc',
                'Guyanese Dollar',
                'Haitian Gourde',
                'Honduran Lempira',
                'Hong Kong Dollar',
                'Hungarian Forint',
                'Icelandic Króna',
                'Indian Rupee',
                'Indonesian Rupiah',
                'Iranian Rial',
                'Iraqi Dinar',
                'Israeli New Shekel',
                'Jamaican Dollar',
                'Japanese Yen',
                'Jordanian Dinar',
                'Kazakhstani Tenge',
                'Kenyan Shilling',
                'Kuwaiti Dinar',
                'Kyrgyzstani Som',
                'Lao Kip',
                'Lebanese Pound',
                'Lesotho Loti',
                'Liberian Dollar',
                'Libyan Dinar',
                'Macanese Pataca',
                'Macedonian Denar',
                'Malagasy Ariary',
                'Malawian Kwacha',
                'Malaysian Ringgit',
                'Maldivian Rufiyaa',
                'Mauritanian Ouguiya',
                'Mauritian Rupee',
                'Mexican Peso',
                'Moldovan Leu',
                'Mongolian Tögrög',
                'Moroccan Dirham',
                'Mozambican Metical',
                'Myanma Kyat',
                'Namibian Dollar',
                'Nepalese Rupee',
                'Netherlands Antillean Guilder',
                'New Taiwan Dollar',
                'New Zealand Dollar',
                'Nicaraguan Córdoba',
                'Nigerian Naira',
                'North Korean Won',
                'Norwegian Krone',
                'Omani Rial',
                'Pakistani Rupee',
                'Panamanian Balboa',
                'Papua New Guinean Kina',
                'Paraguayan Guarani',
                'Peruvian Sol',
                'Philippine Peso',
                'Polish Złoty',
                'Qatari Rial',
                'Romanian Leu',
                'Russian Ruble',
                'Rwandan Franc',
                'Saint Helena Pound',
                'Samoan Tala',
                'São Tomé and Príncipe Dobra',
                'Saudi Riyal',
                'Serbian Dinar',
                'Seychellois Rupee',
                'Sierra Leonean Leone',
                'Singapore Dollar',
                'Solomon Islands Dollar',
                'Somali Shilling',
                'South African Rand',
                'South Korean Won',
                'South Sudanese Pound',
                'Sri Lankan Rupee',
                'Sudanese Pound',
                'Surinamese Dollar',
                'Swazi Lilangeni',
                'Swedish Krona',
                'Swiss Franc',
                'Syrian Pound',
                'Tajikistani Somoni',
                'Tanzanian Shilling',
                'Thai Baht',
                'Tongan Paʻanga',
                'Trinidad and Tobago Dollar',
                'Tunisian Dinar',
                'Turkish Lira',
                'Turkmenistani Manat',
                'Ugandan Shilling',
                'Ukrainian Hryvnia',
                'Uruguayan Peso',
                'US Dollar',
                'Uzbekistani Som',
                'Vanuatu Vatu',
                'Venezuelan Bolívar',
                'Vietnamese Đồng',
                'West African CFA Franc',
                'Yemeni Rial',
                'Zambian Kwacha'
            ];

        }
        if(type === 'time'){

            liNumber = 8;
            nameList = [
                'Microseconds', 
                'Milliseconds',
                'Seconds', 
                'Minutes',
                'Hours', 
                'Days', 
                'Weeks',
                'Years'
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

    changeElementFontSize(typeOfChange, percent, elementId, standardSize = '', unit = 'px', element = ''){

        let refElement

            if(elementId){

                refElement = document.getElementById(elementId);

            }else if (!elementId && element){

                refElement = element;

            }

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
                //console.log( refElement, elementId, refElement.style.fontSize);

            }

        }

    }

    changeElementSize(typeOfChange, percent, element = '',  basewidth= '', basedHeight= '', unit = 'px', elementId = '', elementClass = ''){

        let refElement;

        if(elementClass !== ''){

            refElement = document.querySelector(`.${elementClass}`);

        }else if (elementId !== ''){

            refElement = document.getElementById(elementId);

        }else if(element !== ''){

            refElement = element

        }

        let sizeWidth = window.getComputedStyle(refElement).getPropertyValue('width').replace(unit, '');
        let sizeHeight = window.getComputedStyle(refElement).getPropertyValue('height').replace(unit, '');

        if(!basewidth && !basedHeight){ 

            refElement.style.height = `0${unit}`;
            refElement.style.width = `0${unit}`;

            if(typeOfChange === 'increase'){

                refElement.style.height = `${((parseFloat(sizeHeight) * parseFloat(percent)) + parseFloat(sizeHeight))}${unit}`;
                refElement.style.width = `${((parseFloat(sizeWidth) * parseFloat(percent)) + parseFloat(sizeWidth))}${unit}`;

            }else if(typeOfChange === 'decrease'){

                refElement.style.height = `${(parseFloat(sizeHeight) - (parseFloat(sizeHeight) * parseFloat(percent)))}${unit}`;
                refElement.style.width = `${(parseFloat(sizeWidth) - (parseFloat(sizeWidth) * parseFloat(percent)))}${unit}`;

            }

        }else if(basewidth && basedHeight){
            
            refElement.style.height = `0${unit}`;
            refElement.style.width = `0${unit}`;

            if(typeOfChange === 'increase'){

                refElement.style.height = `${((parseFloat(basedHeight) * parseFloat(basedHeight)) + parseFloat(basedHeight))}${unit}`;
                refElement.style.width = `${((parseFloat(basewidth) * parseFloat(percent)) + parseFloat(basewidth))}${unit}`;

            }else if(typeOfChange === 'decrease'){

                refElement.style.height = `${(parseFloat(basedHeight) - (parseFloat(basedHeight) * parseFloat(percent)))}${unit}`;
                refElement.style.width = `${(parseFloat(basewidth) - (parseFloat(basewidth) * parseFloat(percent)))}${unit}`;

            }


        }else if(basewidth && !basedHeight){
            
            refElement.style.width = `0${unit}`;

            if(typeOfChange === 'increase'){

                refElement.style.width = `${((parseFloat(basewidth) * parseFloat(percent)) + parseFloat(basewidth))}${unit}`;

            }else if(typeOfChange === 'decrease'){

                refElement.style.width = `${(parseFloat(basewidth) - (parseFloat(basewidth) * parseFloat(percent)))}${unit}`;

            }

        }else if(basedHeight && basewidth == ''){
            
            refElement.style.height = `0${unit}`;

            if(typeOfChange === 'increase'){

                refElement.style.height = `${((parseFloat(basedHeight) * parseFloat(percent)) + parseFloat(basedHeight))}${unit}`;

            }else if(typeOfChange === 'decrease'){

                refElement.style.height = `${(parseFloat(basedHeight) - (parseFloat(basedHeight) * parseFloat(percent)))}${unit}`;

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