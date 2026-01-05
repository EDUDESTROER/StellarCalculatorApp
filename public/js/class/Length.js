class Length{

    constructor(){}

    calcLengthConverter(value, lengthToConvert, lengthResult){

        let convertList = {
                'nanometers': {
                    'nanometers': 1, 
                    'microns': 0.001, 
                    'millimeters': 0.000001, 
                    'centimeter': 0.0000001, 
                    'meters': 0.000000001, 
                    'kilometers': 0.000000000001, 
                    'inches': 0.000000039370079, 
                    'Feet': 0.00000000328084, 
                    'Yards': 0.000000001093613, 
                    'miles': 0.000000000000621, 
                    'nautical miles': 0.00000000000054
                },
                'microns': {
                    'nanometers': 1000, 
                    'microns': 1, 
                    'millimeters': 0.001, 
                    'centimeter': 0.0001, 
                    'meters': 0.000001, 
                    'kilometers': 0.000000001, 
                    'inches': 0.000039, 
                    'Feet': 0.000003, 
                    'Yards': 0.000001, 
                    'miles': 0.000000000621371, 
                    'nautical miles': 0.000000000539957
                },
                'millimeters': {
                    'nanometers': 1000000, 
                    'microns': 1000, 
                    'millimeters': 1, 
                    'centimeter': 0.1, 
                    'meters': 0.001, 
                    'kilometers': 0.000001, 
                    'inches': 0.03937, 
                    'Feet': 0.003281, 
                    'Yards': 0.001094, 
                    'miles': 0.000000621371192, 
                    'nautical miles': 0.000000539956803
                },
                'centimeter': {
                    'nanometers': 10000000, 
                    'microns': 10000, 
                    'millimeters': 10, 
                    'centimeter': 1, 
                    'meters': 0.01, 
                    'kilometers': 0.00001, 
                    'inches': 0.393701, 
                    'Feet': 0.032808, 
                    'Yards': 0.010936, 
                    'miles': 0.000006, 
                    'nautical miles': 0.000005
                },
                'meters': {
                    'nanometers': 1000000000, 
                    'microns': 1000000, 
                    'millimeters': 1000, 
                    'centimeter': 100, 
                    'meters': 1, 
                    'kilometers': 0.001, 
                    'inches': 39.37008, 
                    'Feet': 3.28084, 
                    'Yards': 1.093613, 
                    'miles': 0.000621, 
                    'nautical miles': 0.00054
                },
                'kilometers': {
                    'nanometers': 1000000000000, 
                    'microns': 1000000000, 
                    'millimeters': 1000000, 
                    'centimeter': 100000, 
                    'meters': 1000, 
                    'kilometers': 1, 
                    'inches': 39370.08, 
                    'Feet': 3280.84, 
                    'Yards': 1093.61, 
                    'miles': 0.621371, 
                    'nautical miles': 0.539957
                },
                'inches': {
                    'nanometers': 25400000, 
                    'microns': 25400, 
                    'millimeters': 25.4, 
                    'centimeter': 2.54, 
                    'meters': 0.0254, 
                    'kilometers': 0.0000254, 
                    'inches': 1, 
                    'Feet': 0.0833333, 
                    'Yards': 0.0277778, 
                    'miles': 0.000016, 
                    'nautical miles': 0.000014
                },
                'Feet': {
                    'nanometers': 304800000, 
                    'microns': 304800, 
                    'millimeters': 304.8, 
                    'centimeter': 30.48, 
                    'meters': 0.3048, 
                    'kilometers': 0.000305, 
                    'inches': 12, 
                    'Feet': 1, 
                    'Yards': 0.333333, 
                    'miles': 0.000189, 
                    'nautical miles': 0.000165
                },
                'Yards': {
                    'nanometers': 914400000, 
                    'microns': 914400, 
                    'millimeters': 914.4, 
                    'centimeter': 91.44, 
                    'meters': 0.9144, 
                    'kilometers': 0.000914, 
                    'inches': 36, 
                    'Feet': 3, 
                    'Yards': 1, 
                    'miles': 0.000568, 
                    'nautical miles': 0.000494
                },
                'miles': {
                    'nanometers': 1609344000000, 
                    'microns': 1609344000, 
                    'millimeters': 1609344, 
                    'centimeter': 160934.4, 
                    'meters': 1609.344, 
                    'kilometers': 1.609344, 
                    'inches': 63360, 
                    'Feet': 5280, 
                    'Yards': 1760, 
                    'miles': 1, 
                    'nautical miles': 0.868976
                },
                'nautical miles': {
                    'nanometers': 1852000000000, 
                    'microns': 1852000000, 
                    'millimeters': 1852000, 
                    'centimeter': 185200, 
                    'meters': 1852, 
                    'kilometers': 1.852, 
                    'inches': 72913.39, 
                    'Feet': 6076.115, 
                    'Yards': 2025.372, 
                    'miles': 1.150779, 
                    'nautical miles': 1
                }

            }

        let toConvert = convertList[lengthToConvert];

        let result = value * toConvert[lengthResult];

        this.sendToHistory(value, result, lengthToConvert, lengthResult);

        return result;

    }

    sendToHistory(value, result, lengthToConvert, lengthResult){

        let convertAbreviation = {
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
            'nautical miles': 'NM'
        }

        window.calculatorHistory.addToHistory(`${value} ${convertAbreviation[lengthToConvert]} =`, `${result} ${convertAbreviation[lengthResult]}`, `${value} ${convertAbreviation[lengthToConvert]} ${convertAbreviation[lengthResult]}`);

    }

}