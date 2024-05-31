import { useState } from "react";

const Button = ({ giveFeedback, name }) => {
  return <button onClick={giveFeedback}>{name}</button>;
};

const StatisticLine = ({ statisticName, statisticScore }) => {
  return (
    <tr>
      <td>{statisticName}</td>
      <td>{statisticScore}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;
  if (good === 0 && neutral === 0 && bad === 0) return <p>No feedback given</p>;
  return (
    <table>
      <tbody>
        <StatisticLine statisticName={"good"} statisticScore={good} />
        <StatisticLine statisticName={"neutral"} statisticScore={neutral} />
        <StatisticLine statisticName={"bad"} statisticScore={bad} />
        <StatisticLine statisticName={"all"} statisticScore={all} />
        <StatisticLine statisticName={"average"} statisticScore={average} />
        <StatisticLine
          statisticName={"positive"}
          statisticScore={`${positive} %`}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const giveGood = () => {
    setGood(good + 1);
  };

  const giveNeutral = () => {
    setNeutral(neutral + 1);
  };

  const giveBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button giveFeedback={giveGood} name={"good"} />
      <Button giveFeedback={giveNeutral} name={"neutral"} />
      <Button giveFeedback={giveBad} name={"bad"} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
