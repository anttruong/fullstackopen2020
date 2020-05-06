import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => (<h1>{text}</h1>)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ counter, text }) => (
  <div>{text} {counter}</div>
)

const Statistics = ({ good, neutral, bad }) => {
  const average = () => {
    if (good + neutral + bad === 0) {
      return 0
    } else {
      return (good - bad) / (good + neutral + bad)
    }
  }

  const positivePercentage = () => {
    if (good + neutral + bad === 0) {
      return 0
    } else {
      return (good / (good + neutral + bad))
    }
  }

  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <div>
        <Statistic counter={good} text='good' />
        <Statistic counter={neutral} text='neutral' />
        <Statistic counter={bad} text='bad' />
        <Statistic counter={good + neutral + bad} text='all' />
        <Statistic counter={average()} text='average' />
        <Statistic counter={positivePercentage()} text='positive' />
      </div>)
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))