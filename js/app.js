(function () {
  "use strict";
  const comingSoonTime = document.querySelector(".js-coming-soon-time");
  const countDownDays = document.querySelector(".js-countdown-days");
  const countDownHours = document.querySelector(".js-countdown-hours");
  const countDownMinutes = document.querySelector(".js-countdown-minutes");
  const countDownSeconds = document.querySelector(".js-countdown-seconds");
  const MILLISECONDS_PER_SECOND = 1000;
  const SECONDS_PER_MINUTE = 60;
  const MINUTES_PER_HOUR = 60;
  const HOURS_PER_DAY = 24;
  const MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
  const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
  const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * HOURS_PER_DAY;

  const getThirtyDaysDateFromToday = () => {
    const TODAY = new Date();
    const THIRTY_DAYS_FROM_TODAY = new Date(
      TODAY.getFullYear(),
      TODAY.getMonth(),
      TODAY.getDate() + 30
    );
    return THIRTY_DAYS_FROM_TODAY;
  };

  const getFormattedDateMonthYear = (date) => {
    const dateRegEx = /\d{2} [A-Z][a-z]{2} \d{4}/;
    return date.toUTCString().match(dateRegEx);
  };

  const isLessThanTen = (number) => {
    return number < 10;
  };

  const addLeadingZero = (number) => {
    if (isLessThanTen(number)) {
      return `0${number}`;
    }

    return number;
  };

  const showCountDown = ({ days, hours, minutes, seconds }) => {
    countDownDays.textContent = addLeadingZero(days);
    countDownHours.textContent = addLeadingZero(hours);
    countDownMinutes.textContent = addLeadingZero(minutes);
    countDownSeconds.textContent = addLeadingZero(seconds);
  };

  const comingSoonDate = getThirtyDaysDateFromToday();

  const countDown = () => {
    const NOW = new Date().getTime();
    const comingSoonDateInMilliSeconds = getThirtyDaysDateFromToday().getTime();
    const timeDistance = comingSoonDateInMilliSeconds - NOW;
    const days = Math.floor(timeDistance / MILLISECONDS_PER_DAY);
    const hours = Math.floor(
      (timeDistance % MILLISECONDS_PER_DAY) / MILLISECONDS_PER_HOUR
    );
    const minutes = Math.floor(
      (timeDistance % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE
    );
    const seconds = Math.floor(
      (timeDistance % MILLISECONDS_PER_MINUTE) / MILLISECONDS_PER_SECOND
    );
    showCountDown({ days, hours, minutes, seconds });
  };

  const showComingSoonDate = () => {
    const [formattedDate] = getFormattedDateMonthYear(comingSoonDate);
    comingSoonTime.setAttribute("datetime", comingSoonDate.toISOString());
    comingSoonTime.textContent = formattedDate;
  };

  setInterval(countDown, MILLISECONDS_PER_SECOND);
  document.addEventListener("DOMContentLoaded", showComingSoonDate);
})();
