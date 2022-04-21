function apiUrl()
{
    
    let apiUrl = 'https://opentdb.com/api.php?amount=10'
    
    return apiUrl;
    //basic functionality to get just 10 questions
}



function getQuestions()
{
    let alertPlaceholder = document.getElementById('alert-container');
    alertPlaceholder.innerHTML = ""
    let xmlRequest = new XMLHttpRequest()


    xmlRequest.open('GET', apiUrl());

    xmlRequest.send();

    xmlRequest.onreadystatechange = function(e)
    {
        if(this.readyState === 4 && this.status === 200)
        {
            //category, type, difficulty, question, correct answer, incorrect answers
            //all strings
            let response = JSON.parse(this.responseText);
            let questions = response.results;
            console.log(questions);
            let container = document.getElementById("questions-container");
            let qCategory = document.getElementById("category");
            let qType = document.getElementById("category");
            let qQuestion = document.getElementById("question");
            let qDifficulty = document.getElementById("difficulty");

            questions.forEach(element => {
                let cat =  document.createElement("cat");
                let quest = document.createElement("quest");
                let diff = document.createElement("diff");

                quest.classList.add("questionfont");
                cat.classList.add("categoryfont");
                diff.classList.add("difficulty");
                
                diff.innerText = "Difficulty: " + element.difficulty;
                cat.innerText = "Category: " + element.category;
                let newtext = "Question: " + element.question;
                newtext = newtext.replaceAll("&#039;", "'");
                newtext = newtext.replaceAll("&quot;", '"');
                quest.innerText = newtext;
                
                var br = document.createElement('br');
                
                container.appendChild(cat);
                container.appendChild(diff);
                container.appendChild(quest);
                container.appendChild(br);
                
            });

        }
    }
}





document.onload = (() =>
{
    let questionsContainer = document.querySelector('#questions-container')
    let btnElem = document.createElement('button')

    btnElem.setAttribute('class', 'btn btn-info')
    btnElem.addEventListener('click', getQuestions)

    let btnText = document.createTextNode('Get me some questions')
    btnElem.appendChild(btnText)

    questionsContainer.append(btnElem)
    getQuestions();
})()
