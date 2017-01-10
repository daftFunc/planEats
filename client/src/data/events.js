//dummy data to mimic saved meals
const events = [
  {
    title: 'Burgers and Fries',
    allDay: false,
    start: '2017-01-03T16:30:00',
    editable: true
  },
  {
    title: 'Lentil Soup',
    allDay: false,
    start: '2017-01-04T16:30:00',
    end: '2017-01-05T23:59:00', //OPTIONAL - can use if planning the same meal for several days
    editable: true
  },
  {
    title: 'Chicken and Rice Soup',
    allDay: false,
    start: '2017-01-06T16:30:00',
    end: '2017-01-07T23:59:00',
    editable: true
  },
  {
    title: 'Steak and Asparagus',
    allDay: false,
    start: '2017-01-08T16:30:00',
    editable: true
    //url property - can include meal link, take to meal plan or grocery list on click
  }
]

export default events;
