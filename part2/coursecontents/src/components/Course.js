import React from 'react';

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

export default Course