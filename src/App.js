import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import {
  differenceInYears,
  parse,
  formatDistanceToNow,
  differenceInDays,
  isBefore
} from 'date-fns'
import pt from 'date-fns/locale/pt'

import InputNascimento from './components/InputNascimento'
const convertDate = input => {
  return (
    input &&
    input
      .split('/')
      .reverse()
      .join('-')
  )
}
const dataEleicoes2020 = '2020, 10, 5'

function App () {
  const [nascimento, setNascimento] = useState('')
  const [state, setState] = useState({ input: '', msg: '' })

  function handleChange (evt) {}

  function handleSubmit (evt) {
    const input = evt.target.nascimento.value.replace(/(_|\/)/gi, '')
    if (input.length < 7) {
      setState({
        msg: `Faltam ${8 - input.length} números a serem preenchidos`
      })
    }
    const dataValida = isBefore(
      new Date(convertDate(evt.target.nascimento.value)),
      new Date()
    )
    
    // if (dataValida) {
    //   setState({ msg: 'A data informada é inválida' })
    // }
    evt.preventDefault()

    setNascimento(evt.target.nascimento.value)    
  }

  const inputData = convertDate(nascimento)

  const aniversario = parse(inputData, 'yyyy-M-dd', new Date())
  const tempoEleicoes = formatDistanceToNow(new Date('2020, 10, 5'), {
    addSuffix: false,
    includeSeconds: true,
    locale: pt
  })
  const obrigadosVotar = differenceInYears(
    new Date('2018, 10, 7'),
    new Date(aniversario)
  )

  const alistamento = differenceInYears(
    new Date('2020, 6, 5'),
    new Date(aniversario)
  )

  const idoso = differenceInYears(
    new Date('2020, 10, 4'),
    new Date(aniversario)
  )

  const idadeAteEleicao = differenceInYears(
    new Date(dataEleicoes2020),
    new Date(aniversario)
  )
  const idade = differenceInYears(new Date(), new Date(aniversario))
  const dias = differenceInDays(new Date(dataEleicoes2020), new Date())
  return (
    <Container>
      <>
        <p>
          Faltam {tempoEleicoes} e {dias} dias para as eleições 2020.{' '}
          {state.input}
        </p>
      </>
      {!isNaN(idade) && <h1>Sua idade atual é {idade} anos.</h1>}
      {/* Caso menor de idade */}
      {idadeAteEleicao < 16 && <p>e não pode votar!</p>}
      {/* Caso 1 a */}
      {idadeAteEleicao >= 16 && idadeAteEleicao <= 18 && (
        <>
          <h2>
            <strong>Podem</strong> alistar-se para votar em 2020 mas, mesmo com
            o título, não são obrigados a votar:
          </h2>
          <p>
            Aqueles que fizerem o 16º aniversário antes do dia 5/10/20 até a
            data de seu 18º aniversário. Caso alistados, são obrigados a votar
            somente a partir da primeira eleição após seu 18º aniversário.
          </p>
        </>
      )}
      {/* Caso 1 b */}
      {idoso >= 70 && (
        <>
          <h2>
            <strong>Podem</strong> alistar-se para votar em 2020 mas, mesmo com
            o título, não são obrigados a votar:
          </h2>
          <p>Aqueles que fizerem 70 anos a partir de 4/10/20.</p>
        </>
      )}
      {alistamento >= 19 && alistamento < 69 && (
        <>
          <h2>
            São obrigados a alistar-se e a votar e estão sujeitos às
            consequências do alistamento tardio todos os maiores de 18 anos.
          </h2>
          {obrigadosVotar === 19 && (
            <p>
              São obrigados a alistar-se e a votar e estão sujeitos às
              consequências do alistamento tardio todos os maiores de 18 anos.
              Todavia, são isentos de multa eleitoral, permanecendo as demais
              consequências civis, os não alistados que fizeram{' '}
              <strong>{obrigadosVotar}</strong> anos após o dia 7 de outubro de
              2018 que requererem seu alistamento até o dia 6/5/2020.
            </p>
          )}
          {obrigadosVotar === 18 && (
            <p>
              Podem alistar-se para votar em 2020 e, se o fizerem, são obrigados
              a votar os que fizerem seu 18º aniversário entre os dias 7/5/20 e
              4/10/20.
            </p>
          )}
        </>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formIdade'>
          <Form.Label>Data de nascimento</Form.Label>
          <InputNascimento
            id='formIdade'
            className='form-control form-control-lg'
            name='nascimento'
            placeholder='00/00/0000'
            onChange={handleChange}
          />
          <Form.Text className='text-muted'>
            {state.msg === '' ? '00/00/0000' : state.msg}
          </Form.Text>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Verificar
        </Button>
      </Form>
    </Container>
  )
}

export default App
