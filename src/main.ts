// const email = document.getElementById('email') as HTMLInputElement;
// const name = document.getElementById('name') as HTMLInputElement;

// const xhr = new XMLHttpRequest();
// xhr.open('POST', '/api');
// xhr.setRequestHeader('Content-type', 'application/json');
// xhr.setRequestHeader('Accept', 'application/json');
// xhr.send(JSON.stringify({ email, name }));

// xhr.onreadystatechange = () => {
//   if (xhr.readyState !== 4) {
//     return;
//   }
//   if (xhr.status !== 200) {
//     const response: Partial<{ errors: { name: string; email: string } }> = JSON.parse(xhr.response);
//     const errors = document.getElementById('errors') as HTMLDivElement;
//     errors.innerHTML = response.errors ? (response.errors.email || response.errors.name) : 'Send error. Try again.';
//   } else {
//     const success = document.getElementById('success') as HTMLDivElement;
//     success.innerHTML = 'Form sent!';
//   }
// };
