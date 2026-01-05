class Time{

    calcTimeConverter(value, timeToConvert, timeResult){

        let convertList = {
            'Microseconds': {
                'Microseconds': 1, 
                'Milliseconds': 0.001,
                'Seconds': 0.000001, 
                'Minutes': 0.000000016666667,
                'Hours': 0.000000000277778, 
                'Days': 0.000000000011574, 
                'Weeks': 0.000000000001653,
                'Years': 0.000000000000032
            }, 
            'Milliseconds': {
                'Microseconds': 1000, 
                'Milliseconds': 1,
                'Seconds': 0.001, 
                'Minutes': 0.000017,
                'Hours': 0.000000277777778, 
                'Days': 0.000000011574074, 
                'Weeks': 0.000000001653439,
                'Years': 0.000000000031688
            },
            'Seconds': {
                'Microseconds': 1000000, 
                'Milliseconds': 1,
                'Seconds': 1, 
                'Minutes': 0.016667,
                'Hours': 0.000278, 
                'Days': 0.000012, 
                'Weeks': 0.000002,
                'Years': 0.000000031688088
            }, 
            'Minutes': {
                'Microseconds': 60000000, 
                'Milliseconds': 60000,
                'Seconds': 60, 
                'Minutes': 1,
                'Hours': 0.016667, 
                'Days': 0.000694, 
                'Weeks': 0.000099,
                'Years': 0.000002
            },
            'Hours': {
                'Microseconds': 3600000000, 
                'Milliseconds': 3600000,
                'Seconds': 3600, 
                'Minutes': 60,
                'Hours': 1, 
                'Days': 0.041667, 
                'Weeks': 0.005952,
                'Years': 0.000114
            }, 
            'Days': {
                'Microseconds': 86400000000, 
                'Milliseconds': 86400000,
                'Seconds': 86400, 
                'Minutes': 1440,
                'Hours': 24, 
                'Days': 1, 
                'Weeks': 0.142857,
                'Years': 0.002738
            }, 
            'Weeks': {
                'Microseconds': 604800000000, 
                'Milliseconds': 604800000,
                'Seconds': 604800, 
                'Minutes': 10080,
                'Hours': 168, 
                'Days': 7, 
                'Weeks': 1,
                'Years': 0.019165
            },
            'Years': {
                'Microseconds': 31557600000000, 
                'Milliseconds': 31557600000,
                'Seconds': 31557600, 
                'Minutes': 525960,
                'Hours': 8766, 
                'Days': 365.25, 
                'Weeks': 52.17857,
                'Years': 1
            }
        }

        let toConvert = convertList[timeToConvert];

        let result = value * toConvert[timeResult];

        this.sendToHistory(value, result, timeToConvert, timeResult);

        return result;

    }

    sendToHistory(value, result, timeToConvert, timeResult){

        let convertAbreviation = {
            'Microseconds': 'µs',
            'Milliseconds': 'ms',
            'Seconds': 's',
            'Minutes': 'min',
            'Hours': 'h',
            'Days': 'd',
            'Weeks': 'w',
            'Years': 'y'
        };

        window.calculatorHistory.addToHistory(`${value} ${convertAbreviation[timeToConvert]} =`, `${result} ${convertAbreviation[timeResult]}`, `${value} ${convertAbreviation[timeToConvert]} ${convertAbreviation[timeResult]}`);

    }

}
