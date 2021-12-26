// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
    let organism = {
        specimenNum,
        dna,
        mutate() {
            let randomBase = Math.floor(Math.random() * this.dna.length);
            let currentBase = this.dna[randomBase];
            while (this.dna[randomBase] === currentBase) {
                this.dna[randomBase] = returnRandBase();
            }
            return dna;
        },
        compareDNA(pAequor) {
            let match = 0
            for (let i = 0; i < this.dna.length; ++i) {
                if (this.dna[i] === pAequor.dna[i]) {
                    ++match;
                }
            }
            let percentMatch = match / this.dna.length * 100;
            console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentMatch}% DNA in common.`);
        },
        willLikelySurvive() {
            let cgCount = 0;
            for (let base of this.dna) {
                if (base === 'C' || base === 'G') {
                    ++cgCount;
                }
            }
            return (cgCount / this.dna.length >= .6);
        }
    }
    return organism;
}

let pAequorArray = [];

for (let i = 1; i <= 30; ++i) {
    pAequorArray.push(pAequorFactory(i, mockUpStrand()));
}

for (let pAequor of pAequorArray) {
    console.log(pAequor.specimenNum);
    console.log(pAequor.dna);
    console.log(pAequor.willLikelySurvive());
    pAequor.compareDNA(pAequorArray[Math.floor(Math.random() * pAequorArray.length)]);
}


