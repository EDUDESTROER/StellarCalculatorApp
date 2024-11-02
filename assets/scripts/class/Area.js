class Area {

    constructor(){}

    calcAreaConverter(value, lengthToConvert, lengthResult){

        let convertList = {
            'Square Millimeters': {
                'Square Millimeters': 1, 
                'Square Centimeters': 0.01,
                'Square Meters': 0.000001, 
                'Hectares': 0.0000000001,
                'Square Kilometers': 0.000000000001, 
                'Square Inches': 0.00155, 
                'Square Feet': 0.00155,
                'Square Yards': 0.000001, 
                'Acres': 0.000000000247105,
                'Square Miles': 0.000000000000386
            }, 
            'Square Centimeters': {
                'Square Millimeters': 100, 
                'Square Centimeters': 1,
                'Square Meters': 0.0001, 
                'Hectares': 0.00000001,
                'Square Kilometers': 0.0000000001, 
                'Square Inches': 0.155, 
                'Square Feet': 0.001076,
                'Square Yards': 0.00012, 
                'Acres': 0.000000024710538,
                'Square Miles': 0.00000000003861
            },
            'Square Meters': {
                'Square Millimeters': 1000000, 
                'Square Centimeters': 10000,
                'Square Meters': 1, 
                'Hectares': 0.0001,
                'Square Kilometers': 0.000001, 
                'Square Inches': 1550.003, 
                'Square Feet': 10.76391,
                'Square Yards': 1.19599, 
                'Acres': 0.000247,
                'Square Miles': 0.000000386102159
            }, 
            'Hectares': {
                'Square Millimeters': 10000000000, 
                'Square Centimeters': 100000000,
                'Square Meters': 10000, 
                'Hectares': 1,
                'Square Kilometers': 0.01, 
                'Square Inches': 15500031, 
                'Square Feet': 107639.1,
                'Square Yards': 11959.9, 
                'Acres': 2.471054,
                'Square Miles': 0.003861
            },
            'Square Kilometers':{
                'Square Millimeters': 1000000000000, 
                'Square Centimeters': 10000000000,
                'Square Meters': 1000000, 
                'Hectares': 100,
                'Square Kilometers': 1, 
                'Square Inches': 1550003100, 
                'Square Feet': 10763910,
                'Square Yards': 1195990, 
                'Acres': 247.1054,
                'Square Miles': 0.386102
            }, 
            'Square Inches': {
                'Square Millimeters': 645.16, 
                'Square Centimeters': 6.4516,
                'Square Meters': 0.000645, 
                'Hectares': 0.000000064516,
                'Square Kilometers': 0.00000000064516, 
                'Square Inches': 1, 
                'Square Feet': 0.006944,
                'Square Yards':0.000772, 
                'Acres': 0.000000159422508,
                'Square Miles': 0.000000000249098
            }, 
            'Square Feet': {
                'Square Millimeters': 92903.04, 
                'Square Centimeters': 929.0304,
                'Square Meters': 0.092903, 
                'Hectares': 0.000009,
                'Square Kilometers': 0.00000009290304, 
                'Square Inches': 144, 
                'Square Feet': 1,
                'Square Yards': 0.111111, 
                'Acres': 0.000023,
                'Square Miles': 0.000000035870064
            },
            'Square Yards': {
                'Square Millimeters': 836127.4, 
                'Square Centimeters': 8361.274,
                'Square Meters': 0.836127, 
                'Hectares': 0.000084,
                'Square Kilometers': 0.00000083612736, 
                'Square Inches': 1296, 
                'Square Feet': 9,
                'Square Yards': 1, 
                'Acres': 0.000207,
                'Square Miles': 0.000000322830579
            }, 
            'Acres': {
                'Square Millimeters': 4046856422, 
                'Square Centimeters': 40468564,
                'Square Meters': 4046.856, 
                'Hectares': 0.404686,
                'Square Kilometers': 0.004047, 
                'Square Inches': 6272640, 
                'Square Feet': 43560,
                'Square Yards': 4840, 
                'Acres': 1,
                'Square Miles': 0.001563
            },
            'Square Miles': {
                'Square Millimeters': 2589988110336, 
                'Square Centimeters': 25899881103,
                'Square Meters': 2589988, 
                'Hectares': 258.9988,
                'Square Kilometers': 2.589988, 
                'Square Inches': 4014489600, 
                'Square Feet': 27878400,
                'Square Yards': 3097600, 
                'Acres': 640,
                'Square Miles': 1
            }
        };

        let toConvert = convertList[lengthToConvert];

        let result = value * toConvert[lengthResult];

        this.sendToHistory(value, result, lengthToConvert, lengthResult);

        return result;

    }

    sendToHistory(value, result, lengthToConvert, lengthResult){

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
            "Square Miles": "mi²"
            
        }

        window.calculatorHistory.addToHistory(`${value} ${convertAbreviation[lengthToConvert]} =`, `${result} ${convertAbreviation[lengthResult]}`, `${value} ${convertAbreviation[lengthToConvert]} ${convertAbreviation[lengthResult]}`);

    }

}

