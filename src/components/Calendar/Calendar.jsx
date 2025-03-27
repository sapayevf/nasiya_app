import { useState } from "react";
import { Drawer, Button } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/uz";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./Calendar.scss";

dayjs.extend(weekday);
dayjs.extend(localeData);

dayjs.locale("uz");

const CalendarComponent = ({ open, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [selectedDate, setSelectedDate] = useState(null);

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const formattedMonth = currentMonth.format("MMMM, YYYY");

  const startDay = currentMonth.startOf("month").weekday();
  const daysInMonth = currentMonth.daysInMonth();

  return (
    <Drawer
      title="📅 Kalendar"
      placement="right"
      onClose={onClose}
      open={open}
      width={350}
    >
      <div className="calendar-header">
        <Button icon={<LeftOutlined />} onClick={handlePrevMonth} />
        <h3>{formattedMonth}</h3>
        <Button icon={<RightOutlined />} onClick={handleNextMonth} />
      </div>

      <div className="calendar-grid">
        {[...Array(startDay)].map((_, i) => (
          <div key={"empty-" + i} className="calendar-day empty"></div>
        ))}

        {Array.from({ length: daysInMonth }, (_, index) => {
          const date = currentMonth.date(index + 1);
          return (
            <div
              key={index}
              className={`calendar-day ${
                selectedDate?.isSame(date, "day") ? "selected" : ""
              }`}
              onClick={() => handleSelectDate(date)}
            >
              {date.date()}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="selected-date">
          
          {selectedDate.format("D MMMM, YYYY")} kuni to'lov kutilmoqda
        </div>
      )}
    </Drawer>
  );
};

export default CalendarComponent;
