// ==========================================
// 🎓 PREMIUM TEACHER'S DAY POPUP - 2026
// ⏱️ AUTO CLOSE AFTER 3 SECONDS
// ==========================================

(function () {
    "use strict";

    // 📅 Teacher's Day Target Date
    const targetDate = new Date("September 5, 2026 00:00:00").getTime();

    function updatePopup() {

        const now = new Date().getTime();
        const diff = targetDate - now;

        // ⏳ Calculate remaining days
        let daysLeft = 0;

        if (diff > 0) {
            daysLeft = Math.ceil(
                diff / (1000 * 60 * 60 * 24)
            );
        }

        // পুরোনো popup থাকলে remove
        const oldPopup = document.getElementById("teachersDayPopup");

        if (oldPopup) {
            oldPopup.remove();
        }


        // ==================================
        // 🎨 ADD CSS AUTOMATICALLY
        // ==================================

        if (!document.getElementById("teachersDayPopupStyle")) {

            const style = document.createElement("style");

            style.id = "teachersDayPopupStyle";

            style.textContent = `

                /* ========================= */
                /* 🌌 POPUP OVERLAY */
                /* ========================= */

                #teachersDayPopup {
                    position: fixed;
                    inset: 0;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    padding: 20px;

                    background:
                        radial-gradient(
                            circle at top,
                            rgba(255, 193, 7, 0.18),
                            transparent 45%
                        ),
                        rgba(5, 10, 30, 0.75);

                    backdrop-filter: blur(8px);

                    z-index: 999999;

                    animation: popupOverlayFade 0.6s ease forwards;

                    font-family:
                        "Segoe UI",
                        Arial,
                        sans-serif;
                }


                /* ========================= */
                /* 🎓 MAIN POPUP CARD */
                /* ========================= */

                .td-popup-card {

                    width: 100%;
                    max-width: 430px;

                    position: relative;

                    overflow: hidden;

                    padding: 38px 28px 30px;

                    border-radius: 32px;

                    background:
                        linear-gradient(
                            145deg,
                            rgba(255,255,255,0.98),
                            rgba(245,248,255,0.95)
                        );

                    border:
                        1px solid rgba(255,255,255,0.9);

                    box-shadow:
                        0 30px 80px rgba(0,0,0,0.45),
                        inset 0 1px 0 rgba(255,255,255,0.8);

                    text-align: center;

                    animation:
                        popupCardEnter
                        0.7s
                        cubic-bezier(.2,.8,.2,1)
                        forwards;
                }


                /* ========================= */
                /* 🌈 TOP ANIMATED LINE */
                /* ========================= */

                .td-popup-top {

                    position: absolute;

                    top: 0;
                    left: 0;

                    width: 100%;
                    height: 7px;

                    background:
                        linear-gradient(
                            90deg,
                            #ff512f,
                            #f09819,
                            #ffd700,
                            #ff512f
                        );

                    background-size: 300%;

                    animation:
                        gradientMove
                        5s
                        linear
                        infinite;
                }


                /* ========================= */
                /* ❌ CLOSE BUTTON */
                /* ========================= */

                .td-close-btn {

                    position: absolute;

                    top: 16px;
                    right: 18px;

                    width: 38px;
                    height: 38px;

                    border-radius: 50%;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border: none;

                    background:
                        rgba(30,60,114,0.08);

                    color: #1e3c72;

                    font-size: 26px;

                    cursor: pointer;

                    transition: 0.25s ease;

                    z-index: 10;
                }


                .td-close-btn:hover {

                    background: #1e3c72;

                    color: white;

                    transform:
                        rotate(90deg)
                        scale(1.08);
                }


                /* ========================= */
                /* 🎓 ICON */
                /* ========================= */

                .td-icon {

                    width: 86px;
                    height: 86px;

                    margin: 0 auto 12px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    font-size: 45px;

                    background:
                        linear-gradient(
                            135deg,
                            #fff3cd,
                            #ffe29a
                        );

                    box-shadow:
                        0 12px 30px
                        rgba(255,180,0,0.25);

                    animation:
                        iconFloat
                        3s
                        ease-in-out
                        infinite;
                }


                /* ========================= */
                /* ✨ HAPPY TEXT */
                /* ========================= */

                .td-happy {

                    margin: 4px 0 0;

                    font-size: 17px;

                    font-weight: 700;

                    letter-spacing: 3px;

                    text-transform: uppercase;

                    color: #d4380d;
                }


                /* ========================= */
                /* 🎉 MAIN TITLE */
                /* ========================= */

                .td-title {

                    margin: 4px 0 8px;

                    font-size: clamp(34px, 8vw, 48px);

                    line-height: 1;

                    font-weight: 900;

                    letter-spacing: 1px;

                    background:
                        linear-gradient(
                            135deg,
                            #ff7a18,
                            #ffb300,
                            #f44336
                        );

                    -webkit-background-clip: text;

                    -webkit-text-fill-color: transparent;

                    background-clip: text;
                }


                /* ========================= */
                /* 📅 DATE */
                /* ========================= */

                .td-date {

                    display: inline-flex;

                    align-items: center;

                    gap: 8px;

                    padding: 8px 16px;

                    border-radius: 30px;

                    background:
                        rgba(30,60,114,0.08);

                    color: #1e3c72;

                    font-size: 16px;

                    font-weight: 700;
                }


                /* ========================= */
                /* ⏳ COUNTDOWN */
                /* ========================= */

                .td-countdown {

                    margin: 22px auto 18px;

                    padding: 18px 20px;

                    border-radius: 22px;

                    color: white;

                    max-width: 270px;

                    background:
                        linear-gradient(
                            135deg,
                            #1e3c72,
                            #2a5298
                        );

                    box-shadow:
                        0 15px 30px
                        rgba(30,60,114,0.35);
                }


                .td-number {

                    display: block;

                    font-size: 52px;

                    line-height: 1;

                    font-weight: 900;

                    animation:
                        numberPulse
                        2s
                        ease-in-out
                        infinite;
                }


                .td-days-text {

                    display: block;

                    margin-top: 6px;

                    font-size: 13px;

                    letter-spacing: 3px;

                    font-weight: 700;

                    opacity: 0.9;
                }


                /* ========================= */
                /* 💬 MESSAGE */
                /* ========================= */

                .td-message {

                    margin: 10px 0 18px;

                    color: #475569;

                    font-size: 15px;

                    line-height: 1.7;

                    font-weight: 500;
                }


                /* ========================= */
                /* 🎊 CELEBRATION MESSAGE */
                /* ========================= */

                .td-celebrate {

                    display: inline-block;

                    padding: 11px 18px;

                    border-radius: 30px;

                    background:
                        linear-gradient(
                            135deg,
                            #fff0e6,
                            #ffe2c2
                        );

                    color: #b54708;

                    font-size: 14px;

                    font-weight: 700;

                    box-shadow:
                        0 6px 16px
                        rgba(255,140,0,0.12);
                }


                /* ========================= */
                /* 🎈 DECORATIONS */
                /* ========================= */

                .td-decoration {

                    position: absolute;

                    pointer-events: none;

                    opacity: 0.15;

                    font-size: 32px;

                    animation:
                        floatingDecor
                        5s
                        ease-in-out
                        infinite;
                }


                .decor-1 {
                    top: 80px;
                    left: 18px;
                }


                .decor-2 {
                    bottom: 70px;
                    right: 20px;
                    animation-delay: 1s;
                }


                .decor-3 {
                    top: 160px;
                    right: 20px;
                    animation-delay: 2s;
                }


                /* ========================= */
                /* 🎬 ANIMATIONS */
                /* ========================= */

                @keyframes popupOverlayFade {

                    from {
                        opacity: 0;
                    }

                    to {
                        opacity: 1;
                    }
                }


                @keyframes popupCardEnter {

                    from {

                        opacity: 0;

                        transform:
                            translateY(40px)
                            scale(0.92);
                    }

                    to {

                        opacity: 1;

                        transform:
                            translateY(0)
                            scale(1);
                    }
                }


                @keyframes iconFloat {

                    0%, 100% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(-8px);
                    }
                }


                @keyframes numberPulse {

                    0%, 100% {
                        transform: scale(1);
                    }

                    50% {
                        transform: scale(1.08);
                    }
                }


                @keyframes floatingDecor {

                    0%, 100% {

                        transform:
                            translateY(0)
                            rotate(0deg);
                    }

                    50% {

                        transform:
                            translateY(-15px)
                            rotate(10deg);
                    }
                }


                @keyframes gradientMove {

                    0% {
                        background-position: 0%;
                    }

                    100% {
                        background-position: 300%;
                    }
                }


                /* ========================= */
                /* 📱 MOBILE RESPONSIVE */
                /* ========================= */

                @media (max-width: 480px) {

                    .td-popup-card {

                        padding:
                            35px
                            20px
                            24px;

                        border-radius: 26px;
                    }


                    .td-icon {

                        width: 76px;
                        height: 76px;

                        font-size: 40px;
                    }


                    .td-number {

                        font-size: 46px;
                    }

                }

            `;

            document.head.appendChild(style);
        }


        // ==================================
        // 🧩 CREATE POPUP HTML
        // ==================================

        const popupHTML = `

            <div id="teachersDayPopup">

                <div class="td-popup-card">

                    <div class="td-popup-top"></div>


                    <!-- 🎈 Decorations -->

                    <div class="td-decoration decor-1">
                        ✨
                    </div>

                    <div class="td-decoration decor-2">
                        📚
                    </div>

                    <div class="td-decoration decor-3">
                        ⭐
                    </div>


                    <!-- ❌ Close Button -->

                    <button
                        class="td-close-btn"
                        id="tdCloseBtn"
                        aria-label="Close Popup"
                    >
                        ×
                    </button>


                    <!-- 🎓 Icon -->

                    <div class="td-icon">
                        🎓
                    </div>


                    <!-- 🎉 Heading -->

                    <div class="td-happy">
                        Happy
                    </div>


                    <h1 class="td-title">
                        TEACHER'S DAY
                    </h1>


                    <!-- 📅 Date -->

                    <div class="td-date">
                        📅 5th September 2026
                    </div>


                    <!-- ⏳ Countdown -->

                    <div class="td-countdown">

                        <span class="td-number">
                            ${daysLeft}
                        </span>

                        <span class="td-days-text">
                            DAYS LEFT
                        </span>

                    </div>


                    <!-- 💬 Message -->

                    <p class="td-message">

                        Thank you for guiding us,<br>
                        inspiring us and believing in us.

                    </p>


                    <!-- 🎊 Bottom Message -->

                    <div class="td-celebrate">

                        🎉 Celebrating the true mentors of our lives!

                    </div>

                </div>

            </div>

        `;


        // ==================================
        // ➕ ADD POPUP TO PAGE
        // ==================================

        document.body.insertAdjacentHTML(
            "beforeend",
            popupHTML
        );


        // ==================================
        // 🎯 GET ELEMENTS
        // ==================================

        const popup = document.getElementById(
            "teachersDayPopup"
        );

        const closeBtn = document.getElementById(
            "tdCloseBtn"
        );


        // ==================================
        // ❌ CLOSE POPUP FUNCTION
        // ==================================

        let isClosing = false;

        let autoCloseTimer;


        function closePopup() {

            // একাধিকবার Close হওয়া আটকানো
            if (isClosing) {
                return;
            }

            isClosing = true;


            // ⏱️ Auto Close Timer বন্ধ করা
            clearTimeout(autoCloseTimer);


            // সুন্দর Exit Animation

            popup.style.transition =
                "opacity 0.4s ease, transform 0.4s ease";

            popup.style.opacity = "0";

            popup.style.transform =
                "scale(0.92) translateY(-20px)";


            // Animation শেষে Remove

            setTimeout(() => {

                popup.remove();

            }, 400);

        }


        // ==================================
        // ❌ CLOSE BUTTON EVENT
        // ==================================

        closeBtn.addEventListener(
            "click",
            closePopup
        );


        // ==================================
        // 🖱️ CLICK OUTSIDE TO CLOSE
        // ==================================

        popup.addEventListener(
            "click",
            function (event) {

                if (event.target === popup) {

                    closePopup();

                }

            }
        );


        // ==================================
        // ⏱️ AUTO CLOSE AFTER 3 SECONDS
        // ==================================

        autoCloseTimer = setTimeout(
            closePopup,
            3000
        );

    }


    // ==================================
    // 🚀 RUN WHEN PAGE LOADS
    // ==================================

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            updatePopup
        );

    } else {

        updatePopup();

    }

})();
