## Liveup
- A web application that enables doctors to track patient prescriptions, avoid redundancy and manual processes.

## Screenshots
- A screenshot of a clinician's page showing a modal used to record a patient's prescription
![Clinician page](/public/images/prescribe_screenshot.PNG?raw=true "Clinician page")

- A screenshot of a receptionist's page showing a modal used to refer a patient
to a doctor
![Receptionist page](/public/images/refer_screenshot.PNG?raw=true "Receptionist page")

- A screenshot of the admin panel
to a doctor
![dmin Panel](/public/images/admin_screenshot.PNG?raw=true "Admin Panel")

## Getting started
- Clone this repository
- Open terminal and run `npm install`
- Run `npm run dev`
- Open http://localhost:3000 with your browser to see the result.
- You can find the live web app [here](https://liveup-web.vercel.app/) (Do not know how long it will be up)

## Features
- Export to csv and pdf
- Login with email and password.
- App User Regisration (Only admins can register receptionists, doctors, nurses, student clinicians, create wards, and perform other admin related work in the admin panel).
Find out more about the admin in the [API repository](https://github.com/KNehe/liveup_api).
- Receptionist can register patients, view and edit their details
- Receptionist can refer a patient to a clinician. Only for patients
they have registered.
- A Receptionist can look up past referrals (history) of patient and edit them.
They can see history of patients registered by other receptionists too but can
only edit a referral they made.
- App users can change their names and password.
- Forgot password.
- Clinicians(doctors, nurses, student doctors, etc) can view patients referred to them
- Clinicians can view patient details and record prescriptions
- Clinicians can admit a patient to a particular ward
- Clinicians can view a patient's history (past admissions and prescriptions made by them and other clinicians). Can only edit an admission and prescription they made.
- Statistics. Number of patients registered,
number of referrals made by all receptionists or a particular receptionist including for the current day, number of patients admitted, number of prescriptions recorded, 
number of referrals made, to all doctors or a particular doctor including that for the current day,
- Landing page with a link to a demo.
- Logout
- Pagination


## Tools and Techonologies used
- JavaScript
- ReactJs
- NextJs
- React Bootstrap
- HTML
- CSS
- Redux Toolkit
