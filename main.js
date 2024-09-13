document.addEventListener('DOMContentLoaded', function () {
  const startYearColumn = document.getElementById("startYear"),
    facultyColumn = document.getElementById("faculty"),
    birthDateColumn = document.getElementById("birthDate"),
    fioColumn = document.getElementById("fio"),
    numberColumn = document.getElementById("number"),

    errorDiv = document.getElementById("errorText_Div"),

    filterBtn = document.getElementById("filter-btn"),
    filterForm = document.getElementById("filter-form"),
    fioFilter = document.getElementById("filter-form__fio"),
    facultyFilter = document.getElementById("filter-form__faculty"),
    startYearFilter = document.getElementById("filter-form__start"),
    endYearFilter = document.getElementById("filter-form__end"),

    today = new Date(),
    currentYear = today.getFullYear();

  // Создание списка студентов
  const studentsList = [
    {
      name: 'Артём',
      surname: 'Афанасьев',
      middleName: 'Павлович',
      fio: 'Афанасьев Артём Павлович',
      faculty: 'Реклама и СО',
      birthDate: new Date(1999, 2, 21),
      startYear: 2016
    },
    {
      name: 'Ксения',
      surname: 'Ксеньева',
      middleName: 'Ксеньевна',
      fio: 'Ксеньева Ксения Ксеньевна',
      faculty: 'Менеджмент',
      birthDate: new Date(2000, 11, 5),
      startYear: 2022
    },
    {
      name: 'Ирина',
      surname: 'Иринова',
      middleName: 'Ириновна',
      fio: 'Иринова Ирина Ириновна',
      faculty: 'Управления',
      birthDate: new Date(1998, 6, 19),
      startYear: 2017
    },
    {
      name: 'Андрей',
      surname: 'Андреев',
      middleName: 'Андреевич',
      fio: 'Андреев Андрей Андреевич',
      faculty: 'ИУЭП',
      birthDate: new Date(1998, 3, 14),
      startYear: 2022
    },
    {
      name: 'Павел',
      surname: 'Павлов',
      middleName: 'Павлович',
      fio: 'Павлов Павел Павлович',
      faculty: 'ИУЭП',
      birthDate: new Date(1999, 9, 8),
      startYear: 2017,
    },
  ]

  let copyStudent = [...studentsList];

  // Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

  function getBirthDate(data) {
    let day = data.getDate();
    let month = data.getMonth() + 1;
    let year = data.getFullYear();

    let actualDay = day < 9 ? '0' + day : day;
    let actualMonth = month < 9 ? '0' + month : month;

    return `${actualDay}.${actualMonth}.${year}`
  }

  function getFullName(surname, name, middleName) {
    return `${surname} ${name} ${middleName}`
  }

  function getAge(data) {
    let dob = new Date(data);
    let age = today.getFullYear() - dob.getFullYear();
    let m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--
    };

    return age;
  }

  function getCourse(data) {
    let course;

    if (today.getMonth() >= 8) {
      course = currentYear - data + 1;
    } else {
      course = currentYear - data;
    }

    if (course > 4) {
      course = 'Закончил';
    } else {
      course += " курс";
    };


    return course;
  }

  function getStudentItem(studentObj) {
    const tableRow = document.createElement('tr');
    const numberColumn = document.createElement('td');

    numberColumn.textContent = tBody.childNodes.length + 1;

    const fioColumn = document.createElement('td');
    fioColumn.textContent = getFullName(studentObj.surname, studentObj.name, studentObj.middleName);

    const facultyColumn = document.createElement('td');
    facultyColumn.textContent = studentObj.faculty;

    const birthDateColumn = document.createElement('td');
    birthDateColumn.textContent = `${getBirthDate(studentObj.birthDate)} (${getAge(studentObj.birthDate)} лет)`;

    const studyYearsColumn = document.createElement('td');
    studyYearsColumn.textContent = `${studentObj.startYear}` + " - " + `${studentObj.startYear + 4}` + " " + `(${getCourse(studentObj.startYear)})`;

    tableRow.append(
      numberColumn,
      fioColumn,
      facultyColumn,
      birthDateColumn,
      studyYearsColumn,
    )

    tBody.append(tableRow);
  };

  // Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

  function renderStudentsTable(studentsArray) {
    tBody.innerHTML = '';
    for (let i = 0; i < studentsArray.length; i++) {
      getStudentItem(studentsArray[i]);
    };
  }

  function filter(){
	let faculty = facultyFilter.value.trim().toLowerCase();
	let startYear = startYearFilter.value;
	let fio = fioFilter.value.toLowerCase();
	let endYear = endYearFilter.value;
	copyStudent = studentsList.filter(student => {
		let matchFaculty = faculty === "" || student.faculty.toLowerCase().includes(faculty);
		let matchFio = fio === "" || student.fio.toLowerCase().includes(fio);
		let matchStartYear = startYear === "" || student.startYear === +startYear;
		let matchEndYear = endYear === "" || student.startYear + 4 === +endYear;

		return matchFaculty & matchStartYear & matchFio & matchEndYear;
	})
  }

  fioFilter.addEventListener('input', () =>{
	filter()
	renderStudentsTable(copyStudent)
  })

  facultyFilter.addEventListener('input', () =>{
	filter()
	renderStudentsTable(copyStudent)
  })

  startYearFilter.addEventListener('input', () =>{
	filter()
	renderStudentsTable(copyStudent)
  })

  endYearFilter.addEventListener('input', () =>{
	filter()
	renderStudentsTable(copyStudent)
  })

  const tBody = document.querySelector('#students-list');
  const sButton = document.querySelector('#submit-button');
  renderStudentsTable(studentsList);

  // Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

  function createStudentObjectFromForm() {
    const name = document.getElementById('inputName').value.trim();
    const surname = document.getElementById('inputSurname').value.trim();
    const middleName = document.getElementById('inputMiddleName').value.trim();
    const faculty = document.getElementById('inputFaculty').value.trim();
    const birthDate = document.getElementById('inputDateOfBirth').valueAsDate;
    const startYear = Number(document.getElementById('inputDateOfStart').value);

    // Проверка на пустые значения
    if (!name || !surname || !middleName || !faculty) {
      errorDiv.style.display = 'block';
      return;
    }

    let minDate = new Date('01.01.1900');
    let minStartYear = 2000;

    if (birthDate > today || birthDate < minDate) {
      errorDiv.style.display = 'block';
      return;
    } else {
      errorDiv.style.display = 'none';
    }

    if (startYear > today.getFullYear() || startYear < minStartYear) {
      errorDiv.style.display = 'block';
      return;
    } else {
      errorDiv.style.display = 'none';
    }


    // Создание объекта студента
    return {
      name: name,
      surname: surname,
      middleName: middleName,
      fio: surname + ' ' + name + ' ' + middleName,
      faculty: faculty,
      birthDate: birthDate,
      startYear: startYear
    };
  }

  // Обработчик события клика по кнопке
  sButton.addEventListener('click', function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение кнопки
    const studentObject = createStudentObjectFromForm();
    if (studentObject) {
      studentsList.push(studentObject);
      getStudentItem(studentObject);
    }
  });

  // Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
  let sortDirFlag = true;

  function sortArr(arr, name) {
    arr.sort((a, b) => {
      let valA = a[name];
      let valB = b[name];

      let sort = valA < valB;
      if (sortDirFlag == false) sort = valA > valB
      if (sort) return -1

    })
    return arr;
  }
  startYearColumn.addEventListener('click', () => {
    let sortedArr = sortArr(copyStudent, 'startYear');
    sortDirFlag = !sortDirFlag
    renderStudentsTable(sortedArr);
  })

  facultyColumn.addEventListener('click', () => {
    let sortedArr = sortArr(copyStudent, 'faculty');
    sortDirFlag = !sortDirFlag
    renderStudentsTable(sortedArr);
  })

  birthDateColumn.addEventListener('click', () => {
    let sortedArr = sortArr(copyStudent, 'birthDate');
    sortDirFlag = !sortDirFlag
    renderStudentsTable(sortedArr);
  })

  numberColumn.addEventListener('click', () => {
    let sortedArr = sortArr(copyStudent, 'number');
    sortDirFlag = !sortDirFlag
    renderStudentsTable(sortedArr);
  })

  fioColumn.addEventListener('click', () => {
    let sortedArr = sortArr(copyStudent, 'fio');
    sortDirFlag = !sortDirFlag
    renderStudentsTable(sortedArr);
  })

  // Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.

  filterBtn.addEventListener('click', () => {
    if (filterForm.classList == 'filter') {
      filterForm.classList.remove('filter');
    } else {
      filterForm.classList.add('filter')
    }

  })

  filterForm.addEventListener('submit', function (event) {
    event.preventDefault();
  })

  fioFilter.addEventListener('input', function() {

    renderStudentsTable(copyStudent);
  })






});
