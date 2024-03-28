import moment from "moment";
import 'moment/locale/pt-br'


function getTimeNote(date: string) {

  return moment(date).startOf('minutes').fromNow(true)
}

export default getTimeNote;