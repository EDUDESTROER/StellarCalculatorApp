class Speed{

    calcSpeedConverter(value, lengthToConvert, lengthResult){

        let convertList = {
            'Centimeters per second':{
                'Centimeters per second': 1, 
                'Meters per second': 0.01,
                'Kilometers per hour': 0.036, 
                'Feet per second': 0.032808,
                'Miles per hour': 0.022371, 
                'Knots': 0.01944, 
                'Mach': 0.000029
            }, 
            'Meters per second':{
                'Centimeters per second': 100, 
                'Meters per second': 1,
                'Kilometers per hour': 3.6, 
                'Feet per second': 3.28084,
                'Miles per hour': 2.237136, 
                'Knots': 1.944012, 
                'Mach': 0.002939
            },
            'Kilometers per hour': {
                'Centimeters per second': 27.77778, 
                'Meters per second': 0.277778,
                'Kilometers per hour': 1, 
                'Feet per second': 0.911344,
                'Miles per hour': 0.621427, 
                'Knots': 0.540003, 
                'Mach': 0.000816
            }, 
            'Feet per second': {
                'Centimeters per second': 30.48, 
                'Meters per second': 0.3048,
                'Kilometers per hour': 1.09728, 
                'Feet per second': 1,
                'Miles per hour': 0.681879, 
                'Knots': 0.592535, 
                'Mach': 0.000896
            },
            'Miles per hour': {
                'Centimeters per second': 44.7, 
                'Meters per second': 0.447,
                'Kilometers per hour': 1.6092, 
                'Feet per second': 1.466535,
                'Miles per hour': 1, 
                'Knots': 0.868974, 
                'Mach': 0.001314
            }, 
            'Knots': {
                'Centimeters per second': 51.44, 
                'Meters per second': 0.5144,
                'Kilometers per hour': 1.85184, 
                'Feet per second': 1.687664,
                'Miles per hour': 1.150783, 
                'Knots': 1, 
                'Mach': 0.001512
            }, 
            'Mach': {
                'Centimeters per second': 34030, 
                'Meters per second': 340.3,
                'Kilometers per hour': 1225.08, 
                'Feet per second': 1116.47,
                'Miles per hour': 761.2975, 
                'Knots': 661.5474, 
                'Mach': 1
            }
        };
        let toConvert = convertList[lengthToConvert];

        let result = value * toConvert[lengthResult];

        this.sendToHistory(value, result, lengthToConvert, lengthResult);

        return result;

    }

    sendToHistory(value, result, lengthToConvert, lengthResult){

        let convertAbreviation = {

            "Centimeters per second": "cm/s",
            "Meters per second": "m/s",
            "Kilometers per hour": "km/h",
            "Feet per second": "ft/s",
            "Miles per hour": "mph",
            "Knots": "kn",
            "Mach": "Mach"
            
        }

        window.calculatorHistory.addToHistory(`${value} ${convertAbreviation[lengthToConvert]} =`, `${result} ${convertAbreviation[lengthResult]}`, `${value} ${convertAbreviation[lengthToConvert]} ${convertAbreviation[lengthResult]}`);

    }

}