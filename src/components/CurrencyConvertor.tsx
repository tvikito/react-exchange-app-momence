import { useEffect } from 'react'
import { FC, useState } from 'react'
import styled from 'styled-components'
import { useExchangeRates } from '../hooks/useExchangeRates'

// Of course here is endless number of possible impovements, like:
// -  add custom handler for input of CZK value, it would add CZK currency symbol
//    to input, handle better negative number and zero, format thousands separator,
//    ...
// -  add better brand styling for select element

const CurrencyConvertor: FC = () => {
  const [czkValue, setCzkValue] = useState<string>('1')
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState<number>()
  const [convertedValue, setConvertedValue] = useState<string>()
  const { data, isFetching } = useExchangeRates()

  const currencyOptions = data?.currencies
  const capturedDate = data?.date

  // selectedCurrencyIndex is always number if currencyOptions is present
  const selectedCurrency = currencyOptions?.[selectedCurrencyIndex!]

  const formatedConvertedValue = convertedValue
    ? `${convertedValue} ${selectedCurrency?.code}`
    : ''

  const isButtonDisabled = !czkValue

  useEffect(() => {
    if (!!currencyOptions?.length && !selectedCurrencyIndex) {
      setSelectedCurrencyIndex(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyOptions])

  const convertCurrency: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (czkValue && selectedCurrency) {
      const value =
        Number(czkValue) / (selectedCurrency!.rate / selectedCurrency.amount)
      const roundedValue = value.toFixed(2)

      setConvertedValue(roundedValue)
    }
  }

  const handleSelectCurrency = (value: number) => {
    setSelectedCurrencyIndex(value)
    setConvertedValue('')
  }

  const handleChangeCZK = (value: string) => {
    setCzkValue(value)
    setConvertedValue('')
  }

  if (isFetching) return <TextLoading>Loading...</TextLoading>

  return (
    <Wrapper>
      <Text>
        <div>Data valid on</div>
        <Date>{capturedDate?.toLocaleDateString()}</Date>
      </Text>
      <form onSubmit={convertCurrency}>
        <WrapperInput>
          <Input
            type="number"
            name="currencyCZK"
            value={czkValue}
            onChange={(e) => handleChangeCZK(e.target.value)}
            placeholder="CZK"
            min={1}
          />
          <Select
            name="convertCurrency"
            value={selectedCurrencyIndex}
            onChange={(e) => handleSelectCurrency(Number(e.target.value))}
          >
            {currencyOptions?.map((o, i) => (
              <Option key={o.code} value={i}>
                {`${o.code.toUpperCase()} (${o.currency})`}
              </Option>
            ))}
          </Select>
        </WrapperInput>
        <Button type="submit" disabled={isButtonDisabled}>
          Convert
        </Button>

        <ConvertedValue>{formatedConvertedValue}</ConvertedValue>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
`

const Text = styled.div`
  color: white;
  text-align: center;
`

const Date = styled.div`
  font-size: 20px;
`

const TextLoading = styled.div`
  color: white;
  font-size: 25px;
`

const WrapperInput = styled.div`
  margin: 15px 0;
`

const Input = styled.input`
  width: 100%;
  height: 45px;
  text-align: center;
  font-size: 19px;
  box-shadow: none;
  border: none;
  padding: 5px 8px;
  border-radius: 5px 5px 0 0;
  outline: none;
`

const Select = styled.select`
  width: 100%;
  height: 45px;
  border-radius: 0 0 5px 5px;
  border: none;
  padding: 5px 8px;
  background-color: #cbd5e1;
  outline: none;
  text-align: center;
`

const Option = styled.option`
  display: block;
  padding: 10px 5px;
  cursor: pointer;
`

const Button = styled.button`
  border-radius: 5px;
  border: none;
  height: 50px;
  width: 100%;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  text-transform: uppercase;
  font-weight: bold;
  background-color: #ea580c;
  color: white;

  &:hover {
    background-color: #9a3412;
  }

  &:disabled {
    background-color: #bababb;
  }
`

const ConvertedValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-top: 25px;
  color: white;
  font-size: 25px;
  font-weight: bold;
`

export default CurrencyConvertor
