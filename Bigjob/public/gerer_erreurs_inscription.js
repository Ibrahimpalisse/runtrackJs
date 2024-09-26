document.querySelector('form').addEventListener('submit', function (e) {
                e.preventDefault();  

                const login = document.getElementById('login').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                const data = { login, email, password };

                fetch('/inscription', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                .then(async response => {
                    console.log('Status:', response.status);
                    console.log('Headers:', response.headers);
                
                    try {
                        const result = await response.json();
                
                        if (result.error || result.message) {
                            if (result.error) {
                                const { field, message } = result.error;
                
                                // Gérer les erreurs en fonction du champ concerné
                                if (field === 'login') {
                                    document.getElementById('login-error').innerText = message;
                                } else if (field === 'email') {
                                    document.getElementById('email-error').innerText = message;
                                }
                            } else {
                                // Redirection en cas de succès
                                window.location.href = './index';
                            }
                        }
                    } catch (jsonError) {
                        console.error('Erreur lors du parsing JSON:', jsonError);
                    }
                })
                .catch(error => {
                    console.error('Erreur:', error);
                });
                
            });