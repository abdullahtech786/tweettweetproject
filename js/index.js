/** @format */
showTweet();

const addTweetFromInput = document.getElementById("addTweetFromInput");
const submitTweet = document.getElementById("submitTweet");
const deleteAllTweetBtn = document.getElementById("deleteAllTweetBtn");
const searchTweetText = document.getElementById("searchTweetText");

// Get Tweet from User
submitTweet.addEventListener("click", function () {
  let tweetFromUser = addTweetFromInput.value;
  if (tweetFromUser !== "" && tweetFromUser.trim() !== 0) {
    let webTweet = localStorage.getItem("localTweet");
    if (webTweet === null) {
      tweetObj = [];
    } else {
      tweetObj = JSON.parse(webTweet);
    }
    tweetObj.push(tweetFromUser);
    localStorage.setItem("localTweet", JSON.stringify(tweetObj));
    addTweetFromInput.value = "";
  } else {
    alert("Please Post Your First Tweet");
  }
  showTweet();
});

//Show Tweet to the user on UI
function showTweet() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let timeFormat = "AM";

  if (hours === 0) {
    hours = 12;
  }
  if (hours > 12) {
    hours = hours - 12;
    timeFormat = "PM";
  }

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let time = hours + ":" + minutes + ":" + seconds;

  let webTweet = localStorage.getItem("localTweet");
  if (webTweet === null) {
    tweetObj = [];
  } else {
    tweetObj = JSON.parse(webTweet);
  }
  let html = "";
  let addTweetList = document.getElementById("addTweetList");

  tweetObj.forEach((tweet, index) => {
    html += `
      <tr>
                  <th scope="row">${index + 1}</th>
                  <td>${tweet}</td>
                  <td class="text-right"><button type="button" onclick="editTweet(${index})"  class="text-primary"><i class="fa fa-edit"></i> Edit</button></td>
                  <td class="text-left"><button type="button" onclick="deleteTweet(${index})"  class="text-danger"><i class="fa fa-trash"></i> Delete <button></td>
                </tr>
      `;
  });

  addTweetList.innerHTML = html;
}

// editTweet
function editTweet(index) {
  let submitTweet = document.getElementById("submitTweet");
  let saveTweetBtn = document.getElementById("saveTweetBtn");
  let saveindex = document.getElementById("saveindex");
  saveindex.value = index;
  let webTweet = localStorage.getItem("localTweet");
  let tweetObj = JSON.parse(webTweet);
  addTweetFromInput.value = tweetObj[index];
  saveTweetBtn.style.display = "block";
  submitTweet.style.display = "none";
}

// save tweet
let saveTweetBtn = document.getElementById("saveTweetBtn");
saveTweetBtn.addEventListener("click", function () {
  let saveindex = document.getElementById("saveindex").value;
  let webTweet = localStorage.getItem("localTweet");
  let tweetObj = JSON.parse(webTweet);
  tweetObj[saveindex] = addTweetFromInput.value;
  localStorage.setItem("localTweet", JSON.stringify(tweetObj));
  addTweetFromInput.value = "";
  saveTweetBtn.style.display = "none";
  submitTweet.style.display = "block";
  showTweet();
});

// Delete Tweet
function deleteTweet(index) {
  let webTweet = localStorage.getItem("localTweet");
  let tweetObj = JSON.parse(webTweet);
  tweetObj.splice(index, 1);
  localStorage.setItem("localTweet", JSON.stringify(tweetObj));
  addTweetFromInput.value = "";
  saveTweetBtn.style.display = "none";
  submitTweet.style.display = "block";
  showTweet();
}

// Delete all Tweets Together
deleteAllTweetBtn.addEventListener("click", function () {
  let webTweet = localStorage.getItem("localTweet");
  let tweetObj = JSON.parse(webTweet);
  if (tweetObj !== null) {
    tweetObj = [];
  }
  localStorage.setItem("localTweet", JSON.stringify(tweetObj));
  addTweetFromInput.value = "";
  saveTweetBtn.style.display = "none";
  submitTweet.style.display = "block";
  showTweet();
});

// Search Tweet
searchTweetText.addEventListener("input", function () {
  let searchText = searchTweetText.value.toLowerCase();
  let trList = document.querySelectorAll("tr");
  trList.forEach((tweet) => {
    let trText = tweet.getElementsByTagName("td")[0].innerText.toLowerCase();
    if (trText.indexOf(searchText) === -1) {
      tweet.style.display = "none";
    } else {
      tweet.style.display = "table-row";
    }
  });
});
