class Angle{

    constructor(){}

    calcAngleConverter(value, lengthToConvert, lengthResult){

        let convertList = {
            'Grados': {
                'Grados': 1,
                'Degree': 0.9,
                'Radians':0.015708
            },
            'Degree': {
                'Grados': 1.111111,
                'Degree': 1,
                'Radians': 0.017453
            },
            'Radians': {
                'Grados': 63.66198,
                'Degree': 57.29578,
                'Radians': 1
            },
        }

        let toConvert = convertList[lengthToConvert];

        let result = value * toConvert[lengthResult];

        this.sendToHistory(value, result, lengthToConvert, lengthResult);

        return result;

    }

    sendToHistory(value, result, lengthToConvert, lengthResult){

        let convertAbreviation = {
            'Grados': 'gon',
            'Degree': '°',
            'Radians': 'rad'
        }

        window.calculatorHistory.addToHistory(`${value} ${convertAbreviation[lengthToConvert]} =`, `${result} ${convertAbreviation[lengthResult]}`, `${value} ${convertAbreviation[lengthToConvert]} ${convertAbreviation[lengthResult]}`);

    }

}