const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ parts }) => {
  const sum = parts.reduce((accum, part) => {
    return accum + part.exercises;
  }, 0);
  return <p style={{ fontWeight: "bold" }}>total of {sum} exercises</p>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
