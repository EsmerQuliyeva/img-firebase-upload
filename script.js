import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyBmWxLLdfP0h7ir6XEcn7DYsZE4pt-ZU18",
  authDomain: "chat-dbccd.firebaseapp.com",
  databaseURL: "https://chat-dbccd-default-rtdb.firebaseio.com",
  projectId: "chat-dbccd",
  storageBucket: "chat-dbccd.appspot.com",
  messagingSenderId: "159348335472",
  appId: "1:159348335472:web:46f0f5dbdf271de354a5b5",
  measurementId: "G-M7Z0J9XSPM",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const fileInput = document.getElementById("fileInput");
const btn = document.querySelector(".btn");
let progress = document.querySelector(".progress");
let percentageValue = document.querySelector(".percentage");
const image = document.querySelector(".img");

fileInput.addEventListener("change", (e) => {
  if (fileInput.files.length > 0) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
});
btn.addEventListener("click", () => {
  const file = fileInput.files[0];
  const storageRef = ref(storage, "images/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      let progressValue =
        Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      percentageValue.innerHTML = progressValue;
      progress.style.width = progressValue + "%";
    },
    (error) => {
      percentageValue.innerHTML = "Upload Error" + error;
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        if (downloadURL != "") {
          image.setAttribute("src", downloadURL);
          image.style.display="block"
        }
      });
    }
  );
});


