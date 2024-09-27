document.getElementById('inscription-form').addEventListener('submit', function(e) {
    e.preventDefault(); 


    const login = document.getElementById('login').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

  
    document.getElementById('login-error').textContent = '';
    document.getElementById('email-error').textContent = '';

    let hasError = false;

   
    if (login.length < 6) {
        document.getElementById('login-error').textContent = 'Le login doit contenir au moins 6 caractères.';
        hasError = true;
    }


    if (!email.includes('laplateforme.io')) {
        document.getElementById('email-error').textContent = 'L\'email doit contenir "laplateforme.io".';
        hasError = true;
    }

    if (hasError) return;

  
    fetch('/inscription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
     
            if (data.error === 'login_exists') {
                document.getElementById('login-error').textContent = 'Ce login est déjà utilisé.';
            }
            if (data.error === 'email_exists') {
                document.getElementById('email-error').textContent = 'Cet email est déjà utilisé.';
            }
        } else {
 
            window.location.href = 'index';
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
});
