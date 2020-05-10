import React from 'react';
import ReactDOM from 'react-dom';




const Course = ({course}) => {
  const Header = ({ course }) => <h1>{course}</h1>

  const Content = ({ parts }) => {
    return (
      <div>
        <Part part={parts[0].name} exercise={parts[0].exercises} />
        <Part part={parts[2].name} exercise={parts[1].exercises} />
        <Part part={parts[2].name} exercise={parts[2].exercises} />
      </div>
    )
  }

  const Total = ({ parts }) => <p><strong>total of {[parts[0].exercises +
    parts[1].exercises + parts[2].exercises]} exercises</strong></p>

  const Part = ({ part, exercise }) => {
    return (
      <p>
        {part} {exercise}
      </p>
    )
  }

  return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>
    )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )

}


ReactDOM.render(<App />, document.getElementById('root'))