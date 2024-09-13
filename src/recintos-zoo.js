class RecintosZoo {
    constructor() {
        this.recintos = [
            { id: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
            { id: 2, bioma: "floresta", tamanho: 5, animais: [] },
            { id: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
            { id: 4, bioma: "rio", tamanho: 8, animais: [] },
            { id: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] }
        ];

        this.animaisPermitidos = {
            LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animaisPermitidos[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const animalInfo = this.animaisPermitidos[animal];
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            const espacoOcupado = recinto.animais.reduce((total, a) => total + a.quantidade * this.animaisPermitidos[a.especie].tamanho, 0);
            const espacoLivre = recinto.tamanho - espacoOcupado;
            const totalEspacoNecessario = quantidade * animalInfo.tamanho;

            if (animalInfo.biomas.includes(recinto.bioma)) {
                if (animalInfo.carnivoro && recinto.animais.length > 0 && recinto.animais[0].especie !== animal) {
                    continue;
                }

                if (recinto.animais.length > 0) {
                    const primeiroAnimal = recinto.animais[0].especie;
                    const primeiroAnimalInfo = this.animaisPermitidos[primeiroAnimal];

                    if (animal !== primeiroAnimal && animalInfo.carnivoro || primeiroAnimalInfo.carnivoro) {
                        continue;
                    }

                    if (animal === "HIPOPOTAMO" && recinto.bioma !== "savana e rio") {
                        continue;
                    }

                    if (animal !== "HIPOPOTAMO" && recinto.animais.length > 1) {
                        totalEspacoNecessario += 1;
                    }
                }

                if (espacoLivre >= totalEspacoNecessario) {
                    recintosViaveis.push(`Recinto ${recinto.id} (espaço livre: ${espacoLivre - totalEspacoNecessario} total: ${recinto.tamanho})`);
                }
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
