window.onbeforeunload = function () {
  window.scrollTop(0);
}

function handleCredentialResponse(response) {
    const body = { id_token: response.credential };
    fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((r) => r.json())
        .then((resp) => {
            console.log(resp);
            localStorage.setItem("email", resp.usuario.correo);
        })
        .catch(console.warn);
}

function onSignOut() {
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(JSON.parse(localStorage.getItem("user")).Email, (done) => {
        console.log("consent revoked");
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
        document.getElementById("lblToken").innerHTML = "";
    });
}

function onRegister() {
    if (_validateForm()) {
        const { value: Identity } = document.getElementById("inpDocument");
        const { value: Name } = document.getElementById("inpName");
        const { value: Email } = document.getElementById("inpEmail");
        const { value: Address } = document.getElementById("inpAddress");
        const { value: City } = document.getElementById("inpCity");
        const { value: Phone } = document.getElementById("inpPhone");
        const { value: Password } = document.getElementById("inpPassword");

        const body = { Identity, Name, Email, Address, City, Phone, Password };

        fetch("http://localhost:8080/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((r) => r.json())
            .then((resp) => {
                console.log(resp);
                localStorage.setItem("user", JSON.stringify(resp.user));
                location.reload();
            })
            .catch((error) => {
                console.error("Failed to register:", error);
            });
    } else {
        alert("Debe llenar todos los campos");
    }
}

function onLogin() {
    const { value: Email } = document.getElementById("inpEmailSign");
    const { value: Password } = document.getElementById("inpPasswordSign");

    const body = { Email, Password };
    if (Email && Password) {
        fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((r) => r.json())
            .then((resp) => {
                //Convertir el token en un objeto
                let oToken = _parseJwt(resp.token);
                localStorage.setItem("user", JSON.stringify(resp.user));
                sessionStorage.setItem("token", resp.token);

                //Mostrar la fecha de expiración del token
                let dValid = new Date(oToken.exp * 1000);
                document.getElementById("lblToken").innerHTML = `Tu sesión expira: ${dValid.toLocaleString()}`;

                //Limpiar los campos
                document.getElementById("inpEmailSign").value = "";
                document.getElementById("inpPasswordSign").value = "";

                //Mostrar el nombre del usuario
                document.getElementById("lblUser").innerHTML = `Bienvenido, ${resp.user.Name}`;

                //Navegar a la sección de home
                document.getElementById("secHome").scrollIntoView({ behavior: "smooth" });

                //Mostrar la sección de home
                document.getElementById("secHome").style.visibility = "visible";
            })
            .catch((error) => {
                console.error("Failed to login:", error);
            });
    } else {
        alert("Debe ingresar un correo y una contraseña");
    }
}

function _parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}

function _validateForm() {
    //Validar que no esten vacios
    if (_validateEmpty() && _validateInputs()) {
        //Validar que sean iguales las contraseñas
        return _validatePassword();
    }
}

function _validateEmpty() {
    const requiredFields = ["inpDocument", "inpName", "inpEmail", "inpAddress", "inpCity", "inpPhone", "inpPassword", "inpPassword2"];
    const errors = [];

    for (const field of requiredFields) {
        const value = document.getElementById(field).value;
        if (value.trim() === "") {
            errors.push(`El campo ${field} no puede estar vacio`);
        }
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }

    return true;
}

function _validatePassword() {
    if (document.getElementById("inpPassword").value == document.getElementById("inpPassword2").value) return true;
    else {
        alert("Las contraseñas no coinciden");
        return false;
    }
}

function _validateInputs() {
    const validations = [
        {
            id: "inpDocument",
            maxLen: 15,
            errorMsg: "El campo de documento no puede tener más de 15 caracteres",
        },
        {
            id: "inpName",
            maxLen: 50,
            errorMsg: "El campo de nombre no puede tener más de 50 caracteres",
        },
        {
            id: "inpEmail",
            maxLen: 50,
            errorMsg: "El campo de correo no puede tener más de 50 caracteres",
        },
        {
            id: "inpEmail",
            validator: (value) => value.includes("@"),
            errorMsg: "El campo de correo debe ser un correo válido",
        },
        {
            id: "inpAddress",
            maxLen: 300,
            errorMsg: "El campo de dirección no puede tener más de 300 caracteres",
        },
        {
            id: "inpCity",
            maxLen: 20,
            errorMsg: "El campo de ciudad no puede tener más de 20 caracteres",
        },
        {
            id: "inpPhone",
            maxLen: 20,
            errorMsg: "El campo de teléfono no puede tener más de 20 caracteres",
        },
        {
            id: "inpPassword",
            maxLen: 20,
            errorMsg: "El campo de contraseña no puede tener más de 20 caracteres",
        },
    ];

    for (const validation of validations) {
        const input = document.getElementById(validation.id);
        if (input.value.trim().length === 0 || (validation.maxLen && input.value.trim().length > validation.maxLen) || (validation.validator && !validation.validator(input.value))) {
            alert(validation.errorMsg);
            return false;
        }
    }

    return true;
}
