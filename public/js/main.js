document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const tripForm = document.getElementById('tripForm');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (data.success) window.location.href = 'home.html';
        else alert('Login failed');
      });
    }
  
    if (tripForm) {
      tripForm.addEventListener('submit', e => {
        e.preventDefault();
        const people = document.getElementById('people').value;
        const startDate = document.getElementById('startDate').value;
        const days = document.getElementById('days').value;
        const place = document.getElementById('placeSelect').value;
  
        const packages = {
          rajasthan: 'Jaipur, Udaipur, Jaisalmer, Forts & Palaces, Deserts',
          tamilnadu: 'Madurai, Rameshwaram, Kanyakumari, Isha Foundation',
          kerala: 'Alleppey, Munnar, Kochi, Wayanad',
          assam: 'Kaziranga, Guwahati, Majuli Island',
          himachal: 'Shimla, Manali, Dharamshala',
          goa: 'Panaji, Baga Beach, Old Goa'
        };
  
        document.getElementById('results').innerHTML = `
          <h2>${place.charAt(0).toUpperCase() + place.slice(1)} Package</h2>
          <p>Places: ${packages[place]}</p>
          <p>People: ${people}</p>
          <p>Start Date: ${startDate}</p>
          <p>Days: ${days}</p>
        `;
      });
    }
  });