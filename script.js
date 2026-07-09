async function chargerKPI() {

    const reponse = await fetch("data/kpi.csv");

    const texte = await reponse.text();

    const lignes = texte.trim().split("\n");

    const container = document.getElementById("kpi-container");

    container.innerHTML = "";

    lignes.slice(1).forEach(ligne => {

        const [nom, valeur, objectif, sens] = ligne.split(";");

        container.innerHTML += `

            <div class="kpi-card">

                <h3>${nom}</h3>

                <p>${valeur}%</p>

                <small>Objectif : ${objectif}%</small>

            </div>

        `;

    });

}

chargerKPI();