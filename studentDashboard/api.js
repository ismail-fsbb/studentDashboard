export async function fetchDummyGrades() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    const randomGrade = parseFloat((Math.random() * 40 + 60).toFixed(2));
    return new Promise(resolve => {
      setTimeout(() => resolve(randomGrade), 1500);
    });
  }