function Calendar({date}) {
  const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  const shortDaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const monthsInGenitiveCase = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  
  function getLocalDay(date) {
    let day = date.getDay();
    if (day === 0) { // день недели 0 (воскресенье) в европейской нумерации будет 7
      day = 7;
    }
    return day;
  }
  
  function getWeekDay() {
    return daysOfWeek[getLocalDay(date) - 1];
  }
  
  function getMonthInGenitiveCase() {
    return monthsInGenitiveCase[date.getMonth()];
  }
  
  function getMonth() {
    return months[date.getMonth()];
  }
  
  function getPreviousMonthLastDays(year, month, numberOfDays) {
    const days = [];
    let date = new Date(year, month, 0);
    for (let i = 0; i < numberOfDays; i++) {
      days.unshift(date.getDate());
      date.setDate(date.getDate() - 1);
    }
    return days;
  }
  
  function getMonthGrid() {
    const grid = [];
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    let dayCounter = 1;
    let nextMonthCounter = 1;
    
    const prevMonthDaysToShow = getLocalDay(firstDay) - 1;
    const previousMonthLastDays = getPreviousMonthLastDays(date.getFullYear(), date.getMonth(), prevMonthDaysToShow);
    
    for (let i = 0; i < 6; i++) {
      const week = [];
      
      for (let j = 0; j < 7; j++) {
        if (i === 0 && previousMonthLastDays.length > 0) {
          const day = {
            id: `prev-${previousMonthLastDays[j]}`,
            number: previousMonthLastDays.shift(),
            isCurrentMonth: false,
          };
          week.push(day);
        } else if (dayCounter <= daysInMonth) {
          const day = {
            id: `curr-${dayCounter}`,
            number: dayCounter,
            isCurrentMonth: true,
          };
          week.push(day);
          dayCounter++;
        } else {
          const day = {
            id: `next-${nextMonthCounter}`,
            number: nextMonthCounter,
            isCurrentMonth: false,
          };
          week.push(day);
          nextMonthCounter++;
        }
      }
      
      grid.push(week);
      
      if (dayCounter > daysInMonth && previousMonthLastDays.length === 0) break;
    }
    
    return grid;
  }
  
  const grid = getMonthGrid();
  
  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{getWeekDay()}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{date.getDate()}</div>
          <div className="ui-datepicker-material-month">{getMonthInGenitiveCase()}</div>
          <div className="ui-datepicker-material-year">{date.getFullYear()}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{getMonth()}</span>&nbsp;<span
          className="ui-datepicker-year">{date.getFullYear()}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
        <tr>
          {daysOfWeek.map((day, index) => (
            <th
              key={`day-of-week-${index + 1}`}
              scope="col"
              title={day}
            >
              {shortDaysOfWeek[index]}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {grid.map((week, index) => (
          <tr key={`week-${index + 1}`}>
            {week.map((day) => (
              <td
                key={`${day.id}`}
                className={day.isCurrentMonth
                  ? date.getDate() === day.number
                    ? 'ui-datepicker-today'
                    : ''
                  : 'ui-datepicker-other-month'}
              >
                {day.number}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
