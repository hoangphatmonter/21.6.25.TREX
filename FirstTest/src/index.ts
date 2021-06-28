import { formData } from './form';

const form = document.querySelector('form')!;

form.addEventListener('submit', (e) => {
    //e.preventDefault();     // prevent the web reload
    const data = formData(form);
    console.log(data);
});

const person: any = {};
console.log(person.speak());

type Per = {
    name: string,
    speak(a: string): void
}

interface Person {
    name: string,
    speak(a: string): void
}