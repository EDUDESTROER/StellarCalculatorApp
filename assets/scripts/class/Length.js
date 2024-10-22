class Length{

    constructor(){

        this.firstValue = 0;

    }

    storeFirstValue(value){

        //console.log(value);

        this.firstValue = value;

        //console.log(this.firstValue);

    }

    calcLengthConverter(lengthToConvert, lengthResult){

        if(lengthToConvert == 'nanometers'){

            switch(lengthResult){

                case 'nanometers':
                    return this.firstValue;
                break;
                case 'microns':
                    return this.firstValue * 0.001;
                break;
                case 'millimeters':
                    return this.firstValue * 0.000001;
                break;
                case 'centimeter':
                    return this.firstValue * 0.0000001;
                break;
                case 'meters':
                    return this.firstValue * 0.000000001;
                break;
                case 'kilometers':
                    return this.firstValue * 0.000000000001;
                break;
                case 'inches':
                    return this.firstValue * 0.000000039370079;
                break;
                case 'Feet':
                    return this.firstValue * 0.00000000328084;
                break;
                case 'Yards':
                    return this.firstValue * 0.000000001093613;
                break;
                case 'miles':
                    return this.firstValue * 0.000000000000621;
                break;
                case 'nautical miles':
                    return this.firstValue * 0.00000000000054;
                break;
                default:
                    return false;

            }

        }else if(lengthToConvert == 'microns'){

            switch(lengthResult){

                case 'nanometers':
                    return this.firstValue * 1000;
                break;
                case 'microns':
                    return this.firstValue;
                break;
                case 'millimeters':
                    return this.firstValue * 0.001;
                break;
                case 'centimeter':
                    return this.firstValue * 0.0001;
                break;
                case 'meters':
                    return this.firstValue * 0.000001;
                break;
                case 'kilometers':
                    return this.firstValue * 0.000000001;
                break;
                case 'inches':
                    return this.firstValue * 0.000039;
                break;
                case 'Feet':
                    return this.firstValue * 0.000003;
                break;
                case 'Yards':
                    return this.firstValue * 0.000001;
                break;
                case 'miles':
                    return this.firstValue * 0.000000000621371;
                break;
                case 'nautical miles':
                    return this.firstValue * 0.000000000539957;
                break;
                default:
                    return false;

            }

        }else if(lengthToConvert == 'millimeters'){

            switch(lengthResult){

                case 'nanometers':
                    return this.firstValue * 1000000;
                break;
                case 'microns':
                    return this.firstValue * 1000;
                break;
                case 'millimeters':
                    return this.firstValue;
                break;
                case 'centimeter':
                    return this.firstValue * 0.1;
                break;
                case 'meters':
                    return this.firstValue * 0.001;
                break;
                case 'kilometers':
                    return this.firstValue * 0.000001;
                break;
                case 'inches':
                    return this.firstValue * 0.03937;
                break;
                case 'Feet':
                    return this.firstValue * 0.003281;
                break;
                case 'Yards':
                    return this.firstValue * 0.001094;
                break;
                case 'miles':
                    return this.firstValue * 0.000000621371192;
                break;
                case 'nautical miles':
                    return this.firstValue * 0.000000539956803;
                break;
                default:
                    return false;

            }

        }else if(lengthToConvert == 'centimeter'){

            switch(lengthResult){

                case 'nanometers':
                    return this.firstValue * 10000000;
                break;
                case 'microns':
                    return this.firstValue * 10000;
                break;
                case 'millimeters':
                    return this.firstValue * 10;
                break;
                case 'centimeter':
                    return this.firstValue;
                break;
                case 'meters':
                    return this.firstValue * 0.01;
                break;
                case 'kilometers':
                    return this.firstValue * 0.00001;
                break;
                case 'inches':
                    return this.firstValue * 0.393701;
                break;
                case 'Feet':
                    return this.firstValue * 0.032808;
                break;
                case 'Yards':
                    return this.firstValue * 0.010936;
                break;
                case 'miles':
                    return this.firstValue * 0.000006;
                break;
                case 'nautical miles':
                    return this.firstValue * 0.000005;
                break;
                default:
                    return false;

            }

        }else if(lengthToConvert == 'meters'){

            switch(lengthResult){

                case 'nanometers':
                    return this.firstValue * 1000000000;
                break;
                case 'microns':
                    return this.firstValue * 1000000;
                break;
                case 'millimeters':
                    return this.firstValue * 1000;
                break;
                case 'centimeter':
                    return this.firstValue * 100;
                break;
                case 'meters':
                    return this.firstValue;
                break;
                case 'kilometers':
                    return this.firstValue * 0.001;
                break;
                case 'inches':
                    return this.firstValue * 39.37008;
                break;
                case 'Feet':
                    return this.firstValue * 3.28084;
                break;
                case 'Yards':
                    return this.firstValue * 1.093613;
                break;
                case 'miles':
                    return this.firstValue * 0.000621;
                break;
                case 'nautical miles':
                    return this.firstValue * 0.00054;
                break;
                default:
                    return false;

            }

        }else if(lengthToConvert == 'kilometers'){

            switch(lengthResult){

                case 'nanometers':
                    return this.firstValue * 1000000000000;
                break;
                case 'microns':
                    return this.firstValue * 1000000000;
                break;
                case 'millimeters':
                    return this.firstValue * 1000000;
                break;
                case 'centimeter':
                    return this.firstValue * 100000;
                break;
                case 'meters':
                    return this.firstValue * 1000;
                break;
                case 'kilometers':
                    return this.firstValue;
                break;
                case 'inches':
                    return this.firstValue * 39370.08;
                break;
                case 'Feet':
                    return this.firstValue * 3280.84;
                break;
                case 'Yards':
                    return this.firstValue * 1093.61;
                break;
                case 'miles':
                    return this.firstValue * 0.621371;
                break;
                case 'nautical miles':
                    return this.firstValue * 0.539957;
                break;
                default:
                    return false;

            }

        }else if(lengthToConvert == 'inches'){

            switch(lengthResult){

                case 'nanometers':
                    return this.firstValue * 25400000;
                break;
                case 'microns':
                    return this.firstValue * 25400;
                break;
                case 'millimeters':
                    return this.firstValue * 25.4;
                break;
                case 'centimeter':
                    return this.firstValue * 2.54;
                break;
                case 'meters':
                    return this.firstValue * 0.0254;
                break;
                case 'kilometers':
                    return this.firstValue * 0.0000254;
                break;
                case 'inches':
                    return this.firstValue;
                break;
                case 'Feet':
                    return this.firstValue * 0.0833333;
                break;
                case 'Yards':
                    return this.firstValue * 0.0277778;
                break;
                case 'miles':
                    return this.firstValue * 0.000016;
                break;
                case 'nautical miles':
                    return this.firstValue * 0.000014;
                break;
                default:
                    return false;

            }

        }else if(lengthToConvert == 'Feet'){

            switch(lengthResult){

                case 'nanometers':
                    return this.firstValue * 304800000;
                break;
                case 'microns':
                    return this.firstValue * 304800;
                break;
                case 'millimeters':
                    return this.firstValue * 304.8;
                break;
                case 'centimeter':
                    return this.firstValue * 30.48;
                break;
                case 'meters':
                    return this.firstValue * 0.3048;
                break;
                case 'kilometers':
                    return this.firstValue * 0.000305;
                break;
                case 'inches':
                    return this.firstValue * 12;
                break;
                case 'Feet':
                    return this.firstValue;
                break;
                case 'Yards':
                    return this.firstValue * 0.333333;
                break;
                case 'miles':
                    return this.firstValue * 0.000189;
                break;
                case 'nautical miles':
                    return this.firstValue * 0.000165;
                break;
                default:
                    return false;

            }

        }else if(lengthToConvert == 'Yards'){

            switch(lengthResult){

                case 'nanometers':
                    return this.firstValue * 914400000;
                break;
                case 'microns':
                    return this.firstValue * 914400;
                break;
                case 'millimeters':
                    return this.firstValue * 914.4;
                break;
                case 'centimeter':
                    return this.firstValue * 91.44;
                break;
                case 'meters':
                    return this.firstValue * 0.9144;
                break;
                case 'kilometers':
                    return this.firstValue * 0.000914;
                break;
                case 'inches':
                    return this.firstValue * 36;
                break;
                case 'Feet':
                    return this.firstValue  * 3;
                break;
                case 'Yards':
                    return this.firstValue;
                break;
                case 'miles':
                    return this.firstValue * 0.000568;
                break;
                case 'nautical miles':
                    return this.firstValue * 0.000494;
                break;
                default:
                    return false;

            }

        }else if(lengthToConvert == 'miles'){

            switch(lengthResult){

                case 'nanometers':
                    return this.firstValue * 1609344000000;
                break;
                case 'microns':
                    return this.firstValue * 1609344000;
                break;
                case 'millimeters':
                    return this.firstValue * 1609344;
                break;
                case 'centimeter':
                    return this.firstValue * 160934.4;
                break;
                case 'meters':
                    return this.firstValue * 1609.344;
                break;
                case 'kilometers':
                    return this.firstValue *  1.609344;
                break;
                case 'inches':
                    return this.firstValue * 63360;
                break;
                case 'Feet':
                    return this.firstValue  * 5280;
                break;
                case 'Yards':
                    return this.firstValue * 1760;
                break;
                case 'miles':
                    return this.firstValue;
                break;
                case 'nautical miles':
                    return this.firstValue * 0.868976;
                break;
                default:
                    return false;

            }

        }else if(lengthToConvert == 'nautical miles' ){

            switch(lengthResult){

                case 'nanometers':
                    return this.firstValue * 1852000000000;
                break;
                case 'microns':
                    return this.firstValue * 1852000000;
                break;
                case 'millimeters':
                    return this.firstValue * 1852000;
                break;
                case 'centimeter':
                    return this.firstValue * 185200;
                break;
                case 'meters':
                    return this.firstValue * 1852;
                break;
                case 'kilometers':
                    return this.firstValue * 1.852;
                break;
                case 'inches':
                    return this.firstValue * 72913.39;
                break;
                case 'Feet':
                    return this.firstValue  * 6076.115;
                break;
                case 'Yards':
                    return this.firstValue * 2025.372;
                break;
                case 'miles':
                    return this.firstValue * 1.150779;
                break;
                case 'nautical miles':
                    return this.firstValue;
                break;
                default:
                    return false;

            }

        }

    }
    
    clearLenght(){

        this.firstValue = 0;

    }

}