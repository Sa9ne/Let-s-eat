// Константы
    window.AuthForm = document.getElementById("auth-form")
    window.RegisterForm = document.getElementById("register-form")
    window.OpenLang = document.getElementById("lang-modal")
    window.OpenProf = document.getElementById("profile-form")
    window.Catalog = document.getElementById("catalog-form")
    window.DishDay = document.getElementById("Dish-day")
    window.DishName = document.getElementById("dish-name")
    window.DishDescription = document.getElementById("dish-description")
    window.DishTime = document.getElementById("dish-time")
// Функция закрытия всех модальных окон
function CloseModal(expect = null) {
    const modals = [AuthForm, RegisterForm, OpenLang, OpenProf, Catalog, DishDay];

    modals.forEach(modal => {
        if (modal !== expect) {
            modal.classList.add("hidden");
        }
    });
}