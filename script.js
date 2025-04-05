document.addEventListener("DOMContentLoaded", function () {
  // Load friends from localStorage
  let friends = JSON.parse(localStorage.getItem("friends")) || [];
  let settings = JSON.parse(localStorage.getItem("settings")) || {
    enableEmail: false,
    enableSMS: false,
    notificationTime: "09:00",
  };

  // Initialize UI with saved settings
  document.getElementById("enableEmail").checked = settings.enableEmail;
  document.getElementById("enableSMS").checked = settings.enableSMS;
  document.getElementById("notificationTime").value = settings.notificationTime;

  // Display friends
  renderFriendsList();

  // Form submission
  document
    .getElementById("addFriendForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const birthday = document.getElementById("birthday").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      friends.push({
        id: Date.now(),
        name,
        birthday,
        phone,
        email,
        message,
      });

      localStorage.setItem("friends", JSON.stringify(friends));
      renderFriendsList();

      // Reset form
      this.reset();
      document.getElementById("message").value =
        "Happy Birthday, {{name}}! 🎉 Wishing you a fantastic day and an amazing year ahead!";
    });

  // Save settings
  document
    .getElementById("saveSettings")
    .addEventListener("click", function () {
      settings = {
        enableEmail: document.getElementById("enableEmail").checked,
        enableSMS: document.getElementById("enableSMS").checked,
        notificationTime: document.getElementById("notificationTime").value,
      };

      localStorage.setItem("settings", JSON.stringify(settings));
      alert("Settings saved successfully!");
    });

  // Check birthdays
  document
    .getElementById("checkBirthdays")
    .addEventListener("click", checkForBirthdays);

  // Check for birthdays at the set time
  function scheduleBirthdayCheck() {
    const now = new Date();
    const [hours, minutes] = settings.notificationTime.split(":").map(Number);

    // If the time has passed today, schedule for tomorrow
    let nextCheck = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      0,
      0
    );

    if (now > nextCheck) {
      nextCheck.setDate(nextCheck.getDate() + 1);
    }

    const timeUntilCheck = nextCheck - now;

    setTimeout(() => {
      checkForBirthdays();
      // Schedule the next check
      scheduleBirthdayCheck();
    }, timeUntilCheck);
  }

  // Initial schedule
  scheduleBirthdayCheck();

  // Check birthdays now
  function checkForBirthdays() {
    const today = new Date();
    const todayStr = `${today.getMonth() + 1}/${today.getDate()}`;

    const birthdaysToday = friends.filter((friend) => {
      const friendDate = new Date(friend.birthday);
      const friendStr = `${friendDate.getMonth() + 1}/${friendDate.getDate()}`;
      return friendStr === todayStr;
    });

    if (birthdaysToday.length > 0) {
      const alertDiv = document.getElementById("birthdayAlert");
      const todayList = document.getElementById("todayBirthdays");

      todayList.innerHTML = "";
      birthdaysToday.forEach((friend) => {
        const li = document.createElement("li");
        li.textContent = friend.name;
        todayList.appendChild(li);

        // In a real app, you would send the message here
        console.log(
          `Sending birthday message to ${friend.name}: ${friend.message.replace(
            "{{name}}",
            friend.name
          )}`
        );
        if (settings.enableEmail && friend.email) {
          console.log(`Email sent to ${friend.email}`);
        }
        if (settings.enableSMS && friend.phone) {
          console.log(`SMS sent to ${friend.phone}`);
        }
      });

      alertDiv.classList.remove("hidden");

      // Show notification
      if (Notification.permission === "granted") {
        new Notification("Birthday Alert", {
          body: `You have ${birthdaysToday.length} birthdays today!`,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Birthday Alert", {
              body: `You have ${birthdaysToday.length} birthdays today!`,
            });
          }
        });
      }
    } else {
      alert("No birthdays today!");
    }
  }

  // Render friends list
  function renderFriendsList() {
    const friendsList = document.getElementById("friendsList");
    const noFriendsMessage = document.getElementById("noFriendsMessage");

    if (friends.length === 0) {
      noFriendsMessage.classList.remove("hidden");
      friendsList.innerHTML = "";
      friendsList.appendChild(noFriendsMessage);
      return;
    }

    noFriendsMessage.classList.add("hidden");
    friendsList.innerHTML = "";

    friends.forEach((friend) => {
      const friendDate = new Date(friend.birthday);
      const formattedDate = friendDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const friendDiv = document.createElement("div");
      friendDiv.className = "border rounded-md p-4 hover:bg-gray-50";
      friendDiv.innerHTML = `
              <div class="flex justify-between items-start">
                  <div>
                      <h3 class="font-medium text-gray-900">${friend.name}</h3>
                      <p class="text-sm text-gray-500">Birthday: ${formattedDate}</p>
                      ${
                        friend.phone
                          ? `<p class="text-sm text-gray-500">Phone: ${friend.phone}</p>`
                          : ""
                      }
                      ${
                        friend.email
                          ? `<p class="text-sm text-gray-500">Email: ${friend.email}</p>`
                          : ""
                      }
                  </div>
                  <button data-id="${
                    friend.id
                  }" class="delete-btn text-red-600 hover:text-red-800">
                      <i class="fas fa-trash"></i>
                  </button>
              </div>
          `;

      friendsList.appendChild(friendDiv);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = parseInt(this.getAttribute("data-id"));
        friends = friends.filter((friend) => friend.id !== id);
        localStorage.setItem("friends", JSON.stringify(friends));
        renderFriendsList();
      });
    });
  }

  // Request notification permission on page load
  if (
    Notification.permission !== "granted" &&
    Notification.permission !== "denied"
  ) {
    Notification.requestPermission();
  }
});
