function mapSessionCode(sessionCode) {
    const sessionMapping = {
        "S24": "Supplementary 2023-24",
        "E24": "Even-(2023-24)",
        "O24": "Odd-(2023-24)",
        "S23": "Supplementary 2022-23",
        "E23": "Even-(2022-23)",
        "O23": "Odd-(2022-23)",
        "S22": "Supplementary 2021-22",
        "R22": "Re-ExamOdd (2021-22)",
        "E22": "Even-(2021-22)",
        "O22": "Odd-(2021-22)",
        "S21": "Supplementary 2020-21",
        "E21": "Even-(2020-21)",
        "O21": "Odd-(2020-21)",
        "S20": "Supplementary 2019-20",
        "E20": "Even-(2019-20)",
        "O20": "Odd-(2019-20)",
        "S18": "Special (2018-19)",
        "E18": "Even-(2018-19)",
        "O18": "Odd-(2018-19)",
        "S17": "Special-(2017-18)",
        "E17": "Even-(2017-18)",
        "O17": "Odd-(2017-18)",
        "S16": "Special-(2016-17)",
        "E16": "Even-(2016-17)",
        "O16": "Odd-(2016-17)",
        "S15": "Special-(2015-16)",
        "E15": "Even-(2015-16)",
        "O15": "Odd-(2015-16)"
    };
    
    return sessionMapping[sessionCode] || sessionCode;
}

export default mapSessionCode;