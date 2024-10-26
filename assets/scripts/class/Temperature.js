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

        return toConvert[lengthResult];

    }

}