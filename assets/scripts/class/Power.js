class Power{

    calcPowerConverter(value, timeToConvert, timeResult){

        let convertList = {
            'Watts': {
                'Watts': 1, 
                'Kilowatts': 0.001,
                'Horsepower(USA)': 0.001341, 
                'Pound-feet/minute': 44.25373,
                'BTUs/minute': 0.056869
            },
            'Kilowatts': {
                'Watts': 1000, 
                'Kilowatts': 1,
                'Horsepower(USA)': 1.341022, 
                'Pound-feet/minute': 44253.73,
                'BTUs/minute': 56.86902
            },
            'Horsepower(USA)': {
                'Watts': 745.6999, 
                'Kilowatts': 0.7457,
                'Horsepower(USA)': 1, 
                'Pound-feet/minute': 33000,
                'BTUs/minute': 42.40722
            },
            'Pound-feet/minute': {
                'Watts': 0.022597, 
                'Kilowatts': 0.000023,
                'Horsepower(USA)': 0.00003, 
                'Pound-feet/minute': 1,
                'BTUs/minute': 0.001285
            },
            'BTUs/minute': {
                'Watts': 17.58427, 
                'Kilowatts': 0.017584,
                'Horsepower(USA)': 0.023581, 
                'Pound-feet/minute': 778.1694,
                'BTUs/minute': 1
            }
        }

        let toConvert = convertList[timeToConvert];

        let result = value * toConvert[timeResult];

        this.sendToHistory(value, result, timeToConvert, timeResult);

        return result;

    }

    sendToHistory(value, result, timeToConvert, timeResult){

        let convertAbreviation = {
            'Watts': 'W',
            'Kilowatts': 'kW',
            'Horsepower(USA)': 'hp',
            'Pound-feet/minute': 'lb-ft/min',
            'BTUs/minute': 'BTU/min'
        };

        window.calculatorHistory.addToHistory(`${value} ${convertAbreviation[timeToConvert]} =`, `${result} ${convertAbreviation[timeResult]}`, `${value} ${convertAbreviation[timeToConvert]} ${convertAbreviation[timeResult]}`);

    }

}