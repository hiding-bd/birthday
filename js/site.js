window.showElements = function () {
    function showElement(id, delay) {
        let element = document.getElementById(id);
        if (element) {
            setTimeout(() => {
                element.classList.add("visible");
                console.log(`Элемент ${id} теперь видим`);
            }, delay);
        } else {
            console.error(`Элемент ${id} не найден!`);
        }
    }

    showElement("loadingText", 500);
    showElement("errorText", 2000);
    showElement("glitchImageContainer", 4000);
    showElement("finalText", 6000);
    let submitCodeButton = document.getElementById("submitCode");
    let accessCodeInput = document.getElementById("accessCodeInput");
    let errorMessage = document.getElementById("codeErrorMessage");

    console.log(133414)
    

    let correctCode = "403"; // Код для перехода

    submitCodeButton.addEventListener("click", function () {
        let enteredCode = accessCodeInput.value.trim();
        console.log(1111)
        if (enteredCode === correctCode) {
            window.location.href = "hack"; // Адрес второй страницы
        } else {
            errorMessage.classList.remove("hidden-answer");
            errorMessage.style.opacity = "1"; // Показываем сообщение об ошибке
        }
    });

    // Позволяем нажимать Enter для ввода кода
    accessCodeInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            submitCodeButton.click();
        }
    });
};
