import StellarViews from '/js/views/StellarViews.js';
import Length from '/js/class/Length.js';
import Angle from '/js/class/Angle.js';
import Volume from '/js/class/Volume.js';
import WeigthAndMass from '/js/class/WeigthAndMass.js';
import Temperature from '/js/class/Temperature.js';
import Energy from '/js/class/Energy.js';
import Area from '/js/class/Area.js';
import Speed from '/js/class/Speed.js';
import Currency from '/js/class/Currency.js';
import Time from '/js/class/Time.js';
import Power from '/js/class/Power.js';
import Pressure from '/js/class/Pressure.js'
import Data from '/js/class/Data.js'



export default class ConverterMode {

    constructor(history){

        this.viewsCalculator = new StellarViews();
        this.length = new Length();
        this.angleConverter = new Angle();
        this.volumeConverter = new Volume();
        this.weigthAndMassConverter = new WeigthAndMass();
        this.temperatureConverter = new Temperature();
        this.energyConverter = new Energy();
        this.areaConverter = new Area();
        this.speedConverter = new Speed();
        this.currencyConverter = new Currency();
        this.timeConverter = new Time();
        this.powerConverter = new Power();
        this.pressureConverter = new Pressure();
        this.dataConverter = new Data();
        this.calculatorHistory = history;
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
        this.startHistoryEvents();

        

    }

    start(type){

        this.firstConversorListEl = document.querySelector('#first-converter-list');
        this.secondConversorListEl = document.querySelector('#second-converter-list');
        this.btnSelectionFirst = document.querySelector('#btn-first-selection');
        this.btnSelectionSecond = document.querySelector('#btn-second-selection');
        this.firstSelectedEl = document.querySelector('#first-select');
        this.secondSelectedEl = document.querySelector('#second-select');

        this.viewsCalculator.setConversorTo(type, this.firstConversorListEl, this.firstSelectedEl, this.secondConversorListEl, this.secondSelectedEl);

        this.converterType = type;

        if(this.activeBtn === false){

            this.addEventsToSelection(this.btnSelectionFirst, this.firstConversorListEl);
            this.addEventsToSelection(this.btnSelectionSecond, this.secondConversorListEl);
            this.addEventsToButtons();

        }

        this.activeBtn = true;

    }
    startHistoryEvents(){

        const actions = {
            "send-result": (element) => this.getResult(element.dataset.value)
        }

        document.querySelector('.wrapper-calc-and-results')
        .addEventListener('click', e =>{

            this.dispatcherEvent(e, actions);

        });

    }

    dispatcherEvent(e, actions){

        const element =  e.target.closest('[data-action]');

        if(!element) return;

        const action = element.dataset.action;

        actions[action]?.(element)

    }

    addEventsToSelection(selectionBtnEl, selectionListEl){

        //console.dir(selectionBtnEl);

        selectionBtnEl.addEventListener('click', ()=>{

            selectionListEl.childNodes.forEach(li => {

                li.addEventListener('click', ()=>{

                    this.viewsCalculator.removeClassFromListOfEl(selectionListEl.childNodes, 'active-converter');

                    li.classList.add('active-converter');

                    selectionBtnEl.children[0].children[0].textContent = li.textContent;

                    this.checkConverterType();

                });
                
            });

            if(selectionListEl.dataset.open == 'no' || !selectionListEl.dataset.open){

                this.viewsCalculator.showElement(selectionListEl, 'block');

                selectionListEl.dataset.open = 'yes';

                selectionBtnEl.children[0].children[1].classList.add('caret-rotate');

            }else if(selectionListEl.dataset.open == 'yes'){

                this.viewsCalculator.unShowElement(selectionListEl);

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

        this.viewsCalculator.setInnerHtmlToElement(this.firstOutputValue, 'first-converter-output');

        this.checkConverterType();

    }

    async checkConverterType(){ 

        let result = '';

        if(this.converterType == 'length'){

            let list = this.length.calcLengthConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

            result = list[0];
            let value = list[1];
            let lengthToConvert = list[2];
            let lengthResult = list[3];

            this.sendToHistory(value, result, lengthToConvert, lengthResult);

        }else if(this.converterType == 'angle'){

            let list = this.angleConverter.calcAngleConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

            result = list[0];
            let value = list[1];
            let lengthToConvert = list[2];
            let lengthResult = list[3];

            this.sendToHistory(value, result, lengthToConvert, lengthResult);

        }else if(this.converterType == 'volume'){

            let list = this.volumeConverter.calcVolumeConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

            result = list[0];
            let value = list[1];
            let lengthToConvert = list[2];
            let lengthResult = list[3];

            this.sendToHistory(value, result, lengthToConvert, lengthResult);

        }else if(this.converterType == 'weigthAndMass'){

            let list = this.weigthAndMassConverter.calcWeigthAndMassConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

            result = list[0];
            let value = list[1];
            let lengthToConvert = list[2];
            let lengthResult = list[3];

            this.sendToHistory(value, result, lengthToConvert, lengthResult);

        }else if(this.converterType == 'temperature'){

            let list = this.temperatureConverter.calctemperatureConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

            result = list[0];
            let value = list[1];
            let lengthToConvert = list[2];
            let lengthResult = list[3];

            this.sendToHistory(value, result, lengthToConvert, lengthResult);

        }else if(this.converterType == 'energy'){

            let list = this.energyConverter.calcEnergyConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

            result = list[0];
            let value = list[1];
            let lengthToConvert = list[2];
            let lengthResult = list[3];

            this.sendToHistory(value, result, lengthToConvert, lengthResult);

        }
        else if(this.converterType == 'area'){

            let list = this.areaConverter.calcAreaConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

            result = list[0];
            let value = list[1];
            let lengthToConvert = list[2];
            let lengthResult = list[3];

            this.sendToHistory(value, result, lengthToConvert, lengthResult);

        }
        else if(this.converterType == 'speed'){

            let list = this.speedConverter.calcSpeedConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

            result = list[0];
            let value = list[1];
            let lengthToConvert = list[2];
            let lengthResult = list[3];

            this.sendToHistory(value, result, lengthToConvert, lengthResult);

        }
        else if(this.converterType == 'currency'){

            let list = await this.currencyConverter.calcCurrencyConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

            result = list[0];
            let value = list[1];
            let lengthToConvert = list[2];
            let lengthResult = list[3];

            this.sendToHistory(value, result, lengthToConvert, lengthResult, true);

        }
        else if(this.converterType == 'time'){

            let list = this.timeConverter.calcTimeConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

            console.log(list);

            result = list[0];
            let value = list[1];
            let lengthToConvert = list[2];
            let lengthResult = list[3];

            this.sendToHistory(value, result, lengthToConvert, lengthResult);

        }
        else if(this.converterType == 'power'){

            let list = this.powerConverter.calcPowerConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

            result = list[0];
            let value = list[1];
            let lengthToConvert = list[2];
            let lengthResult = list[3];

            this.sendToHistory(value, result, lengthToConvert, lengthResult);

        }
        else if(this.converterType == 'pressure'){

            let list = this.pressureConverter.calcPressureConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

            result = list[0];
            let value = list[1];
            let lengthToConvert = list[2];
            let lengthResult = list[3];

            this.sendToHistory(value, result, lengthToConvert, lengthResult);

        }
        else if(this.converterType == 'data'){

            let list = this.dataConverter.calcDataConverter(this.firstOutputValue, this.firstSelectedEl.textContent, this.secondSelectedEl.textContent);

            result = list[0];
            let value = list[1];
            let lengthToConvert = list[2];
            let lengthResult = list[3];

            this.sendToHistory(value, result, lengthToConvert, lengthResult);

        }

        if(result === false){

            this.viewsCalculator.displayFail('Is impossible realize the conversion...');
            this.clearConverter();

        }else{

            this.setToDisplay(result);

        }

    }

    sendToHistory(value, result, lengthToConvert, lengthResult, isCurrency = false){

        //console.log('Send to hitory: ', value, result, lengthToConvert, lengthResult);

        let convertAbreviation = {

            "Square Millimeters": "mm²",
            "Square Centimeters": "cm²",
            "Square Meters": "m²",
            "Hectares": "ha",
            "Square Kilometers": "km²",
            "Square Inches": "in²",
            "Square Feet": "ft²",
            "Square Yards": "yd²",
            "Acres": "ac",
            "Square Miles": "mi²",
            'nanometers': 'nm',
            'microns': 'µm',
            'millimeters': 'mm',
            'centimeter': 'cm',
            'meters': 'm',
            'kilometers': 'km',
            'inches': 'n',
            'Feet': 'ft',
            'Yards': 'yd',
            'miles': 'mi',
            'nautical miles': 'NM',
            'Grados': 'gon',
            'Degree': '°',
            'Radians': 'rad',
            'Milliliters': 'ml', 
            'Cubic centimeters': 'cc', 
            'Liters': 'l',
            'Cubic meters': 'm<sup>3', 
            'Teaspoon(USA)': 'tsp(USA)',
            'Tablespoons(USA)': 'tbsp(USA)',
            'Fluid ounces(USA)': 'flOz(USA)',
            'Cups(USA)': 'c(USA)', 
            'Pint(USA)': 'pt(USA)',
            'Quart(USA)': 'qt(USA)',
            'Gallons(USA)': 'gal(USA)',
            'Cubic inches': 'in<sup>3', 
            'Cubic feet': 'ft<sup>3', 
            'Cubic yards': 'yd<sup>3', 
            'Teaspoon(UK)': 'tsp(UK)',
            'Tablespoons(UK)': 'tbsp(UK)',
            'Fluid ounces(UK)': 'flOz(UK)',
            'Pint(UK)': 'pt(UK)',
            'Quart(UK)': 'qt(UK)', 
            'Gallons(UK)': 'gal(UK)',
            'Carats': 'ct', 
            'Miligrams': 'mg', 
            'Centigrams': 'cg', 
            'Decigrams': 'dg', 
            'Gram': 'g', 
            'Decagrams': 'dag', 
            'Hectograms': 'hg', 
            'Kilograms': 'kg', 
            'Metric Tons': 't', 
            'Ounce': 'oz', 
            'Pounds': 'lb', 
            'Stone': 'st', 
            'Short Tons(USA)': 'ton(USA)', 
            'Long Tons(UK)': 'L/T(UK)',
            'Celsius': '°C',
            'Fahrenheit': '°F',
            'Kelvin': '°K',
            "Electron volts": "eV",
            "Joules": "J",
            "Kilojoules": "kJ",
            "Thermic calories": "cal",
            "Food calories": "kcal",
            "Pound-feet": "lbf-ft",
            "British thermal units": "BTU",
            "Kilowatt-hour": "kWh",
            "Centimeters per second": "cm/s",
            "Meters per second": "m/s",
            "Kilometers per hour": "km/h",
            "Feet per second": "ft/s",
            "Miles per hour": "mph",
            "Knots": "kn",
            "Mach": "Mach",
            'Microseconds': 'µs',
            'Milliseconds': 'ms',
            'Seconds': 's',
            'Minutes': 'min',
            'Hours': 'h',
            'Days': 'd',
            'Weeks': 'w',
            'Years': 'y',
            'Watts': 'W',
            'Kilowatts': 'kW',
            'Horsepower(USA)': 'hp',
            'Pound-feet/minute': 'lb-ft/min',
            'BTUs/minute': 'BTU/min',
            'Atmospheres': 'atm',
            'Bars': 'bar',
            'Kilopascals': 'kPa',
            'Millimeters of mercury': 'mmHg',
            'Pascals': 'Pa',
            'Pounds per square inch': 'psi',
            'Bit': 'b',
            'Nibble': 'nibble',
            'Byte': 'B',
            'Kilobit': 'kb',
            'Kibibit': 'Kib',
            'Kilobyte': 'KB',
            'Kibibyte': 'KiB',
            'Megabit': 'Mb',
            'Mebibit': 'Mib',
            'Megabyte': 'MB',
            'Mebibyte': 'MiB',
            'Gigabit': 'Gb',
            'Gibibit': 'Gib',
            'Gigabyte': 'GB',
            'Gibibyte': 'GiB',
            'Terabit': 'Tb',
            'Tebibit': 'Tib',
            'Terabyte': 'TB',
            'Tebibyte': 'TiB',
            'Petabit': 'Pb',
            'Pebibit': 'Pib',
            'Petabyte': 'PB',
            'Pebibyte': 'PiB',
            'Exabit': 'Eb',
            'Exbibit': 'Eib',
            'Exabyte': 'EB',
            'Exbibyte': 'EiB',
            'Zettabit': 'Zb',
            'Zebibit': 'Zib',
            'Zettabyte': 'ZB',
            'Zebibyte': 'ZiB',
            'Yottabit': 'Yb',
            'Yobibit': 'Yib',
            'Yottabyte': 'YB',
            'Yobibyte': 'YiB'
            
        }

        if(!isCurrency) this.calculatorHistory.addToHistory(`${value} ${convertAbreviation[lengthToConvert]} =`, `${result} ${convertAbreviation[lengthResult]}`, `${value} ${convertAbreviation[lengthToConvert]} ${convertAbreviation[lengthResult]}`);

        if(isCurrency) this.calculatorHistory.addToHistory(`${value} ${lengthToConvert} =`, `${result} ${lengthResult}`, `${value} ${lengthToConvert} ${lengthResult}`);


    }

    setToDisplay(result){

        if(result == '' || result == undefined){

            this.viewsCalculator.setInnerHtmlToElement(0, 'second-converter-output');

        }else{

            this.viewsCalculator.setInnerHtmlToElement(result, 'second-converter-output');

        }

        this.verifySizeOutput('first-converter-output');
        this.verifySizeOutput('second-converter-output');

    }

    getResult(value){

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
            'BTU/min': 'BTUs/minute',
            'atm': 'Atmospheres',
            'bar': 'Bars',
            'kPa': 'Kilopascals',
            'mmHg': 'Millimeters of mercury',
            'Pa': 'Pascals',
            'psi': 'Pounds per square inch',
            'b': 'Bit',
            'nibble': 'Nibble',
            'B': 'Byte',
            'kb': 'Kilobit',
            'Kib': 'Kibibit',
            'KB': 'Kilobyte',
            'KiB': 'Kibibyte',
            'Mb': 'Megabit',
            'Mib': 'Mebibit',
            'MB': 'Megabyte',
            'MiB': 'Mebibyte',
            'Gb': 'Gigabit',
            'Gib': 'Gibibit',
            'GB': 'Gigabyte',
            'GiB': 'Gibibyte',
            'Tb': 'Terabit',
            'Tib': 'Tebibit',
            'TB': 'Terabyte',
            'TiB': 'Tebibyte',
            'Pb': 'Petabit',
            'Pib': 'Pebibit',
            'PB': 'Petabyte',
            'PiB': 'Pebibyte',
            'Eb': 'Exabit',
            'Eib': 'Exbibit',
            'EB': 'Exabyte',
            'EiB': 'Exbibyte',
            'Zb': 'Zettabit',
            'Zib': 'Zebibit',
            'ZB': 'Zettabyte',
            'ZiB': 'Zebibyte',
            'Yb': 'Yottabit',
            'Yib': 'Yobibit',
            'YB': 'Yottabyte',
            'YiB': 'Yobibyte'
        }

        let firstConverterName = abreviations[value[1]];
        let secondConverterName = abreviations[value[2]];;

        this.viewsCalculator.removeClassFromListOfEl(this.firstConversorListEl.childNodes, 'active-converter');
        this.viewsCalculator.removeClassFromListOfEl(this.secondConversorListEl.childNodes, 'active-converter');

        let firstLi = this.viewsCalculator.returnChildNodeWithThisText(firstConverterName, this.firstConversorListEl.childNodes);
        let secondLi = this.viewsCalculator.returnChildNodeWithThisText(secondConverterName, this.secondConversorListEl.childNodes);

        

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

        this.viewsCalculator.setInnerHtmlToElement(this.firstOutputValue, 'first-converter-output');

        this.checkConverterType();

    }

    clearConverter(){

        //console.log('pass: ClearConverter');

        this.firstOutputValue = '';

        this.viewsCalculator.setInnerHtmlToElement(0, 'second-converter-output');
        this.viewsCalculator.setInnerHtmlToElement(0, 'first-converter-output');

        this.verifySizeOutput('first-converter-output');
        this.verifySizeOutput('second-converter-output');

        if(this.converterType == 'temperature'){

            this.addValueToOutputFirst(0);

        }

    }

    verifySizeOutput(outputId){

        let outputLegth = document.getElementById(outputId).textContent.length;

        if(outputLegth < 18){

            this.viewsCalculator.changeElementFontSize('increase', 0.0, outputId, '4', 'rem');

        }

        if(outputLegth > 18){

            this.viewsCalculator.changeElementFontSize('decrease', 0.15, outputId, '4', 'rem');

        }
        if(outputLegth > 21){

            this.viewsCalculator.changeElementFontSize('decrease', 0.15, outputId, '3.4', 'rem');

        }
        if(outputLegth > 25){

            this.viewsCalculator.changeElementFontSize('decrease', 0.20, outputId, '2.89', 'rem');

        }
        if(outputLegth > 31){

            this.clearConverter();

            this.viewsCalculator.displayFail('Use less than: 32 characters!');

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