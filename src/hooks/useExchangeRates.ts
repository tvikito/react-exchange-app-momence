import { useQuery } from 'react-query'
import { parseRatesResponse } from '../lib/ratesParser'

export function useExchangeRates() {
  const getCurrentRates = async () => {
    // I'm not sure if this was intention, but ČNB server is blocking by CORS. It is now open API.
    // If the expected solution would include walkaround for CORS (which I don't understand why
    // it's being tested for interview) I would choose solution with proxy server using cors-anywhere
    // library https://github.com/Rob--W/cors-anywhere and that I would call instead directly getting
    // response from ČNB websites. In reality, if this should be API server which we are using for our
    // FE I would simple contact BE guys to correct this issue.
    // Since I believe this is just a mistake I rather choose solution with mocking data.

    // if there wouln't be problem with CORS I would make regular request with
    // const request = new Request(
    //   'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt',
    //   {
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //     },
    //   },
    // )

    // const response = await fetch(request)
    // const stringData = await response.text()

    // then I would get whole body of the response as a string, so stringData is string
    // which I am gonna use since here

    const responseString =
      '13 Jan 2023 #10\nCountry|Currency|Amount|Code|Rate\nAustralia|dollar|1|AUD|15.408\nBrazil|real|1|BRL|4.326\nBulgaria|lev|1|BGN|12.278\nCanada|dollar|1|CAD|16.569\nChina|renminbi|1|CNY|3.303\nDenmark|krone|1|DKK|3.228\nEMU|euro|1|EUR|24.015\nHongkong|dollar|1|HKD|2.843\nHungary|forint|100|HUF|6.052\nIceland|krona|100|ISK|15.564\nIMF|SDR|1|XDR|29.850\nIndia|rupee|100|INR|27.256\nIndonesia|rupiah|1000|IDR|1.466\nIsrael|new shekel|1|ILS|6.485\nJapan|yen|100|JPY|17.275\nMalaysia|ringgit|1|MYR|5.121\nMexico|peso|1|MXN|1.175\nNew Zealand|dollar|1|NZD|14.117\nNorway|krone|1|NOK|2.245\nPhilippines|peso|100|PHP|40.399\nPoland|zloty|1|PLN|5.122\nRomania|leu|1|RON|4.859\nSingapore|dollar|1|SGD|16.782\nSouth Africa|rand|1|ZAR|1.316\nSouth Korea|won|100|KRW|1.788\nSweden|krona|1|SEK|2.134\nSwitzerland|franc|1|CHF|23.893\nThailand|baht|100|THB|67.163\nTurkey|lira|1|TRY|1.182\nUnited Kingdom|pound|1|GBP|27.043\nUSA|dollar|1|USD|22.206\n'

    // you can enable this timer to get some timer and see loading state
    // await new Promise((resolve) => setTimeout(resolve, 1500))

    return parseRatesResponse(responseString)
  }

  const { data, isFetching } = useQuery('exchangeRates', getCurrentRates, {
    refetchOnWindowFocus: false,
  })

  return { data, isFetching }
}
