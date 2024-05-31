import { useState } from "react";

const App = () => {
  const anecdotesArray = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const anecdotesVotes = anecdotesArray.map((anecdote) => {
    return { anecdote: anecdote, votes: 0 };
  });

  const setRndAnecdote = () => {
    setSelected(anecdotes[Math.floor(Math.random() * anecdotes.length)]);
  };

  const setMostVoted = () => {
    let mostVoted = selected;
    for (const anecdote of anecdotes) {
      if (anecdote.votes > mostVoted.votes) {
        mostVoted = anecdote;
      }
    }
    if (mostVotedAnecdote && mostVoted.anecdote === mostVotedAnecdote.anecdote)
      return;
    setMostVotedAnecdote(mostVoted);
  };

  const voteAnecdote = () => {
    const anecdotesCopy = [...anecdotes];
    anecdotesCopy[anecdotesCopy.indexOf(selected)].votes += 1;
    setAnecdotes(anecdotesCopy);
    setMostVoted();
  };

  const [anecdotes, setAnecdotes] = useState(anecdotesVotes);
  const [selected, setSelected] = useState(
    anecdotesVotes[Math.floor(Math.random() * anecdotesVotes.length)]
  );
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState();

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {selected.anecdote}
      <br />
      {`has ${selected.votes} votes`}
      <br />
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={setRndAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {mostVotedAnecdote
        ? mostVotedAnecdote.anecdote
        : "*No votes has been given*"}
    </div>
  );
};

export default App;
