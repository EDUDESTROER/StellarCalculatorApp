class Angle{

    constructor(){

        this.firstValue = 0;

    }

    storeFirstValue(value){

        console.log(value);

        this.firstValue = value;

        console.log(this.firstValue);

    }

    calcAngleConverter(lengthToConvert, lengthResult){

        if(lengthToConvert == 'Grados'){

            switch(lengthResult){

                case 'Grados':
                    return this.firstValue;
                case 'Degree':
                    return this.firstValue * 0.9;
                case 'Radians':
                    return this.firstValue * 0.015708;

            }

        }else if(lengthToConvert == 'Degree'){

            switch(lengthResult){

                case 'Grados':
                    return this.firstValue * 1.111111;
                case 'Degree':
                    return this.firstValue;
                case 'Radians':
                    return this.firstValue * 0.017453;

            }

        }else if(lengthToConvert == 'Radians'){

            switch(lengthResult){

                case 'Grados':
                    return this.firstValue * 63.66198;
                case 'Degree':
                    return this.firstValue * 57.29578;
                case 'Radians':
                    return this.firstValue;

            }

        }

    }

    clearAngle(){

        this.firstValue = 0;

    }

}