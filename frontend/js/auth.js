// Нажатие на аватар
function handleAvatarClick() {
    const token = localStorage.getItem('auth_token');

    if (token) {
        OpenProfile();
    } else {
        toggleLogInForm();
    }
}
// Открытие окна входа
function toggleLogInForm() {
    CloseModal(AuthForm);
    AuthForm.classList.toggle("hidden");
}
// Открытие окна профиля
function OpenProfile() {
    const username = localStorage.getItem('name');

    const profileTitle = document.getElementById("profile-title")
    profileTitle.textContent = username || "Noname"

    CloseModal(OpenProf);
    OpenProf.classList.toggle("hidden")
}
// Открытие регистрационного окна
function toggleRegisterForm() {
    CloseModal(RegisterForm);
    RegisterForm.classList.toggle("hidden"); 
}
// Регистрация 
async function RegisterUser(e) {
    // Не перезагружаем страницу
    e.preventDefault();

    // Вводим данные
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const errorEl = document.getElementById("register-error");

    try {
        // Отправляем запрос по ссылке и указываем как
        const response = await fetch("http://localhost:8081/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });
            // Ждем ответа от сервера
            const data = await response.json();
        if (response.ok) {
            localStorage.setItem('name', data.name);
            CloseModal();
        } else {
            errorEl.textContent = data.error || "Произошла ошибка регистрации.";
        }
    } catch (err) {
        errorEl.textContent = "Ошибка сети: " + err.message;
    }
}
// Вход
async function LogInUser(e) {
    e.preventDefault();
    
    // Вводим данные
    const email = document.getElementById("LogIn-email").value;
    const password = document.getElementById("LogIn-password").value;
    const errorEl = document.getElementById("LogIn-error");

    try {
        const response = await fetch("http://localhost:8081/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
            const data = await response.json();
        if (response.ok) {
            localStorage.setItem('auth_token', data.token);
            CloseModal();
            OpenProfile();
        } else {
            errorEl.textContent = data.error || "Произошла ошибка входа."
        }
    } catch (err) {
        errorEl.textContent = "Ошибка сети: " + err.message
    }
}
// Кнопка выхода из аккаунта
function quitAccount() {
    localStorage.removeItem('auth_token');
    OpenProf.classList.add("hidden");
    toggleLogInForm(); 
}