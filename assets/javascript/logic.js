
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBEWm9aCJCiZJT_2LZLsG694W6AME4gTYg",
  authDomain: "train-sched-1e0e6.firebaseapp.com",
  databaseURL: "https://train-sched-1e0e6.firebaseio.com",
  projectId: "train-sched-1e0e6",
  storageBucket: "train-sched-1e0e6.appspot.com",
  messagingSenderId: "666174654175"
};
firebase.initializeApp(config);

var database = firebase.database();

// adding new train sched
$('#add-train-btn').on('click', function (event) {
  event.preventDefault();
  console.log("we Gucci");
  // user input
  var trainName = $('#train-name-input').val().trim();
  var trainDest = $('#destination-input').val().trim();
  var trainTime = $('#time-input').val().trim();
  var trainFreq = $('#frequency-input').val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: trainTime,
    frequency: trainFreq
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  $('#train-name-input').val('');
  $('#destination-input').val('');
  $('#time-input').val('');
  $('#frequency-input').val('');
});

// Create firebase event and add new train/row in the table
database.ref().on('child_added', function(childSnapshot, prevChildKey) {
  console.log(childSnapshot);
  console.log(childSnapshot.val())

  
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;;
  var trainTime = childSnapshot.val().time;;
  var trainFreq = childSnapshot.val().frequency;;

  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);

  var trainFreq = parseInt(trainFreq);
  var firstTimeConverted = moment(trainTime, "hh:mm A").subtract(1, 'years');
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');
  var tRemainder = diffTime % trainFreq;
  var tMinutesTillTrain = trainFreq - tRemainder;
  
  var nextTrain = moment().add(tMinutesTillTrain, 'minutes');
  var nextTrainPretty = moment(nextTrain).format('hh:mm A');


  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrainPretty + "</td><td>" + tMinutesTillTrain + "</td></tr>");

})
