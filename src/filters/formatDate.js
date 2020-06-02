import moment from 'moment';

export default {
  name: 'formatDate',
  value(value) {
    moment.locale('ru');
    return moment(value).format('D MMM YYYY');
  }
}
