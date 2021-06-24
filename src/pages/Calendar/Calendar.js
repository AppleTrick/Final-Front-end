import React, { useState } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './dummy-data';
import './Calendar.css';


const Calendar = () => {

  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([]);

  // 왼쪽 사이드바
  const renderSidebar = () => {
    return (
      <div className='calendar-app-sidebar'>
        <div className='calendar-app-sidebar-section'>
          <h2>설명</h2>
          <ul className='calendar-ul'>
            <li className='calendar-li'>날짜를 선택하면 일정을 추가할수 있습니다</li>
            <li className='calendar-li'>추가한 일정을 드래그하여 옮기거나 날짜를 조정할수 있습니다</li>
            <li className='calendar-li'>추가된 일정을 클릭하면 삭제할수 있습니다.</li>
          </ul>
        </div>
        <div className='calendar-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            주말 보기/안보기
          </label>
        </div>
        <div className='calendar-app-sidebar-section'>
          <h2>총 일정 ({currentEvents.length})</h2>
          <ul className='calendar-ul'>
            {currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  // 주말 표시 토글
  const handleWeekendsToggle = () => {
      setWeekendsVisible(!weekendsVisible);
  }

  
  function renderSidebarEvent(event) {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    )
  }

  // 요일부분 클릭하면 발생하는 이벤트
  const handleDateSelect = (selectInfo) => {
    let title = prompt('일정 제목을 추가해주세요!')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  // 일정을 클릭하면 발생하는 이벤트
  const handleEventClick = (clickInfo) => {
    if (confirm(`'${clickInfo.event.title}' 일정을 정말 삭제 하시겠습니까?`)) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events) => {
      setCurrentEvents(events);
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }


  return (
    <div className='calendar-app'>



      {/* 사이드바 */}
        <div className='calendar-app-sidebar'>
        <div className='calendar-app-sidebar-section'>
          <h2>설명</h2>
          <ul className='calendar-ul'>
            <li className='calendar-li'>날짜를 선택하면 일정을 추가할수 있습니다</li>
            <li className='calendar-li'>추가한 일정을 드래그하여 옮기거나 날짜를 조정할수 있습니다</li>
            <li className='calendar-li'>추가된 일정을 클릭하면 삭제할수 있습니다.</li>
          </ul>
        </div>
        <div className='calendar-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            주말 보기/숨기기
          </label>
        </div>
        <div className='calendar-app-sidebar-section'>
          <h2>총 일정 ({currentEvents.length})</h2>
          <ul className='calendar-ul'>
            {currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>



      <div className='calendar-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }} // 캘런더 헤더
          initialView='dayGridMonth'
          editable={true} // 이벤트 드래그, 리사이징 등의 편집여부 (interactionPlugin 필요)
          selectable={true} // 클릭하고 드래그하여 여러 날짜 또는 시간 슬롯을 강조 표시
          selectMirror={true} // 드래그 하는동안 자리표시자 이벤트를 그릴지 여부
          dayMaxEvents={true}
          weekends={weekendsVisible} // 주말표시 or 평일만 표시
          initialEvents={INITIAL_EVENTS} // 캘린더에 일정 표기
          select={handleDateSelect} // 일정 누르면 일정 삽입가능
          eventContent={renderEventContent} // 
          eventClick={handleEventClick} // 추가되어있는 일정 클릭시 발생 이벤트
          eventsSet={handleEvents} // 총 일정
        />

      </div>
    </div>
  )
}






export default Calendar;



/*
export default class Calendar extends React.Component {
//const Calendar = () => {

  //const [weekendsVisible, setWeekendsVisible] = useState(true)
  //const [currentEvents, setCurrentEvents] = useState();

  state = {
    weekendsVisible: true,
    currentEvents: []
  }

  render() {
    return (
      <div className='calendar-app'>
        {this.renderSidebar()}
        <div className='calendar-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }} // 캘런더 헤더
            initialView='dayGridMonth'
            editable={true} // 이벤트 드래그, 리사이징 등의 편집여부 (interactionPlugin 필요)
            selectable={true} // 클릭하고 드래그하여 여러 날짜 또는 시간 슬롯을 강조 표시
            selectMirror={true} // 드래그 하는동안 자리표시자 이벤트를 그릴지 여부
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible} // 주말표시 or 평일만 표시
            initialEvents={INITIAL_EVENTS} // 캘린더에 일정 표기
            select={this.handleDateSelect} // 일정 누르면 일정 삽입가능
            eventContent={renderEventContent} //
            eventClick={this.handleEventClick} // 추가되어있는 일정 클릭시 발생 이벤트
            eventsSet={this.handleEvents} // 총 일정
            />

        </div>
      </div>
    )
  }

  // 왼쪽 사이드바
  renderSidebar() {
    return (
      <div className='calendar-app-sidebar'>
        <div className='calendar-app-sidebar-section'>
          <h2>설명</h2>
          <ul className='calendar-ul'>
            <li className='calendar-li'>날짜를 선택하면 일정을 추가할수 있습니다</li>
            <li className='calendar-li'>추가한 일정을 드래그하여 옮기거나 날짜를 조정할수 있습니다</li>
            <li className='calendar-li'>추가된 일정을 클릭하면 삭제할수 있습니다.</li>
          </ul>
        </div>
        <div className='calendar-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            주말 보기/안보기
          </label>
        </div>
        <div className='calendar-app-sidebar-section'>
          <h2>총 일정 ({this.state.currentEvents.length})</h2>
          <ul className='calendar-ul'>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  // 주말 표시 토글
  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  // 요일부분 클릭하면 발생하는 이벤트
  handleDateSelect = (selectInfo) => {
    let title = prompt('일정 제목을 추가해주세요!')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  // 일정을 클릭하면 발생하는 이벤트
  handleEventClick = (clickInfo) => {
    if (confirm(`'${clickInfo.event.title}' 일정을 정말 삭제 하시겠습니까?`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}
*/