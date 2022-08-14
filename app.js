// DECLARE VARIABLES FOR HTML ELEMENTS

let new_game_btn = document.getElementById("new_game_btn");
let roll_btn = document.getElementById("roll_btn");

let roll_count = document.getElementById("roll_count");

let game_dice = document.getElementsByClassName("game_dice");

// let dice_1 = document.getElementById("dice_1");
// let dice_2 = document.getElementById("dice_2");
// let dice_3 = document.getElementById("dice_3");
// let dice_4 = document.getElementById("dice_4");
// let dice_5 = document.getElementById("dice_5");

let add_buttons = document.getElementsByClassName("add_button");

let scores = document.getElementsByClassName("score");

let upper_scores = document.getElementsByClassName("upper_score");
let aces_score = document.getElementById("aces_score");
let twos_score = document.getElementById("twos_score");
let threes_score = document.getElementById("threes_score");
let fours_score = document.getElementById("fours_score");
let fives_score = document.getElementById("fives_score");
let sixes_score = document.getElementById("sixes_score");
let bonus_score = document.getElementById("bonus_score");
let total_upper_score = document.getElementById("total_upper_score");

let lower_scores = document.getElementsByClassName("lower_score");
let kind_3_score = document.getElementById("kind_3_score");
let kind_4_score = document.getElementById("kind_4_score");
let full_house_score = document.getElementById("full_house_score");
let sm_straight_score = document.getElementById("sm_straight_score");
let lg_straight_score = document.getElementById("lg_straight_score");
let yahtzee_score = document.getElementById("yahtzee_score");
let chance_score = document.getElementById("chance_score");
let yahtzee_bonus_1 = document.getElementById("yahtzee_bonus_1");
let yahtzee_bonus_2 = document.getElementById("yahtzee_bonus_2");
let yahtzee_bonus_3 = document.getElementById("yahtzee_bonus_3");
let total_lower_score = document.getElementById("total_lower_score");
let total_game_score = document.getElementById("total_game_score");

let aces_add = document.getElementById("aces_add")
let twos_add = document.getElementById("twos_add")
let threes_add = document.getElementById("threes_add")
let fours_add = document.getElementById("fours_add")
let fives_add = document.getElementById("fives_add")
let sixes_add = document.getElementById("sixes_add")
let kind_3_add = document.getElementById("kind_3_add")
let kind_4_add = document.getElementById("kind_4_add")
let full_house_add = document.getElementById("full_house_add")
let sm_straight_add = document.getElementById("sm_straight_add")
let lg_straight_add = document.getElementById("lg_straight_add")
let chance_add = document.getElementById("chance_add")

// DECLARE LOGIC VARIABLES

roll = [0, 0, 0, 0, 0];
roll_keep = [0, 0, 0, 0, 0];
roll_counter = 0;

let dice_image_url = [
    "url('./resources/one_dice.png')",
    "url('./resources/two_dice.png')",
    "url('./resources/three_dice.png')",
    "url('./resources/four_dice.png')",
    "url('./resources/five_dice.png')",
    "url('./resources/six_dice.png')"
];

let dice_image_overlay_url = [
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./resources/one_dice.png')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./resources/two_dice.png')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./resources/three_dice.png')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./resources/four_dice.png')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./resources/five_dice.png')",
    "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./resources/six_dice.png')"                  
];

// DISPLAY DICE TO DOM BASED OFF ROLL_KEEP STATE

function display_dice() {
    for(let i=0; i<roll.length; i++) {
        if(roll_keep[i] == 0) {
            switch (roll[i]) {
                case 1:
                    game_dice[i].style.backgroundImage = dice_image_url[0];
                    break;
                case 2:
                    game_dice[i].style.backgroundImage = dice_image_url[1];
                    break;
                case 3:
                    game_dice[i].style.backgroundImage = dice_image_url[2];
                    break;
                case 4:
                    game_dice[i].style.backgroundImage = dice_image_url[3];
                    break;
                case 5:
                    game_dice[i].style.backgroundImage = dice_image_url[4];
                    break;
                case 6:
                    game_dice[i].style.backgroundImage = dice_image_url[5];
                    break;
            }
    }
    else {
        switch (roll[i]) {
            case 1:
                game_dice[i].style.backgroundImage = dice_image_overlay_url[0];
                break;
            case 2:
                game_dice[i].style.backgroundImage = dice_image_overlay_url[1];
                break;
            case 3:
                game_dice[i].style.backgroundImage = dice_image_overlay_url[2];
                break;
            case 4:
                game_dice[i].style.backgroundImage = dice_image_overlay_url[3];
                break;
            case 5:
                game_dice[i].style.backgroundImage = dice_image_overlay_url[4];
                break;
            case 6:
                game_dice[i].style.backgroundImage = dice_image_overlay_url[5];
                break;
        }
    }  
    }
}

// RESET VALUES AND CLEAR DOM AFTER SCORE IS ADDED

function score_add_reset() {
    if(check_end_game() == false) {
        roll = [0, 0, 0, 0, 0]; 
        roll_keep = [0, 0, 0, 0, 0];
        roll_counter = 0;
        roll_count.innerText = roll_counter;

        for(let i=0; i<5; i++) {
            game_dice[i].style.backgroundImage = "";
        }
    }
}

// CHECK FOR YAHTZEE AND ADD SCORES OR BONUSES

function check_add_yahtzee() {
    let temp = 0;
    for(let i=0; i<roll.length; i++) {
        for(let j=0; j<roll.length; j++) {
            if(i != j && roll[i] == roll[j]) {
                temp++;
            }
        }

        if(temp == 4 && yahtzee_score.innerText == "-") {
            alert("Yahtzee!");
            yahtzee_score.innerText = 50;
            score_add_reset()
            return;
        } else if(temp == 4 && yahtzee_score.innerText == "50") {
            if(yahtzee_bonus_1.innerText == "") {
                alert("Yahtzee!");
                yahtzee_bonus_1.innerText = "X";
                score_add_reset();
                return;
            } else if(yahtzee_bonus_1.innerText == "X" && yahtzee_bonus_2.innerText == "-") {
                alert("Yahtzee!");
                yahtzee_bonus_2.innerText = "X";
                score_add_reset();
                return;
            } else if(yahtzee_bonus_1.innerText == "X" && yahtzee_bonus_2.innerText == "X" && yahtzee_bonus_3.innerText == "-") {
                alert("Yahtzee!");
                yahtzee_bonus_3.innerText = "X";
                score_add_reset();
                return;
            }
        } else if(temp != 4) {
            return;
        }
    }
}

// END OF GAME UPDATE CURRENT TOTAL SCORES

function end_game() {
    let temp_total_upper_score = 0;
    for(let i=0; i<upper_scores.length; i++) {
        temp_total_upper_score += Number(upper_scores[i].innerText);
    }
    if(temp_total_upper_score > 62) {
        total_lower_score.innerText = temp_total_lower_score + 35;
        bonus_score.innerText = 35;
    }
    else{
        total_upper_score.innerText = temp_total_upper_score;
    }

    let temp_total_lower_score = 0;
    yahtzee_score.innerText = 0;
    for(let i=0; i<lower_scores.length; i++) {
        temp_total_lower_score += Number(lower_scores[i].innerText);
    }
    if(yahtzee_bonus_1.innerText == "X") {
        temp_total_lower_score += 100;
    }
    if(yahtzee_bonus_2.innerText == "X") {
        temp_total_lower_score += 100;
    }
    if(yahtzee_bonus_3.innerText == "X") {
        temp_total_lower_score += 100;
    }
    
    total_lower_score.innerText = temp_total_lower_score;

    total_game_score.innerText = temp_total_upper_score + temp_total_lower_score;
}

function check_end_game() {
    let check_scores = document.getElementsByClassName("check_score");

    for(let i=0; i<check_scores.length; i++) {
        if(check_scores[i].innerText == "-") {
            return false;
        }
    }

    end_game();
    return true;
}

// POPULATE THE ROLL, DISPLAY THE DICE, AND CHECK FOR YAHTZEE

function roll_dice() {
    if(roll_counter < 3 && check_end_game() == false) {
        roll_counter ++;
        roll_count.innerText = roll_counter;

        for(let i=0; i<roll.length; i++) {
            if(roll_keep[i] == 0) {
                roll[i] = Math.floor(Math.random()*6 + 1);
            }
        }

        display_dice();
        check_add_yahtzee();
        // check_end_game();
    }
}

// CREATE A NEW GAME SETUP

function new_game() {
    roll = [0, 0, 0, 0, 0];
    roll_keep = [0, 0, 0, 0, 0];
    roll_counter = 0;
    roll_count.innerText = roll_counter;

    for(let i=0; i<game_dice.length; i++) {
        game_dice[i].style.backgroundImage = "";
    }

    for(let i=0; i<scores.length; i++) {
        scores[i].innerText = "-";
    }

    let yahtzee_bonus_1 = document.getElementById("yahtzee_bonus_1");
    let yahtzee_bonus_2 = document.getElementById("yahtzee_bonus_2");
    let yahtzee_bonus_3 = document.getElementById("yahtzee_bonus_3");

    yahtzee_bonus_1.innerText = "";
    yahtzee_bonus_2.innerText = "";
    yahtzee_bonus_3.innerText = "";

    alert("Welcome to Yahtzee Online!\n\nSelect the roll button and pick which dice you want to keep and roll until you are done.\n\nOnce you are ready to save the score, select the score option you wish to apply the roll to.\n\nHave fun and good luck!");
}

// TOGGLE DICE KEEP APPEARANCE

function toggle_dice(eve) {
    let index = eve.target.id.slice(eve.target.id.length - 1, eve.target.id.length);

    if(roll_keep[index - 1] == 0) {
        roll_keep[index - 1] = 1;
    }
    else {
        roll_keep[index - 1] = 0;
    }

    display_dice();
}

// LISTEN FOR DICE CLICKS

for(let i=0; i<game_dice.length; i++) {
    game_dice[i].addEventListener("click", toggle_dice);
}

new_game_btn.addEventListener("click", new_game);
roll_btn.addEventListener("click", roll_dice);

// LISTEN FOR ADD BUTTONS

function add_aces() {
    let temp_aces = 0;
    if(aces_score.innerText == "-" && roll_counter > 0 && aces_score.innerText == "-") {
        for(let i=0; i<roll.length; i++) {
            if(roll[i] == 1) {
                temp_aces += 1;
            }
        }
        aces_score.innerText = temp_aces;
        score_add_reset();
    }
}

function add_twos() {
    let temp = 0;
    if(twos_score.innerText == "-" && roll_counter > 0 && twos_score.innerText == "-") {
        for(let i=0; i<roll.length; i++) {
            if(roll[i] == 2) {
                temp += 2;
            }
        }
        twos_score.innerText = temp;
        score_add_reset();
    }
}

function add_threes() {
    let temp = 0;
    if(threes_score.innerText == "-" && roll_counter > 0 && threes_score.innerText == "-") {
        for(let i=0; i<roll.length; i++) {
            if(roll[i] == 3) {
                temp += 3;
            }
        }
        threes_score.innerText = temp;
        score_add_reset();
    }
}

function add_fours() {
    let temp = 0;
    if(fours_score.innerText == "-" && roll_counter > 0 && fours_score.innerText == "-") {
        for(let i=0; i<roll.length; i++) {
            if(roll[i] == 4) {
                temp += 4;
            }
        }
        fours_score.innerText = temp;
        score_add_reset();
    }
}

function add_fives() {
    let temp = 0;
    if(fives_score.innerText == "-" && roll_counter > 0 && fives_score.innerText == "-") {
        for(let i=0; i<roll.length; i++) {
            if(roll[i] == 5) {
                temp += 5;
            }
        }
        fives_score.innerText = temp;
        score_add_reset();
    }
}

function add_sixes() {
    let temp = 0;
    if(sixes_score.innerText == "-" && roll_counter > 0 && sixes_score.innerText == "-") {
        for(let i=0; i<roll.length; i++) {
            if(roll[i] == 6) {
                temp += 6;
            }
        }
        sixes_score.innerText = temp;
        score_add_reset();
    }
}

aces_add.addEventListener("click", add_aces);
twos_add.addEventListener("click", add_twos);
threes_add.addEventListener("click", add_threes);
fours_add.addEventListener("click", add_fours);
fives_add.addEventListener("click", add_fives);
sixes_add.addEventListener("click", add_sixes);

function add_kind_3() {
    let counter = 0;
    let kind_3_total = 0;
    for(let i=0; i<roll.length; i++) {
        for(let j=0; j<roll.length; j++) {
            if(i != j && roll[i] == roll[j]) {
                counter++
            }
        }

        if(counter > 1 && roll_counter > 0 && kind_3_score.innerText == "-") {
            for(let i=0; i<roll.length; i++) {
                kind_3_total += roll[i];
            }

            kind_3_score.innerText = kind_3_total;
            score_add_reset();
            return;
        }

        counter = 0;
    }
    if(roll_counter > 0 && kind_3_score.innerText == "-") {
        kind_3_score.innerText = 0;
        score_add_reset();
    }
}

function add_kind_4() {
    let counter = 0;
    let kind_4_total = 0;

    for(let i=0; i<roll.length; i++) {
        for(let j=0; j<roll.length; j++) {
            if(i != j && roll[i] == roll[j]) {
                counter++
            }
        }

        if(counter > 2 && roll_counter > 0 && kind_4_score.innerText == "-") {
            for(let i=0; i<roll.length; i++) {
                kind_4_total += roll[i];
            }

            kind_4_score.innerText = kind_4_total;
            score_add_reset();
            return;
        }

        counter = 0;
    }
    if(kind_4_score.innerText == "-" && roll_counter > 0) {
        kind_4_score.innerText = 0;
        score_add_reset();
    }
}

function add_full_house() {
    let numA = [];
    let numB = [];

    for(let i=0; i<roll.length; i++) {
        if(numA.length == 0) {
            numA.push(roll[i]);
        }
        else if(numB.length == 0 && !numA.includes(roll[i])) {
            numB.push(roll[i]);
        }
        else if(numA.includes(roll[i])) {
            numA.push(roll[i]);
        }
        else if(numB.includes(roll[i])) {
            numB.push(roll[i]);
        }
    }

    if(numA.length == 3 && numB.length == 2 &&  full_house_score.innerText == "-"|| numA.length == 2 && numB.length == 3 &&  full_house_score.innerText == "-") {
        full_house_score.innerText = 25;
        score_add_reset();
        return;
    }
    else {
        if(roll_counter > 0 && full_house_score.innerText == "-") {
            full_house_score.innerText = 0;
            score_add_reset();
            return;
        }
    }
}

function add_sm_straight() {
    roll.sort();
    let sequence = 0;

    for(let i=0; i<roll.length; i++) {
        if(roll[i] == roll[i + 1] - 1) {
            sequence ++;
        }
    }

    if(sequence >= 3 && sm_straight_score.innerText == "-") {
        sm_straight_score.innerText = 30;
        score_add_reset();
        return;
    }
    else if(roll_counter > 0 && sm_straight_score.innerText == "-") {
        sm_straight_score.innerText = 0;
        score_add_reset();
    }
}

function add_lg_straight() {
    roll.sort();
    let sequence = 0;
    
    for(let i=0; i<roll.length; i++) {
        if(roll[i] == roll[i + 1] - 1) {
            sequence ++;
        }
    }

    if(sequence >= 4 && lg_straight_score.innerText == "-") {
        lg_straight_score.innerText = 30;
        score_add_reset();
        return;
    }
    else if(roll_counter > 0 && lg_straight_score.innerText == "-") {
        lg_straight_score.innerText = 0;
        score_add_reset();
    }
}

function add_chance() {
    if(roll_counter > 0 && chance_score.innerText == "-") {
        let chance_total = 0;

        for(let i=0; i<roll.length; i++) {
            chance_total += roll[i];
        }

        chance_score.innerText = chance_total;
        score_add_reset();
    }
}

kind_3_add.addEventListener("click", add_kind_3);
kind_4_add.addEventListener("click", add_kind_4);
full_house_add.addEventListener("click", add_full_house);
sm_straight_add.addEventListener("click", add_sm_straight);
lg_straight_add.addEventListener("click", add_lg_straight);
chance_add.addEventListener("click", add_chance);