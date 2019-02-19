let alleRetter = [];
document.addEventListener("DOMContentLoaded", start);
let dest = document.querySelector("#liste");
let filter = "alle";

function start() {

    async function getJson() {
        let jsonData = await fetch("mad.json");
        alleRetter = await jsonData.json();
        visRetter();
    }

    function visRetter() {
        dest.innerHTML = "";
        alleRetter.forEach(enkeltRet => {
            if (filter == "alle" || filter == enkeltRet.kategori) {
                let template =
                    `
                            <div class="retter">
                                <h2>${enkeltRet.navn}</h2>
                                <img src="mad/${enkeltRet.billede}.jpg">
                                <p>Pris: ${enkeltRet.pris},-</p>

                                <div id="readmore">
                                <p>Læs mere</p></div>
                            </div>

                            `;

                dest.insertAdjacentHTML("beforeend", template);
                dest.lastElementChild.addEventListener("click", open);

                function open() {
                    document.querySelector("#indhold").innerHTML = `
                            <div class="retter">
                                <h2>${enkeltRet.navn}</h2>
                                <img src="mad/${enkeltRet.billede}.jpg">
                                <p>${enkeltRet.kort}</p>
                                <p>Pris: ${enkeltRet.pris},-</p>

                                </div>

                            `;
                    document.querySelector("#popup").style.display = "block";
                }
            }
        })

        document.querySelectorAll(".filter").forEach(elm => {
            elm.addEventListener("click", filtrering);
        })

        function filtrering() {
            filter = this.getAttribute("data-kategori");


            document.querySelectorAll(".filter").forEach(elm => {
                elm.classList.remove("valgt");
            })

            this.classList.add("valgt");
            visRetter();

        }

    }

    document.querySelector("#luk button").addEventListener("click", () => {
        document.querySelector("#popup").style.display = "none";
    })
    getJson()


}
