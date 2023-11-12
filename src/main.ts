// import all images here
import "./assets/logo.png";

import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, set } from "firebase/database";

interface Barber {
  name: string;
  id: string;
}

const firebaseConfig = {
  databaseURL:
    "https://grade92-fa0ad-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "grade92-fa0ad"
};

initializeApp(firebaseConfig);
const db = getDatabase();

// ELEMENTS

const addNewBarberBtn: HTMLButtonElement = document.getElementById(
  "addNewBarberBtn"
) as HTMLButtonElement;
const addNewBarberInput: HTMLInputElement = document.getElementById(
  "addNewBarberInput"
) as HTMLInputElement;

// UTILS

const elFromStr = (str: string): ChildNode => {
  const parser = new DOMParser();
  return parser.parseFromString(str, "text/html").body.firstChild;
};

// API CALLS

const getBarbers = (): Promise<Barber[]> =>
  get(child(ref(db), `/barbers`)).then(snapshot => snapshot.val());

const addBarber = (barber: Barber): Promise<void> =>
  getBarbers().then(existingBarbers => {
    set(ref(db, "/barbers"), [...existingBarbers, barber]);
  });

const deleteBarber = () => {};

// LOGIC

// fetches barbers from the db and updates the list in the DOM
const getBarberList = () => {
  const barbersContainer = document.getElementById("barbers");
  barbersContainer.innerHTML = "";
  getBarbers().then(barbers => {
    barbers.forEach(({ name, id }) => {
      const htmlString = `
            <div id="${id}" class="flex justify-between items-center border rounded p-4 shadow">
                <div>${name}</div>
                <button type="button" class="focus:outline-none">
                    <svg height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" xml:space="preserve">
                        <path style="fill:#475569;" d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25 C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0 L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467 L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468 c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467 C19.033,16.725,19.033,17.138,18.78,17.394z"/>
                    </svg>
                </button>
            </div>`;
      barbersContainer.appendChild(elFromStr(htmlString));
    });
  });
};

const addNewBarber = () => {
  addNewBarberBtn.disabled = true;
  const name = addNewBarberInput.value;
  addBarber({ name, id: name.toLowerCase().replace(/ /g, "") }).then(() => {
    addNewBarberBtn.disabled = false;
    addNewBarberInput.value = "";
    getBarberList();
  });
};

getBarberList();
addNewBarberBtn.addEventListener("click", addNewBarber);
