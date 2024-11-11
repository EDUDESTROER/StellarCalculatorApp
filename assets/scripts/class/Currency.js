class Currency{

    calcCurrencyConverter(value, currencyToConvert, currencyResult){

        let currencyToAbreviation = {
            "Afghan Afghani": "AFN",
            "Albanian Lek": "ALL",
            "Algerian Dinar": "DZD",
            "Angolan Kwanza": "AOA",
            "Argentine Peso": "ARS",
            "Armenian Dram": "AMD",
            "Aruban Florin": "AWG",
            "Australian Dollar": "AUD",
            "Azerbaijani Manat": "AZN",
            "Bahamian Dollar": "BSD",
            "Bahraini Dinar": "BHD",
            "Bangladeshi Taka": "BDT",
            "Barbadian Dollar": "BBD",
            "Belarusian Ruble": "BYN",
            "Belize Dollar": "BZD",
            "Bermudian Dollar": "BMD",
            "Bhutanese Ngultrum": "BTN",
            "Bolivian Boliviano": "BOB",
            "Bosnia-Herzegovina Convertible Mark": "BAM",
            "Botswana Pula": "BWP",
            "Brazilian Real": "BRL",
            "British Pound": "GBP",
            "Brunei Dollar": "BND",
            "Bulgarian Lev": "BGN",
            "Burundian Franc": "BIF",
            "Cayman Islands Dollar": "KYD",
            "Central African CFA Franc": "XAF",
            "CFP Franc": "XPF",
            "Chilean Peso": "CLP",
            "Chinese Yuan": "CNY",
            "Colombian Peso": "COP",
            "Comorian Franc": "KMF",
            "Congolese Franc": "CDF",
            "Costa Rican Colón": "CRC",
            "Croatian Kuna": "HRK",
            "Cuban Convertible Peso": "CUC",
            "Czech Koruna": "CZK",
            "Danish Krone": "DKK",
            "Djiboutian Franc": "DJF",
            "Dominican Peso": "DOP",
            "East Caribbean Dollar": "XCD",
            "Egyptian Pound": "EGP",
            "Eritrean Nakfa": "ERN",
            "Ethiopian Birr": "ETB",
            "Euro": "EUR",
            "Falkland Islands Pound": "FKP",
            "Fijian Dollar": "FJD",
            "Gambian Dalasi": "GMD",
            "Georgian Lari": "GEL",
            "Ghanaian Cedi": "GHS",
            "Gibraltar Pound": "GIP",
            "Guatemalan Quetzal": "GTQ",
            "Guinean Franc": "GNF",
            "Guyanese Dollar": "GYD",
            "Haitian Gourde": "HTG",
            "Honduran Lempira": "HNL",
            "Hong Kong Dollar": "HKD",
            "Hungarian Forint": "HUF",
            "Icelandic Króna": "ISK",
            "Indian Rupee": "INR",
            "Indonesian Rupiah": "IDR",
            "Iranian Rial": "IRR",
            "Iraqi Dinar": "IQD",
            "Israeli New Shekel": "ILS",
            "Jamaican Dollar": "JMD",
            "Japanese Yen": "JPY",
            "Jordanian Dinar": "JOD",
            "Kazakhstani Tenge": "KZT",
            "Kenyan Shilling": "KES",
            "Kuwaiti Dinar": "KWD",
            "Kyrgyzstani Som": "KGS",
            "Lao Kip": "LAK",
            "Lebanese Pound": "LBP",
            "Lesotho Loti": "LSL",
            "Liberian Dollar": "LRD",
            "Libyan Dinar": "LYD",
            "Macanese Pataca": "MOP",
            "Macedonian Denar": "MKD",
            "Malagasy Ariary": "MGA",
            "Malawian Kwacha": "MWK",
            "Malaysian Ringgit": "MYR",
            "Maldivian Rufiyaa": "MVR",
            "Mauritanian Ouguiya": "MRU",
            "Mauritian Rupee": "MUR",
            "Mexican Peso": "MXN",
            "Moldovan Leu": "MDL",
            "Mongolian Tögrög": "MNT",
            "Moroccan Dirham": "MAD",
            "Mozambican Metical": "MZN",
            "Myanma Kyat": "MMK",
            "Namibian Dollar": "NAD",
            "Nepalese Rupee": "NPR",
            "Netherlands Antillean Guilder": "ANG",
            "New Taiwan Dollar": "TWD",
            "New Zealand Dollar": "NZD",
            "Nicaraguan Córdoba": "NIO",
            "Nigerian Naira": "NGN",
            "North Korean Won": "KPW",
            "Norwegian Krone": "NOK",
            "Omani Rial": "OMR",
            "Pakistani Rupee": "PKR",
            "Panamanian Balboa": "PAB",
            "Papua New Guinean Kina": "PGK",
            "Paraguayan Guarani": "PYG",
            "Peruvian Sol": "PEN",
            "Philippine Peso": "PHP",
            "Polish Złoty": "PLN",
            "Qatari Rial": "QAR",
            "Romanian Leu": "RON",
            "Russian Ruble": "RUB",
            "Rwandan Franc": "RWF",
            "Saint Helena Pound": "SHP",
            "Salvadoran Colón": "SVC",
            "Samoan Tala": "WST",
            "São Tomé and Príncipe Dobra": "STN",
            "Saudi Riyal": "SAR",
            "Serbian Dinar": "RSD",
            "Seychellois Rupee": "SCR",
            "Sierra Leonean Leone": "SLL",
            "Singapore Dollar": "SGD",
            "Solomon Islands Dollar": "SBD",
            "Somali Shilling": "SOS",
            "South African Rand": "ZAR",
            "South Korean Won": "KRW",
            "South Sudanese Pound": "SSP",
            "Sri Lankan Rupee": "LKR",
            "Sudanese Pound": "SDG",
            "Surinamese Dollar": "SRD",
            "Swazi Lilangeni": "SZL",
            "Swedish Krona": "SEK",
            "Swiss Franc": "CHF",
            "Syrian Pound": "SYP",
            "Tajikistani Somoni": "TJS",
            "Tanzanian Shilling": "TZS",
            "Thai Baht": "THB",
            "Trinidad and Tobago Dollar": "TTD",
            "Tunisian Dinar": "TND",
            "Turkish Lira": "TRY",
            "Turkmenistani Manat": "TMT",
            "Ugandan Shilling": "UGX",
            "Ukrainian Hryvnia": "UAH",
            "United Arab Emirates Dirham": "AED",
            "Uruguayan Peso": "UYU",
            "US Dollar": "USD",
            "Uzbekistani Som": "UZS",
            "Vanuatu Vatu": "VUV",
            "Venezuelan Bolívar": "VES",
            "Vietnamese Đồng": "VND",
            "West African CFA Franc": "XOF",
            "Yemeni Rial": "YER",
            "Zambian Kwacha": "ZMW"
        };

        let currencyToConvertAbreviation = currencyToAbreviation[currencyToConvert];
        let currencyResultAbreviation = currencyToAbreviation[currencyResult];
        let combination = `${currencyToConvertAbreviation}${currencyResultAbreviation}`;

        let quotation;
        let result;

        let promise = axios.get(`https://economia.awesomeapi.com.br/json/last/${currencyToConvertAbreviation}-${currencyResultAbreviation}`);

        promise.then(response=>{

            quotation = response.data[combination].bid;

            console.log(quotation)

            result = value * quotation;

            console.log(result);
            window.calculatorConverterMode.setToDisplay(result);

        }).catch(error=>{

           let exchangePromise = this.tryExchangeRateApi(currencyToConvertAbreviation, currencyResultAbreviation);

            exchangePromise.then(response=>{

                quotation = response;
                console.log(quotation);

                result = value * quotation;

                console.log(result);

                window.calculatorConverterMode.setToDisplay(result);

            });
    

        });

    }

    tryExchangeRateApi(firstCotation, cotationResult){

        let quotationList;
        let quotation;

        let promise = axios.get(`https://v6.exchangerate-api.com/v6/93582931df6ea3627463f7fc/latest/${firstCotation}`)
        return promise.then(response=>{
            quotationList = response.data.conversion_rates;

            console.log(quotationList);

            quotation = quotationList[cotationResult];

            console.log(quotation)

            return quotation;
            
        })
        .catch(error=>{
            this.inError(error);
        });

    }

    inError(error){

        console.error(error);

    }
    

}