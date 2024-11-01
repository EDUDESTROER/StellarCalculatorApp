class Energy {

    constructor(){}

    calcEnergyConverter(value, lengthToConvert, lengthResult){

        let convertList = {
            'Electron volts': {
                'Electron volts': 1, 
                'Joules': 1.602177e-19, 
                'Kilojoules': 1.602177e-22,
                'Thermic calories': 3.829294e-20, 
                'Food calories': 3.829294e-23, 
                'Pound-feet': 1.181705e-19,
                'British thermal units': 1.518570e-22, 
                'Kilowatt-hour': 4.450490e-26
            }, 
            'Joules': {
                'Electron volts': 6.241509e+18, 
                'Joules': 1, 
                'Kilojoules': 0.001,
                'Thermic calories': 0.239006, 
                'Food calories': 0.000239, 
                'Pound-feet': 0.737562,
                'British thermal units': 0.000948, 
                'Kilowatt-hour': 0.000000277777778
            }, 
            'Kilojoules': {
                'Electron volts': 6.241509e+21, 
                'Joules': 1, 
                'Kilojoules': 1,
                'Thermic calories': 239.0057, 
                'Food calories': 0.239006, 
                'Pound-feet': 737.5621,
                'British thermal units': 0.947817, 
                'Kilowatt-hour': 0.000278
            },
            'Thermic calories': {
                'Electron volts': 2.611448e+19, 
                'Joules': 4.184, 
                'Kilojoules': 0.004184,
                'Thermic calories': 1, 
                'Food calories': 0.001, 
                'Pound-feet': 3.08596,
                'British thermal units': 0.003966, 
                'Kilowatt-hour': 0.000001
            },
            'Food calories': {
                'Electron volts': 2.611448e+22, 
                'Joules': 4184, 
                'Kilojoules': 4.184,
                'Thermic calories': 1000, 
                'Food calories': 1, 
                'Pound-feet': 3085.96,
                'British thermal units': 3.965666, 
                'Kilowatt-hour': 0.001162
            }, 
            'Pound-feet': {
                'Electron volts': 8.462350e+18, 
                'Joules': 1.355818, 
                'Kilojoules': 0.001356,
                'Thermic calories': 0.324048, 
                'Food calories': 0.000324, 
                'Pound-feet': 1,
                'British thermal units': 0.001285, 
                'Kilowatt-hour': 0.000000376616097
            },
            'British thermal units': {
                'Electron volts': 6.585142e+21, 
                'Joules': 1055.056, 
                'Kilojoules': 1.055056,
                'Thermic calories': 252.1644, 
                'Food calories': 0.252164, 
                'Pound-feet': 778.1694,
                'British thermal units': 1, 
                'Kilowatt-hour': 0.000293
            }, 
            'Kilowatt-hour': {
                'Electron volts': 2.246943e+25, 
                'Joules': 3600000, 
                'Kilojoules': 3600,
                'Thermic calories': 860420.7, 
                'Food calories': 860.4207, 
                'Pound-feet': 2655224,
                'British thermal units': 3412.141, 
                'Kilowatt-hour': 1
            },
        };
        let toConvert = convertList[lengthToConvert];

        let result = value * toConvert[lengthResult];

        this.sendToHistory(value, result, lengthToConvert, lengthResult);

        return result;

    }

    sendToHistory(value, result, lengthToConvert, lengthResult){

        let convertAbreviation = {

            "Electron volts": "eV",
            "Joules": "J",
            "Kilojoules": "kJ",
            "Thermic calories": "cal",
            "Food calories": "kcal",
            "Pound-feet": "lbf-ft",
            "British thermal units": "BTU",
            "Kilowatt-hour": "kWh"
            
        }

        window.calculatorHistory.addToHistory(`${value} ${convertAbreviation[lengthToConvert]} =`, `${result} ${convertAbreviation[lengthResult]}`, `${value} ${convertAbreviation[lengthToConvert]} ${convertAbreviation[lengthResult]}`);

    }

}