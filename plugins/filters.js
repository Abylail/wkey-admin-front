import Vue from "vue";
import moment from "moment";

moment.locale("ru");

/**
 * Date time formatter (Дата и время)
 * @param {string}rawDate
 * @return {string}
 * */
export function dateTimeFormat(rawDate = "") {
  if (!moment(rawDate).isValid()) return "";
  return moment(rawDate).format("D MMMM YYYY hh:mm")
}

Vue.filter("dateTimeFormat", dateTimeFormat);

/**
 * Date formatter (Дата)
 * @param {string}rawDate
 * @return {string}
 * */
export function dateFormat(rawDate = "") {
  if (!moment(rawDate).isValid()) return "";
  return moment(rawDate).format("D MMMM YYYY")
}

Vue.filter("dateFormat", dateFormat);
