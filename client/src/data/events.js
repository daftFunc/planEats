//dummy data to mimic saved meals
const events = [
  {
    title: 'EVERYTHING',
    allDay: false,
    start: '2016-12-24T16:30:00',
    end: '2016-12-25T23:59:00', //OPTIONAL - can use if planning the same meal for several days
    editable: true
  },
  {
    title: 'Lentil Soup',
    allDay: false,
    start: '2016-12-28T16:30:00',
    end: '2016-12-29T23:59:00',
    editable: true
  },
  {
    title: 'Chicken and Rice Soup',
    allDay: false,
    start: '2016-12-26T16:30:00',
    end: '2016-12-27T23:59:00',
    editable: true
  },
  {
    title: 'Steak and Asparagus',
    allDay: false,
    start: '2016-12-30T16:30:00',
    editable: true
    //url property - can include meal link, take to meal plan or grocery list on click
  }
]

export default events;
