import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    nameInput: '',
    dateInput: '',
  }

  onClickStarredAppointments = () => {
    const {appointmentsList} = this.state

    const filteredList = appointmentsList.filter(eachAppointment => {
      if (eachAppointment.isStarred === true) {
        return true
      }
      return false
    })

    this.setState({
      appointmentsList: filteredList,
    })
  }

  onSubmitAddAppointment = event => {
    event.preventDefault()

    const {nameInput, dateInput} = this.state

    const newAppointment = {
      id: uuidv4(),
      name: nameInput,
      date: dateInput,
      isStarred: false,
    }
    console.log(newAppointment.date)

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      nameInput: '',
      dateInput: '',
    }))
  }

  toggleStar = appointmentId => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === appointmentId) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  render() {
    const {appointmentsList, nameInput, dateInput} = this.state

    return (
      <div className="app-container">
        <div className="add-appointment-container">
          <h1 className="add-appointment-heading">Add Appointment</h1>
          <div className="form-img-container">
            <form
              className="form-container"
              onSubmit={this.onSubmitAddAppointment}
            >
              <label htmlFor="titleInput" className="label-text">
                TITLE
              </label>
              <input
                type="text"
                id="titleInput"
                className="form-input-text"
                placeholder="Title"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <label htmlFor="dateInput" className="label-text">
                DATE
              </label>
              <input
                type="date"
                id="dateInput"
                className="form-input-date"
                value={dateInput}
                onChange={this.onChangeDateInput}
              />
              <button type="submit" className="form-add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
              className="appointment-img"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="appointment-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className="starred-btn"
              onClick={this.onClickStarredAppointments}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {appointmentsList.map(eachAppointment => (
              <AppointmentItem
                eachAppointment={eachAppointment}
                key={eachAppointment.id}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
