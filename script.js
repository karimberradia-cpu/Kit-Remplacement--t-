async function chargerKPI() {

    const reponse = await fetch("data/kpi.csv");
    const texte = await reponse.text();

    const lignes = texte.trim().split("\n").slice(1);

    const container = document.getElementById("kpi-container");
    container.innerHTML = "";

    const icones = {
        CSAT: "😊",
        SLA: "⏱️",
        QS: "✅",
        Retour: "🔄"
    };

    const mois = new Date().toLocaleString("fr-FR", {
        month: "long"
    });

    lignes.forEach(ligne => {

        const colonnes = ligne.split(";").map(c => c.trim());

        const nom = colonnes[0];
        const valeurAnnee = parseFloat(colonnes[1]);
        const valeurMois = parseFloat(colonnes[2]);
        const objectif = parseFloat(colonnes[3]);
        const sens = colonnes[4].toLowerCase();

        let couleur = "kpi-green";
        let statut = "On Track";

        if (sens === "plus") {

            if (valeurMois >= objectif) {

                couleur = "kpi-green";
                statut = "On Track";

            } else if (valeurMois >= (objectif - 1)) {

                couleur = "kpi-orange";
                statut = "Work in Progress";

            } else {

                couleur = "kpi-red";
                statut = "Needs Attention";

            }

        } else if (sens === "moins") {

            if (valeurMois <= objectif) {

                couleur = "kpi-green";
                statut = "On Track";

            } else if (valeurMois <= (objectif + 1)) {

                couleur = "kpi-orange";
                statut = "Work in Progress";

            } else {

                couleur = "kpi-red";
                statut = "Needs Attention";

            }

        }

        const carte = document.createElement("div");

        carte.className = "kpi-card";

        carte.innerHTML = `
            <div class="kpi-bar ${couleur}"></div>

            <div class="kpi-icon">${icones[nom] || "📊"}</div>

            <div class="kpi-title">${nom}</div>

            <div class="kpi-value">${valeurMois.toFixed(1)}%</div>

            <div class="kpi-month">
                Objectif : ${objectif}%
            </div>

            <div class="kpi-status ${couleur}">
                ${statut}
            </div>

            <div class="kpi-month">
                Année : ${valeurAnnee.toFixed(1)}%
            </div>
        `;

        container.appendChild(carte);

    });

}

chargerKPI();