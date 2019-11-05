import React from 'react';
import ReactDOM from 'react-dom';
import StudentForm from './student/StudentForm';
import StudentsList from './student/StudentsList';

import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
            err: ''
        }
    }

    saveStudent(student) {
        const students = this.state.students.slice();
        if (!students.find((current) => {
            return current.carnet === student.carnet;
        })) {
            if(student.carnet.length > 8){
                this.setState({ err: "El carnet no es valido" })
            }else{
                students.push(student);
            this.setState({ students, err: '' });
            }
            
        } else {
            this.setState({ err: "El estudiante ya existe" })
        }

    }

    deleteStudent(carnet) {
        const students = this.state.students.filter(function (ele) {
            return ele.carnet !== carnet;
        });
        this.setState({ students });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div>{this.state.err}</div>
                    <StudentForm onSave={(student) => {
                        this.saveStudent(student)
                    }} />
                </div>
                <StudentsList students={this.state.students} onDelete={(carnet) => {
                    this.deleteStudent(carnet);
                }} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

