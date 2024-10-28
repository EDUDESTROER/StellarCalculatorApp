class Temperature{

    constructor(){}

    calctemperatureConverter(value, lengthToConvert, lengthResult){

        value = parseFloat(value)

        let convertList = {
            'Celsius': {
                'Celsius': value * 1,
                'Fahrenheit': (value * (9/5)) + 32,
                'Kelvin': value + 273.15
            },
            'Fahrenheit': {
                'Celsius': (value - 32)*(5/9),
                'Fahrenheit': value * 1,
                'Kelvin': (value - 32)*(5/9) + 273.15
            },
            'Kelvin': {
                'Celsius': value - 273.15,
                'Fahrenheit': (value - 273.15) * (9/5) + 32,
                'Kelvin': value * 1
            }
        }

        let toConvert = convertList[lengthToConvert];

        let result = toConvert[lengthResult];

        this.sendToHistory(value, result, lengthToConvert, lengthResult);

        return result;

    }

    sendToHistory(value, result, lengthToConvert, lengthResult){

        let convertAbreviation = {
            'Celsius': '°C',
            'Fahrenheit': '°F',
            'Kelvin': '°K'
        }

        window.calculatorHistory.addToHistory(`${value} ${convertAbreviation[lengthToConvert]} =`, `${result} ${convertAbreviation[lengthResult]}`, `${value} ${convertAbreviation[lengthToConvert]} ${convertAbreviation[lengthResult]}`);

    }

}