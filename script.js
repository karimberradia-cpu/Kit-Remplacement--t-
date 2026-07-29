async function chargerKPI() {

    const reponse = await fetch("data/kpi.csv");
    const texte = await reponse.text();

    const lignes = texte.trim().split("\n").slice(1);

    const container = document.getElementById("kpi-container");
    container.innerHTML = "";

    // Configuration des KPI
    const kpiConfig = {

        CSAT: {
            icon: "😊",
            objectif: 95,
            tolerance: 2
        },

        Retour: {
            icon: "📊",
            objectif: 15,
            tolerance: 2
        },

        SLA: {
            icon: "⏱️",
            objectif: 95,
            tolerance: 1
        },

        QS: {
            icon: "✅",
            objectif: 85,
            tolerance: 2
        }

    };

    lignes.forEach(ligne => {

        const colonnes = ligne.split(";").map(c => c.trim());

        const nom = colonnes[0];
        const valeurAnnee = parseFloat(colonnes[1]);
        const valeurMois = parseFloat(colonnes[2]);

        const config = kpiConfig[nom] || {
            icon: "📊",
            objectif: 0,
            tolerance: 2
        };

        const { icon, objectif, tolerance } = config;

        let couleur;
        let statut;

        if (valeurMois >= objectif) {

            couleur = "kpi-green";
            statut = "🟢 On Track";

        } else if (valeurMois >= (objectif - tolerance)) {

            couleur = "kpi-orange";
            statut = "🟠 Work in Progress";

        } else {

            couleur = "kpi-red";
            statut = "🔴 Needs Attention";

        }

        const carte = document.createElement("div");
        carte.className = "kpi-card";

        carte.innerHTML = `
            <div class="kpi-bar ${couleur}"></div>

            <div class="kpi-icon">
                ${icon}
            </div>

            <div class="kpi-title">
                ${nom}
            </div>

            <div class="kpi-value">
                ${valeurMois.toFixed(1)}%
            </div>

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