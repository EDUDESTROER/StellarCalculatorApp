class Volume{

    constructor(){}

    calcVolumeConverter(value, lengthToConvert, lengthResult){

        let convertList = {
            'Milliliters': {
                'Milliliters': 1, 
                'Cubic centimeters': 1, 
                'Liters': 0.001, 
                'Cubic meters': 0.000001, 
                'Teaspoon(USA)': 0.202884, 
                'Tablespoons(USA)': 0.067628, 
                'Fluid ounces(USA)': 0.033814, 
                'Cups(USA)': 0.004227, 
                'Pint(USA)': 0.002113, 
                'Quart(USA)': 0.001057, 
                'Gallons(USA)': 0.000264, 
                'Cubic inches': 0.061024, 
                'Cubic feet': 0.000035, 
                'Cubic yards': 0.000001, 
                'Teaspoo(UK)': 0.168936, 
                'Tablespoons(UK)': 0.056312, 
                'Fluid ounces(UK)': 0.035195, 
                'Pint(UK)': 0.00176, 
                'Quart(UK)': 0.00088, 
                'Gallons(UK)': 0.00022
            },

            'Cubic centimeters': {
                'Milliliters': 1, 
                'Cubic centimeters': 1, 
                'Liters': 0.001, 
                'Cubic meters': 0.000001, 
                'Teaspoon(USA)': 0.202884, 
                'Tablespoons(USA)': 0.067628, 
                'Fluid ounces(USA)': 0.033814, 
                'Cups(USA)': 0.004227, 
                'Pint(USA)': 0.002113, 
                'Quart(USA)': 0.001057, 
                'Gallons(USA)': 0.000264, 
                'Cubic inches': 0.061024, 
                'Cubic feet': 0.000035, 
                'Cubic yards': 0.000001, 
                'Teaspoon(UK)': 0.168936, 
                'Tablespoons(UK)': 0.056312, 
                'Fluid ounces(UK)': 0.035195, 
                'Pint(UK)': 0.00176, 
                'Quart(UK)': 0.00088, 
                'Gallons(UK)': 0.00022
            },

            'Liters': {
                'Milliliters': 1000, 
                'Cubic centimeters': 1000, 
                'Liters': 1, 
                'Cubic meters': 0.001, 
                'Teaspoon(USA)': 202.8841, 
                'Tablespoons(USA)': 67.62805, 
                'Fluid ounces(USA)': 33.81402, 
                'Cups(USA)': 4.226753, 
                'Pint(USA)': 2.113376, 
                'Quart(USA)': 1.056688, 
                'Gallons(USA)': 0.264172, 
                'Cubic inches': 61.02374, 
                'Cubic feet': 0.035315, 
                'Cubic yards': 0.001308, 
                'Teaspoon(UK)': 168.9364, 
                'Tablespoons(UK)': 56.31213, 
                'Fluid ounces(UK)': 35.19508, 
                'Pint(UK)': 1.759754, 
                'Quart(UK)': 0.879877, 
                'Gallons(UK)': 0.219969
            },

            'Cubic meters': {
                'Milliliters': 1000000, 
                'Cubic centimeters': 1000000, 
                'Liters': 1000, 
                'Cubic meters': 1, 
                'Teaspoon(USA)': 202884.1, 
                'Tablespoons(USA)': 67628.05, 
                'Fluid ounces(USA)': 33814.02, 
                'Cups(USA)': 4226.753, 
                'Pint(USA)': 2113.376, 
                'Quart(USA)': 1056.688, 
                'Gallons(USA)': 264.1721, 
                'Cubic inches': 61023.74, 
                'Cubic feet': 35.31467, 
                'Cubic yards': 1.307951, 
                'Teaspoon(UK)': 168936.4, 
                'Tablespoons(UK)': 56312.13, 
                'Fluid ounces(UK)': 35195.08, 
                'Pint(UK)': 1759.754, 
                'Quart(UK)': 879.877, 
                'Gallons(UK)': 219.9692
            },

            'Teaspoon(USA)': {
                'Milliliters': 4.928922, 
                'Cubic centimeters': 4.928922, 
                'Liters': 0.004929, 
                'Cubic meters': 0.000005, 
                'Teaspoon(USA)': 1, 
                'Tablespoons(USA)': 0.333333, 
                'Fluid ounces(USA)': 0.166667, 
                'Cups(USA)': 0.020833, 
                'Pint(USA)': 0.010417, 
                'Quart(USA)': 0.005208, 
                'Gallons(USA)': 0.001302, 
                'Cubic inches': 0.300781, 
                'Cubic feet': 0.000174, 
                'Cubic yards': 0.000006, 
                'Teaspoon(UK)': 0.832674, 
                'Tablespoons(UK)': 0.277558, 
                'Fluid ounces(UK)': 0.173474, 
                'Pint(UK)': 0.008674, 
                'Quart(UK)': 0.004337, 
                'Gallons(UK)': 0.001084
            },

            'Tablespoons(USA)': {
                'Milliliters': 14.78676, 
                'Cubic centimeters': 14.78676, 
                'Liters': 0.014787, 
                'Cubic meters': 0.000015, 
                'Teaspoon(USA)': 3, 
                'Tablespoons(USA)': 1, 
                'Fluid ounces(USA)': 0.5, 
                'Cups(USA)': 0.0625, 
                'Pint(USA)': 0.03125, 
                'Quart(USA)': 0.015625, 
                'Gallons(USA)': 0.003906, 
                'Cubic inches': 0.902344, 
                'Cubic feet': 0.000522, 
                'Cubic yards': 0.000019, 
                'Teaspoon(UK)': 2.498023, 
                'Tablespoons(UK)': 0.832674, 
                'Fluid ounces(UK)': 0.520421, 
                'Pint(UK)': 0.026021, 
                'Quart(UK)': 0.013011, 
                'Gallons(UK)': 0.003253
            },

            'Fluid ounces(USA)': {
                'Milliliters': 29.57353, 
                'Cubic centimeters': 29.57353, 
                'Liters': 0.029574, 
                'Cubic meters': 0.00003, 
                'Teaspoon(USA)': 6, 
                'Tablespoons(USA)': 2, 
                'Fluid ounces(USA)': 1, 
                'Cups(USA)': 0.125, 
                'Pint(USA)': 0.0625, 
                'Quart(USA)': 0.03125, 
                'Gallons(USA)': 0.007812, 
                'Cubic inches': 1.804688, 
                'Cubic feet': 0.001044, 
                'Cubic yards': 0.000039, 
                'Teaspoon(UK)': 4.996045, 
                'Tablespoons(UK)': 1.665348, 
                'Fluid ounces(UK)': 1.040843, 
                'Pint(UK)': 0.052042, 
                'Quart(UK)': 0.026021, 
                'Gallons(UK)': 0.006505
            },

            'Cups(USA)': {
                'Milliliters': 236.5882, 
                'Cubic centimeters': 236.5882, 
                'Liters': 0.236588, 
                'Cubic meters': 0.000237, 
                'Teaspoon(USA)': 48, 
                'Tablespoons(USA)': 16, 
                'Fluid ounces(USA)': 8, 
                'Cups(USA)': 1, 
                'Pint(USA)': 0.5, 
                'Quart(USA)': 0.25, 
                'Gallons(USA)': 0.0625, 
                'Cubic inches': 14.4375, 
                'Cubic feet': 0.008355, 
                'Cubic yards': 0.000309, 
                'Teaspoon(UK)': 39.96836, 
                'Tablespoons(UK)': 13.32279, 
                'Fluid ounces(UK)': 8.326742, 
                'Pint(UK)': 0.416337, 
                'Quart(UK)': 0.208169, 
                'Gallons(UK)': 0.052042
            },

            'Pint(USA)': {
                'Milliliters': 473.1765, 
                'Cubic centimeters': 473.1765, 
                'Liters': 0.473176, 
                'Cubic meters': 0.000473, 
                'Teaspoon(USA)': 96, 
                'Tablespoons(USA)': 32, 
                'Fluid ounces(USA)': 16, 
                'Cups(USA)': 2, 
                'Pint(USA)': 1, 
                'Quart(USA)': 0.5, 
                'Gallons(USA)': 0.125, 
                'Cubic inches': 28.875, 
                'Cubic feet': 0.01671, 
                'Cubic yards': 0.000619, 
                'Teaspoon(UK)': 79.93672, 
                'Tablespoons(UK)': 26.64557, 
                'Fluid ounces(UK)': 16.65348, 
                'Pint(UK)': 0.832674, 
                'Quart(UK)': 0.416337, 
                'Gallons(UK)': 0.104084
            },

            'Quart(USA)': {
                'Milliliters': 946.3529, 
                'Cubic centimeters': 946.3529, 
                'Liters': 0.946353, 
                'Cubic meters': 0.000946, 
                'Teaspoon(USA)': 192, 
                'Tablespoons(USA)': 64, 
                'Fluid ounces(USA)': 32, 
                'Cups(USA)': 4, 
                'Pint(USA)': 2, 
                'Quart(USA)': 1, 
                'Gallons(USA)': 0.25, 
                'Cubic inches': 57.75, 
                'Cubic feet': 0.03342, 
                'Cubic yards': 0.001238, 
                'Teaspoon(UK)': 159.8734, 
                'Tablespoons(UK)': 53.29115, 
                'Fluid ounces(UK)': 33.30697, 
                'Pint(UK)': 1.665348, 
                'Quart(UK)': 0.832674, 
                'Gallons(UK)': 0.208169
            },

            'Gallons(USA)': {
                'Milliliters': 3785.412, 
                'Cubic centimeters': 3785.412, 
                'Liters': 3.785412, 
                'Cubic meters': 0.003785, 
                'Teaspoon(USA)': 768, 
                'Tablespoons(USA)': 256, 
                'Fluid ounces(USA)': 128, 
                'Cups(USA)': 16, 
                'Pint(USA)': 8, 
                'Quart(USA)': 4, 
                'Gallons(USA)': 1, 
                'Cubic inches': 231, 
                'Cubic feet': 0.133681, 
                'Cubic yards': 0.004951, 
                'Teaspoon(UK)': 639.4938, 
                'Tablespoons(UK)': 213.1646, 
                'Fluid ounces(UK)': 133.2279, 
                'Pint(UK)': 6.661393, 
                'Quart(UK)': 3.330697, 
                'Gallons(UK)': 0.832674
            },

            'Cubic inches': {
                'Milliliters': 16.38706, 
                'Cubic centimeters': 16.38706, 
                'Liters': 0.016387, 
                'Cubic meters': 0.000016, 
                'Teaspoon(USA)': 3.324675, 
                'Tablespoons(USA)': 1.108225, 
                'Fluid ounces(USA)': 0.554113, 
                'Cups(USA)': 0.069264, 
                'Pint(USA)': 0.034632, 
                'Quart(USA)': 0.017316, 
                'Gallons(USA)': 0.004329, 
                'Cubic inches': 1, 
                'Cubic feet': 0.000579, 
                'Cubic yards': 0.000021, 
                'Teaspoon(UK)': 2.768371, 
                'Tablespoons(UK)': 0.92279, 
                'Fluid ounces(UK)': 0.576744, 
                'Pint(UK)': 0.028837, 
                'Quart(UK)': 0.014419, 
                'Gallons(UK)': 0.003605
            },

            'Cubic feet': {
                'Milliliters': 28316.85, 
                'Cubic centimeters': 28316.85, 
                'Liters': 28.31685, 
                'Cubic meters': 0.028317, 
                'Teaspoon(USA)': 5745.039, 
                'Tablespoons(USA)': 1915.013, 
                'Fluid ounces(USA)': 957.5065, 
                'Cups(USA)': 119.6883, 
                'Pint(USA)': 59.84416, 
                'Quart(USA)': 29.92208, 
                'Gallons(USA)': 7.480519, 
                'Cubic inches': 1728, 
                'Cubic feet': 1, 
                'Cubic yards': 0.037037, 
                'Teaspoon(UK)': 4783.746, 
                'Tablespoons(UK)': 1594.582, 
                'Fluid ounces(UK)': 26908.57, 
                'Pint(UK)': 49.83068, 
                'Quart(UK)': 24.91534, 
                'Gallons(UK)': 6.228835
            },

            'Cubic yards': {
                'Milliliters': 764554.9, 
                'Cubic centimeters': 764554.9, 
                'Liters': 764.5549, 
                'Cubic meters': 0.764555, 
                'Teaspoon(USA)': 155116.1, 
                'Tablespoons(USA)': 51705.35, 
                'Fluid ounces(USA)': 25852.68, 
                'Cups(USA)': 3231.584, 
                'Pint(USA)': 1615.792, 
                'Quart(USA)': 807.8961, 
                'Gallons(USA)': 201.974, 
                'Cubic inches': 46656, 
                'Cubic feet': 27, 
                'Cubic yards': 1, 
                'Teaspoon(UK)': 129161.1, 
                'Tablespoons(UK)': 43053.71, 
                'Fluid ounces(UK)': 35195.08, 
                'Pint(UK)': 1345.428, 
                'Quart(UK)': 672.7142, 
                'Gallons(UK)': 168.1786
            },

            'Teaspoon(UK)': {
                'Milliliters': 5.919388, 
                'Cubic centimeters': 5.919388, 
                'Liters': 0.005919, 
                'Cubic meters': 0.000006, 
                'Teaspoon(USA)': 1.20095, 
                'Tablespoons(USA)': 0.400317, 
                'Fluid ounces(USA)': 0.200158, 
                'Cups(USA)': 0.02502, 
                'Pint(USA)': 0.01251, 
                'Quart(USA)': 0.006255, 
                'Gallons(USA)': 0.001564, 
                'Cubic inches': 0.361223, 
                'Cubic feet': 0.000209, 
                'Cubic yards': 0.000008, 
                'Teaspoon(UK)': 1, 
                'Tablespoons(UK)': 0.333333, 
                'Fluid ounces(UK)': 0.208333, 
                'Pint(UK)': 0.010417, 
                'Quart(UK)': 0.005208, 
                'Gallons(UK)': 0.001302
            },

            'Tablespoons(UK)': {
                'Milliliters': 17.75816, 
                'Cubic centimeters': 17.75816, 
                'Liters': 0.017758, 
                'Cubic meters': 0.000018, 
                'Teaspoon(USA)': 3.60285, 
                'Tablespoons(USA)': 1.20095, 
                'Fluid ounces(USA)': 0.600475, 
                'Cups(USA)': 0.075059, 
                'Pint(USA)': 0.03753, 
                'Quart(USA)': 0.018765, 
                'Gallons(USA)': 0.004691, 
                'Cubic inches': 1.08367, 
                'Cubic feet': 0.000627, 
                'Cubic yards': 0.000023, 
                'Teaspoon(UK)': 3, 
                'Tablespoons(UK)': 1, 
                'Fluid ounces(UK)': 0.625, 
                'Pint(UK)': 0.03125, 
                'Quart(UK)': 0.015625, 
                'Gallons(UK)': 0.003906
            },

            'Fluid ounces(UK)': {
                'Milliliters': 28.41306, 
                'Cubic centimeters': 28.41306, 
                'Liters': 0.028413, 
                'Cubic meters': 0.000028, 
                'Teaspoon(USA)': 5.76456, 
                'Tablespoons(USA)': 1.92152, 
                'Fluid ounces(USA)': 0.96076, 
                'Cups(USA)': 0.120095, 
                'Pint(USA)': 0.060047, 
                'Quart(USA)': 0.030024, 
                'Gallons(USA)': 0.007506, 
                'Cubic inches': 1.733871, 
                'Cubic feet': 0.001003, 
                'Cubic yards': 0.000037, 
                'Teaspoon(UK)': 4.8, 
                'Tablespoons(UK)': 1.6, 
                'Fluid ounces(UK)': 1, 
                'Pint(UK)': 0.05, 
                'Quart(UK)': 0.025, 
                'Gallons(UK)': 0.00625
            },

            'Pint(UK)': {
                'Milliliters': 568.2613, 
                'Cubic centimeters': 568.2613, 
                'Liters': 0.568261, 
                'Cubic meters': 0.000568, 
                'Teaspoon(USA)': 115.2912, 
                'Tablespoons(USA)': 38.4304, 
                'Fluid ounces(USA)': 19.2152, 
                'Cups(USA)': 2.4019, 
                'Pint(USA)': 1.20095, 
                'Quart(USA)': 0.600475, 
                'Gallons(USA)': 0.150119, 
                'Cubic inches': 34.67743, 
                'Cubic feet': 0.020068, 
                'Cubic yards': 0.000743, 
                'Teaspoon(UK)': 96, 
                'Tablespoons(UK)': 32, 
                'Fluid ounces(UK)': 20, 
                'Pint(UK)': 1, 
                'Quart(UK)': 0.5, 
                'Gallons(UK)': 0.125
            },

            'Quart(UK)': {
                'Milliliters': 1136.523, 
                'Cubic centimeters': 1136.523, 
                'Liters': 1.136523, 
                'Cubic meters': 0.001137, 
                'Teaspoon(USA)': 230.5824, 
                'Tablespoons(USA)': 76.8608, 
                'Fluid ounces(USA)': 38.4304, 
                'Cups(USA)': 4.8038, 
                'Pint(USA)': 2.4019, 
                'Quart(USA)': 1.20095, 
                'Gallons(USA)': 0.300237, 
                'Cubic inches': 69.35486, 
                'Cubic feet': 0.040136, 
                'Cubic yards': 0.001487, 
                'Teaspoon(UK)': 192, 
                'Tablespoons(UK)': 64, 
                'Fluid ounces(UK)': 64, 
                'Pint(UK)': 2, 
                'Quart(UK)': 1, 
                'Gallons(UK)': 0.25
            },

            'Gallons(UK)': {
                'Milliliters': 4546.09, 
                'Cubic centimeters': 4546.09, 
                'Liters': 4.54609, 
                'Cubic meters': 0.004546, 
                'Teaspoon(USA)': 922.3295, 
                'Tablespoons(USA)': 307.4432, 
                'Fluid ounces(USA)': 153.7216, 
                'Cups(USA)': 19.2152, 
                'Pint(USA)': 9.607599, 
                'Quart(USA)': 4.8038, 
                'Gallons(USA)': 1.20095, 
                'Cubic inches': 277.4194, 
                'Cubic feet': 0.160544, 
                'Cubic yards': 0.005946, 
                'Teaspoon(UK)': 768, 
                'Tablespoons(UK)': 256, 
                'Fluid ounces(UK)': 160, 
                'Pint(UK)': 8, 
                'Quart(UK)': 4, 
                'Gallons(UK)': 1
            }
        }

        let toConvert = convertList[lengthToConvert];

        let result = value * toConvert[lengthResult];

        this.sendToHistory(value, result, lengthToConvert, lengthResult);

        return result;

    }

    sendToHistory(value, result, lengthToConvert, lengthResult){

        if(value == ''){

            value = '0';

        }

        let convertAbreviation = {
            'Milliliters': 'ml', 
            'Cubic centimeters': 'cc', 
            'Liters': 'l',
            'Cubic meters': 'm<sup>3', 
            'Teaspoon(USA)': 'tsp(USA)',
            'Tablespoons(USA)': 'tbsp(USA)',
            'Fluid ounces(USA)': 'flOz(USA)',
            'Cups(USA)': 'c(USA)', 
            'Pint(USA)': 'pt(USA)',
            'Quart(USA)': 'qt(USA)',
            'Gallons(USA)': 'gal(USA)',
            'Cubic inches': 'in<sup>3', 
            'Cubic feet': 'ft<sup>3', 
            'Cubic yards': 'yd<sup>3', 
            'Teaspoon(UK)': 'tsp(UK)',
            'Tablespoons(UK)': 'tbsp(UK)',
            'Fluid ounces(UK)': 'flOz(UK)',
            'Pint(UK)': 'pt(UK)',
            'Quart(UK)': 'qt(UK)', 
            'Gallons(UK)': 'gal(UK)'
        }

        window.calculatorHistory.addToHistory(`${value} ${convertAbreviation[lengthToConvert]} <sub>=`, `${result} ${convertAbreviation[lengthResult]}`, `${value} ${convertAbreviation[lengthToConvert]} ${convertAbreviation[lengthResult]}`);

    }


}