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
        this.activeBtn = false;
        

    }

    start(type){

        this.firstConversorListEl = document.querySelector('#first-converter-list');
        this.secondConversorListEl = document.querySelector('#second-converter-list');
        this.btnSelectionFirst = document.querySelector('#btn-first-selection');
        this.btnSelectionSecond = document.querySelector('#btn-second-selection');
        this.firstSelectedEl = document.querySelector('#first-select');
        this.secondSelectedEl = document.querySelector('#second-select');

        window.viewsCalculator.setConversorTo(type, this.firstConversorListEl, this.firstSelectedEl, this.secondConversorListEl, this.secondSelectedEl);

        this.converterType = type;

        if(this.activeBtn === false){

            this.addEventsToSelection(this.btnSelectionFirst, this.firstConversorListEl);
            this.addEventsToSelection(this.btnSelectionSecond, this.secondConversorListEl);
            this.addEventsToButtons();

        }

        this.activeBtn = true;

    }

    addEventsToSelection(selectionBtnEl, selectionListEl){

        //console.dir(selectionBtnEl);

        selectionBtnEl.addEventListener('click', ()=>{

            selectionListEl.childNodes.forEach(li => {

                li.addEventListener('click', ()=>{

                    window.viewsCalculator.removeClassFromListOfEl(selectionListEl.childNodes, 'active-converter');

                    li.classList.add('active-converter');

                    selectionBtnEl.children[0].children[0].textContent = li.textContent;

                    this.checkConverterType();

                });
                
            });

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

                    let buttonName = button.id.replace('button-conversor-', '');

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
                            //
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

        if(value == '0' && this.firstOutputValue == '0'){

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

        this.checkConverterType();

    }

    checkConverterType(){ 

        let result = '';

        if(this.converterType == 'length'){

            result = window.length.calcLengthConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);
        
        }else if(this.converterType == 'angle'){

            result = window.angleConverter.calcAngleConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

        }else if(this.converterType == 'volume'){

            result = window.volumeConverter.calcVolumeConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);


        }else if(this.converterType == 'weigthAndMass'){

            result = window.weigthAndMassConverter.calcWeigthAndMassConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);


        }else if(this.converterType == 'temperature'){

            result = window.temperatureConverter.calctemperatureConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

        }else if(this.converterType == 'energy'){

            result = window.energyConverter.calcEnergyConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

        }
        else if(this.converterType == 'area'){

            result = window.areaConverter.calcAreaConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

        }
        else if(this.converterType == 'speed'){

            result = window.speedConverter.calcSpeedConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

        }
        else if(this.converterType == 'currency'){

            window.currencyConverter.calcCurrencyConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

            result = 'calculando...';

        }
        else if(this.converterType == 'time'){

            result = window.timeConverter.calcTimeConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

        }
        else if(this.converterType == 'power'){

            result = window.powerConverter.calcPowerConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

        }

        if(result === false){

            window.viewsCalculator.displayFail('Is impossible realize the conversion...');
            this.clearConverter();

        }else{

            this.setToDisplay(result);

        }

    }

    setToDisplay(result){

        if(result == '' || result == undefined){

            window.viewsCalculator.setInnerHtmlToElement(0, 'second-converter-output');

        }else{

            window.viewsCalculator.setInnerHtmlToElement(result, 'second-converter-output');

        }

        this.verifySizeOutput('first-converter-output');
        this.verifySizeOutput('second-converter-output');

    }

    historyRequest(value){

        this.clearConverter();

        value = value.split(' ');

        let abreviations = {
            "nm": "nanometers",
            "µm": "microns",
            "mm": "millimeters",
            "cm": "centimeter",
            "m": "meters",
            "km": "kilometers",
            "in": "inches",
            "ft": "Feet",
            "yd": "Yards",
            "mi": "miles",
            "NM": "nautical miles",
            "ml": "Milliliters",
            "cc": "Cubic centimeters",
            "l": "Liters",
            "m<sup>3": "Cubic meters",
            "tsp(USA)": "Teaspoon(USA)",
            "tbsp(USA)": "Tablespoons(USA)",
            "flOz(USA)": "Fluid ounces(USA)",
            "c(USA)": "Cups(USA)",
            "pt(USA)": "Pint(USA)",
            "qt(USA)": "Quart(USA)",
            "gal(USA)": "Gallons(USA)",
            "in<sup>3": "Cubic inches",
            "ft<sup>3": "Cubic feet",
            "yd<sup>3": "Cubic yards",
            "tsp(UK)": "Teaspoon(UK)",
            "tbsp(UK)": "Tablespoons(UK)",
            "flOz(UK)": "Fluid ounces(UK)",
            "pt(UK)": "Pint(UK)",
            "qt(UK)": "Quart(UK)",
            "gal(UK)": "Gallons(UK)",
            "gon": "Grados",
            "°": "Degree",
            "rad": "Radians",
            "ct": "Carats",
            "mg": "Miligrams",
            "cg": "Centigrams",
            "dg": "Decigrams",
            "g": "Gram",
            "dag": "Decagrams",
            "hg": "Hectograms",
            "kg": "Kilograms",
            "t": "Metric Tons",
            "oz": "Ounce",
            "lb": "Pounds",
            "st": "Stone",
            "ton(USA)": "Short Tons(USA)",
            "L/T(UK)": "Long Tons(UK)",
            "°C": "Celsius",
            "°F": "Fahrenheit",
            "°K": "Kelvin",
            "eV": "electron volts",
            "J": "Joules",
            "kJ": "Kilojoules",
            "cal": "Thermic calories",
            "kcal": "Food calories",
            "lbf-ft": "Pound-feet",
            "BTU": "British thermal units",
            "kWh": "Kilowatt-hour",
            "mm²": "Square Millimeters",
            "cm²": "Square Centimeters",
            "m²": "Square Meters",
            "ha": "Hectares",
            "km²": "Square Kilometers",
            "in²": "Square Inches",
            "ft²": "Square Feet",
            "yd²": "Square Yards",
            "ac": "Acres",
            "mi²": "Square Miles",
            "cm/s": "Centimeters per second",
            "m/s": "Meters per second",
            "km/h": "Kilometers per hour",
            "ft/s": "Feet per second",
            "mph": "Miles per hour",
            "kn": "Knots",
            "Mach": "Mach",
            "AFN": "Afghan Afghani",
            "ALL": "Albanian Lek",
            "DZD": "Algerian Dinar",
            "AOA": "Angolan Kwanza",
            "ARS": "Argentine Peso",
            "AMD": "Armenian Dram",
            "AWG": "Aruban Florin",
            "AUD": "Australian Dollar",
            "AZN": "Azerbaijani Manat",
            "BSD": "Bahamian Dollar",
            "BHD": "Bahraini Dinar",
            "BDT": "Bangladeshi Taka",
            "BBD": "Barbadian Dollar",
            "BYN": "Belarusian Ruble",
            "BZD": "Belize Dollar",
            "BMD": "Bermudian Dollar",
            "BTN": "Bhutanese Ngultrum",
            "BOB": "Bolivian Boliviano",
            "BAM": "Bosnia-Herzegovina Convertible Mark",
            "BWP": "Botswana Pula",
            "BRL": "Brazilian Real",
            "GBP": "British Pound",
            "BND": "Brunei Dollar",
            "BGN": "Bulgarian Lev",
            "BIF": "Burundian Franc",
            "KYD": "Cayman Islands Dollar",
            "XAF": "Central African CFA Franc",
            "XPF": "CFP Franc",
            "CLP": "Chilean Peso",
            "CNY": "Chinese Yuan",
            "COP": "Colombian Peso",
            "KMF": "Comorian Franc",
            "CDF": "Congolese Franc",
            "CRC": "Costa Rican Colón",
            "HRK": "Croatian Kuna",
            "CUC": "Cuban Convertible Peso",
            "CZK": "Czech Koruna",
            "DKK": "Danish Krone",
            "DJF": "Djiboutian Franc",
            "DOP": "Dominican Peso",
            "XCD": "East Caribbean Dollar",
            "EGP": "Egyptian Pound",
            "ERN": "Eritrean Nakfa",
            "ETB": "Ethiopian Birr",
            "EUR": "Euro",
            "FKP": "Falkland Islands Pound",
            "FJD": "Fijian Dollar",
            "GMD": "Gambian Dalasi",
            "GEL": "Georgian Lari",
            "GHS": "Ghanaian Cedi",
            "GIP": "Gibraltar Pound",
            "GTQ": "Guatemalan Quetzal",
            "GNF": "Guinean Franc",
            "GYD": "Guyanese Dollar",
            "HTG": "Haitian Gourde",
            "HNL": "Honduran Lempira",
            "HKD": "Hong Kong Dollar",
            "HUF": "Hungarian Forint",
            "ISK": "Icelandic Króna",
            "INR": "Indian Rupee",
            "IDR": "Indonesian Rupiah",
            "IRR": "Iranian Rial",
            "IQD": "Iraqi Dinar",
            "ILS": "Israeli New Shekel",
            "JMD": "Jamaican Dollar",
            "JPY": "Japanese Yen",
            "JOD": "Jordanian Dinar",
            "KZT": "Kazakhstani Tenge",
            "KES": "Kenyan Shilling",
            "KWD": "Kuwaiti Dinar",
            "KGS": "Kyrgyzstani Som",
            "LAK": "Lao Kip",
            "LBP": "Lebanese Pound",
            "LSL": "Lesotho Loti",
            "LRD": "Liberian Dollar",
            "LYD": "Libyan Dinar",
            "MOP": "Macanese Pataca",
            "MKD": "Macedonian Denar",
            "MGA": "Malagasy Ariary",
            "MWK": "Malawian Kwacha",
            "MYR": "Malaysian Ringgit",
            "MVR": "Maldivian Rufiyaa",
            "MRU": "Mauritanian Ouguiya",
            "MUR": "Mauritian Rupee",
            "MXN": "Mexican Peso",
            "MDL": "Moldovan Leu",
            "MNT": "Mongolian Tögrög",
            "MAD": "Moroccan Dirham",
            "MZN": "Mozambican Metical",
            "MMK": "Myanma Kyat",
            "NAD": "Namibian Dollar",
            "NPR": "Nepalese Rupee",
            "ANG": "Netherlands Antillean Guilder",
            "TWD": "New Taiwan Dollar",
            "NZD": "New Zealand Dollar",
            "NIO": "Nicaraguan Córdoba",
            "NGN": "Nigerian Naira",
            "KPW": "North Korean Won",
            "NOK": "Norwegian Krone",
            "OMR": "Omani Rial",
            "PKR": "Pakistani Rupee",
            "PAB": "Panamanian Balboa",
            "PGK": "Papua New Guinean Kina",
            "PYG": "Paraguayan Guarani",
            "PEN": "Peruvian Sol",
            "PHP": "Philippine Peso",
            "PLN": "Polish Złoty",
            "QAR": "Qatari Rial",
            "RON": "Romanian Leu",
            "RUB": "Russian Ruble",
            "RWF": "Rwandan Franc",
            "SHP": "Saint Helena Pound",
            "SVC": "Salvadoran Colón",
            "WST": "Samoan Tala",
            "STN": "São Tomé and Príncipe Dobra",
            "SAR": "Saudi Riyal",
            "RSD": "Serbian Dinar",
            "SCR": "Seychellois Rupee",
            "SLL": "Sierra Leonean Leone",
            "SGD": "Singapore Dollar",
            "SBD": "Solomon Islands Dollar",
            "SOS": "Somali Shilling",
            "ZAR": "South African Rand",
            "KRW": "South Korean Won",
            "SSP": "South Sudanese Pound",
            "LKR": "Sri Lankan Rupee",
            "SDG": "Sudanese Pound",
            "SRD": "Surinamese Dollar",
            "SZL": "Swazi Lilangeni",
            "SEK": "Swedish Krona",
            "CHF": "Swiss Franc",
            "SYP": "Syrian Pound",
            "TJS": "Tajikistani Somoni",
            "TZS": "Tanzanian Shilling",
            "THB": "Thai Baht",
            "TTD": "Trinidad and Tobago Dollar",
            "TND": "Tunisian Dinar",
            "TRY": "Turkish Lira",
            "TMT": "Turkmenistani Manat",
            "UGX": "Ugandan Shilling",
            "UAH": "Ukrainian Hryvnia",
            "AED": "United Arab Emirates Dirham",
            "UYU": "Uruguayan Peso",
            "USD": "US Dollar",
            "UZS": "Uzbekistani Som",
            "VUV": "Vanuatu Vatu",
            "VES": "Venezuelan Bolívar",
            "VND": "Vietnamese Đồng",
            "XOF": "West African CFA Franc",
            "YER": "Yemeni Rial",
            "ZMW": "Zambian Kwacha",
            'µs': 'Microseconds',
            'ms': 'Milliseconds',
            's': 'Seconds',
            'min': 'Minutes',
            'h': 'Hours',
            'd': 'Days',
            'w': 'Weeks',
            'y': 'Years',
            'W': 'Watts',
            'kW': 'Kilowatts',
            'hp': 'Horsepower(USA)',
            'lb-ft/min': 'Pound-feet/minute',
            'BTU/min': 'BTUs/minute'
        }

        let firstConverterName = abreviations[value[1]];
        let secondConverterName = abreviations[value[2]];;

        window.viewsCalculator.removeClassFromListOfEl(this.firstConversorListEl.childNodes, 'active-converter');
        window.viewsCalculator.removeClassFromListOfEl(this.secondConversorListEl.childNodes, 'active-converter');

        let firstLi = window.viewsCalculator.returnChildNodeWithThisText(firstConverterName, this.firstConversorListEl.childNodes);
        let secondLi = window.viewsCalculator.returnChildNodeWithThisText(secondConverterName, this.secondConversorListEl.childNodes);

        

        //console.log(this.firstConversorListEl.childNodes);
        //console.log(secondLi);

        firstLi.then(li=>{
            
            li.classList.add('active-converter');

        }).catch(err=>{

            console.error(err);

        });

        secondLi.then(li=>{
            
            li.classList.add('active-converter');

        }).catch(err=>{

            console.error(err);

        });

        this.btnSelectionFirst.children[0].children[0].textContent = firstConverterName;
        this.btnSelectionSecond.children[0].children[0].textContent = secondConverterName;

        

        this.firstSelectedEl = this.btnSelectionFirst.children[0].children[0]
        this.secondSelectedEl = this.btnSelectionSecond.children[0].children[0]

        this.firstOutputValue = value[0];

        window.viewsCalculator.setInnerHtmlToElement(this.firstOutputValue, 'first-converter-output');

        this.checkConverterType();

    }

    clearConverter(){

        //console.log('pass: ClearConverter');

        this.firstOutputValue = '';

        window.viewsCalculator.setInnerHtmlToElement(0, 'second-converter-output');
        window.viewsCalculator.setInnerHtmlToElement(0, 'first-converter-output');

        this.verifySizeOutput('first-converter-output');
        this.verifySizeOutput('second-converter-output');

        if(this.converterType == 'temperature'){

            this.addValueToOutputFirst(0);

        }

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