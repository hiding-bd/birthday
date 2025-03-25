document.addEventListener("DOMContentLoaded", function () {
    console.log("%c[GAIA] Латентная функция активна. Или почти.", "color: cyan; font-style: italic;");

    const lines = [
        "line1", "line2", "line3", "line4", "line5", "line6", "line7", "line8",
        "line9", "line10", "line11"
    ];

    lines.forEach((id, index) => {
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove("hidden");
                el.classList.add("visible", "system-line");

                // Специально: добавляем обработчик, когда именно line7 появился
                if (id === "line7") {
                    el.style.cursor = "pointer";
                    el.addEventListener("click", () => {
                        const reveal = document.getElementById("moduleReveal");
                        if (reveal) {

                            const overlay = document.getElementById("overlayFade");
                            reveal.classList.remove("hidden");
                            reveal.classList.add("visible");
                            overlay.classList.remove("hidden");
                            overlay.classList.add("visible"); // экран затухает

                            setTimeout(() => {
                                overlay.classList.remove("visible");
                                overlay.classList.add("hidden");
                                reveal.classList.remove("hidden");
                                reveal.classList.add("visible");
                            }, 1500); // 1.5 секунды "затухания"

                            console.log("%c[GAIA LOG] Внимательность — активный параметр.", "color: cyan");
                            console.log("%cПодсказка: Не все модули видимы. Некоторые реагируют только на твоё внимание.", "color: #ff80ff");

                        }
                    });
                }
            }
        }, 1800 * index);
    });
});

document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "g") {
        document.getElementById("secretBlock").classList.remove("hidden");
    }
});
