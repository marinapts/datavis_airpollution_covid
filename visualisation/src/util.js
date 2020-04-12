/**
 * Utility functions
 */


 /**
  * Turn date into a readable format. E.g. 2/21 becomes 21 February
  * @param  {string} date
  * @return {string}
  */
const readableDate = date => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const [month, day] = date.split("/");
  return `${day} ${months[parseInt(month) - 1]}`;
}

export { readableDate }
