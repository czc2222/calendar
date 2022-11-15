/*
 * @Author: czc222 1263291450@qq.com
 * @Date: 2022-11-10 09:39:36
 * @LastEditors: czc222 1263291450@qq.com
 * @LastEditTime: 2022-11-15 10:52:03
 * @FilePath: \GlendarDemo\glendar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

//time
let currentDay = new Date().getTime();
let lastDay;
render(currentDay);

function render(time) {
  const now = new Date(time);
  currentDay = now.getTime();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;

  timeInit(year, month);
  getTimeList(year, month);
}

getEL(".preMonth").onclick = () => {
  render(currentDay - 24 * 60 * 60 * 1000 * lastDay);
};
getEL(".nextMonth").onclick = () => {
  render(currentDay + 24 * 60 * 60 * 1000 * lastDay);
};
getEL(".currentDay").onclick = () => {
  const currentDay = new Date().getTime();
  render(currentDay);
};
function timeInit(year, month) {
  let reMonth = month >= 10 ? month : "0" + month;
  let timeEl = getEL(".time");
  timeEl.textContent = `${year}年${reMonth}月`;
}

//calendar new Date(year, month, 0)自动计算上个月的天数
// const weekDays = now.getDay();

function getTimeList(year, month) {
  const allDays = getEL(".weekdays");
  allDays.innerHTML = "";
  lastDay = new Date(year, month, 0).getDate();

  let firstDayOfMonth = new Date(year, month - 1, 1);
  let lastDayOfMonth = new Date(year, month - 1, lastDay);
  const firstWeekOfMonth = firstDayOfMonth.getDay();

  const lastWeekOfMonth = lastDayOfMonth.getDay();
  let index;
  let n = 0;
  //1号之前铺垫
  if (firstWeekOfMonth == 0) {
    for (let i = 1; i < 7; i++) {
      addBeforeMonth(firstDayOfMonth, i, allDays);
      n++;
    }
  } else {
    for (let i = 1; i < firstWeekOfMonth; i++) {
      addBeforeMonth(firstDayOfMonth, i, allDays);
      n++;
    }
  }

  //月初到月末时间
  const today = new Date();
  for (let i = 1; i <= lastDay; i++) {
    const li = document.createElement("li");
    li.textContent = i;
    if (
      i === today.getDate() &&
      month === today.getMonth() + 1 &&
      year === today.getFullYear()
    ) {
      li.classList.add("calendar-weekdays-today");
      li.textContent = "今";
    }
    li.onclick = () => {
      if (index) {
        index.classList.remove("calendar-weekdays-selected");
      }
      li.classList.add("calendar-weekdays-selected");
      index = li;

      console.log("选中的日期", new Date(year, month - 1, li.textContent));
    };
    n++;
    allDays.append(li);
  }

  //   const weekdays = getEL(".weekdays");
  //   console.log("weekdays", weekdays);
  //   weekdays.onclick = function (e) {
  //     e.stopPropagation();

  //     if (index === e.target.innerHTML) {
  //       e.target.classList.add("calendar-weekdays-selected");
  //     } else {
  //       e.target.classList.remove("calendar-weekdays-selected");
  //     }

  //     index = e.target.innerHTML;

  //     console.log("e", e);
  //   };
  //月末铺垫时间
  //方法1

  for (let i = 0; i < 42 - n; i++) {
    addAfterMonth(firstDayOfMonth, i, allDays);
  }
  console.log(
    "firstDayOfMonth",
    new Date(
      firstDayOfMonth.getTime() + 24 * 60 * 60 * 1000 * lastDay
    ).getDate()
  );
  //方法2
  //   if (month === 2 && lastWeekOfMonth < 3 && lastWeekOfMonth !== 0) {
  //     let delta = 7 - lastWeekOfMonth;
  //     for (let i = 0; i < delta + 7; i++) {
  //       addAfterMonth(firstDayOfMonth, i, allDays);
  //     }
  //   } else if (
  //     lastWeekOfMonth < 3 &&
  //     lastWeekOfMonth !== 0 &&
  //     firstWeekOfMonth !== 1
  //   ) {
  //     let delta = 7 - lastWeekOfMonth;
  //     for (let i = 0; i < delta; i++) {
  //       addAfterMonth(firstDayOfMonth, i, allDays);
  //     }
  //   } else if (lastWeekOfMonth === 0 && firstWeekOfMonth !== 1) {
  //     for (let i = 0; i < 7; i++) {
  //       addAfterMonth(firstDayOfMonth, i, allDays);
  //     }
  //   } else {
  //     let delta = 7 - lastWeekOfMonth;
  //     for (let i = 0; i < delta + 7; i++) {
  //       addAfterMonth(firstDayOfMonth, i, allDays);
  //     }
  //   }
}
function addBeforeMonth(firstDayOfMonth, i, allDays) {
  const li = document.createElement("li");
  li.textContent = new Date(
    firstDayOfMonth.getTime() - 24 * 60 * 60 * 1000 * i
  ).getDate();
  li.classList.add("calendar-weekdays-pre");
  allDays.prepend(li);
}
function addAfterMonth(firstDayOfMonth, i, allDays) {
  const li = document.createElement("li");
  li.textContent = new Date(
    firstDayOfMonth.getTime() +
      24 * 60 * 60 * 1000 * lastDay +
      24 * 60 * 60 * 1000 * i
  ).getDate();
  li.classList.add("calendar-weekdays-pre");
  allDays.append(li);
}
function getEL(Element) {
  return document.querySelector(Element);
}
function getElAll(Element) {
  return document.querySelectorAll(Element);
}
