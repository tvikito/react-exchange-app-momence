import { QueryClient, QueryClientProvider } from 'react-query'
import styled from 'styled-components'
import CurrencyConvertor from './components/CurrencyConvertor'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <Logo>💸</Logo>
        <CurrencyConvertor />
      </Wrapper>
    </QueryClientProvider>
  )
}

const Logo = styled.div`
  font-size: 100px;
  margin-bottom: 40px;
`

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 7px;
`

export default App
