import React from 'react';
import ReactDOM from 'react-dom';




const Course = ({ courses }) => {
  const Header = ({ course }) => <h1>{course}</h1>

  const Content = ({ parts }) => {
    const sections = parts.map(part => <Part key={part.id} part={part.name}
      exercise={part.exercises} />)
    return sections
  }

  const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (<p><strong>total of {total} exercises</strong></p>)
  }

  const Part = ({ part, exercise }) => {
    return (
      <p>
        {part} {exercise}
      </p>
    )
  }

  const courseInfo = courses.map(course => (
    <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>))

  return courseInfo
}


const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={courses} />
    </div>
  )

}


ReactDOM.render(<App />, document.getElementById('root'))