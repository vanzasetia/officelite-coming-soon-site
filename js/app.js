(function () {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const form = $(".js-form");
  const inputs = $$(".js-input");
  const alerts = $$(".js-alert");
  const comingSoonTime = $(".js-coming-soon-time");
  const countDownDays = $(".js-countdown-days");
  const countDownHours = $(".js-countdown-hours");
  const countDownMinutes = $(".js-countdown-minutes");
  const countDownSeconds = $(".js-countdown-seconds");
  const MILLISECONDS_PER_SECOND = 1000;
  const SECONDS_PER_MINUTE = 60;
  const MINUTES_PER_HOUR = 60;
  const HOURS_PER_DAY = 24;
  const MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
  const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
  const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * HOURS_PER_DAY;

  const showAlertMessage = (alert, input, message) => {
    alert.textContent = message;
    alert.removeAttribute("hidden");
    alert.classList.add("sr-only");
    input.classList.add("is-invalid");
  };

  const handleAlert = (input, message) => {
    alerts.forEach((alert) => {
      const inputID = input.dataset.id;
      const alertID = alert.dataset.id;
      if (inputID === alertID) {
        showAlertMessage(alert, input, message);
      }
    });
  };

  const validateEmail = (email, input) => {
    const emailValidation =
      /^(?:[a-z0-9.]){2,30}@{1}(?:[a-z0-9-]){2,30}\.{1}(?:[a-z0-9]){2,3}(?:\.(?:[a-z0-9]){2,3})?$/;
    const isValid = emailValidation.test(email);
    if (!isValid) {
      handleAlert(input, "Email address is not valid.");
    }
    return isValid;
  };

  const validatePhoneNumber = (phoneNumber, input) => {
    const phoneNumberValidation =
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    const isValid = phoneNumberValidation.test(phoneNumber);
    if (!isValid) {
      handleAlert(input, "Phone number is not valid.");
    }
    return isValid;
  };

  const checkAllInputs = () => {
    let isEmailValid = false;
    let isPhoneNumberValid = false;

    inputs.forEach((input) => {
      const id = input.dataset.id;
      const value = input.value;
      switch (id) {
        case "email":
          isEmailValid = validateEmail(value, input);
          break;
        case "phone":
          isPhoneNumberValid = validatePhoneNumber(value, input);
          break;
        default:
          console.error(`${id} input doesn't exist`);
      }
    });

    const isFormValid = isEmailValid && isPhoneNumberValid;

    return isFormValid;
  };

  const clearAlert = () => {
    inputs.forEach((input) => input.classList.remove("is-invalid"));
    alerts.forEach((alert) => {
      alert.textContent = "";
      alert.classList.remove("sr-only");
      alert.setAttribute("hidden", "");
    });
  };

  const validateForm = (event) => {
    clearAlert();
    const isFormValid = checkAllInputs();
    if (!isFormValid) {
      event.preventDefault();
    }
  };

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
  form.addEventListener("submit", validateForm);
})();
