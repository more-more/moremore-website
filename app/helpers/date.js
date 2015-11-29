import Ember from 'ember';
import moment from 'moment'

export function date([date]/*, hash*/) {
  return moment(date);
}

export default Ember.Helper.helper(date);
