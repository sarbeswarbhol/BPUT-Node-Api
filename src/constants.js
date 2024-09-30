const DB_NAME = "bputApiTestBot"
const BPUT_URL = "https://results.bput.ac.in";
const GITHUB_HTML_URL = "https://raw.githubusercontent.com/Arctixinc/BPUT-CheatCode/api/templates/index.html";
const PORT = 3000
const HEADERS =  { 
    'accept': '*/*', 
    'accept-language': 'en-US,en;q=0.9', 
    'content-length': '0', 
    'content-type': 'application/json; charset=utf-8', 
    'origin': 'https://results.bput.ac.in', 
    'priority': 'u=1, i', 
    'referer': 'https://results.bput.ac.in/', 
    'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-ch-ua-platform': '"Windows"', 
    'sec-fetch-dest': 'empty', 
    'sec-fetch-mode': 'cors', 
    'sec-fetch-site': 'same-origin', 
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 
    'x-requested-with': 'XMLHttpRequest'
  }
const SHORT_CODE_SESSION = {
  "Supplementary 2023-24": "S24",
  "Even-(2023-24)": "E24",
  "Odd-(2023-24)": "O24",
  "Supplementary 2022-23": "S23",
  "Even-(2022-23)": "E23",
  "Odd-(2022-23)": "O23",
  "Supplementary 2021-22": "S22",
  "Re-ExamOdd (2021-22)": "R22",
  "Even-(2021-22)": "E22",
  "Odd-(2021-22)": "O22",
  "Supplementary 2020-21": "S21",
  "Even-(2020-21)": "E21",
  "Odd-(2020-21)": "O21",
  "Supplementary 2019-20": "S20",
  "Even-(2019-20)": "E20",
  "Odd-(2019-20)": "O20",
  "Special (2018-19)": "S18",
  "Even-(2018-19)": "E18",
  "Odd-(2018-19)": "O18",
  "Special-(2017-18)": "S17",
  "Even-(2017-18)": "E17",
  "Odd-(2017-18)": "O17",
  "Special-(2016-17)": "S16",
  "Even-(2016-17)": "E16",
  "Odd-(2016-17)": "O16",
  "Special-(2015-16)": "S15",
  "Even-(2015-16)": "E15",
  "Odd-(2015-16)": "O15"
}

export { DB_NAME, BPUT_URL, GITHUB_HTML_URL, PORT, HEADERS, SHORT_CODE_SESSION }