class Pressure{

    calcPressureConverter(value, timeToConvert, timeResult){

        //console.log('Start Pressure Converter...');

        let convertList = {
            'Atmospheres': {
                'Atmospheres': 1, 
                'Bars': 1.01325,
                'Kilopascals': 101.325, 
                'Millimeters of mercury': 760.1275,
                'Pascals': 101325,
                'Pounds per square inch': 14.69595
            },
            'Bars': {
                'Atmospheres': 0.986923, 
                'Bars': 1,
                'Kilopascals': 100, 
                'Millimeters of mercury': 750.1875,
                'Pascals': 100000,
                'Pounds per square inch': 14.50377
            },
            'Kilopascals': {
                'Atmospheres': 0.009869, 
                'Bars': 0.01,
                'Kilopascals': 1, 
                'Millimeters of mercury': 7.501875,
                'Pascals': 1000,
                'Pounds per square inch': 0.145038
            },
            'Millimeters of mercury': {
                'Atmospheres': 0.001316, 
                'Bars': 0.001333,
                'Kilopascals': 0.1333, 
                'Millimeters of mercury': 1,
                'Pascals': 133.3,
                'Pounds per square inch': 0.019334
            },
            'Pascals': {
                'Atmospheres': 0.0000095717, 
                'Bars': 0.00001,
                'Kilopascals': 0.001, 
                'Millimeters of mercury': 0.007502,
                'Pascals': 1,
                'Pounds per square inch': 0.000145
            },
            'Pounds per square inch': {
                'Atmospheres': 0.068046, 
                'Bars': 0.068948,
                'Kilopascals': 6.894757, 
                'Millimeters of mercury': 51.72361,
                'Pascals': 6894.757,
                'Pounds per square inch': 1
            }
        }

        let toConvert = convertList[timeToConvert];

        let result = value * toConvert[timeResult];

        this.sendToHistory(value, result, timeToConvert, timeResult);

        return result;

    }

    sendToHistory(value, result, timeToConvert, timeResult){

        let convertAbreviation = {
            'Atmospheres': 'atm',
            'Bars': 'bar',
            'Kilopascals': 'kPa',
            'Millimeters of mercury': 'mmHg',
            'Pascals': 'Pa',
            'Pounds per square inch': 'psi'
        };

        window.calculatorHistory.addToHistory(`${value} ${convertAbreviation[timeToConvert]} =`, `${result} ${convertAbreviation[timeResult]}`, `${value} ${convertAbreviation[timeToConvert]} ${convertAbreviation[timeResult]}`);

    }

}