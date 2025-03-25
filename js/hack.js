window.showMessagesWithTypingEffect = function () {
    let messages = document.querySelectorAll('.hidden');
    let delay = 500; // Задержка перед следующим сообщением
    let typingSpeed = 30; // Скорость печати (мс на символ)
    let isAnswerCorrect = false;

    function typeMessage(element, text, index, callback) {
        if (index === 0) {
            element.style.opacity = "1";
            element.style.visibility = "visible";
            element.style.alignSelf = "flex-start";
            element.style.textAlign = "justify";
            element.style.display = "block";
            element.style.minHeight = element.scrollHeight + "px";

            // Создаём контейнер для текста
            let textContainer = document.createElement("span");
            textContainer.classList.add("visible-text");

            // Создаём курсор ▍
            let cursor = document.createElement("span");
            cursor.textContent = "▍";
            cursor.classList.add("cursor");

            // Очищаем и добавляем элементы
            element.innerHTML = "";
            element.appendChild(textContainer);
            textContainer.appendChild(cursor); // Вставляем курсор внутрь текстового контейнера
        }

        let visiblePart = element.querySelector(".visible-text");
        let cursor = element.querySelector(".cursor");

        if (index < text.length) {
            cursor.remove(); // Убираем курсор временно
            visiblePart.textContent += text.charAt(index);
            visiblePart.appendChild(cursor); // Возвращаем курсор после последней буквы

            setTimeout(() => typeMessage(element, text, index + 1, callback), typingSpeed);
        } else {
            cursor.remove(); // Убираем курсор после завершения печати
            if (callback) callback();
        }
    }

    function showMessage(index) {
        if (index >= 21 && !isAnswerCorrect) {
            let answerBox = document.getElementById("answerBox");
            let systemAnswerMessage = document.getElementById("systemAnswerMessage");
            systemAnswerMessage.style.opacity = "1";
            systemAnswerMessage.style.visibility = "visible";

            if (answerBox) {
                answerBox.style.display = "flex";
                answerBox.style.opacity = "1";
                answerBox.style.visibility = "visible";
            }
            let inputContainer = document.getElementById("inputContainer");

            function showInputField() {
                if (inputContainer) {
                    inputContainer.classList.remove("hidden-answer");
                    inputContainer.classList.add("fade-in"); // Гарантируем плавное появление
                }
            }

            showInputField(); // Показываем поле ввода после всех сообщений


            let submitButton = document.getElementById("submitAnswer");
            let answerInput = document.getElementById("answerInput");
            let resultMessage = document.getElementById("resultMessage");

            let correctAnswer = "ЕГОР"; // Правильный ответ
            let userScrolledUp = false; // Флаг, чтобы не мешать ручному скроллу

            submitButton.addEventListener("click", function () {
                let userAnswer = answerInput.value.trim().toUpperCase();
                if (userAnswer === correctAnswer) {
                    resultMessage.textContent = "Доступ разрешён. Код принят.";
                    resultMessage.classList.remove("wrong-answer");
                    resultMessage.classList.add("correct-answer");
                    
                    resultMessage.style.display = "flex";
                    resultMessage.style.opacity = "1";
                    resultMessage.style.visibility = "visible";
                    
                    isAnswerCorrect = true;
                    showMessage(21)
                } else {
                    resultMessage.textContent = "Ошибка! Код отклонён.";
                    resultMessage.classList.remove("correct-answer");
                    resultMessage.classList.add("wrong-answer");

                    resultMessage.style.display = "flex";
                    resultMessage.style.opacity = "1";
                    resultMessage.style.visibility = "visible";
                }

                resultMessage.classList.remove("hidden-answer");
                resultMessage.style.opacity = "1";
            });

            // Позволяем нажимать Enter для ввода ответа
            answerInput.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    submitButton.click();
                }
            });

            // Обнаруживаем, если пользователь вручную прокручивает вверх
            document.addEventListener("scroll", function () {
                if (window.scrollY < document.body.scrollHeight - window.innerHeight - 100) {
                    userScrolledUp = true;
                }
            });
            
            return;
        }
        if(index > 21 && !isAnswerCorrect) return;
        let msg = messages[index];
        msg.classList.remove("hidden");

        msg.style.display = "block";
        msg.style.opacity = "0";
        msg.style.visibility = "hidden";
        msg.style.alignSelf = "flex-start";
        msg.style.textAlign = "justify";
        msg.style.transition = "opacity 0.5s ease-in-out";

        let text = msg.textContent;
        msg.textContent = ""; // Очищаем перед печатанием

        typeMessage(msg, text, 0, () => {
            msg.style.opacity = "1";
            msg.style.visibility = "visible";
            setTimeout(() => {
                //window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
                showMessage(index + 1);
            }, delay);
        });
    }

    showMessage(0);
};




