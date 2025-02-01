const pass = document.querySelector("#password");
const btn = document.querySelector("#btn");
const msg = document.querySelector("#msg");
const togglePassword = document.querySelector("#togglePassword");

const criteriaList = [
  {
    id: "length",
    test: (val) => val.length >= 8,
    msg: "At least 8 characters",
  },
  {
    id: "upperCase",
    test: (val) => /[A-Z]/.test(val),
    msg: "At least one uppercase letter",
  },
  {
    id: "lowerCase",
    test: (val) => /[a-z]/.test(val),
    msg: "At least one lowercase letter",
  },
  {
    id: "number",
    test: (val) => /[0-9]/.test(val),
    msg: "At least one number",
  },
  {
    id: "special",
    test: (val) => /[!@#$%^&*]/.test(val),
    msg: "At least one special character (!@#$%^&*)",
  },
];

const checkPassword = () => {
  const passVal = pass.value.trim();
  let allValid = true;

  criteriaList.forEach(({ id, test, msg }) => {
    const elem = document.querySelector(`#${id}`);
    if (!elem) return;

    const isValid = test(passVal);
    elem.classList.toggle("valid", isValid);
    elem.classList.toggle("invalid", !isValid);
    elem.innerHTML = isValid ? `✅ ${msg}` : `❌ ${msg}`;

    if (!isValid) allValid = false;
  });

  msg.style.display = "block";
  msg.innerHTML = allValid
    ? "✅ Your password is strong!"
    : "❌ Your password is not strong enough!";
  msg.style.color = allValid ? "green" : "red";

  pass.style.borderColor =
    passVal.length < 4 ? "red" : passVal.length < 8 ? "yellow" : "green";
};

// Toggle password visibility
togglePassword.addEventListener("click", () => {
  if (pass.type === "password") {
    pass.type = "text";
    togglePassword.textContent = "🙈"; // Change icon to "Hide"
  } else {
    pass.type = "password";
    togglePassword.textContent = "👁"; // Change icon to "Show"
  }
});

// Validate on input (real-time checking)
pass.addEventListener("input", checkPassword);
