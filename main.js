// 0. Show start typing after 2second
// 1. Apply Stop Watch on time screenLeft;
// 2. Finding mistakes and show mistake word by red. 
// 3. logic for words count uptill 60s.Apply
// 4. logic for characters count uptill 60s. 
// 5. after time over ,stop the data change. 
// 6. Try again button to reset. 
// 7. color of correct letter is green and wrong for red. 

// data to render

const para = [
    "India is a beautiful country. The national flag of India is the tri-colored ‘Tiranga.’ It has orange on top, white in the center along with blue Ashoka Chakra and green at the bottom. The national emblem of India is the State Emblem of India called the ‘Lion Capital of Ashoka’ The national motto of the country is ‘Satyameva Jayate’, which means ‘truth only triumphs.’ The official languages of India are Hindi and English. The national airline of India is Indian airline. The national tree of India is the Banyan tree. The national currency of India is the Indian National Rupee. The national vegetable of India is Pumpkin. The national dish of India is Khichdi which is tasty yellow rice cooked alongside Dal.",

    "Books play a significant role in our life. A book is like a best friend who will never walk away from you. Books are packed with knowledge, insights into a happy life, life lessons, love, fear, prayer and helpful advice. One can read about anything under the sun. Books are our best companions because they give us knowledge and peace of mind unconditionally.",

    "Books are our best companion, giving us company. In today's busy world, when people are caught up in their hectic schedules, one often feels lonely. At a time like this, a book can offer great company, comfort, a means of recreation and an opportunity to learn. A book can be the one thing which I can read all day long leaving behind all the problems. I like books because they give us knowledge.",

    "These are not the only reasons that I think books are our best companies. Books also offer knowledge about different aspects of life. Books are well known for accurate and impartial information. Also, books are mostly written by a subject expert. This assures detailed research and information about a subject when we read a book.",
    "Water is the primary and essential need of every living organism. It is the most precious gift by nature that helps in survival. 70% of our body is filled with water, which is why it is an essential part of our life. Water is needed for various purposes every day. We need water for drinking, washing, cleaning, cooking, etc. Just like there is no life without oxygen, there is no existence without water. It exists in the form of seas, oceans, etc., and also in the form of ice. It is not only an essential element for human beings but also crucial for the survival and existence of plants, animals, birds, etc.",
    "a Discipline Discipline is an essential part of human beings. It is a unique thing which makes a man successful in every walk of the life. It teaches us how to lead a controlled life. It keeps not only a country but the whole world on the path of progress. It is such a key which makes everybodys life prosperous. Thus discipline plays a great role in every mans life. So we should follow discipline and be great in our lives. b The Role of Newspaper Today is the era of information and technology. " 
]
document.querySelector(".features").textContent = `Time Left: ${0}`; // inital time display will be 0

// 1. Declaration 
const button = document.querySelector(".reset");
let heading = document.getElementById("heading");
let text = document.querySelector("#text");
let inputData = document.querySelector(".inputData"); //Here we have created an input element on html to write the text and match the letter, after wards we will hide it. 
let charIndex = 0;
let mistakes = 0;
let maxTime = 60;
let timeInSecond = 60;
let isTrue = true;
let interval;


//3. Load Random para and render inside paragraph tag.

function randomPara() {
    
    let randomIndex = Math.floor(Math.random() * (para.length));
    text.innerHTML="";
    para[randomIndex].split("").forEach(span => {  // each element of word is seprated 
        let spanning = `<span>${span}</span>` // and then each letter concatenated.
        text.innerHTML += spanning;
    });

    text.querySelectorAll("span")[0].classList.add("active"); // to hide input and cursor blink from here due to active class which was added previously in hidden input.

    document.addEventListener("keydown", () => inputData.focus());
    document.addEventListener("click", () => inputData.focus());

}

randomPara();

//4. Initialize typing and checking that element typed in input is same as rendered data
function initTyping() {
    const characters = text.querySelectorAll("span"); //targeting all span inside para 
    let userChar = inputData.value.split("")[charIndex]; // each span will get selected on the value of charIndex

    if (charIndex < characters.length - 1 && timeInSecond > 0) {


        if (isTrue) { // once timer is started, then it does not needs to call again so isTrue=false; 
            interval = setInterval(timer, 1000);
            isTrue = false;
        }


        if (userChar == null) { // if backspace is pressed inside input, nothing is print on console  so null
            charIndex--; // if backspace pressed, decrease the count so classes will be removed.
            if (characters[charIndex].classList.contains("incorrect")) mistakes--; // if backspace is pressed,decrase the mistake count if it contains the class incorrect
            // console.log(charIndex);
            characters[charIndex].classList.remove("correct", "incorrect");
        }
        else {

            if (userChar === characters[charIndex].innerText) { //usertype is same as character index letter so return this 
                characters[charIndex].classList.add("correct"); // change color for correct letter
            } else {
                characters[charIndex].classList.add("incorrect");// change color for incorrect letter
                mistakes++; // increase the mistakes count if wrong letter pressed
            }
            charIndex++; // increasing charIndex after each input we give, this function get called
        }
        characters.forEach(span => {
            span.classList.remove("active"); // after we passed on next letter, underline of previous color get removed
        })
        characters[charIndex].classList.add("active"); // adding underline below text with class active to  span
        document.querySelector(".mistakes").textContent = `Mistakes: ${mistakes}`;
        let wpm = Math.round(((charIndex - mistakes) / 5) / ((61 - timeInSecond) * 60));
        let words = (charIndex - mistakes) / 5;
        let time = (maxTime - timeInSecond);
        wpm = Math.round((words / time) * 60);
        let cpm = charIndex - mistakes;
        document.querySelector(".wpm").textContent = `WPM: ${wpm}`;
        document.querySelector(".cpm").textContent = `CPM: ${cpm}`;
    }
    else {
        inputData.value = "";
        clearInterval(interval);
    }
    // console.log(wpm);
    // wpm= wpm<0 || wpm===Infinity || wpm==null ? 0:wpm;
    // document.querySelector(".wpm").textContent=`WPM: ${wpm}`;
}

//5. Run the initTyping function when event is triggered.
inputData.addEventListener('input', initTyping);

//6. Setting time line (58-61) and calling timer function

function timer() {
    if (timeInSecond > 0) {
        timeInSecond--;
        document.querySelector(".features").textContent = `Time Left: ${timeInSecond}`
    }
    if (timeInSecond <= 0) {
        clearInterval(timer);
    }
}


//7. WPM and CPM-  line 96
//8. reset button
button.addEventListener("click", reset);

//9. reset function

function reset() {
    location.reload();
}

