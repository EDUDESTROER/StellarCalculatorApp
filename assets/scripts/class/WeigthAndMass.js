class WeigthAndMass{

    constructor(){}

    calcWeigthAndMassConverter(value, lengthToConvert, lengthResult){

        let convertList = {
            'Carats': {
                'Carats': 1, 
                'Miligrams': 200, 
                'Centigrams': 20, 
                'Decigrams': 2, 
                'Gram': 0.2, 
                'Decagrams': 0.02, 
                'Hectograms': 0.002, 
                'Kilograms': 0.0002, 
                'Metric Tons': 0.0000002, 
                'Ounce': 0.007055, 
                'Pounds': 0.000441, 
                'Stone': 0.000031, 
                'Short Tons(USA)': 0.000000220462262, 
                'Long Tons(UK)': 0.000000196841306
            },
            'Miligrams':{
                'Carats': 0.005, 
                'Miligrams': 1, 
                'Centigrams': 0.1, 
                'Decigrams': 0.01, 
                'Gram': 0.001, 
                'Decagrams': 0.0001, 
                'Hectograms': 0.00001, 
                'Kilograms': 0.000001, 
                'Metric Tons': 0.000000001, 
                'Ounce': 0.000035, 
                'Pounds': 0.000002, 
                'Stone': 0.000000157473044, 
                'Short Tons(USA)': 0.000000001102311, 
                'Long Tons(UK)': 0.000000000984207
            }, 
            'Centigrams':{
                'Carats': 0.05, 
                'Miligrams': 10, 
                'Centigrams': 1, 
                'Decigrams': 0.1, 
                'Gram': 0.01, 
                'Decagrams': 0.001, 
                'Hectograms': 0.0001, 
                'Kilograms': 0.00001, 
                'Metric Tons': 0.00000001, 
                'Ounce': 0.000353, 
                'Pounds': 0.000022, 
                'Stone':0.000002, 
                'Short Tons(USA)': 0.000000011023113, 
                'Long Tons(UK)': 0.000000009842065
            }, 
            'Decigrams':{
                'Carats': 0.5, 
                'Miligrams': 100, 
                'Centigrams': 10, 
                'Decigrams': 1, 
                'Gram': 0.1, 
                'Decagrams': 0.01, 
                'Hectograms': 0.001, 
                'Kilograms': 0.0001, 
                'Metric Tons': 0.0000001, 
                'Ounce': 0.003527, 
                'Pounds': 0.00022, 
                'Stone': 0.000016, 
                'Short Tons(USA)': 0.000000110231131, 
                'Long Tons(UK)': 0.000000098420653
            },  
            'Gram':{
                'Carats': 5, 
                'Miligrams': 1000, 
                'Centigrams': 100, 
                'Decigrams': 10, 
                'Gram': 1, 
                'Decagrams': 0.1, 
                'Hectograms': 0.01, 
                'Kilograms': 0.001, 
                'Metric Tons': 0.000001, 
                'Ounce': 0.035274, 
                'Pounds': 0.002205, 
                'Stone': 0.000157, 
                'Short Tons(USA)': 0.000001, 
                'Long Tons(UK)': 0.000000984206528
            }, 
            'Decagrams':{
                'Carats': 50, 
                'Miligrams': 10000, 
                'Centigrams': 1000, 
                'Decigrams': 100, 
                'Gram': 10, 
                'Decagrams': 1, 
                'Hectograms': 0.1, 
                'Kilograms': 0.01, 
                'Metric Tons': 0.00001, 
                'Ounce': 0.35274, 
                'Pounds': 0.022046, 
                'Stone': 0.001575, 
                'Short Tons(USA)': 0.000011, 
                'Long Tons(UK)': 0.00001
            }, 
            'Hectograms':{
                'Carats': 500, 
                'Miligrams': 100000, 
                'Centigrams': 10000, 
                'Decigrams': 1000, 
                'Gram': 100, 
                'Decagrams': 10, 
                'Hectograms': 1, 
                'Kilograms': 0.1, 
                'Metric Tons': 0.0001, 
                'Ounce': 3.527396, 
                'Pounds': 0.220462, 
                'Stone': 0.015747, 
                'Short Tons(USA)': 0.00011, 
                'Long Tons(UK)': 0.000098
            },  
            'Kilograms':{
                'Carats': 5000, 
                'Miligrams': 1000000, 
                'Centigrams': 100000, 
                'Decigrams': 10000, 
                'Gram': 1000, 
                'Decagrams': 100, 
                'Hectograms': 10, 
                'Kilograms': 1, 
                'Metric Tons': 0.001, 
                'Ounce': 35.27396, 
                'Pounds': 2.204623, 
                'Stone': 0.157473, 
                'Short Tons(USA)': 0.001102, 
                'Long Tons(UK)': 0.000984
            }, 
            'Metric Tons':{
                'Carats': 5000000, 
                'Miligrams': 1000000000, 
                'Centigrams': 100000000, 
                'Decigrams': 10000000, 
                'Gram': 1000000, 
                'Decagrams': 100000, 
                'Hectograms': 10000, 
                'Kilograms': 1000, 
                'Metric Tons': 1, 
                'Ounce': 35273.96, 
                'Pounds': 2204.623, 
                'Stone': 157.473, 
                'Short Tons(USA)': 1.102311, 
                'Long Tons(UK)': 0.984207
            },  
            'Ounce':{
                'Carats': 141.7476, 
                'Miligrams': 28349.52, 
                'Centigrams': 2834.952, 
                'Decigrams': 283.4952, 
                'Gram': 28.34952, 
                'Decagrams': 2.834952, 
                'Hectograms': 0.283495, 
                'Kilograms': 0.02835, 
                'Metric Tons': 0.000028, 
                'Ounce': 1, 
                'Pounds': 0.0625, 
                'Stone': 0.004464, 
                'Short Tons(USA)': 0.000031, 
                'Long Tons(UK)': 0.000028
            }, 
            'Pounds':{
                'Carats': 2267.962, 
                'Miligrams': 453592.4, 
                'Centigrams': 45359.24, 
                'Decigrams': 4535.924, 
                'Gram': 453.5924, 
                'Decagrams': 45.35924, 
                'Hectograms': 4.535924, 
                'Kilograms': 0.453592, 
                'Metric Tons': 0.000454, 
                'Ounce': 16, 
                'Pounds': 1, 
                'Stone': 0.071429, 
                'Short Tons(USA)': 0.0005, 
                'Long Tons(UK)': 0.000446
            }, 
            'Stone':{
                'Carats': 31751.47, 
                'Miligrams': 6350293, 
                'Centigrams': 635029.3, 
                'Decigrams': 63502.93, 
                'Gram': 6350.293, 
                'Decagrams': 635.0293, 
                'Hectograms': 63.50293, 
                'Kilograms': 6.350293, 
                'Metric Tons': 0.00635, 
                'Ounce': 224, 
                'Pounds': 14, 
                'Stone': 1, 
                'Short Tons(USA)': 0.007, 
                'Long Tons(UK)': 0.00625
            },  
            'Short Tons(USA)':{
                'Carats': 4535924, 
                'Miligrams': 907184740, 
                'Centigrams': 90718474, 
                'Decigrams': 9071847, 
                'Gram': 907184.7, 
                'Decagrams': 90718.47, 
                'Hectograms': 9071.847, 
                'Kilograms': 907.1847, 
                'Metric Tons': 0.907185, 
                'Ounce': 32000, 
                'Pounds': 2000, 
                'Stone': 142.8571, 
                'Short Tons(USA)': 1, 
                'Long Tons(UK)': 0.892857
            },  
            'Long Tons(UK)':{
                'Carats': 5080235, 
                'Miligrams': 1016046909, 
                'Centigrams': 101604691, 
                'Decigrams': 10160469, 
                'Gram': 1016047, 
                'Decagrams': 101604.7, 
                'Hectograms': 10160.47, 
                'Kilograms': 1016.047, 
                'Metric Tons': 1.016047, 
                'Ounce': 35840, 
                'Pounds': 2240, 
                'Stone': 160, 
                'Short Tons(USA)': 1.12, 
                'Long Tons(UK)': 1
            }, 
        }

        let toConvert = convertList[lengthToConvert];

        let result = value * toConvert[lengthResult];

        this.sendToHistory(value, result, lengthToConvert, lengthResult);

        return result;

    }

    sendToHistory(value, result, lengthToConvert, lengthResult){

        let convertAbreviation = {
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
            'Long Tons(UK)': 'L/T(UK)'
        }

        window.calculatorHistory.addToHistory(`${value} ${convertAbreviation[lengthToConvert]} =`, `${result} ${convertAbreviation[lengthResult]}`, `${value} ${convertAbreviation[lengthToConvert]} ${convertAbreviation[lengthResult]}`);

    }


}