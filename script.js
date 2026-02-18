        const maintodoelem = document.querySelector(".todo-list-items")
        const inputvalue = document.getElementById("inputvalue")


        const gettodolistfromlocal = () => {
            return JSON.parse(localStorage.getItem("YoutubeTodoList"));
        }

        const addTodoListLocalStorage = (localtodolist) => {
            return localStorage.setItem("YoutubeTodoList", JSON.stringify(localtodolist))
        }

        let localtodolist = gettodolistfromlocal() || [];

        const addTodoDynamicElement = (curElem) => {
            const divelement = document.createElement("div")
            divelement.classList.add("main_todo_list");
            divelement.innerHTML = `<li>${curElem}</li><button type="button" class="DeleteBtn">Delete</button>`

            // console.log(divelement)
            maintodoelem.append(divelement)
        }


        const addtodoelem = (e) => {
            e.preventDefault();

            const todolistvalue = inputvalue.value.trim();

            inputvalue.value = "";

            if (todolistvalue != "" && !localtodolist.includes(todolistvalue)) {

                localtodolist.push(todolistvalue)
                localtodolist = [...new Set(localtodolist)]
                console.log(localtodolist)

                localStorage.setItem("YoutubeTodoList", JSON.stringify(localtodolist))

                addTodoDynamicElement(todolistvalue);
            }
        };

        const showTodoList = () => {
            console.log(localtodolist)

            localtodolist.forEach((curElem) => {
                addTodoDynamicElement(curElem);
            })
        }

        showTodoList();

        // Remove The Data 
        const removeTodoElement = (e) => {
            const todoToRemove = e.target
            let todoListContent = todoToRemove.previousElementSibling.innerText;
            let parentElement = todoToRemove.parentElement;
            // console.log(todoListContent);

            localtodolist = localtodolist.filter((curElem) => {
                return curElem !== todoListContent;
            });
            
            addTodoListLocalStorage(localtodolist)
            parentElement.remove(); 
            
            console.log(localtodolist);
        }


        maintodoelem.addEventListener('click', (e) => {
            e.preventDefault();
            // console.log(e.target)
            if(e.target.classList.contains("DeleteBtn")){

                removeTodoElement(e);
            }

        });

        document.querySelector(".btn").addEventListener('click', (e) => {
            addtodoelem(e)
        });