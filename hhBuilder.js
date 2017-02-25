(function () {
    //IIFE to prevent polluting global namespace                
    var model = {};

    var age, rel, smoker;

    var peopleInHousehold = [];

    function construct() {
        initializeModel();
        age = document.querySelector('[name=age]');
        age.addEventListener('change', assignToModel);
        rel = document.querySelector('[name=rel]');
        rel.addEventListener('change', assignToModel);
        smoker = document.querySelector('[name=smoker]');
        smoker.addEventListener('change', assignToModel);
        document.querySelector('.add').addEventListener('click', onAdd);
        document.querySelector('[type=submit]').addEventListener('click', submit);
    }

    function initializeModel() {
        model = {
            id: 0,
            age: 0,
            rel: '',
            smoker: false
        }
    }

    function assignToModel(event) {
        if (event.target.name === 'smoker') {
            model[event.target.name] = smoker.checked ? true : false;
        }
        else {
            model[event.target.name] = event.target.value;
        }
    }

    function onAdd() {
        event.preventDefault();
        if (!model.rel) {
            alert("You must select the relationship!");
        }
        else if (!model.age.toString().match('^[0-9]+$') || model.age < 1) {
            alert("You must enter an age and it must be greater than 0.");
        }
        else {
            addToSubmission(model);
        }
    }

    function addToSubmission(model) {
        model.id = peopleInHousehold.length !== 0 ? peopleInHousehold.length + 1 : 1;
        peopleInHousehold.push(model);
        clearModelAndInputs();

        renderList();
    }

    function clearModelAndInputs() {
        initializeModel();
        age.value = '';
        rel.value = '';
        smoker.checked = false;
    }

    function renderList() {
        var grid = document.querySelector('ol.household');
        grid.innerHTML = generateListItems();
    }

    function generateListItems() {
        var peopleToRender = peopleInHousehold.map(function (model) {
            return '<li id="' + model.id + '">' + '<strong>Age:</strong> ' + model.age + ' <strong>Relationship:</strong> ' + model.rel + ' <strong>Smoker?</strong> ' + model.smoker + ' <a href="#" onclick="remove(this.parentElement)">Remove</a>' + '</li>';
        });

        return peopleToRender.join("");//removes the commas between array items
    };

    function removeFromArray(id) {
        peopleInHousehold = peopleInHousehold.filter(function (person) {
            return person.id != id;
        });
    }

    window.remove = function (node) {
        node.parentElement.removeChild(node);
        removeFromArray(node.id);

        renderList();
    };

    function submit() {
        event.preventDefault();

        var serialized = JSON.stringify(peopleInHousehold);
        var pre = document.querySelector('pre.debug');

        pre.innerHTML = serialized;
        pre.style.display = "initial";
        pre.style.position = "absolute";
    }

    //so our module doesn't assign the event listeners in module scope
    window.onload = construct;
} ());