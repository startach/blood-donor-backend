

const currentInput = document.getElementById("current");
const goalInput = document.getElementById("goal");
const dropPercentage = document.getElementById("drop-percentage");
const dropFill = document.getElementById("drop-fill");

function updateDropValue() {
    dropPercentage.textContent = `${parseInt(currentInput.value / goalInput.value * 100)}%`;
    dropFill.style.height = `${parseInt(currentInput.value / goalInput.value * 100)}%`;
}

updateDropValue();
