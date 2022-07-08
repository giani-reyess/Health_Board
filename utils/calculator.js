class Calculator {
    constructor(height, weight, age, gender) {
        this.height = height
        this.weight = weight
        this.age = age
        this.gender = gender
    }

    leanBodyMass() {
        if (this.gender == "male") {
            const BLM = 0.407 * this.weight + 0.267 * (this.height / 100) * 100 - 19.22
            return BLM.toFixed(2)
        }

        if (this.gender == "female") {
            BLM = 0.252 * this.weight + 0.473 * (this.height / 100) * 100 - 48.3
            return BLM.toFixed(2)
        }
    }

    bodyMassIndex() {
        const BMI = this.weight / (this.height / 100) ** 2
        return BMI.toFixed(2)
    }

    bodyFatPercentage() {
        if (this.gender == "male") {
            const BFP = 1.20 * this.bodyMassIndex() + 0.23 * this.age - 16.2
            if (this.age <= 15) {
                BFP = 1.51 * this.bodyMassIndex() - 0.70 * this.age - 2.2
            }
            return BFP.toFixed(2)
        }

        if (this.gender == "female") {
            BFP = 1.20 * this.bodyMassIndex() + 0.23 * this.age - 5.4
            if (this.age <= 15) {
                BFP = 1.51 * this.bodyMassIndex() - 0.70 * this.age + 1.4
            }
            return BFP.toFixed(2)
        }
    }

    basalMetabolicRate() {
        let s = 0

        if (this.gender == "male") {
            s = +5
        }

        if (this.gender == "female") {
            s = -161
        }

        const BMR = (this.weight * 10) + (this.height * 6.25) - (this.age * 5) + s
        return BMR.toFixed(2)
    }

    calculateAll() {
        return {
            leanBodyMass: this.leanBodyMass(),
            bodyMassIndex: this.bodyMassIndex(),
            bodyFatPercentage: this.bodyFatPercentage(),
            basalMetabolicRate: this.basalMetabolicRate()
        }
    }
}

module.exports = Calculator