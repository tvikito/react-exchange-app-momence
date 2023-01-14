export interface ICurrencyData {
  country: string
  currency: string
  amount: number
  code: string
  rate: number
}

export interface IParsedData {
  date: Date
  currencies: ICurrencyData[]
}

const parseLineString = (rawLine: string): ICurrencyData => {
  // ['Country', 'Currency', 'Amount', 'Code', 'Rate']
  const line = rawLine.split(/\|/)

  return {
    country: line[0],
    currency: line[1],
    amount: Number(line[2]),
    code: line[3],
    rate: Number(line[4]),
  }
}

export const parseRatesResponse = (rawData: string): IParsedData => {
  // separate string by new line, results in array
  const linesAll = rawData.split(/\r?\n/)
  const date = new Date(linesAll[0])

  // separate only data about rates - remove first 2 lines and last empty one
  const linesRates = linesAll.slice(2, -1)

  const currencies = linesRates.map(parseLineString)

  return { date, currencies }
}
